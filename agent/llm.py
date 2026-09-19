"""LLM 클라이언트 경계.

planner가 어떤 모델을 쓰는지 몰라도 되게 인터페이스만 고정한다.
테스트는 ScriptedClient로 네트워크 없이 루프 동작을 검증하고,
실제 실행은 AnthropicClient가 담당한다.

반환 계약은 둘 중 하나다.
  {"tool": "<이름>", "args": {...}, "reason": "왜 이 도구를 부르는가"}
  {"final": {"cause_candidate": "<후보>", "reason": "..."}}

주의: LLM이 돌려준 수치는 어디에서도 쓰지 않는다.
모든 값은 도구 실행 결과에서만 나온다.
"""
from __future__ import annotations

import json
import os
from typing import Any, Protocol


class LLMClient(Protocol):
    def plan(self, system: str, history: list[dict[str, Any]], tools: list[dict[str, Any]]) -> dict[str, Any]:
        ...


class ScriptedClient:
    """테스트용. 미리 정해둔 결정을 순서대로 돌려준다."""

    def __init__(self, decisions: list[dict[str, Any]]):
        self._decisions = list(decisions)
        self.calls = 0

    def plan(self, system, history, tools):  # noqa: D401 - 인터페이스 구현
        self.calls += 1
        if not self._decisions:
            return {"final": {"cause_candidate": "UNKNOWN", "reason": "no more scripted decisions"}}
        return self._decisions.pop(0)


class AnthropicClient:
    """실제 실행용. ANTHROPIC_API_KEY가 없으면 생성 시점에 막는다.

    max_retries / timeout은 SDK에 맡긴다. 일시적인 연결 끊김(ConnectTimeout)까지
    직접 재시도 루프를 짜면 코드가 늘어나기만 하고, anthropic SDK가 이미
    지수 백오프로 재시도하는 기능을 갖고 있어 그걸 쓰는 편이 더 안전하다.
    """

    def __init__(self, model: str = "claude-sonnet-4-6", max_retries: int = 5, timeout: float = 90.0):
        try:
            import anthropic
        except ImportError as exc:  # pragma: no cover - 환경 의존
            raise RuntimeError("pip install anthropic 이 필요합니다.") from exc
        if not os.environ.get("ANTHROPIC_API_KEY"):
            raise RuntimeError("ANTHROPIC_API_KEY 가 설정되어 있지 않습니다.")

        self._client = anthropic.Anthropic(max_retries=max_retries, timeout=timeout)
        self._model = model

    def plan(self, system, history, tools):  # pragma: no cover - 네트워크 의존
        msg = self._client.messages.create(
            model=self._model,
            max_tokens=1024,
            system=system,
            tools=[{"name": t["name"], "description": t["purpose"], "input_schema": t["input_schema"]}
                   for t in tools],
            messages=history,
        )
        for block in msg.content:
            if getattr(block, "type", "") == "tool_use":
                return {"tool": block.name, "args": dict(block.input),
                        "reason": _text_of(msg) or "(no stated reason)"}
        return {"final": {"cause_candidate": "STATED_IN_TEXT", "reason": _text_of(msg)}}


def _text_of(msg) -> str:  # pragma: no cover - 네트워크 의존
    return " ".join(b.text for b in msg.content if getattr(b, "type", "") == "text").strip()


def build_client(kind: str = "anthropic", **kw) -> LLMClient:
    if kind == "anthropic":
        return AnthropicClient(**kw)
    raise ValueError(f"unknown client kind: {kind}")


def dumps(obj: Any, limit: int = 4000) -> str:
    """도구 결과를 LLM에 넘길 때 쓰는 직렬화. 길면 자른다."""
    s = json.dumps(obj, ensure_ascii=False, default=str)
    return s if len(s) <= limit else s[:limit] + f'... (truncated, {len(s)} chars)'
