const TERMS = {
  excursion:{k:'Excursion (이상)',e:'excursion',d:'공정 지표가 관리 한계를 벗어나 정상 변동으로 볼 수 없는 상태입니다. fab에서는 excursion이 뜨면 원인을 찾아 조치할 때까지 해당 설비의 로트 투입을 멈추기도 합니다. 이 프로젝트가 판정하려는 대상이 바로 이 상태입니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="16" y1="55" x2="188" y2="55" stroke="#8ea0aa" stroke-dasharray="4 3"/><line x1="16" y1="30" x2="188" y2="30" stroke="#9aa9b2" stroke-dasharray="2 3"/><line x1="16" y1="80" x2="188" y2="80" stroke="#9aa9b2" stroke-dasharray="2 3"/><polyline points="24,58 44,52 64,57 84,54 104,50 124,44 144,34 164,22" fill="none" stroke="#33424c" stroke-width="1.6"/><circle cx="164" cy="22" r="4" fill="#bf4630"/><text x="20" y="26" font-size="9" fill="#57676f">UCL</text><text x="20" y="92" font-size="9" fill="#57676f">LCL</text><text x="128" y="16" font-size="9" fill="#bf4630">excursion</text></svg>'},
  attribution:{k:'원인 귀속',e:'attribution / disposition',d:'이상이 어느 모듈에서 비롯됐는지 판정하고 조치 대상을 정하는 일입니다. fab에서는 로트를 어떻게 처리할지 정하는 행위를 disposition이라고 부릅니다. 이 에이전트의 출력이 곧 원인 귀속과 조치 권고입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="10" y="14" width="52" height="24" fill="none" stroke="#a05c00" stroke-width="1.4"/><text x="36" y="30" text-anchor="middle" font-size="10" fill="#a05c00">Litho</text><rect x="10" y="44" width="52" height="24" fill="none" stroke="#8a2e68" stroke-width="1.4"/><text x="36" y="60" text-anchor="middle" font-size="10" fill="#8a2e68">Etch</text><rect x="10" y="74" width="52" height="24" fill="#e3f0f1" stroke="#0b6a72" stroke-width="2"/><text x="36" y="90" text-anchor="middle" font-size="10" fill="#0b6a72">Metrology</text><path d="M68 86h34" stroke="#0b6a72" stroke-width="1.6"/><path d="M97 81l7 5-7 5" fill="#0b6a72"/><text x="108" y="82" font-size="10" fill="#33424c">조치 대상</text><text x="108" y="96" font-size="10" fill="#33424c">확정</text></svg>'},
  wafer:{k:'웨이퍼',e:'wafer',d:'회로를 만드는 실리콘 원판입니다. 현재 양산 표준은 지름 300 mm이며, 한 장에 수백 개의 칩(die)이 격자로 배열됩니다. 아래쪽 노치(notch)는 결정 방위와 장비 내 정렬 기준으로 쓰입니다.',
    s:'<svg viewBox="0 0 224 110"><circle cx="52" cy="55" r="42" fill="#f2f5f6" stroke="#57676f" stroke-width="1.3"/><g stroke="#c8d2d8" stroke-width=".7"><line x1="20" y1="13" x2="20" y2="97"/><line x1="31" y1="13" x2="31" y2="97"/><line x1="42" y1="13" x2="42" y2="97"/><line x1="53" y1="13" x2="53" y2="97"/><line x1="64" y1="13" x2="64" y2="97"/><line x1="75" y1="13" x2="75" y2="97"/><line x1="86" y1="13" x2="86" y2="97"/><line x1="11" y1="24" x2="93" y2="24"/><line x1="11" y1="35" x2="93" y2="35"/><line x1="11" y1="46" x2="93" y2="46"/><line x1="11" y1="57" x2="93" y2="57"/><line x1="11" y1="68" x2="93" y2="68"/><line x1="11" y1="79" x2="93" y2="79"/><line x1="11" y1="90" x2="93" y2="90"/></g><path d="M47 97h10l-5-8z" fill="#57676f"/><text x="104" y="38" font-size="10" fill="#33424c">지름 300 mm</text><text x="104" y="56" font-size="10" fill="#33424c">한 장에 die 수백 개</text><text x="104" y="74" font-size="10" fill="#57676f">아래 노치 = 정렬 기준</text></svg>'},
  lot:{k:'로트',e:'lot',d:'웨이퍼 25장을 담아 함께 이동하는 생산 단위입니다. FOUP이라는 밀폐 용기에 담겨 공정을 거칩니다. 계측은 전수로 하지 않고 대표 슬롯만 뽑아 재며, 이 프로젝트는 앞·중간·뒤를 대표하도록 slot 3 / 13 / 23을 측정합니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="12" y="18" width="76" height="74" fill="none" stroke="#57676f" stroke-width="1.3"/><rect x="18" y="22" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="24" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="27" width="64" height="4" fill="#0b6a72" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="30" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="33" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="36" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="38" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="41" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="44" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="47" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="50" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="52" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="55" width="64" height="4" fill="#0b6a72" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="58" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="61" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="64" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="66" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="69" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="72" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="75" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="78" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="80" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="83" width="64" height="4" fill="#0b6a72" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="86" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><rect x="18" y="89" width="64" height="4" fill="#e6ecee" stroke="#8b98a3" stroke-width=".5"/><text x="12" y="104" font-size="9" fill="#57676f">FOUP · 25 slot</text><text x="100" y="40" font-size="10" fill="#0b6a72">진한 칸 = 측정 슬롯</text><text x="100" y="58" font-size="10" fill="#33424c">slot 3 / 13 / 23</text><text x="100" y="76" font-size="10" fill="#57676f">front / center / rear</text></svg>'},
  photo:{k:'Litho (노광)',e:'photolithography',d:'레티클에 새겨진 회로 패턴을 빛으로 웨이퍼 위 감광막(photoresist)에 전사하는 공정입니다. 투영 렌즈가 패턴을 보통 1/4로 축소해 옮기며, 노광량(dose)과 초점(focus)이 선폭을 직접 좌우합니다. 노광 후 현상(develop)을 거치면 레지스트 패턴이 남습니다.',
    s:'<svg viewBox="0 0 200 110"><ellipse cx="46" cy="12" rx="16" ry="5" fill="#a05c00" opacity=".85"/><path d="M32 17 L26 34 M46 17 L46 34 M60 17 L66 34" stroke="#a05c00" stroke-width="1.2"/><rect x="22" y="34" width="48" height="5" fill="none" stroke="#57676f" stroke-width="1.2"/><path d="M28 36h4M40 36h5M56 36h4" stroke="#10161b" stroke-width="2"/><path d="M24 43 L44 60 L68 43" fill="none" stroke="#0b6a72" stroke-width="1.3"/><path d="M40 62 L46 78 M52 62 L46 78" stroke="#a05c00" stroke-width="1.1"/><rect x="26" y="80" width="42" height="8" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><text x="80" y="20" font-size="10" fill="#a05c00">조명계 (dose)</text><text x="80" y="40" font-size="10" fill="#33424c">레티클</text><text x="80" y="58" font-size="10" fill="#0b6a72">투영 렌즈 · 1/4 축소</text><text x="80" y="88" font-size="10" fill="#33424c">웨이퍼 (감광막)</text></svg>'},
  etch:{k:'Etch (식각)',e:'plasma etch',d:'레지스트 패턴을 마스크 삼아 아래층을 플라즈마로 깎아 패턴을 전사하는 공정입니다. 챔버 압력, 가스 조성, RF 파워, ESC 온도가 깎이는 속도와 프로파일을 결정합니다. 챔버 벽 상태가 변하면 라디칼 밀도가 달라져 선폭이 함께 흔들립니다.',
    s:'<svg viewBox="0 0 200 110"><text x="10" y="16" font-size="9" fill="#57676f">before</text><rect x="10" y="22" width="70" height="10" fill="#f4dfd8" stroke="#8a2e68" stroke-width="1.1"/><rect x="10" y="32" width="70" height="16" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><path d="M20 54v10M45 54v10M70 54v10" stroke="#8a2e68" stroke-width="1.6"/><text x="86" y="62" font-size="9" fill="#8a2e68">플라즈마</text><text x="10" y="80" font-size="9" fill="#57676f">after</text><path d="M14 104 L20 86 L44 86 L50 104 Z" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><path d="M56 104 L62 86 L86 86 L92 104 Z" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><text x="104" y="92" font-size="9" fill="#33424c">측벽각(SWA)이 생김</text><text x="104" y="106" font-size="9" fill="#33424c">폭도 함께 변함</text></svg>'},
  cd:{k:'CD (선폭)',e:'Critical Dimension',d:'패턴의 가로 방향 폭입니다. 두께(depth)가 아니라 폭이라는 점이 핵심입니다. 선(line)과 공간(space)이 반복되는 구조에서 pitch = CD + space 로 정의되며, pitch는 설계와 노광 조건이 정하는 고정값이고 CD는 공정 변동에 따라 움직이는 값입니다. 그래서 CD가 커지면 같은 pitch 안에서 space가 그만큼 줄어듭니다. 게이트 폭이 설계보다 수 nm만 좁아져도 문턱전압과 누설전류가 달라집니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="20" y="30" width="24" height="42" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><rect x="76" y="30" width="24" height="42" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><rect x="132" y="30" width="24" height="42" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><path d="M20 24h24" stroke="#bf4630" stroke-width="1.8"/><path d="M20 20v8M44 20v8" stroke="#bf4630" stroke-width="1.4"/><text x="24" y="16" font-size="9" fill="#bf4630">CD</text><path d="M44 82h32" stroke="#2c6da6" stroke-width="1.8"/><path d="M44 78v8M76 78v8" stroke="#2c6da6" stroke-width="1.4"/><text x="48" y="96" font-size="9" fill="#2c6da6">space</text><path d="M20 104h56" stroke="#0b6a72" stroke-width="1.8"/><path d="M20 100v8M76 100v8" stroke="#0b6a72" stroke-width="1.4"/><text x="86" y="107" font-size="9" fill="#0b6a72">pitch = CD + space (고정)</text><text x="108" y="24" font-size="9" fill="#57676f">CD가 커지면</text><text x="108" y="38" font-size="9" fill="#57676f">space가 줄어든다</text></svg>'},
  pitch:{k:'Pitch',e:'pitch',d:'반복 패턴에서 이웃한 선의 중심 간 거리, 즉 CD + space 입니다. 설계 규칙과 노광 해상도가 정하는 값이라 공정 중에는 변하지 않습니다. 그래서 CD 변동은 곧 space 변동이며, CD가 목표를 벗어나면 이웃 패턴과의 간격이 함께 틀어집니다.',
    s:'<svg viewBox="0 0 224 96"><rect x="18" y="26" width="22" height="34" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><rect x="70" y="26" width="22" height="34" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><rect x="122" y="26" width="22" height="34" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><line x1="29" y1="18" x2="29" y2="68" stroke="#0b6a72" stroke-dasharray="3 2"/><line x1="81" y1="18" x2="81" y2="68" stroke="#0b6a72" stroke-dasharray="3 2"/><path d="M29 74h52" stroke="#0b6a72" stroke-width="1.8"/><path d="M29 70v8M81 70v8" stroke="#0b6a72" stroke-width="1.4"/><text x="36" y="88" font-size="9" fill="#0b6a72">pitch (중심 간 거리)</text><text x="150" y="46" font-size="9" fill="#57676f">설계가 정하는</text><text x="150" y="60" font-size="9" fill="#57676f">고정값</text></svg>'},
  adi:{k:'ADI (현상 후 측정)',e:'After Develop Inspection',d:'노광·현상을 마치고 식각 전 레지스트 패턴을 재는 측정입니다. 이 시점에는 레지스트를 벗기고 재노광하는 rework가 가능하고, 측정값이 스캐너 보정(APC)으로 되먹임되므로 actionable 측정으로 분류됩니다. 그래서 현업에서도 매 로트 또는 거의 매 로트 측정합니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="30" width="20" height="26" fill="#f4dfd8" stroke="#8a2e68" stroke-width="1.1"/><rect x="52" y="30" width="20" height="26" fill="#f4dfd8" stroke="#8a2e68" stroke-width="1.1"/><rect x="10" y="56" width="72" height="16" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><text x="10" y="24" font-size="9" fill="#8a2e68">레지스트 패턴 (미식각)</text><text x="10" y="86" font-size="9" fill="#1c6b3a">rework 가능 · APC 피드백</text><path d="M92 50h22" stroke="#57676f" stroke-width="1.3"/><path d="M109 45l7 5-7 5" fill="#57676f"/><text x="122" y="46" font-size="9" fill="#33424c">Etch 단계로</text><text x="122" y="60" font-size="9" fill="#33424c">진행</text></svg>'},
  aci:{k:'AEI (식각 후 측정)',e:'After Etch Inspection',d:'식각을 마친 뒤 재는 측정입니다. 레지스트를 벗겨낸 실제 소자 구조를 재므로 최종 결과에 가깝고, 식각이 유발한 오차까지 잡아냅니다. 다만 그 로트는 되돌릴 수 없습니다. 목적이 rework가 아니라 etch bias 특성화와 검증이어서 skip-lot으로 저빈도 측정합니다. 식각 뒤에 세정이 따라오기 때문에 한국계 팹에서는 ACI(After Clean Inspection)로도 표기하지만, 문헌과 장비사 표준 용어는 AEI입니다. 이 콘솔은 AEI로 통일합니다.',
    s:'<svg viewBox="0 0 200 100"><path d="M14 72 L19 40 L39 40 L44 72 Z" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><path d="M56 72 L61 40 L81 40 L86 72 Z" fill="#e6ecee" stroke="#57676f" stroke-width="1.1"/><text x="10" y="30" font-size="9" fill="#57676f">레지스트 제거 · 소자 구조</text><text x="10" y="88" font-size="9" fill="#a2321f">되돌릴 수 없음 · skip-lot 측정</text><text x="100" y="52" font-size="9" fill="#33424c">최종 결과에 가장 가까움</text></svg>'},
  epe:{k:'EPE',e:'Edge Placement Error',d:'패턴의 가장자리가 있어야 할 위치에서 얼마나 벗어났는지를 나타내는 종합 지표입니다. 오버레이 오차와 CD 변동이 함께 기여합니다. 노드가 미세해질수록 예산이 줄어 조금만 벗어나도 인접 패턴과 닿거나 떨어지는 불량이 됩니다. 이 프로젝트는 EPE 중 CD 성분에 한정했습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="18" y="26" width="56" height="18" fill="#c9d4d9" stroke="#10161b" stroke-width="1.1"/><rect x="34" y="58" width="56" height="18" fill="none" stroke="#2c6da6" stroke-width="1.4" stroke-dasharray="4 2"/><path d="M74 44 L74 58" stroke="#bf4630" stroke-width="2"/><path d="M74 44h16" stroke="#bf4630" stroke-width="2"/><text x="96" y="30" font-size="9" fill="#10161b">위층 패턴</text><text x="96" y="50" font-size="9" fill="#bf4630">EPE = 가장자리 어긋남</text><text x="96" y="70" font-size="9" fill="#2c6da6">아래층 패턴</text><text x="18" y="94" font-size="9" fill="#57676f">EPE = 오버레이 오차 + CD 변동</text></svg>'},
  overlay:{k:'오버레이',e:'overlay',d:'위층 패턴과 아래층 패턴이 얼마나 정확히 겹쳤는지입니다. 수십 층을 쌓아 만들기 때문에 층 간 정렬이 어긋나면 콘택이 배선에 닿지 못합니다. 스크라이브 라인의 전용 target으로 측정하며, 실제 소자와 크기·밀도가 달라 생기는 차이를 device-to-target bias라고 부릅니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="24" y="34" width="44" height="34" fill="none" stroke="#2c6da6" stroke-width="1.4"/><rect x="34" y="42" width="44" height="34" fill="none" stroke="#bf4630" stroke-width="1.4"/><path d="M46 51h10M51 46v10" stroke="#2c6da6"/><path d="M56 59h10M61 54v10" stroke="#bf4630"/><path d="M51 51 L61 59" stroke="#10161b" stroke-width="1.6"/><text x="92" y="42" font-size="9" fill="#2c6da6">아래층 target</text><text x="92" y="58" font-size="9" fill="#bf4630">위층 target</text><text x="92" y="74" font-size="9" fill="#10161b">둘의 차이 = overlay</text></svg>'},
  reticle:{k:'레티클',e:'reticle / photomask',d:'회로 패턴이 크롬 등으로 새겨진 석영 원판입니다. 투영 렌즈가 보통 1/4로 축소해 웨이퍼에 전사하므로 레티클 위 패턴은 웨이퍼보다 4배 큽니다. 레티클 자체에 CD 오차가 있으면 모든 웨이퍼의 같은 field 내 위치에서 동일한 오차가 반복되며, 이 반복성이 레티클 원인의 지문입니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="20" width="62" height="46" fill="#f2f5f6" stroke="#57676f" stroke-width="1.2"/><path d="M24 32h12M42 32h12M24 44h12M42 44h8M24 56h20" stroke="#10161b" stroke-width="2.4"/><text x="14" y="80" font-size="9" fill="#57676f">레티클 (4배 크기)</text><path d="M84 44h20" stroke="#0b6a72" stroke-width="1.3"/><path d="M99 39l7 5-7 5" fill="#0b6a72"/><text x="86" y="34" font-size="9" fill="#0b6a72">1/4 축소</text><rect x="112" y="32" width="30" height="22" fill="#f2f5f6" stroke="#57676f" stroke-width="1.2"/><path d="M117 38h6M126 38h6M117 46h6M126 46h4" stroke="#10161b" stroke-width="1.4"/><text x="112" y="70" font-size="9" fill="#57676f">웨이퍼 field</text></svg>'},
  field:{k:'Field (노광 영역)',e:'exposure field',d:'한 번의 노광으로 패턴이 전사되는 사각 영역입니다. 웨이퍼 전면을 한 번에 찍을 수 없어 스텝-앤-스캔 방식으로 이 영역을 격자처럼 옮겨가며 반복 노광합니다. 이 프로젝트의 field 크기는 26 × 33 mm이고, 웨이퍼 한 장에서 반경 방향으로 펼친 9개 field를 골라 측정합니다.',
    s:'<svg viewBox="0 0 230 110"><circle cx="50" cy="55" r="42" fill="#f7f9f9" stroke="#c8d2d8"/><rect x="13" y="30" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="13" y="47" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="13" y="64" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="28" y="13" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="28" y="30" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="28" y="47" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="28" y="64" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="28" y="81" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="43" y="13" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="43" y="30" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="43" y="47" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="43" y="64" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="43" y="81" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="58" y="13" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="58" y="30" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="58" y="47" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="58" y="64" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="58" y="81" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="73" y="30" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><rect x="73" y="47" width="14" height="16" fill="#cfe3e4" stroke="#8b98a3" stroke-width=".6"/><rect x="73" y="64" width="14" height="16" fill="none" stroke="#8b98a3" stroke-width=".6"/><path d="M46 97h8l-4-7z" fill="#c8d2d8"/><text x="100" y="26" font-size="9" fill="#33424c">한 칸 = 1회 노광 (26×33 mm)</text><text x="100" y="42" font-size="9" fill="#0b6a72">진한 칸 = 측정 field 9개</text><text x="100" y="58" font-size="9" fill="#57676f">center–mid–edge가</text><text x="100" y="72" font-size="9" fill="#57676f">모두 표본에 들어오도록 배치</text></svg>'},
  chamber:{k:'Etch 챔버',e:'etch chamber',d:'플라즈마 식각이 일어나는 진공 반응기입니다. RF 파워로 가스를 이온화해 라디칼을 만들고, 웨이퍼는 정전척(ESC) 위에 고정되어 온도가 제어됩니다. 챔버 벽에 반응 부산물이 쌓이면 라디칼 밀도가 달라져 식각 속도와 선폭이 함께 흔들립니다. 이 프로젝트에는 4개(CH-A~D)가 있고 로트마다 번갈아 배정됩니다.',
    s:'<svg viewBox="0 0 216 110"><rect x="16" y="18" width="78" height="72" rx="3" fill="#fbfcfc" stroke="#57676f" stroke-width="1.3"/><path d="M24 26h62" stroke="#8a2e68" stroke-width="2"/><g fill="#8a2e68" opacity=".55"><circle cx="34" cy="42" r="2.2"/><circle cx="52" cy="38" r="2.2"/><circle cx="70" cy="44" r="2.2"/><circle cx="44" cy="52" r="2.2"/><circle cx="64" cy="54" r="2.2"/></g><rect x="30" y="64" width="50" height="5" fill="#c9d4d9" stroke="#57676f" stroke-width=".9"/><rect x="34" y="69" width="42" height="8" fill="#e6ecee" stroke="#57676f" stroke-width=".9"/><text x="102" y="30" font-size="9" fill="#8a2e68">RF · 가스 주입</text><text x="102" y="48" font-size="9" fill="#8a2e68">플라즈마 (라디칼)</text><text x="102" y="70" font-size="9" fill="#33424c">웨이퍼 / ESC (온도 제어)</text><text x="102" y="86" font-size="9" fill="#57676f">벽면 상태가 CD에 영향</text></svg>'},
  golden:{k:'모니터 웨이퍼',e:'monitor wafer',d:'계측 장비의 안정성(stability)과 장비 간 정합(tool-to-tool matching)을 점검하려고 두는 전용 웨이퍼입니다. 이미 패턴이 형성되어 있고 공정 라인에는 다시 투입하지 않으며, 고정된 recipe로 같은 위치를 반복 측정합니다. 공정 변화가 개입하지 않으므로 값이 이동하면 그 이동분은 장비 기여로 귀속됩니다. 실제 fab에서도 CD-SEM 여러 대의 절대 선폭과 상호 정합을 이 방식으로 감시하며, 점검 주기는 일 단위인 경우도 흔합니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="36" cy="42" r="26" fill="#f2f5f6" stroke="#0b6a72" stroke-width="1.3"/><path d="M24 34h24M24 42h24M24 50h24" stroke="#0b6a72" stroke-width="2"/><text x="10" y="80" font-size="9" fill="#57676f">패턴 고정 · 라인 미투입</text><line x1="106" y1="60" x2="188" y2="60" stroke="#c8d2d8"/><g fill="#0b6a72"><circle cx="110" cy="60" r="2.6"/><circle cx="121" cy="60" r="2.6"/><circle cx="132" cy="60" r="2.6"/><circle cx="143" cy="60" r="2.6"/><circle cx="154" cy="60" r="2.6"/><circle cx="165" cy="62" r="2.6"/><circle cx="176" cy="64" r="2.6"/><circle cx="187" cy="66" r="2.6"/></g><text x="106" y="30" font-size="9" fill="#33424c">동일 recipe 반복 측정</text><text x="106" y="88" font-size="9" fill="#0b6a72">값이 이동하면 장비 drift</text></svg>'},
  cdsem:{k:'CD-SEM',e:'Critical Dimension SEM',d:'전자빔으로 패턴을 위에서 내려다보며 선폭을 재는 장비입니다. 서브나노미터급 정밀도를 내기 때문에 업계에서 the ruler of the fab이라고 불립니다. 2차 전자 신호의 세기 파형에서 패턴 가장자리를 찾아 두 edge 사이 거리를 CD로 산출합니다. 비파괴이지만 point 측정이라 웨이퍼당 측정 점수가 제한되며, 모던 장비 기준 대략 13~36점 수준입니다.',
    s:'<svg viewBox="0 0 200 110"><path d="M28 10v14" stroke="#0b6a72" stroke-width="2.2"/><path d="M18 24h20l-10 20z" fill="none" stroke="#0b6a72" stroke-width="1.3"/><rect x="10" y="52" width="38" height="9" fill="#e6ecee" stroke="#57676f" stroke-width="1"/><text x="10" y="76" font-size="9" fill="#33424c">전자빔 · top-down</text><polyline points="66,74 78,74 84,44 92,44 98,74 118,74 124,44 132,44 138,74 152,74" fill="none" stroke="#10161b" stroke-width="1.4"/><path d="M84 84h14" stroke="#bf4630" stroke-width="1.8"/><path d="M84 80v8M98 80v8" stroke="#bf4630" stroke-width="1.2"/><text x="80" y="98" font-size="9" fill="#bf4630">edge 사이 = CD</text><text x="66" y="32" font-size="9" fill="#57676f">2차 전자 신호 파형</text></svg>'},
  xsem:{k:'단면 측정',e:'X-SEM / cross-section',d:'웨이퍼를 절단해 단면을 관찰하는 측정입니다. 프로파일의 아래폭(BCD)·중간폭(MCD)·위폭(TCD)과 측벽각을 모두 볼 수 있어 절대 기준으로 쓰입니다. 파괴 측정이라 극소 표본으로만 수행하며, 이 프로젝트에서는 주 3회 5점입니다. BCD 90 nm가 이 프로젝트의 최종 목표값입니다.',
    s:'<svg viewBox="0 0 200 110"><path d="M22 84 L34 26 L66 26 L78 84 Z" fill="#eef2f3" stroke="#57676f" stroke-width="1.2"/><path d="M34 22h32" stroke="#2c6da6" stroke-width="2"/><path d="M28 55h44" stroke="#8a2e68" stroke-width="2"/><path d="M22 90h56" stroke="#bf4630" stroke-width="2"/><text x="86" y="26" font-size="9" fill="#2c6da6">TCD (위폭)</text><text x="86" y="59" font-size="9" fill="#8a2e68">MCD (중간폭)</text><text x="86" y="94" font-size="9" fill="#bf4630">BCD (아래폭) · 목표 90 nm</text></svg>'},
  dose:{k:'Dose (노광량)',e:'exposure dose',d:'감광막에 전달되는 빛의 총량입니다. Positive tone 레지스트에서는 dose가 커질수록 선이 가늘어집니다. 웨이퍼 전면에 동일하게 걸리는 성분이므로, 웨이퍼 평균 CD가 통째로 이동하면 dose 계열을 먼저 의심합니다. dose 1% 변화가 CD 몇 nm에 해당하는지를 dose sensitivity라고 부르고, 이 값으로 보정량을 계산합니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="30" y1="20" x2="30" y2="86" stroke="#c8d2d8"/><line x1="30" y1="86" x2="176" y2="86" stroke="#c8d2d8"/><polyline points="40,30 70,42 100,54 130,66 164,78" fill="none" stroke="#a05c00" stroke-width="2"/><text x="6" y="30" font-size="9" fill="#57676f">CD</text><text x="140" y="102" font-size="9" fill="#57676f">dose</text><text x="86" y="34" font-size="9" fill="#a05c00">dose ↑ → CD ↓</text><text x="52" y="70" font-size="9" fill="#33424c">기울기 = dose sensitivity</text></svg>'},
  peb:{k:'PEB (노광 후 열처리)',e:'Post Exposure Bake',d:'노광 후 웨이퍼를 가열판에서 굽는 단계입니다. 화학증폭형 레지스트에서는 이때 산 촉매 반응이 진행되어 잠상이 완성되므로, 판의 온도가 몇 십분의 1도만 달라져도 선폭이 바뀝니다. 가열판의 온도 분포는 중심-엣지 형태를 띠기 때문에 웨이퍼 반경 방향 지문으로 나타납니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="48" cy="50" r="34" fill="#f7e9dd" stroke="#a05c00" stroke-width="1.2"/><circle cx="48" cy="50" r="22" fill="#f2ddc9" stroke="#c99a5e" stroke-width=".9"/><circle cx="48" cy="50" r="10" fill="#eccfae" stroke="#c99a5e" stroke-width=".9"/><text x="34" y="96" font-size="9" fill="#a05c00">가열판 온도 분포</text><text x="94" y="38" font-size="9" fill="#33424c">중심과 엣지의</text><text x="94" y="54" font-size="9" fill="#33424c">온도 차이가</text><text x="94" y="70" font-size="9" fill="#a05c00">반경 방향 CD 지문으로</text></svg>'},
  delta:{k:'Etch bias (ΔCD)',e:'etch bias',d:'AEI CD에서 ADI CD를 뺀 값으로, 식각을 거치며 선폭이 가로 방향으로 얼마나 변했는지를 뜻합니다. 깎인 깊이(etch depth)와는 다른 값입니다. 음수면 식각이 선을 좁힌 것이고, 이 프로젝트의 기준값은 −20 nm입니다. ADI가 정상인데 이 값만 흐르면 원인 후보는 Etch 또는 Metrology로 좁혀집니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="30" width="34" height="40" fill="#f4dfd8" stroke="#8a2e68" stroke-width="1.2"/><text x="16" y="24" font-size="9" fill="#8a2e68">ADI CD</text><path d="M64 50h20" stroke="#57676f" stroke-width="1.3"/><path d="M79 45l7 5-7 5" fill="#57676f"/><rect x="96" y="30" width="22" height="40" fill="#e6ecee" stroke="#57676f" stroke-width="1.2"/><text x="94" y="24" font-size="9" fill="#57676f">AEI CD</text><path d="M96 80h22" stroke="#bf4630" stroke-width="1.6"/><path d="M118 80h12" stroke="#bf4630" stroke-width="1.6" stroke-dasharray="3 2"/><text x="100" y="96" font-size="9" fill="#bf4630">가로 폭이 좁아진 양</text><text x="136" y="46" font-size="9" fill="#33424c">깊이 변화가</text><text x="136" y="60" font-size="9" fill="#33424c">아님</text></svg>'},
  pm:{k:'PM · 챔버 시즈닝',e:'Preventive Maintenance / seasoning',d:'설비를 정기적으로 열어 세정하고 부품을 교체하는 작업입니다. 세정 직후에는 챔버 벽면 상태가 리셋되어 식각 특성이 크게 달라지고(first wafer effect), 이후 반응 부산물이 벽에 쌓이면서 라디칼 밀도가 서서히 변해 etch bias가 완만하게 흐릅니다. 이 현상을 chamber seasoning이라 부르며, 실제 fab에서 CD 드리프트의 대표적 원인 중 하나입니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="24" y1="86" x2="182" y2="86" stroke="#c8d2d8"/><line x1="24" y1="18" x2="24" y2="86" stroke="#c8d2d8"/><polyline points="30,32 36,58 48,64 66,68 88,72 110,76" fill="none" stroke="#8a2e68" stroke-width="1.8"/><polyline points="120,30 126,56 138,62 156,66 176,72" fill="none" stroke="#8a2e68" stroke-width="1.8"/><line x1="115" y1="18" x2="115" y2="86" stroke="#0b6a72" stroke-dasharray="3 2"/><text x="98" y="14" font-size="9" fill="#0b6a72">PM</text><text x="30" y="24" font-size="9" fill="#8a2e68">세정 직후 급변</text><text x="52" y="102" font-size="9" fill="#57676f">PM 후 경과 시간 (RF hours)</text><text x="2" y="52" font-size="9" fill="#57676f">bias</text></svg>'},
  limit:{k:'관리 한계',e:'control limit',d:'정상 변동으로 인정하는 범위입니다. 이 프로젝트에서는 이상 주입 이전 기준선 10일 데이터의 평균 ± 3σ로 엔진이 스스로 계산하며, 사람이 임의로 정하지 않습니다. SPC 관례상 관리 한계를 안정적으로 추정하려면 20~25개 이상의 표본군이 필요해 기준선 구간을 그만큼 확보했습니다.',
    s:'<svg viewBox="0 0 200 112"><line x1="18" y1="50" x2="186" y2="50" stroke="#8ea0aa" stroke-dasharray="4 3"/><rect x="18" y="30" width="168" height="40" fill="#eef1f3"/><line x1="18" y1="30" x2="186" y2="30" stroke="#9aa9b2" stroke-dasharray="2 3"/><line x1="18" y1="70" x2="186" y2="70" stroke="#9aa9b2" stroke-dasharray="2 3"/><g fill="#4e5f6a"><circle cx="26" cy="52" r="2.4"/><circle cx="37" cy="48" r="2.4"/><circle cx="48" cy="53" r="2.4"/><circle cx="59" cy="47" r="2.4"/><circle cx="70" cy="51" r="2.4"/><circle cx="81" cy="49" r="2.4"/><circle cx="92" cy="54" r="2.4"/><circle cx="103" cy="46" r="2.4"/><circle cx="114" cy="50" r="2.4"/><circle cx="125" cy="52" r="2.4"/><circle cx="136" cy="48" r="2.4"/><circle cx="147" cy="51" r="2.4"/><circle cx="158" cy="47" r="2.4"/><circle cx="169" cy="53" r="2.4"/><circle cx="180" cy="49" r="2.4"/></g><circle cx="170" cy="22" r="4" fill="#bf4630"/><text x="22" y="26" font-size="9" fill="#57676f">평균 + 3σ</text><text x="22" y="84" font-size="9" fill="#57676f">평균 − 3σ</text><text x="126" y="16" font-size="9" fill="#bf4630">한계 이탈</text></svg>'},
  rework:{k:'Rework (재작업)',e:'rework',d:'레지스트를 벗겨내고 노광부터 다시 하는 것입니다. 식각 전 ADI 시점에만 가능하며, 식각이 끝나면 구조가 확정되어 되돌릴 수 없습니다. 그래서 원인 판정이 빠를수록 살릴 수 있는 웨이퍼가 늘어납니다. 이 프로젝트가 ADI 계열 판정을 먼저 수행하는 이유입니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="34" width="42" height="24" fill="none" stroke="#a05c00" stroke-width="1.2"/><text x="35" y="50" text-anchor="middle" font-size="9" fill="#a05c00">노광</text><path d="M60 46h20" stroke="#57676f"/><path d="M75 41l7 5-7 5" fill="#57676f"/><rect x="84" y="34" width="42" height="24" fill="none" stroke="#0b6a72" stroke-width="1.2"/><text x="105" y="50" text-anchor="middle" font-size="9" fill="#0b6a72">ADI</text><path d="M130 46h20" stroke="#57676f"/><path d="M145 41l7 5-7 5" fill="#57676f"/><rect x="154" y="34" width="36" height="24" fill="none" stroke="#8a2e68" stroke-width="1.2"/><text x="172" y="50" text-anchor="middle" font-size="9" fill="#8a2e68">Etch</text><path d="M105 62 L105 78 L35 78 L35 62" fill="none" stroke="#1c6b3a" stroke-width="1.4"/><path d="M30 67l5-7 5 7" fill="#1c6b3a"/><text x="60" y="92" font-size="9" fill="#1c6b3a">rework (ADI에서만 가능)</text></svg>'},
  metro:{k:'Metrology (계측)',e:'metrology',d:'형성된 구조의 치수를 재는 일과 그 장비를 통칭합니다. 이 프로젝트에는 CD-SEM 2대(CDSEM-A, CDSEM-B)가 있고 로트마다 둘 중 하나가 측정을 맡습니다. 어느 장비가 쟀는지를 데이터에 기록해 두는 것이 계측 원인 판정의 열쇠입니다. 이 컬럼이 없으면 어떤 알고리즘을 써도 장비 drift를 공정 이상과 구분할 수 없습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="24" width="42" height="30" rx="2" fill="none" stroke="#8b98a3" stroke-width="1.3"/><text x="37" y="43" text-anchor="middle" font-size="9" fill="#57676f">CDSEM-A</text><rect x="16" y="60" width="42" height="30" rx="2" fill="none" stroke="#0b6a72" stroke-width="1.6"/><text x="37" y="79" text-anchor="middle" font-size="9" fill="#0b6a72">CDSEM-B</text><path d="M64 39h26M64 75h26" stroke="#57676f"/><text x="96" y="42" font-size="9" fill="#33424c">같은 구조를 재도</text><text x="96" y="58" font-size="9" fill="#33424c">장비마다 offset이 다르다</text><text x="96" y="78" font-size="9" fill="#0b6a72">→ 측정 장비 ID 기록 필수</text></svg>'},
  skiplot:{k:'Skip-lot 샘플링',e:'skip-lot sampling',d:'모든 로트를 측정하지 않고 일정 비율만 골라 재는 방식입니다. 계측은 장비 투자비와 사이클 타임을 동시에 소모하므로, 공정 능력지수(Cp/Cpk)가 좋을수록 skip 비율을 높입니다. 이 프로젝트는 ADI를 전 로트, AEI를 절반 로트에서 측정합니다.',
    s:'<svg viewBox="0 0 200 90"><rect x="14" y="30" width="14" height="18" fill="#0b6a72" stroke="#57676f" stroke-width=".8"/><rect x="31" y="30" width="14" height="18" fill="#ffffff" stroke="#57676f" stroke-width=".8"/><rect x="48" y="30" width="14" height="18" fill="#0b6a72" stroke="#57676f" stroke-width=".8"/><rect x="65" y="30" width="14" height="18" fill="#ffffff" stroke="#57676f" stroke-width=".8"/><rect x="82" y="30" width="14" height="18" fill="#0b6a72" stroke="#57676f" stroke-width=".8"/><rect x="99" y="30" width="14" height="18" fill="#ffffff" stroke="#57676f" stroke-width=".8"/><rect x="116" y="30" width="14" height="18" fill="#0b6a72" stroke="#57676f" stroke-width=".8"/><rect x="133" y="30" width="14" height="18" fill="#ffffff" stroke="#57676f" stroke-width=".8"/><rect x="150" y="30" width="14" height="18" fill="#0b6a72" stroke="#57676f" stroke-width=".8"/><rect x="167" y="30" width="14" height="18" fill="#ffffff" stroke="#57676f" stroke-width=".8"/><text x="14" y="72" font-size="9" fill="#0b6a72">■ 측정</text><text x="62" y="72" font-size="9" fill="#8b98a3">□ skip</text><text x="120" y="72" font-size="9" fill="#57676f">skip 비율은</text><text x="120" y="86" font-size="9" fill="#57676f">Cp/Cpk로 결정</text></svg>'},
  apc:{k:'APC · R2R 제어',e:'Advanced Process Control, run-to-run',d:'앞 로트의 계측 결과로 다음 로트의 공정 조건을 자동 보정하는 제어 방식입니다. ADI에서 잰 CD와 오버레이가 스캐너 보정값으로 되먹임되는 것이 대표적입니다. 그래서 ADI는 actionable 측정, AEI는 검증 측정으로 구분합니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="30" width="44" height="26" fill="none" stroke="#a05c00" stroke-width="1.2"/><text x="38" y="47" text-anchor="middle" font-size="9" fill="#a05c00">스캐너</text><path d="M64 43h24" stroke="#57676f"/><path d="M83 38l7 5-7 5" fill="#57676f"/><rect x="92" y="30" width="44" height="26" fill="none" stroke="#0b6a72" stroke-width="1.2"/><text x="114" y="47" text-anchor="middle" font-size="9" fill="#0b6a72">ADI 계측</text><path d="M114 60 L114 78 L38 78 L38 60" fill="none" stroke="#1c6b3a" stroke-width="1.4"/><path d="M33 65l5-7 5 7" fill="#1c6b3a"/><text x="46" y="92" font-size="9" fill="#1c6b3a">보정값 되먹임 (run-to-run)</text></svg>'},
  tmu:{k:'TMU (총 측정 불확도)',e:'Total Measurement Uncertainty',d:'계측 장비가 만들어내는 오차의 총량을 나타내는 업계 표준 KPI입니다. 오버레이에서는 TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match를 제곱합 제곱근으로 합쳐 정의합니다. 이 프로젝트는 CD를 다루므로 TIS 항(0도/180도 회전으로 정의되는 오버레이 전용 항)은 제외하고 precision과 match 두 항만 씁니다. 측정 불확도는 공정 허용 예산의 20% 이내여야 한다는 것이 통상 기준입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="70" width="34" height="24" fill="#c9d4d9" stroke="#57676f" stroke-width="1"/><text x="18" y="106" font-size="9" fill="#57676f">precision</text><rect x="62" y="46" width="34" height="48" fill="#c9d4d9" stroke="#57676f" stroke-width="1"/><text x="62" y="106" font-size="9" fill="#57676f">match</text><text x="102" y="72" font-size="13" fill="#33424c">=</text><rect x="120" y="34" width="34" height="60" fill="#e3f0f1" stroke="#0b6a72" stroke-width="1.6"/><text x="122" y="106" font-size="9" fill="#0b6a72">TMU</text><text x="118" y="26" font-size="9" fill="#0b6a72">RSS 합성</text><line x1="164" y1="34" x2="186" y2="34" stroke="#bf4630" stroke-dasharray="3 2"/><text x="160" y="28" font-size="8" fill="#bf4630">예산 20%</text></svg>'},
  precision:{k:'Dynamic precision',e:'dynamic precision',d:'같은 지점을 같은 조건으로 여러 번 반복 측정했을 때 값이 얼마나 흩어지는지입니다. 보통 3σ로 표기하며, 장비 자체의 재현성을 뜻합니다. 이 프로젝트에서는 모니터 웨이퍼의 각 site를 5회씩 반복 측정해 산출합니다. 참값은 변하지 않으므로 흩어짐은 전부 장비 기여입니다.',
    s:'<svg viewBox="0 0 200 90"><line x1="26" y1="45" x2="176" y2="45" stroke="#c8d2d8"/><g fill="#0b6a72"><circle cx="86" cy="45" r="3"/><circle cx="94" cy="45" r="3"/><circle cx="78" cy="45" r="3"/><circle cx="99" cy="45" r="3"/><circle cx="83" cy="45" r="3"/></g><path d="M74 60h30" stroke="#bf4630" stroke-width="1.6"/><path d="M74 56v8M104 56v8" stroke="#bf4630" stroke-width="1.2"/><text x="66" y="78" font-size="9" fill="#bf4630">반복 측정의 3σ</text><text x="30" y="30" font-size="9" fill="#57676f">같은 site · 같은 recipe · 5회</text></svg>'},
  match:{k:'Tool-to-tool match',e:'tool matching',d:'같은 구조를 서로 다른 장비로 쟀을 때 값이 얼마나 다른지입니다. 로트마다 어느 장비가 측정을 맡을지 달라지므로, 장비 간 차이가 크면 공정이 변한 것인지 장비가 바뀐 것인지 구분할 수 없게 됩니다. 이 프로젝트는 두 장비가 모니터 웨이퍼의 같은 site를 잰 평균의 차이로 산출합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="26" y1="40" x2="176" y2="40" stroke="#e2e9ec"/><line x1="26" y1="66" x2="176" y2="66" stroke="#e2e9ec"/><g fill="#8b98a3"><circle cx="70" cy="40" r="3.4"/><circle cx="96" cy="40" r="3.4"/><circle cx="122" cy="40" r="3.4"/></g><g fill="#0b6a72"><circle cx="82" cy="66" r="3.4"/><circle cx="108" cy="66" r="3.4"/><circle cx="134" cy="66" r="3.4"/></g><text x="26" y="34" font-size="9" fill="#8b98a3">CDSEM-A</text><text x="26" y="82" font-size="9" fill="#0b6a72">CDSEM-B</text><path d="M150 40 L150 66" stroke="#bf4630" stroke-width="1.8"/><text x="154" y="56" font-size="9" fill="#bf4630">match</text></svg>'},
  tolerance:{k:'공정 허용 예산',e:'process tolerance',d:'CD가 벗어나도 되는 폭입니다. 이 프로젝트에서는 웨이퍼 내 CDU 3σ 4.2 nm에서 공정 능력지수 Cp가 약 1.43이 되도록 ±6.0 nm로 설정했습니다. 계측 불확도는 이 예산의 20% 이내, 즉 1.2 nm 이내여야 한다는 것이 통상 기준입니다.'},
  setting:{k:'Setting값',e:'Recipe Input / setpoint',d:'Recipe에 적혀 있어 장비에 지시되는 값입니다. 노광량 Setting 32.0 mJ/cm2는 이만큼 조사하라는 지시일 뿐, 실제로 그만큼 조사되었는지를 보장하지 않습니다. Setting은 변경 이력이 남으므로, 이슈 시점과 Setting 변경 시점이 어긋나면 그 항목은 원인 후보에서 배제할 수 있습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="26" width="80" height="44" fill="#fbfcfc" stroke="#57676f" stroke-width="1.2"/><text x="22" y="44" font-size="10" fill="#33424c">Recipe</text><text x="22" y="61" font-size="11" fill="#10161b" font-family="IBM Plex Mono">dose = 32.0</text><text x="14" y="86" font-size="9" fill="#57676f">장비에 내리는 지시값</text><text x="106" y="42" font-size="9" fill="#a2321f">지시했다는 뜻일 뿐</text><text x="106" y="58" font-size="9" fill="#a2321f">그대로 조사됐다는</text><text x="106" y="74" font-size="9" fill="#a2321f">보장은 아니다</text></svg>'},
  sensor:{k:'Energy Sensor 실측값',e:'energy sensor readback',d:'스캐너 내부 에너지 센서가 실제로 조사된 광량을 적산해 읽은 값입니다. CD가 반응하는 것은 Setting이 아니라 이 실효 dose입니다. Setting은 그대로인데 이 값만 이동했다면 광원 교체 후 Dose Mapper Calibration 누락, 센서 열화·오염, 조명계 투과율 변화를 의심합니다. 이 경우 Recipe를 고쳐도 실효 dose는 그대로여서 재발합니다.',
    s:'<svg viewBox="0 0 220 110"><line x1="26" y1="86" x2="182" y2="86" stroke="#c8d2d8"/><line x1="26" y1="20" x2="26" y2="86" stroke="#c8d2d8"/><line x1="26" y1="58" x2="182" y2="58" stroke="#8b98a3" stroke-dasharray="5 3"/><text x="32" y="54" font-size="9" fill="#57676f">Setting 32.0 (고정)</text><polyline points="34,60 62,58 90,59 112,50 134,40 160,34" fill="none" stroke="#a05c00" stroke-width="2"/><text x="106" y="28" font-size="9" fill="#a05c00">Sensor 실측</text><path d="M160 34 L160 58" stroke="#bf4630" stroke-width="1.6"/><text x="104" y="76" font-size="9" fill="#bf4630">이 괴리가 실효 dose 오차</text><text x="46" y="104" font-size="9" fill="#57676f">시간</text></svg>'},
  dosemapper:{k:'Dose Mapper Calibration',e:'dose sensor calibration',d:'에너지 센서가 읽는 값과 웨이퍼 면에 실제 도달하는 광량 사이의 변환 관계를 다시 맞추는 작업입니다. 광원(Laser Source)을 교체하면 파장 대역폭(E95)과 pulse energy 특성이 달라지므로 같은 Setting에서도 실효 dose가 달라질 수 있습니다. 그래서 Source 교체는 Calibration 재수행을 필수 절차로 Change Control Checklist에 넣습니다.'},
  changepoint:{k:'변경점 · 정비 이력',e:'change point / maintenance log',d:'설비에 가해진 모든 변경의 기록입니다. 부품 교체, PM, Recipe 변경, Calibration 수행 이력이 시점과 함께 남습니다. 이상 분석의 출발점은 항상 이상이 시작된 시점과 일치하는 변경점이 있는가이며, 시점이 어긋나면 그 항목은 원인 후보에서 배제합니다.'},
  ocap:{k:'SPC 관리도 · OCAP',e:'Statistical Process Control / Out of Control Action Plan',d:'지표를 관리 한계와 함께 시계열로 관리하고(SPC 관리도), 한계를 벗어났을 때 누가 무엇을 하는지 사전에 정해두는 절차(OCAP)입니다. Setting값만 감시하면 Setting과 실측의 괴리를 놓치므로, Sensor 실측값 자체에 관리도를 거는 것이 재발 방지의 핵심입니다.'},
  gate_ok:{k:'검증 완료',e:'Verified',d:'이 판정이 요구하는 규칙 기반 검증 항목을 코드가 다시 확인했고 모두 통과했습니다. 게이트는 LLM이 아니라 결정론적 코드가 실행합니다.'},
  gate_hold:{k:'근거 부족',e:'Needs evidence',d:'요구 조건 중 하나 이상을 충족하지 못해 원인을 지목하지 않고 보류했습니다. 판정 실패가 아니라 근거 부족을 그대로 보고한 것입니다.'},
  tmu:{k:'TMU (계측 불확도)',e:'Total Measurement Uncertainty',d:'계측 장비가 만들어내는 오차의 총량을 나타내는 업계 표준 지표입니다. 오버레이에서는 TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match 네 항의 제곱합 제곱근으로 정의합니다. 이 값이 공정 허용 예산의 20%를 넘으면 측정값으로 공정을 판단하기 어려워집니다. 공정이 정상인지 아닌지가 측정 오차에 묻혀버리기 때문입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="30" width="150" height="30" fill="#f2f5f6" stroke="#c8d2d8"/><rect x="18" y="30" width="30" height="30" fill="#cfe3e4" stroke="#0b6a72"/><text x="20" y="24" font-size="9" fill="#0b6a72">계측 몫 (TMU)</text><text x="80" y="50" font-size="9" fill="#57676f">공정에 남는 몫</text><path d="M18 70h150" stroke="#33424c" stroke-width="1.4"/><path d="M18 66v8M168 66v8" stroke="#33424c" stroke-width="1.2"/><text x="52" y="86" font-size="9" fill="#33424c">공정 허용 예산 T</text><text x="18" y="104" font-size="9" fill="#0b6a72">계측 몫은 20% 이내여야 한다</text></svg>'},
  precision:{k:'Dynamic precision',e:'dynamic precision',d:'같은 위치를 여러 번 반복 측정했을 때 값이 얼마나 흩어지는지입니다. 보통 3σ로 표기합니다. 웨이퍼를 내렸다 다시 올리지 않고 연속 측정하므로 순수하게 장비의 반복성만 봅니다. 이 프로젝트는 모니터 웨이퍼의 각 site를 3회씩 반복 측정해 산출합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="24" y1="50" x2="176" y2="50" stroke="#c8d2d8"/><g fill="#0b6a72"><circle cx="70" cy="46" r="3"/><circle cx="78" cy="52" r="3"/><circle cx="86" cy="48" r="3"/><circle cx="94" cy="54" r="3"/><circle cx="102" cy="47" r="3"/></g><path d="M68 68h38" stroke="#bf4630" stroke-width="1.6"/><path d="M68 64v8M106 64v8" stroke="#bf4630" stroke-width="1.2"/><text x="66" y="84" font-size="9" fill="#bf4630">이 흩어짐이 precision</text><text x="24" y="30" font-size="9" fill="#57676f">같은 자리를 3회 반복 측정</text></svg>'},
  match:{k:'Tool-to-tool match',e:'tool-to-tool matching',d:'같은 구조를 서로 다른 장비로 쟀을 때 값이 얼마나 다른지입니다. 로트마다 측정 장비가 바뀌므로, 장비 간 차이가 크면 공정이 변한 것처럼 보입니다. 그래서 fab에서는 여러 대의 CD-SEM을 하나의 fleet으로 묶어 상시 정합을 관리합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="26" y1="70" x2="176" y2="70" stroke="#c8d2d8"/><circle cx="78" cy="44" r="4" fill="#8b98a3"/><circle cx="112" cy="44" r="4" fill="#0b6a72"/><path d="M78 54h34" stroke="#bf4630" stroke-width="1.6"/><path d="M78 50v8M112 50v8" stroke="#bf4630" stroke-width="1.2"/><text x="52" y="36" font-size="9" fill="#8b98a3">CDSEM-A</text><text x="118" y="36" font-size="9" fill="#0b6a72">CDSEM-B</text><text x="66" y="88" font-size="9" fill="#bf4630">같은 자리, 다른 값 = match 오차</text></svg>'},
  tis:{k:'TIS',e:'Tool Induced Shift',d:'측정 대상을 0°와 180°로 회전시켜 두 번 잰 값의 차이로 정의되는 장비 고유의 비대칭 오차입니다. 오버레이 계측에서 정확도를 평가하는 표준 항목이며, 광학계의 비대칭에서 비롯됩니다. 회전 측정으로 정의되는 항이라 top-down CD 측정에는 그대로 적용되지 않아, 이 프로젝트의 TMU 계산에서는 제외했습니다.'},
  cdu:{k:'CDU',e:'CD Uniformity',d:'웨이퍼 안에서 선폭이 얼마나 고른지를 나타내는 지표로 보통 3σ로 표기합니다. 평균이 목표에 맞아도 CDU가 나쁘면 웨이퍼 일부는 스펙을 벗어납니다. 이 데이터의 웨이퍼 내 CDU는 3σ 기준 약 4.2 nm입니다.',
    s:'<svg viewBox="0 0 200 112"><g fill="#c9d4d9" stroke="#57676f" stroke-width=".8"><rect x="62" y="74" width="9" height="8"/><rect x="72" y="62" width="9" height="20"/><rect x="82" y="44" width="9" height="38"/><rect x="92" y="27" width="9" height="55"/><rect x="102" y="20" width="9" height="62"/><rect x="112" y="27" width="9" height="55"/><rect x="122" y="44" width="9" height="38"/><rect x="132" y="62" width="9" height="20"/><rect x="142" y="74" width="9" height="8"/></g><line x1="100" y1="18" x2="100" y2="82" stroke="#0b6a72" stroke-dasharray="3 2"/><path d="M62 88h76" stroke="#bf4630" stroke-width="1.6"/><path d="M62 84v8M138 84v8" stroke="#bf4630" stroke-width="1.2"/><text x="82" y="100" font-size="9" fill="#bf4630">3σ</text><text x="146" y="34" font-size="9" fill="#0b6a72">평균</text></svg>'}
}
/* 영어 정의 — 한국어 정의와 같은 내용을 현업 표기로 축약 */
const TERM_EN = {
  excursion:'A process indicator outside its control limits, beyond what normal variation explains. Fabs may hold lots on the affected tool until a cause is found and acted on.',
  attribution:'Deciding which module an excursion came from and what to act on. In a fab, deciding how to handle the lot is called disposition.',
  wafer:'The silicon disc circuits are built on. 300 mm is the volume standard; one wafer carries hundreds of die. The bottom notch is the alignment reference.',
  lot:'25 wafers travelling together as one production unit, carried in a FOUP. Metrology samples representative slots rather than all 25 — here slots 3, 13, 23.',
  photo:'Transferring the reticle pattern onto photoresist with light. The projection lens typically demagnifies 4x. Dose and focus directly drive linewidth.',
  etch:'Transferring the resist pattern into the underlying film with plasma. Pressure, gas mix, RF power and ESC temperature set the rate and profile. Chamber wall condition shifts CD with it.',
  cd:'The lateral width of a feature — width, not depth. In line/space arrays, pitch = CD + space. Pitch is fixed by design; CD moves with process, so wider CD means narrower space.',
  pitch:'Centre-to-centre distance between neighbouring lines, i.e. CD + space. Fixed by design rules and resolution, so CD variation is space variation.',
  adi:'CD measured on the resist pattern after develop, before etch. Rework is still possible here and the reading feeds scanner APC, so it is an actionable measurement taken on nearly every lot.',
  aci:'CD measured after etch, on the stripped device structure; the standard term is AEI. Closest to the final structure and catches etch-induced error, but the lot cannot be reworked. Purpose is etch-bias characterisation, so it runs skip-lot.',
  epe:'How far a feature edge sits from where it should be. Overlay error and CD variation both feed it. As nodes shrink the budget tightens. This project covers the CD component only.',
  overlay:'How accurately one layer lands on the layer beneath. Measured on dedicated scribe-line targets; the size and density difference from real device patterns is called device-to-target bias.',
  reticle:'The quartz plate carrying the circuit pattern, typically 4x the wafer image. A CD error on the reticle repeats identically at the same in-field site on every wafer — that repeatability is its fingerprint.',
  field:'The rectangular area exposed in one shot, 26 x 33 mm here. The scanner steps across the wafer repeating it. Nine fields spread across the radius are sampled in this dataset.',
  chamber:'The vacuum reactor where plasma etch happens. Four chambers (CH-A to CH-D) take lots in rotation. By-products building up on the wall change radical density and move CD.',
  golden:'A dedicated patterned wafer, never returned to the line, re-measured on a fixed recipe to track metrology stability and tool-to-tool matching. No process touches it, so any movement is a tool contribution.',
  cdsem:'Top-down CD measurement with an electron beam — called the ruler of the fab for its sub-nanometre precision. Edges are found from the secondary-electron waveform. Point measurement, so roughly 13–36 sites per wafer on modern tools.',
  xsem:'Cross-sectioning the wafer to see bottom, middle and top CD plus sidewall angle. It is the absolute reference but destructive, so sampling is minimal — three times a week, five sites here.',
  dose:'Total light energy delivered to the resist. On positive tone, more dose means narrower lines. It acts uniformly across the wafer, so a whole-wafer mean shift points at dose first.',
  peb:'Baking the wafer after exposure. In chemically amplified resist the acid-catalysed reaction completes here, so a fraction of a degree changes CD. Hot-plate profiles are centre-to-edge, so the signature is radial.',
  delta:'AEI CD minus ADI CD — how much etch changed the lateral width. Not etch depth. Reference here is -20 nm. If ADI is clean and only this moves, the candidates narrow to Etch or Metrology.',
  pm:'Opening the tool for clean and part replacement. Right after a wet clean the wall state is reset and etch behaviour jumps (first wafer effect); by-products then accumulate and bias drifts slowly. This is chamber seasoning.',
  limit:'The range accepted as normal variation. Here the engine derives it from the 10-day baseline as mean ± 3σ rather than a human setting it. SPC practice needs 20–25 subgroups for a stable estimate.',
  rework:'Stripping the resist and re-exposing. Only possible before etch, so the faster the attribution the more wafers survive.',
  metro:'Measuring the dimensions of what was built, and the tools that do it. Two CD-SEMs are in this dataset and each lot is measured by one of them. Recording which tool measured is the key to attributing tool drift.',
  skiplot:'Measuring a fraction of lots rather than all of them. Metrology costs both capital and cycle time, so the better the process capability (Cp/Cpk) the higher the skip rate. ADI is every lot here, AEI half.',
  apc:'Correcting the next lot automatically from the previous lot measurement. ADI CD and overlay feeding back as scanner corrections is the classic case — which is why ADI is actionable and AEI is verification.',
  tmu:'The industry measure of how much error the metrology tool itself contributes. In overlay it is the RSS of TIS-mean, TIS-3σ, dynamic precision and tool-to-tool match. Above 20% of the process budget, process and measurement can no longer be told apart.',
  precision:'Scatter across repeated measurements of the same site, quoted as 3σ. Measured without unloading the wafer, so it isolates tool repeatability. Three repeats per site on the monitor wafer here.',
  match:'How differently two tools read the same structure. Lots rotate between tools, so a large mismatch looks like a process change. Fabs manage several CD-SEMs as one matched fleet.',
  tis:'Tool-induced shift, defined by measuring the target at 0 and 180 degrees. It captures optical asymmetry and is standard in overlay accuracy. Being a rotation-based term it does not transfer to top-down CD, so it is excluded from the TMU here.',
  tolerance:'The half-width of the CD window the process is allowed. Set to ±6.0 nm here so that Cp is about 1.4 given the within-wafer CDU.',
  setting:'The value written in the recipe and commanded to the tool. A dose setting of 32.0 mJ/cm² is an instruction, not proof that much was delivered. Setting changes are logged, so a timing mismatch rules the item out.',
  sensor:'What the scanner energy sensor actually integrated. CD responds to this, not to the setting. Setting steady while this moves points at a missed Dose Mapper calibration after a source change, sensor degradation, or illumination transmission loss — fixing the recipe would not hold.',
  dosemapper:'Re-establishing the relation between the sensor reading and the energy actually reaching the wafer. A laser source change alters bandwidth (E95) and pulse energy, so the same setting can deliver a different dose. Source change therefore carries calibration as a mandatory checklist item.',
  changepoint:'The maintenance log — every part swap, PM, recipe change and calibration with its timestamp. Analysis starts by asking whether a change point coincides with the onset; if the timing does not line up, the item is ruled out.',
  ocap:'Charting an indicator against control limits and pre-defining who does what when it breaches. Watching only the setting hides a setting-to-sensor gap, so charting the sensor reading itself is the key to preventing recurrence.',
  cdu:'How uniform CD is across the wafer, usually quoted as 3σ. Even on-target on average, poor CDU puts part of the wafer out of spec. About 4.2 nm here.',
};
const KO_RULE = {"PHOTO_DOSE": {"label": "노광 dose drift", "risk": "정상", "module": "Photo", "cause": "웨이퍼 평균 ADI CD가 통째로 이동했고, 반경 성분·슬릿 지문·레티클 반복 성분은 모두 관리 한계 안이다. 즉 어긋남이 웨이퍼 특정 위치에 몰리지 않고 전면에 균일하게 걸린 형태(wafer mean shift)이며, 이는 웨이퍼 전체에 동일하게 작용하는 인자의 지문이다. 노광량(dose)이 여기에 해당한다. Setting값(Recipe Input)은 유지되어 있는데 Energy Sensor 실측값만 이탈했다면 실효 dose와 Setting 사이에 괴리가 생긴 것이고, 이때는 조사량 센서 교정(Energy Sensor Calibration) 이탈을 먼저 의심한다.", "action": "순서가 중요하다. (1) Setting값과 Energy Sensor 실측값의 괴리부터 확인한다. 괴리가 있으면 Recipe를 건드리기 전에 조사량 센서 교정(Energy Sensor Calibration)을 재수행한다. field 내 CDU 보정 기능인 Dose Mapper(DoMa)와는 다른 절차다. Setting만 조정하면 실효 dose는 그대로여서 재발한다. (2) PM · 부품 교체 · Calibration 이력에서 해당 시점의 변경점을 조회한다 — Laser Source 교체, 조명계 광학 부품 교체, 최근 Calibration 수행 일자. CD 변화 시점과 일치하는 변경점이 있으면 1차 유력 원인으로 지목한다. (3) Energy Sensor 시계열이 단발성 step 변화인지 지속 drift인지 구분한다. step이면 변경점 연계, drift면 센서 열화·오염을 본다. (4) 광원 특성 파라미터를 함께 조회한다 — Pulse Energy Stability(Energy Sigma), Bandwidth(E95), 조명계 Transmission Efficiency. Source 교체 후 파장 특성이 달라지면 같은 Setting에서도 실효 dose가 달라진다. (5) Track 측 Develop / PEB 조건에 변경점이 없음을 확인해 Photo 원인 귀속의 배제 근거를 확보한다. (6) 조치 후 rework lot으로 Before/After CD 회복 여부를 검증한다. ADI 시점이므로 스펙 이탈 웨이퍼는 아직 rework window 안에 있다. (7) 재발 방지 — Energy Sensor 실측값에 SPC 관리도를 걸고 Setting 대비 편차가 한계를 넘으면 알람이 뜨는 OCAP을 수립한다. Source 교체를 Change Control Checklist에 Calibration 필수 항목으로 반영한다."}, "PHOTO_TRACK_RADIAL": {"label": "트랙/PEB 반경 프로파일 변화", "risk": "주의", "module": "Photo(Track)", "cause": "ADI 잔차를 (r/R)²로 회귀했을 때 반경 계수가 관리 한계를 넘었다. 웨이퍼 중심과 엣지의 CD 차이가 벌어진 형태이고, 웨이퍼 평균 자체는 크게 움직이지 않았다. dose처럼 전면에 균일하게 걸리는 인자로는 이 모양이 나오지 않는다. PEB plate 온도 프로파일이나 코팅 두께의 반경 분포가 바뀐 형태이며, ΔCD(etch bias)는 정상이므로 Etch 이후 요인은 배제된다.", "action": "(1) 해당 Track의 PEB plate 온도 맵(zone별 설정값과 실측값)을 조회한다. zone 히터 이상이나 온도 보정 테이블 변경 이력이 있는지 본다. (2) 코터 회전 프로파일과 레지스트 도포 두께의 반경 분포를 확인한다. (3) Track PM · 부품 교체 · Calibration 이력에서 해당 시점의 변경점을 조회한다. (4) 반경 성분은 스캐너 dose 보정으로 상쇄되지 않는다. wafer mean만 맞추는 R2R 피드백으로 덮으면 중심과 엣지가 반대 방향으로 벌어져 CDU가 더 나빠진다. dose 보정으로 대응하지 말 것."}, "RETICLE_CD_ERROR": {"label": "레티클 CD 오차", "risk": "주의", "module": "Photo(Reticle)", "cause": "특정 site에서만 편차가 나타나고 모든 field에서 동일하게 반복된다. 웨이퍼·반경 좌표계와 무관하므로 마스크 자체의 CD 오차로 귀속된다.", "action": "(1) 해당 레티클을 다른 스캐너에서 노광해 동일 site에서 같은 편차가 재현되는지 확인한다. 재현되면 레티클, 스캐너를 따라가면 스캐너 지문이다. (2) 마스크 CD 측정 성적서와 최근 세정·수리 이력을 조회한다. (3) Pellicle 오염이나 마스크 CD 열화 가능성을 함께 본다. (4) 스캐너 dose나 Etch recipe를 먼저 건드리지 말 것. 이 성분은 site에 고정되어 있어 전면 보정으로는 상쇄되지 않는다."}, "ETCH_CHAMBER": {"label": "식각 챔버 편차 / PM drift", "risk": "위험", "module": "Etch", "cause": "ADI는 정상인데 ΔCD가 이동했고, 특정 챔버에서만 나타나며 웨이퍼 반경 성분을 동반한다. 플라즈마 균일도·가스 흐름·ESC 온도 변화 또는 PM 이후 누적 drift로 귀속된다.", "action": "(1) 해당 챔버를 격리하고 chamber matching 웨이퍼로 etch bias를 재측정한다. (2) RF hours 대비 bias 추이를 확인해 seasoning drift인지 단발성 이상인지 가른다. PM 직후 급변(first wafer effect) 구간과 그 이후 완만한 drift 구간을 구분해서 본다. (3) OES / RF / 압력 트레이스에서 해당 기간의 변화점을 조회한다. (4) 챔버 PM 이력과 wet clean 일자를 CD 변화 시점과 대조한다. (5) AEI 시점은 되돌릴 수 없다. 이후 로트는 ADI Target을 임시 보정해 최종 CD를 스펙 안으로 넣고, 챔버 조치 완료 후 원복한다."}, "METROLOGY_TOOL_DRIFT": {"label": "계측 장비 offset drift", "risk": "위험", "module": "Metrology", "cause": "ΔCD가 이동했지만 특정 챔버에 몰리지 않고, 특정 계측 장비로 측정한 로트에서만 나타난다. 공정이 건드리지 않은 monitor wafer의 재측정값이 같은 방향으로 이동했으므로 공정 변화가 아니라 계측 장비의 offset drift다.", "action": "(1) 공정 조치를 보류한다. 이 상태에서 챔버 recipe를 건드리면 정상 설비를 틀어놓게 된다. (2) 해당 CD-SEM의 monitor wafer 재측정 이력과 최근 calibration 일자를 조회하고 재캘리브레이션을 수행한다. (3) 두 장비의 tool-to-tool matching offset을 재산출한다. (4) 영향 기간에 해당 장비로 측정된 로트를 모두 재판정한다. (5) monitor wafer 점검 주기를 단축할지 검토한다. 이번 사례에서 판정 보류가 발생한 원인이 감시 주기 부족이었다. (6) TMU 항을 분해해 precision과 tool-to-tool match 중 어느 쪽이 예산을 먹는지 본다. match가 주범이면 fleet matching 재조정, precision이 주범이면 recipe(프레임 수, 배율, landing energy)나 장비 컨디션을 본다."}, "INDETERMINATE": {"label": "판정 보류", "risk": "주의", "module": "-", "cause": "이상은 탐지되었으나 원인을 특정할 증거가 부족하다. 챔버 편중과 계측 drift가 모두 기준에 못 미치거나, 근거 데이터가 없는 경우다.", "action": "추가 측정 요청 — 해당 챔버 매칭 웨이퍼, monitor wafer 임시 재측정, 단면 taper 확인. 근거 없이 조치 대상을 지정하지 않는다."}, "NORMAL": {"label": "정상", "risk": "정상", "module": "-", "cause": "모든 성분이 관리 한계 내에 있다.", "action": "조치 없음."}};
/* ============================================================
   CD 이상 원인 판정 콘솔 — 화면 로직
   판정·게이트·에이전트 로직은 건드리지 않는다. 표시 계층만 담당.
   ============================================================ */
const M = DATA.meta, LIM = DATA.limits, CEN = DATA.centers;
const INV = typeof INVESTIGATIONS !== 'undefined' ? INVESTIGATIONS : {};
const VAL = typeof VALIDATION !== 'undefined' ? VALIDATION : null;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
/* data.js의 컬럼명은 그대로 두고, 화면에 보일 때만 표준 용어(AEI)로 바꾼다.
   엔진·판정 로직은 건드리지 않는다. */
const aei = v => String(v ?? '').replace(/\bACI\b/g, 'AEI');
/* data.js의 조치 문안은 영문이고 Dose Mapper 표현이 섞여 있다.
   판정 로직은 그대로 두고 화면 표기만 정확한 용어로 바꾼다. */
function fixExtra(v) {
  let x = aei(v);
  x = x.replace(/Dose Mapper \/ Energy Sensor Calibration/g, 'Energy Sensor Calibration');
  if (LANG === 'ko') {
    x = x.replace(/Setting ([\d.]+) mJ\/cm² held steady, but the Energy Sensor readback deviated to ([\d.]+) mJ\/cm² \(([+-][\d.]+)%\)\./,
      'Setting $1 mJ/cm²는 유지됐으나 Energy Sensor 실측이 $2 mJ/cm² ($3%)로 이탈.');
    x = x.replace(/Re-run Energy Sensor Calibration before touching the recipe\./,
      'Recipe 수정 전 조사량 센서 교정(Energy Sensor Calibration) 재수행.');
    x = x.replace(/If CD residual remains after calibration, target Setting ([\d.]+) → ([\d.]+) mJ\/cm² \(([-+][\d.]+) mJ\/cm², ([-+][\d.]+)%\)/,
      '교정 후에도 CD 잔차가 남으면 Setting $1 → $2 mJ/cm² ($3 mJ/cm², $4%) 적용.');
    x = x.replace(/Setting–Sensor gap is normal\. Recipe correction applies\./, 'Setting–Sensor 괴리는 정상. Recipe 보정 대상.');
  }
  return x;
}
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num = (v, d = 2) => (v == null || v === '' || isNaN(v)) ? '—' : (+v).toFixed(d);

let LANG = 'ko';
try { LANG = localStorage.getItem('cdlang') || 'ko'; } catch (e) {}

/* ── UI 문구 ───────────────────────────────────────────────── */
const T = {
  brand:        ['CD Excursion 원인 귀속 Agent', 'CD Excursion Attribution Agent'],
  brandsub:     ['ADI–AEI CD 기반 · 원인 모듈 귀속 · 근거 부족 시 보류',
                 'ADI–AEI CD based · module attribution · withholds when evidence is thin'],
  'nav.home':   ['개요', 'Overview'],
  search:       ['로트·장비·챔버 검색', 'Search lot, tool, chamber'],
  'nav.flow':   ['공정 흐름', 'Process flow'],
  'h.kicker':   ['반도체 포토·식각 공정 · CD 이상 원인 귀속',
                 'Litho & etch · CD excursion attribution'],
  'h.title':    ['CD가 스펙을 벗어났을 때,<br>원인이 어느 모듈인지 판정합니다',
                 'When CD leaves spec,<br>this agent names the responsible module'],
  'h.golots':   ['로트 판정 보기', 'Open the lots'],
  'h.goflow':   ['공정 흐름부터 보기', 'Start with the process flow'],
  'h.kpi':      ['한눈에 보는 결과', 'Results at a glance'],
  'h.kpisub':   ['합성 데이터 320 로트 블라인드 평가 기준', 'Blind evaluation on 320 synthetic lots'],
  'h.problem':  ['문제 정의', 'Problem definition'],
  'h.p1':       ['현장 상황', 'The situation'],
  'h.p2':       ['이 Agent의 접근', 'This agent\u2019s approach'],
  'h.guide':    ['화면 안내', 'Where to look'],
  'nav.lots':   ['로트 판정', 'Lots'],
  'f.title':    ['웨이퍼 1장의 공정 경로', 'Process path of one wafer'],
  'f.sub':      ['측정 2회 · 두 값의 차이로 원인 추적', 'Two measurements · cause traced from their difference'],
  'f.lead':     ['Litho로 패턴 형성 → Etch로 하부막 전사 · ADI/AEI 2회 측정 · 두 값의 차이(etch bias)가 원인 추적의 기준',
                 'Litho prints the pattern, etch transfers it · measured at ADI and AEI · their difference (etch bias) anchors the attribution'],
  'f.steps':    ['단계별 변동 인자와 지문', 'Drift factors and fingerprints by step'],
  'f.stepssub': ['각 단계의 변동 인자 · CD에 남는 지문 형태', 'What drifts at each step · the CD fingerprint it leaves'],
  'f.third':    ['원인 후보 3종', 'Three candidate causes'],
  'f.thirdsub': ['ΔCD 이동만으로는 구분 불가 · 교차 검증 필요', 'A Delta-CD shift alone cannot separate them'],
  'f.judge':    ['판정 순서', 'Disposition sequence'],
  'f.judgesub': ['Rework 가능 구간 우선 · Metrology 배제 후 Process 판정',
                 'Reworkable window first · rule out metrology before process'],
  'f.gostart':  ['로트 판정 화면으로', 'Go to the lots'],
  'f.scroll':   ['← 옆으로 밀어서 전체를 볼 수 있습니다 →', '← swipe sideways to see the whole diagram →'],
  'th.step':    ['단계', 'Step'],
  'th.what':    ['공정 내용', 'Process step'],
  'th.drift':   ['변동 인자', 'Drift factor'],
  'th.finger':  ['CD 지문', 'CD fingerprint'],
  'nav.trends': ['추이와 감시', 'Trends'],
  'nav.valid':  ['검증 결과', 'Validation'],
  'nav.terms':  ['용어 사전', 'Glossary'],
  'nav.ref':    ['기준값', 'Reference'],
  'nav.refs':   ['출처', 'Sources'],
  'rs.title':   ['참고문헌', 'References'],
  'rs.sub':     ['학회 논문 · 특허 원문 · 장비사 공식 자료 · 산업 표준만 인용', 'Peer-reviewed papers, patents, vendor documents and industry standards only'],
  'list.title': ['Lot Disposition', 'Lot disposition'],
  'list.reset': ['초기화', 'Reset'],
  'list.abn':   ['조치 검토 필요', 'Needs review'],
  'list.all':   ['전체 판정', 'All verdicts'],
  'list.sc':    ['전체 스캐너', 'All scanners'],
  'list.ch':    ['전체 챔버', 'All chambers'],
  'list.mt':    ['전체 계측 장비', 'All metrology tools'],
  'list.none':  ['조건에 맞는 로트가 없습니다.', 'No lots match the current filters.'],
  'list.of':    ['건', ' lots'],
  back:         ['← 목록', '← Lots'],
  prev:         ['이전 로트', 'Previous'],
  next:         ['다음 로트', 'Next'],
  'd.act':      ['조치', 'Recommended action'],
  'd.changed':  ['무엇이 이탈했나', 'What moved'],
  'd.cause':    ['원인 귀속', 'Attributed cause'],
  'd.facts':    ['이 로트에서 확인된 값', 'What this lot actually showed'],
  'd.nochange': ['관리 한계 이탈 지표 없음', 'No indicator outside its control limit'],
  'd.evbtn':    ['근거 보기', 'View evidence'],
  'd.tracebtn': ['조사 경로 보기', 'View trace'],
  'd.asof':     ['데이터 기준', 'Data as of'],
  st_ok:        ['정상', 'Normal'],
  st_review:    ['검토 필요', 'Review'],
  st_action:    ['조치 필요', 'Action required'],
  verified:     ['검증 완료', 'Verified'],
  needev:       ['근거 부족', 'Needs evidence'],
  'd.out':      ['관리 한계 이탈 항목 (OOC)', 'Out-of-control indicators'],
  'd.clear':    ['감시 중인 지표 {n}개 모두 관리 한계 이내', 'All {n} monitored components within control limits'],
  'd.whynormal':['감시 지표 {n}개 확인 · 전 항목 관리 한계 이내 · 귀속 트리거 없음',
                 '{n} indicators checked · all within limit · no attribution trigger'],
  'd.all':      ['전체 측정 지표', 'All measured evidence'],
  'd.allsub':   ['관리 한계는 기준선 10일 데이터의 평균 ± 3σ로 엔진이 스스로 산출합니다', 'Control limits are derived by the engine from the 10-day baseline (mean ± 3σ)'],
  'd.gate':     ['검증 게이트', 'Verification gate'],
  'd.gatesub':  ['판정이 요구하는 조건을 코드가 다시 확인합니다. 하나라도 불충족이면 보류합니다', 'Code re-checks every condition the rule requires. One failure withholds the disposition'],
  'd.gatenone': ['정상 판정은 추가 요구 조건이 없습니다. 감시 지표 전부가 관리 한계 이내인 것이 근거입니다.',
                 'A normal disposition requires no rule-specific gate. The basis is that every monitored component stayed within limits.'],
  'd.trace':    ['조사 경로', 'Investigation trace'],
  'd.tracesub': ['에이전트가 실제로 호출한 도구 순서 · 붉은 단계는 이 로트에서만 수행한 확인',
                 'Tools the agent actually called; red steps were taken only for this lot'],
  'd.only':     ['이 로트 특이', 'lot-specific'],
  'd.tracesum': ['도구 {n}회 호출 · 이탈 지표 {o}개 · 게이트 {g}', '{n} tool calls · {o} out of limit · gate {g}'],
  'd.wafer':    ['웨이퍼 맵', 'Wafer map'],
  'd.wafersub': ['점 하나가 CD-SEM 측정 site입니다. 올리면 실측값이 나옵니다', 'Each dot is a CD-SEM site. Hover for the measured value'],
  'd.wadi':     ['ADI CD 잔차', 'ADI CD residual'],
  'd.wdelta':   ['Etch bias 잔차', 'Etch bias residual'],
  'd.noaci':    ['이 로트는 skip-lot으로 AEI를 측정하지 않았습니다', 'AEI skipped for this lot (skip-lot sampling)'],
  'd.narrow':   ['목표보다 좁음', 'narrower than target'],
  'd.wide':     ['목표보다 넓음', 'wider than target'],
  'd.ctx':      ['공정 경로', 'Process path'],
  'th.metric':  ['지표', 'Metric'],
  'th.plain':   ['지표', 'Indicator'],
  'th.margin':  ['한계까지', 'Margin'],
  'th.source':  ['출처', 'Source'],
  near:         ['한계 근접', 'Near limit'],
  over:         ['{v} 초과', '{v} over'],
  'th.value':   ['측정값', 'Measured'],
  'th.limit':   ['관리 한계', 'Limit'],
  'th.state':   ['상태', 'State'],
  'th.cond':    ['요구 조건', 'Condition'],
  'th.met':     ['충족', 'Met'],
  within:       ['이내', 'WITHIN'],
  out:          ['이탈', 'OUT'],
  pass:         ['통과', 'PASS'],
  fail:         ['미충족', 'FAIL'],
  gatepass:     ['게이트 통과', 'Gate PASS'],
  gatehold:     ['판정 보류', 'Gate HOLD'],
  raw:          ['원본 응답 보기', 'View raw result'],
  'tr.trend':   ['생산일별 추이', 'Metric trend by production day'],
  'tr.trendsub':['점 하나가 로트 · 클릭하면 해당 판정으로 이동', 'One dot per lot · click to open its disposition'],
  'tr.mon':     ['CD-SEM 안정성', 'CD-SEM stability'],
  'tr.monsub':  ['모니터 웨이퍼 반복 측정 · 기준선 대비 이동량', 'Monitor-wafer re-measurement · drift from baseline'],
  'tr.tmu':     ['TMU / 공정 예산', 'TMU / process budget'],
  'tr.cham':    ['Etch 챔버별 bias', 'Etch bias by chamber'],
  'va.perf':    ['판정 성능', 'Disposition performance'],
  'va.perfsub': ['기권을 허용하는 판정기 · Coverage와 Selective Accuracy를 함께 본다',
                 'A classifier with a reject option · read coverage together with selective accuracy'],
  'va.recall':  ['원인 유형별 검출률', 'Detection rate by cause'],
  'va.recallsub':['분모는 판정 가능 구간 · AEI 미측정 로트는 ΔCD 산출 불가',
                 'Denominator is the decidable subset; without AEI there is no Delta-CD'],
  'va.matrix':  ['블라인드 평가', 'Blind evaluation'],
  'va.matrixsub':['세로 = 주입한 이상 · 가로 = 에이전트 판정', 'Row = injected scenario · column = predicted disposition'],
  'gl.title':   ['용어 사전', 'Glossary'],
  'gl.sub':     ['본문의 점선 밑줄에 마우스를 올리면 같은 설명이 그 자리에 나옵니다', 'Hover any dotted term in the app for the same definition'],
  'rf.spec':    ['데이터 사양과 관리 한계', 'Data specification and control limits'],
  'rf.specsub': ['합성 데이터 · 앵커는 계측 정합성 실습 실측', 'Synthetic data · anchored on measured metrology-matching results'],
  'rf.rules':   ['판정 규칙', 'Attribution rules'],
  'rf.rulessub':['결정론적 규칙 KB', 'Deterministic rule knowledge base'],
  foot:         ['합성 데이터로 만든 개념 검증 프로젝트입니다. 실제 fab 데이터로 검증되지 않았습니다.',
                 'Synthetic proof of concept. Not validated on production fab data.'],
  'k.lots':     ['평가 로트', 'Lots evaluated'],
  'k.exact':    ['정답 일치', 'Exact matches'],
  'k.hold':     ['판정 보류', 'Withheld'],
  'k.mis':      ['계측 drift → Etch 오귀속', 'Metrology drift → Etch misattribution'],
};
const t = (k, v = {}) => {
  let s = (T[k] || [k, k])[LANG === 'ko' ? 0 : 1];
  for (const p in v) s = s.replace('{' + p + '}', v[p]);
  return s;
};

/* ── 데이터 문자열 번역 ────────────────────────────────────── */
const VERDICT_KO = {
  NORMAL: '정상', PHOTO_DOSE: '노광 dose drift', PHOTO_TRACK_RADIAL: '트랙/PEB 반경 프로파일 변화',
  RETICLE_CD_ERROR: '레티클 CD 오차', ETCH_CHAMBER: '식각 챔버 편차 / PM drift',
  METROLOGY_TOOL_DRIFT: '계측 장비 offset drift', INDETERMINATE: '판정 보류',
};
const SHORT = {
  ko: {NORMAL:'정상', PHOTO_DOSE:'노광 dose', PHOTO_TRACK_RADIAL:'트랙 PEB', RETICLE_CD_ERROR:'레티클',
       ETCH_CHAMBER:'식각 챔버', METROLOGY_TOOL_DRIFT:'계측 drift', INDETERMINATE:'보류'},
  en: {NORMAL:'Normal', PHOTO_DOSE:'Photo dose', PHOTO_TRACK_RADIAL:'Track PEB', RETICLE_CD_ERROR:'Reticle',
       ETCH_CHAMBER:'Etch chamber', METROLOGY_TOOL_DRIFT:'Metrology drift', INDETERMINATE:'Withheld'},
};
const RISK_KO = {Normal:'정상', Watch:'주의', High:'위험'};
const MODULE_KO = {Photo:'Photo(노광)', 'Photo (Track)':'Photo(Track)', 'Photo (Reticle)':'Photo(레티클)',
  Etch:'Etch(식각)', Metrology:'Metrology(계측)'};
const COLOR = {NORMAL:'#8B8593', PHOTO_DOSE:'#875D33', PHOTO_TRACK_RADIAL:'#875D33',
  RETICLE_CD_ERROR:'#875D33', ETCH_CHAMBER:'#8C3D6B', METROLOGY_TOOL_DRIFT:'#2F6E74',
  INDETERMINATE:'#634670'};
const BCLASS = {Normal:'b-ok', Watch:'b-watch', High:'b-bad'};
/* 상단 상태는 3단계로만 말한다. 세부 verdict는 아래에서 본다. */
function status3(l) {
  if (l.verdict === 'NORMAL') return {k: 'st_ok', cls: 'p-ok'};
  if (l.verdict === 'INDETERMINATE' || l.risk === 'Watch') return {k: 'st_review', cls: 'p-review'};
  return {k: 'st_action', cls: 'p-action'};
}

/* 지표명 — 장비 접두사는 분리해서 보존 */
const EV_KO = [
  [/^ADI scalar component$/, 'ADI 스칼라 성분', 'ADI'],
  [/^ADI radial component$/, 'ADI 반경 성분', 'RADIAL'],
  [/^Reticle-repeat component$/, '레티클 반복 성분', 'RETICLE_REPEAT'],
  [/^Dose Setting vs Energy Sensor$/, 'Dose Setting vs Energy Sensor', 'SENSOR'],
  [/^Focus Setting vs Sensor$/, 'Focus Setting vs Sensor', 'FOCUS'],
  [/^Delta-CD.*$/, 'ΔCD (etch bias) 편차', 'DELTA_CD'],
  [/measurement uncertainty TMU \/ process budget$/, '계측 불확도 TMU / 공정 예산', 'TMU'],
  [/monitor wafer drift$/, 'monitor wafer 이동량', 'MONITOR'],
  [/chamber deviation$/, '챔버 편중', 'CHAMBER'],
  [/^Cross-section taper shift \(supporting\)$/, '단면 taper 변화 (보조)', 'TAPER'],
  [/^Delta-CD$/, 'ΔCD (etch bias)', 'DELTA_NA'],
];
function evLabel(k) {
  if (LANG === 'en') return k;
  const pre = (k.match(/^(CDSEM-[AB]|CH-[A-D])\s+/) || [])[1];
  const rest = pre ? k.slice(pre.length).trim() : k;
  for (const [re, ko] of EV_KO) if (re.test(rest)) return (pre ? pre + ' ' : '') + ko;
  return k;
}
function evTerm(k) {
  const rest = k.replace(/^(CDSEM-[AB]|CH-[A-D])\s+/, '');
  for (const [re, , term] of EV_KO) if (re.test(rest)) return term;
  return null;
}
/* 지표 → 용어 사전 키 */
/* 전문 용어는 2순위로 내리고, 사람이 읽는 이름을 1순위로 쓴다 */
const PLAIN = {
  ADI:            ['웨이퍼 평균 CD 이동', 'Wafer mean CD shift'],
  RADIAL:         ['중심–가장자리 CD 편차', 'Center-to-edge CD spread'],
  RETICLE_REPEAT: ['동일 site 반복 오차', 'Same-site repeating error'],
  SENSOR:         ['Dose 설정 vs 실조사량', 'Dose setting vs delivered'],
  FOCUS:          ['Focus 설정 vs 실측', 'Focus setting vs sensor'],
  DELTA_CD:       ['Etch bias (AEI − ADI)', 'Etch bias (AEI − ADI)'],
  DELTA_NA:       ['Etch bias (AEI − ADI)', 'Etch bias (AEI − ADI)'],
  TMU:            ['계측 불확도 예산 소비', 'Metrology uncertainty budget used'],
  MONITOR:        ['Monitor wafer drift', 'Monitor wafer drift'],
  CHAMBER:        ['Chamber 편중', 'Chamber commonality'],
  TAPER:          ['단면 Taper 변화 (참고)', 'Cross-section taper (reference)'],
};
/* 각 근거의 출처 데이터. 현직자가 가장 먼저 확인하는 항목이다. */
const SOURCE = {
  ADI:            ['CD-SEM · ADI', 'CD-SEM · ADI'],
  RADIAL:         ['CD-SEM · ADI', 'CD-SEM · ADI'],
  RETICLE_REPEAT: ['CD-SEM · ADI', 'CD-SEM · ADI'],
  SENSOR:         ['Scanner 센서 로그', 'Scanner sensor log'],
  FOCUS:          ['Scanner 센서 로그', 'Scanner sensor log'],
  DELTA_CD:       ['CD-SEM · ADI+AEI', 'CD-SEM · ADI+AEI'],
  DELTA_NA:       ['CD-SEM · ADI+AEI', 'CD-SEM · ADI+AEI'],
  TMU:            ['Monitor wafer', 'Monitor wafer'],
  MONITOR:        ['Monitor wafer', 'Monitor wafer'],
  CHAMBER:        ['설비 이력 · MES', 'Equipment log · MES'],
  TAPER:          ['X-SEM 단면', 'X-SEM cross-section'],
};
const plainLabel = k => { const x = PLAIN[evTerm(k)]; return x ? x[LANG === 'ko' ? 0 : 1] : evLabel(k); };
const sourceLabel = k => { const x = SOURCE[evTerm(k)]; return x ? x[LANG === 'ko' ? 0 : 1] : '—'; };

/* PASS 여부가 아니라 '한계까지 얼마 남았는가'가 양산에서 더 중요하다.
   지표마다 표기 형태가 달라, 한계와 실제로 비교되는 수치만 골라 뽑는다. */
function margin(e) {
  const term = evTerm(e.k), v = String(e.v), lim = String(e.lim);
  if (!term || /reference|^-$/.test(lim) || /N\/A|not measured/i.test(v)) return null;
  const nums = str => (str.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  let val, cap;
  if (term === 'SENSOR')      { const m = v.match(/\(([+-]?\d+(?:\.\d+)?)%\)/); val = m && +m[1]; cap = nums(lim)[0]; }
  else if (term === 'TMU')    { const m = v.match(/=\s*(\d+(?:\.\d+)?)%/);        val = m && +m[1]; cap = nums(lim)[0]; }
  else if (term === 'FOCUS')  { const m = v.match(/→\s*([+-]?\d+(?:\.\d+)?)/);    val = m && +m[1]; cap = nums(lim)[0]; }
  else                        { val = nums(v)[0]; cap = Math.abs(nums(lim)[0]); }
  if (val == null || cap == null || isNaN(val) || isNaN(cap) || !cap) return null;
  const left = cap - Math.abs(val);
  return {left, cap, near: left >= 0 && left <= cap * 0.2};
}
function rowState(e) {
  if (e.hit) return {cls: 's-bad', text: t('out')};
  const m = margin(e);
  return m && m.near ? {cls: 's-near', text: t('near')} : {cls: 's-ok', text: t('within')};
}

const EV_GLOSS = {ADI:'adi', RADIAL:'peb', RETICLE_REPEAT:'reticle', SENSOR:'sensor', FOCUS:'dose',
  DELTA_CD:'delta', TMU:'tmu', MONITOR:'golden', CHAMBER:'chamber', TAPER:'xsem'};

const GATE_KO = {
  tool_drift_exceeds: ['monitor wafer 값이 같은 방향으로 이동했는가', 'Monitor wafer drifted in the same direction'],
  chamber_specific: ['특정 챔버에만 몰려 있는가', 'Excursion is confined to one chamber'],
  metrology_healthy: ['계측 장비가 정상인가', 'Metrology tool is healthy'],
  metrology_evidence_fresh: ['계측 감시 데이터가 최근 것인가', 'Metrology monitoring data is recent'],
  tmu_within_budget: ['계측 불확도가 공정 예산 이내인가', 'TMU is within the process budget'],
  taper_not_contradicting: ['단면 taper 변화가 모순되지 않는가', 'Cross-section taper is not contradicting'],
  adi_radial_within_limit: ['반경 성분이 관리 한계 이내인가', 'Radial component within limit'],
  adi_reticle_within_limit: ['레티클 반복 성분이 관리 한계 이내인가', 'Reticle-repeat component within limit'],
  adi_reticle_repeats_across_fields: ['모든 field에서 동일하게 반복되는가', 'Repeats identically across every field'],
  delta_within_limit_or_absent: ['ΔCD가 정상이거나 미측정인가', 'Delta-CD normal or not measured'],
};
const TOOL_KO = {
  get_lot_context: ['로트 컨텍스트 조회', 'get_lot_context'],
  decompose_cd: ['CD 성분 분해', 'decompose_cd'],
  get_metrology_health: ['계측 상태 확인', 'get_metrology_health'],
  get_equipment_events: ['설비 이력 조회', 'get_equipment_events'],
  compare_chambers: ['챔버 간 비교', 'compare_chambers'],
  verify_disposition: ['검증 게이트 실행', 'verify_disposition'],
};
const REASON_KO = {
  "Pin down the lot's process path and equipment first.": '먼저 이 로트가 지나간 공정 경로와 설비를 확정한다.',
  'Decompose the CD excursion into wafer/field/reticle/delta coordinate systems.': 'CD 편차를 웨이퍼·field·레티클·ΔCD 좌표계 성분으로 분해한다.',
  'Rule out metrology drift/TMU before acting on process.': '공정을 건드리기 전에 계측 drift와 TMU부터 배제한다.',
  'Cross-check the repeating site signature against reticle inspection/qualification history.': 'site 반복 지문을 레티클 검사·인증 이력과 대조한다.',
  'Cross-check the ADI radial signature against PEB/Track maintenance and calibration history.': 'ADI 반경 지문을 PEB·Track 정비·캘리브레이션 이력과 대조한다.',
  'Cross-check chamber PM/wet-clean/inspection history against the Delta-CD change timing.': '챔버 PM·wet clean·점검 이력을 ΔCD 변화 시점과 대조한다.',
  'Look for a scanner event that overlaps in time with the ADI scalar shift or Setting-Sensor gap.': 'ADI 스칼라 이동 또는 Setting–Sensor 괴리와 시점이 겹치는 스캐너 이벤트를 찾는다.',
  'Compare the fleet fingerprint to see whether the Delta-CD excursion is confined to one chamber.': 'ΔCD 편차가 한 챔버에만 몰려 있는지 챔버 지문을 비교한다.',
  'The final call is constrained by the deterministic Verification Gate, not the LLM/planner.': '최종 판정은 LLM이 아니라 결정론적 검증 게이트가 결정한다.',
};
const ruleOf = v => (typeof KO_RULE !== 'undefined' ? KO_RULE[v] : null);
const verdictLabel = l => LANG === 'ko' ? (VERDICT_KO[l.verdict] || l.label) : l.label;
const shortLabel = v => SHORT[LANG][v] || v;
const riskLabel = r => LANG === 'ko' ? (RISK_KO[r] || r) : r;
const causeText = l => LANG === 'ko' ? (ruleOf(l.verdict)?.cause || l.cause) : l.cause;
const actionText = l => LANG === 'ko' ? (ruleOf(l.verdict)?.action || l.action) : l.action;
const gateLabel = c => LANG === 'ko' ? (GATE_KO[c]?.[0] || c) : (GATE_KO[c]?.[1] || c);
const toolLabel = k => LANG === 'ko' ? (TOOL_KO[k]?.[0] || k) : (TOOL_KO[k]?.[1] || k);
const reasonText = r => LANG === 'ko' ? (REASON_KO[r] || r) : r;
const gateOk = l => (INV[l.lot]?.status || 'DISPOSITION_READY') === 'DISPOSITION_READY';

/* 조치 문단을 (1)(2)(3) 기준으로 쪼갠다 */
function actionSteps(text) {
  const s = String(text || '').trim();
  if (!/\(1\)/.test(s)) return {lead: s, steps: []};
  const lead = s.slice(0, s.indexOf('(1)')).trim();
  const parts = s.slice(s.indexOf('(1)')).split(/\((?=\d+\))/).map(x => x.replace(/^\d+\)\s*/, '').trim()).filter(Boolean);
  return {lead, steps: parts};
}
/* ── 팝업 ─────────────────────────────────────────────────── */
const pop = $('#pop');
function showPop(html, anchor) {
  pop.innerHTML = html; pop.style.display = 'block';
  const r = anchor.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
  let left = Math.max(10, Math.min(r.left + scrollX + r.width / 2 - w / 2, scrollX + innerWidth - w - 10));
  let top = (r.bottom + h + 20 > innerHeight) ? r.top + scrollY - h - 9 : r.bottom + scrollY + 9;
  pop.style.left = left + 'px'; pop.style.top = Math.max(scrollY + 6, top) + 'px';
}
const hidePop = () => { pop.style.display = 'none'; };
function termHTML(key) {
  if (ABBR[key] && !TERMS[key]) return abbrHTML(key);
  const x = TERMS[key]; if (!x) return '';
  const d = LANG === 'en' && TERM_EN[key] ? TERM_EN[key] : x.d;
  return `<h4>${esc(x.k)}<span class="en">${esc(x.e)}</span></h4><p>${esc(d)}</p>${x.s || ''}`;
}
document.addEventListener('mouseover', e => {
  const el = e.target.closest('.term,.info'); if (el) showPop(termHTML(el.dataset.t), el);
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('.term,.info') && !e.relatedTarget?.closest('#pop')) hidePop();
});
document.addEventListener('focusin', e => {
  const el = e.target.closest('.term,.info'); if (el) showPop(termHTML(el.dataset.t), el);
});
document.addEventListener('click', e => {
  const el = e.target.closest('.term,.info');
  if (el) { e.preventDefault(); showPop(termHTML(el.dataset.t), el); }
  else if (!e.target.closest('#pop')) hidePop();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePop(); });
addEventListener('scroll', hidePop, {passive: true});
/* 본문에 나온 전문 용어를 용어 사전 항목과 자동으로 연결한다.
   긴 표기부터 매칭해야 ADI/AEI가 'ADI–AEI' 안에서 쪼개지지 않는다. */
/* 영문 약어의 풀네임. 용어 사전 항목이 없는 약어도 최소한 무엇의 줄임말인지는
   마우스를 올리면 보이게 한다. */
const ABBR = {
  ADI:  ['After Develop Inspection', '현상 후 측정'],
  AEI:  ['After Etch Inspection', '식각 후 측정'],
  CD:   ['Critical Dimension', '선폭'],
  CDU:  ['Critical Dimension Uniformity', '선폭 균일도'],
  TMU:  ['Total Measurement Uncertainty', '총 측정 불확도'],
  TIS:  ['Tool Induced Shift', '장비 유발 편차'],
  APC:  ['Advanced Process Control', '선행 공정 제어'],
  SPC:  ['Statistical Process Control', '통계적 공정 관리'],
  OCAP: ['Out of Control Action Plan', '관리 이탈 시 조치 절차'],
  OOC:  ['Out of Control', '관리 한계 이탈'],
  PM:   ['Preventive Maintenance', '예방 정비'],
  PEB:  ['Post Exposure Bake', '노광 후 열처리'],
  MES:  ['Manufacturing Execution System', '생산 실행 시스템'],
  ESC:  ['Electrostatic Chuck', '정전척'],
  DOF:  ['Depth of Focus', '초점 심도'],
  RF:   ['Radio Frequency', '고주파'],
  E95:  ['Spectral bandwidth containing 95% of pulse energy', '펄스 에너지 95%를 담는 스펙트럼 대역폭'],
  EPE:  ['Edge Placement Error', '가장자리 배치 오차'],
  DoMa: ['Dose Mapper', 'field 내 CDU를 dose map으로 보정하는 스캐너 기능'],
  'X-SEM': ['Cross-section SEM', '단면 전자현미경'],
  'CD-SEM': ['Critical Dimension SEM', '선폭 측정 전자현미경'],
};
function abbrHTML(k) {
  const a = ABBR[k]; if (!a) return '';
  return `<h4>${esc(k)}</h4><p><b>${esc(a[0])}</b><br>${esc(a[1])}</p>`;
}

const AUTOTERM = [
  ['Verification Gate','attribution'], ['Monitor wafer','golden'], ['monitor wafer','golden'],
  ['Etch bias','delta'], ['etch bias','delta'], ['ΔCD','delta'],
  ['CD-SEM','cdsem'], ['X-SEM','xsem'], ['Excursion','excursion'], ['excursion','excursion'],
  ['Rework','rework'], ['rework','rework'], ['Skip-lot','skiplot'], ['skip-lot','skiplot'],
  ['TMU','tmu'], ['APC','apc'], ['CDU','cdu'], ['Pitch','pitch'],
  ['Reticle','reticle'], ['레티클','reticle'], ['Chamber','chamber'], ['챔버','chamber'],
  ['PEB','peb'], ['Dose','dose'], ['dose','dose'], ['Focus','dose'],
  ['ADI','adi'], ['AEI','aci'], ['CD','cd'],
];
const ABBR_ONLY = Object.keys(ABBR).filter(k => !AUTOTERM.some(a => a[0] === k));
function autoTerm(html) {
  /* 이미 태그 안에 들어간 텍스트는 건드리지 않도록 태그 단위로 쪼개 처리한다 */
  return html.split(/(<[^>]*>)/).map(part => {
    if (part.startsWith('<')) return part;
    let out = part, done = [];
    /* 용어 사전 항목이 없는 약어도 풀네임 툴팁을 붙인다 */
    ABBR_ONLY.forEach(k => {
      if (done.includes(k)) return;
      const i = out.indexOf(k);
      if (i < 0) return;
      if (/[A-Za-z0-9]/.test(out[i - 1] || '') || /[A-Za-z0-9]/.test(out[i + k.length] || '')) return;
      out = out.slice(0, i) + `<b class="term abbr" data-t="${k}" tabindex="0" role="button">` +
            k + '</b>' + out.slice(i + k.length);
      done.push(k);
    });
    AUTOTERM.forEach(([word, key]) => {
      if (!TERMS[key] || done.includes(key)) return;
      const i = out.indexOf(word);
      if (i < 0) return;
      if (/[A-Za-z가-힣]/.test(out[i - 1] || '') || /[A-Za-z]/.test(out[i + word.length] || '')) return;
      out = out.slice(0, i) + `<b class="term" data-t="${key}" tabindex="0" role="button">` +
            word + '</b>' + out.slice(i + word.length);
      done.push(key);
    });
    return out;
  }).join('');
}
const infoBtn = k => k && TERMS[k] ? `<button class="info" data-t="${k}" aria-label="설명">i</button>` : '';

/* ── 상태 ─────────────────────────────────────────────────── */
const S = {view: 'lots', lot: null, q: '', abn: false, verdict: '', scanner: '', chamber: '',
           metro: '', dmin: null, dmax: null, metric: 'dbias', waf: 'adi'};

function outCount(l) { return (l.ev || []).filter(e => e.hit).length; }
/* 긴 측정값 문자열에서 한눈에 읽을 머리값만 뽑고 나머지는 보조줄로 내린다 */
function headline(v) {
  const s = String(v || '').trim();
  if (s.includes('=')) {
    const i = s.lastIndexOf('=');
    const after = s.slice(i + 1).trim();
    const head = (after.match(/^[^(]+/) || [after])[0].trim();
    const par = (after.match(/\(([^)]*)\)/) || [])[1];
    return {head, rest: [s.slice(0, i).trim(), par].filter(Boolean).join(' · ')};
  }
  const m = s.match(/^([^(]+)\(([^)]*)\)\s*$/);
  if (m) return {head: m[1].trim(), rest: m[2].trim()};
  return {head: s, rest: ''};
}
function filtered() {
  const q = S.q.toLowerCase();
  return DATA.lots.filter(l =>
    (!S.abn || l.verdict !== 'NORMAL') &&
    (!S.verdict || l.verdict === S.verdict) &&
    (!S.scanner || l.scanner === S.scanner) &&
    (!S.chamber || l.chamber === S.chamber) &&
    (!S.metro || l.adiTool === S.metro || l.aciTool === S.metro) &&
    (S.dmin == null || l.day >= S.dmin) && (S.dmax == null || l.day <= S.dmax) &&
    (!q || [l.lot, l.scanner, l.reticle, l.chamber, l.adiTool, l.aciTool]
      .some(v => String(v || '').toLowerCase().includes(q)))
  ).sort((a, b) => a.lot.localeCompare(b.lot));   /* 로트 번호 오름차순 */
}

/* ── 필터 UI ──────────────────────────────────────────────── */
function fillSelects() {
  const cnt = {};
  DATA.lots.forEach(l => cnt[l.verdict] = (cnt[l.verdict] || 0) + 1);
  const order = ['ETCH_CHAMBER','METROLOGY_TOOL_DRIFT','PHOTO_DOSE','PHOTO_TRACK_RADIAL',
                 'RETICLE_CD_ERROR','INDETERMINATE','NORMAL'].filter(v => cnt[v]);
  $('#fVerdict').innerHTML = `<option value="">${esc(t('list.all'))}</option>` +
    order.map(v => `<option value="${v}"${S.verdict === v ? ' selected' : ''}>${esc(shortLabel(v))} (${cnt[v]})</option>`).join('');
  const uniq = k => [...new Set(DATA.lots.map(l => l[k]).filter(Boolean))].sort();
  const fill = (id, label, vals, cur) => $(id).innerHTML =
    `<option value="">${esc(label)}</option>` +
    vals.map(v => `<option${cur === v ? ' selected' : ''}>${esc(v)}</option>`).join('');
  fill('#fScanner', t('list.sc'), uniq('scanner'), S.scanner);
  fill('#fChamber', t('list.ch'), uniq('chamber'), S.chamber);
  fill('#fMetro', t('list.mt'),
       [...new Set([...DATA.lots.map(l => l.adiTool), ...DATA.lots.map(l => l.aciTool)].filter(Boolean))].sort(),
       S.metro);
  const abn = DATA.lots.filter(l => l.verdict !== 'NORMAL').length;
  $('#fAbn').textContent = `${t('list.abn')} ${abn}`;
  $('#fAbn').setAttribute('aria-pressed', String(S.abn));
}

/* ── 로트 목록 ────────────────────────────────────────────── */
function renderList() {
  const rows = filtered();
  $('#listCount').textContent = `${rows.length}${t('list.of')} / ${DATA.lots.length}`;
  const box = $('#lotlist');
  if (!rows.length) { box.innerHTML = `<p class="empty">${esc(t('list.none'))}</p>`; return; }
  box.innerHTML = rows.slice(0, 400).map(l => {
    const o = outCount(l), g = gateOk(l);
    const sig = o ? (LANG === 'ko' ? `이탈 ${o}개` : `${o} out of limit`)
                  : (LANG === 'ko' ? '전 지표 이내' : 'all within');
    return `<button class="lotrow" role="option" data-lot="${l.lot}" aria-selected="false">
      <span class="dot" style="background:${COLOR[l.verdict]}"></span>
      <span><span class="lotid">${l.lot}</span>
        <span class="lotmeta">${l.date} · ${esc(l.scanner)} · ${esc(l.chamber)} · ${esc(l.adiTool)}${l.aciMean == null ? ' · AEI skip' : ''}</span></span>
      <span class="lotright">
        <span class="sub mono">${sig}</span>
        ${g ? '' : `<span class="badge b-hold">${esc(t('gatehold'))}</span>`}
        <span class="badge ${BCLASS[l.risk] || 'b-ok'}">${esc(shortLabel(l.verdict))}</span>
      </span></button>`;
  }).join('');
  box.querySelectorAll('.lotrow').forEach(b => b.onclick = () => openLot(b.dataset.lot));
}

/* ── 로트 상세 ────────────────────────────────────────────── */
function openLot(id, push = true) {
  const l = DATA.lots.find(x => x.lot === id); if (!l) return;
  S.lot = id; S.waf = 'adi';
  /* 로트마다 주소를 남긴다 — 링크 공유와 브라우저 뒤로가기가 모두 동작한다 */
  try {
    const want = location.pathname + '#lot=' + id;
    if (location.pathname + location.hash !== want) push ? history.pushState(null, '', want)
                                                        : history.replaceState(null, '', want);
  } catch (e) {}
  $('#listCard').hidden = true; $('#detail').hidden = false;
  const inv = INV[id], g = gateOk(l), outs = (l.ev || []).filter(e => e.hit);
  const A = actionSteps(actionText(l));

  const chips = [];
  if (l.module && l.module !== '-') chips.push(LANG === 'ko' ? (MODULE_KO[l.module] || l.module) : l.module);
  chips.push(`Scanner ${l.scanner}`, `Reticle ${l.reticle}`, `Chamber ${l.chamber}`,
             `ADI ${l.adiTool}`, l.aciTool ? `AEI ${l.aciTool}` : `AEI skip`, `Day ${l.day}`,
             `RF ${l.rf}h`);

  const evRows = (l.ev || []).map(e => {
    const tm = EV_GLOSS[evTerm(e.k)], m = margin(e), st = rowState(e);
    return `<tr class="${e.hit ? 'alert' : ''}">
      <td><span class="pl">${esc(plainLabel(e.k))}</span>${infoBtn(tm)}
        <span class="tech mono">${esc(evLabel(e.k))}</span></td>
      <td class="num">${esc(aei(e.v))}</td><td class="num">${esc(e.lim)}</td>
      <td class="num">${m ? (m.left >= 0 ? esc(m.left.toFixed(2))
            : `<span class="bad">${esc(t('over', {v: Math.abs(m.left).toFixed(2)}))}</span>`) : '—'}</td>
      <td class="src">${esc(sourceLabel(e.k))}</td>
      <td><span class="state ${st.cls}">${esc(st.text)}</span></td></tr>`;
  }).join('');

  const gateRows = (l.gate || []).length
    ? (l.gate || []).map(x => `<tr class="${x.ok ? '' : 'alert'}"><td>${esc(gateLabel(x.c))}</td>
        <td><span class="state ${x.ok ? 's-ok' : 's-bad'}">${esc(x.ok ? t('pass') : t('fail'))}</span></td></tr>`).join('')
    : `<tr><td colspan="2" class="sub">${esc(t('d.gatenone'))}</td></tr>`;

  const st = status3(l);
  const changed = outs.length ? outs.map(e => plainLabel(e.k)).join(' · ') : t('d.nochange');

  $('#detail').innerHTML = `
<div class="crumb">
  <button class="gbtn" id="bBack">${esc(t('back'))}</button>
  <span class="sub" aria-hidden="true">/</span><span class="sub mono">${l.lot}</span>
  <span class="spacer"></span>
  <button class="gbtn" id="bPrev">${esc(t('prev'))}</button>
  <button class="gbtn" id="bNext">${esc(t('next'))}</button>
</div>

<div class="panel decision">
  <div class="dhead">
    <h1>${l.lot}</h1>
    <span class="pill ${st.cls}">${esc(t(st.k))}</span>
    <span class="pill p-verify term" data-t="${g ? 'gate_ok' : 'gate_hold'}" tabindex="0"
          role="button">${esc(g ? t('verified') : t('needev'))}</span>
    <span class="spacer"></span>
    <span class="asof">${esc(t('d.asof'))} <span class="mono">${esc(l.date)}</span></span>
  </div>
  <div class="dsec"><h3>${esc(t('d.changed'))}</h3><p>${esc(changed)}</p></div>
  <div class="dsec"><h3>${esc(t('d.cause'))}</h3>
    <p><b style="color:${COLOR[l.verdict]}">${esc(verdictLabel(l))}</b>${
      l.module && l.module !== '-' ? ' · ' + esc(LANG === 'ko' ? (MODULE_KO[l.module] || l.module) : l.module) : ''}</p></div>
  <div class="dsec"><h3>${esc(t('d.facts'))}</h3>
    <ul class="facts">${lotFacts(l).map(f => `<li>${autoTerm(f)}</li>`).join('')}</ul></div>
  <div class="dsec"><h3>${esc(t('d.act'))}</h3>
    ${actionTarget(l) ? `<p class="target">${actionTarget(l)}</p>` : ''}
    ${A.steps.length
      ? `${A.lead ? `<p style="margin-bottom:10px">${esc(A.lead)}</p>` : ''}
         <ol class="steps">${A.steps.map(x => `<li>${autoTerm(markLot(x, l))}</li>`).join('')}</ol>`
      : `<p>${markLot(A.lead, l)}</p>`}
    ${l.extra ? `<div class="actnote mono">${esc(fixExtra(l.extra))}</div>` : ''}</div>
  <div class="jump">
    <button class="gbtn" data-jump="evPanel">${esc(t('d.evbtn'))}</button>
    <button class="gbtn" data-jump="tracePanel">${esc(t('d.tracebtn'))}</button>
  </div>
  <div class="ctxchips">${chips.map(c => `<span class="ctxchip">${esc(c)}</span>`).join('')}</div>
</div>

<div class="panel" id="evPanel">
  <header><h2>${esc(t('d.out'))}</h2></header>
  ${outs.length
    ? `<div class="outlist">${outs.map(e => { const h = headline(aei(e.v)), sg = sigSVG(evTerm(e.k), e);
        return `<div class="outcard">
        <div class="ocmain">
          <div class="k">${esc(plainLabel(e.k))}</div><div class="v">${esc(h.head)}</div>
          <div class="l">${h.rest ? esc(h.rest) + ' · ' : ''}${esc(t('th.limit'))} ${esc(e.lim)}
            · <span class="mono">${esc(evLabel(e.k))}</span></div>
        </div>
        ${sg ? `<div class="ocsig">${sg.svg}</div>
        <div class="octext"><b>${esc(sg.title)}</b><p>${esc(sg.desc)}</p>
          <span class="occ" style="color:${sg.tint}">→ ${esc(sg.concl)}</span></div>` : ''}</div>`; }).join('')}</div>`
    : `<div class="allclear">✓ ${esc(t('d.whynormal', {n: (l.ev || []).length}))}</div>`}

  <h3 style="margin-top:26px">${esc(t('d.all'))}</h3>
  <p class="sub" style="margin:6px 0 14px">${esc(t('d.allsub'))}</p>
  <div class="tw"><table><thead><tr><th>${esc(t('th.plain'))}</th><th class="num">${esc(t('th.value'))}</th>
    <th class="num">${esc(t('th.limit'))}</th><th class="num">${esc(t('th.margin'))}</th>
    <th>${esc(t('th.source'))}</th><th>${esc(t('th.state'))}</th></tr></thead>
    <tbody>${evRows}</tbody></table></div>
</div>

<div class="panel">
  <header><h2>${esc(t('d.gate'))}${infoBtn('attribution')}</h2><span class="sub">${esc(t('d.gatesub'))}</span></header>
  <div class="tw"><table><thead><tr><th>${esc(t('th.cond'))}</th><th>${esc(t('th.met'))}</th></tr></thead>
    <tbody>${gateRows}</tbody></table></div>
</div>

<div class="panel" id="tracePanel">
  <header><h2>${esc(t('d.trace'))}</h2><span class="sub">${esc(t('d.tracesub'))}</span></header>
  <div class="tracehead"><span>${t('d.tracesum', {n: `<b>${inv?.tool_calls ?? '—'}</b>`,
    o: `<b>${outs.length}</b>`, g: `<b>${g ? t('pass') : t('fail')}</b>`})}</span></div>
  ${renderTrace(inv)}
</div>

<div class="panel">
  <header><h2>${esc(t('d.wafer'))}</h2><span class="sub">${esc(t('d.wafersub'))}</span></header>
  <div class="segs">
    <button class="chip" data-waf="adi" aria-pressed="true">${esc(t('d.wadi'))}</button>
    <button class="chip" data-waf="delta" aria-pressed="false">${esc(t('d.wdelta'))}</button>
  </div>
  <div class="wafwrap">
    <svg class="wafer" id="wafer" viewBox="-178 -178 356 356" role="img"></svg>
    <div class="heat"><span class="mono" id="hLo"></span><span class="bar"></span><span class="mono" id="hHi"></span></div>
    <p class="sub" id="wafCap" style="margin-top:12px;text-align:center"></p>
  </div>
</div>`;

  $$('#detail [data-jump]').forEach(b => b.onclick = () => {
    const el = $('#' + b.dataset.jump);
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  $('#bBack').onclick = closeLot;
  $('#bPrev').onclick = () => step(-1);
  $('#bNext').onclick = () => step(1);
  $$('#detail [data-waf]').forEach(b => b.onclick = () => {
    S.waf = b.dataset.waf;
    $$('#detail [data-waf]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    paintWafer(l);
  });
  paintWafer(l);
  scrollTo({top: 0, behavior: 'smooth'});
}
function closeLot(push = true) {
  S.lot = null; $('#detail').hidden = true; $('#listCard').hidden = false;
  try { if (location.hash) push ? history.pushState(null, '', location.pathname)
                                : history.replaceState(null, '', location.pathname); } catch (e) {}
}
function step(d) {
  const rows = filtered(), i = rows.findIndex(x => x.lot === S.lot);
  if (i > -1 && rows[i + d]) openLot(rows[i + d].lot);
}

/* 어떤 단계가 '이 로트에서만 달랐는지'를 찾는다.
   도구별로 가장 흔한 사유를 기준선으로 두고, 그와 다른 단계를 특이 단계로 본다. */
let _modeReason = null;
function modeReason() {
  if (_modeReason) return _modeReason;
  const cnt = {};
  Object.values(INV).forEach(v => (v.trace || []).forEach(st => {
    (cnt[st.tool] = cnt[st.tool] || {})[st.reason] = (cnt[st.tool]?.[st.reason] || 0) + 1;
  }));
  _modeReason = {};
  Object.entries(cnt).forEach(([tool, rs]) => {
    _modeReason[tool] = Object.entries(rs).sort((a, b) => b[1] - a[1])[0][0];
  });
  return _modeReason;
}

function renderTrace(inv) {
  if (!inv?.trace?.length) return `<p class="empty">${esc(LANG === 'ko' ? '이 로트의 조사 기록이 없습니다.' : 'No trace available.')}</p>`;
  const MODE = modeReason();
  return inv.trace.map((s, i) => {
    const evs = s.tool === 'get_equipment_events' ? (s.result?.events || []) : [];
    const only = MODE[s.tool] && s.reason !== MODE[s.tool];
    return `<div class="step${only ? ' only' : ''}">
      <div class="tool"><span class="mono sub">${String(i + 1).padStart(2, '0')}</span> ${esc(toolLabel(s.tool))}
        ${only ? `<span class="onlytag">${esc(t('d.only'))}</span>` : ''}</div>
      <div class="why">${esc(reasonText(s.reason))}</div>
      ${evs.length ? `<div class="evs">${evs.slice(0, 3).map(e =>
        `<div><span class="mono">D${e.day_index}</span> · ${esc(e.event_type)}${e.component ? ' · ' + esc(e.component) : ''} — ${esc(e.description || '')}</div>`).join('')}
        ${evs.length > 3 ? `<div class="sub">+${evs.length - 3}</div>` : ''}</div>` : ''}
      <details class="raw"><summary>${esc(t('raw'))}</summary><pre class="rawjson">${esc(JSON.stringify(s.result, null, 2))}</pre></details>
    </div>`;
  }).join('');
}



/* ── 이 로트에서만 다른 것 ─────────────────────────────────────────
   규칙 KB의 원인·조치 문안은 같은 verdict 안에서 동일하다. 실제로 로트마다
   다른 것은 (1) 이탈한 항목의 조합 (2) 측정값의 크기 (3) 어느 설비를 지났는가
   (4) 감시 데이터가 얼마나 최신인가 네 가지다. 그 네 가지를 로트 데이터에서
   직접 뽑아 문장으로 만들고, 달라지는 값만 붉게 표시한다. */
const R = v => `<b class="hl">${esc(v)}</b>`;

function lotFacts(l) {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const outs = (l.ev || []).filter(e => e.hit);
  const get = term => outs.find(e => evTerm(e.k) === term);
  const numOf = e => { const m = String(e.v).match(/[+-]?\d+(?:\.\d+)?/); return m ? m[0] : '—'; };
  const F = [];

  /* 1. 지나온 설비 — 로트마다 조합이 다르다 */
  F.push(L(`노광 ${R(l.scanner)} · 레티클 ${R(l.reticle)} · 식각 ${R(l.chamber)} · ADI 측정 ${R(l.adiTool)}` +
           (l.aciTool ? ` · AEI 측정 ${R(l.aciTool)}` : ` · AEI ${R('미측정(skip-lot)')}`),
           `Scanner ${R(l.scanner)} · reticle ${R(l.reticle)} · chamber ${R(l.chamber)} · ADI on ${R(l.adiTool)}` +
           (l.aciTool ? ` · AEI on ${R(l.aciTool)}` : ` · AEI ${R('not measured')}`)));

  /* 2. 이탈 항목별 실측값 */
  const adi = get('ADI'), rad = get('RADIAL'), ret = get('RETICLE_REPEAT'),
        dcd = get('DELTA_CD'), ch = get('CHAMBER'), mon = get('MONITOR'),
        tmu = get('TMU'), sen = get('SENSOR');
  if (adi) F.push(L(`웨이퍼 평균 CD가 목표에서 ${R(numOf(adi) + ' nm')} 벗어남 (한계 ${adi.lim})`,
                    `Wafer mean CD off target by ${R(numOf(adi) + ' nm')} (limit ${adi.lim})`));
  if (rad) F.push(L(`중심–가장자리 편차 ${R(numOf(rad) + ' nm')} (한계 ${rad.lim})`,
                    `Center-to-edge spread ${R(numOf(rad) + ' nm')} (limit ${rad.lim})`));
  if (ret) F.push(L(`동일 site 반복 오차 ${R(numOf(ret) + ' nm')} (한계 ${ret.lim}) — 레티클 ${R(l.reticle)}`,
                    `Same-site repeat ${R(numOf(ret) + ' nm')} (limit ${ret.lim}) on reticle ${R(l.reticle)}`));
  if (sen) { const g = (String(sen.v).match(/\(([+-][\d.]+)%\)/) || [])[1];
    F.push(L(`Setting ${R(l.doseSet + ' mJ/cm²')} 유지, Energy Sensor 실측 ${R(l.doseSensor + ' mJ/cm²')} (${R(g + '%')})`,
             `Setting held at ${R(l.doseSet + ' mJ/cm²')}, sensor read ${R(l.doseSensor + ' mJ/cm²')} (${R(g + '%')})`)); }
  if (dcd) F.push(L(`Etch bias가 기준 ${M.etchBias} nm에서 ${R(numOf(dcd) + ' nm')} 벗어남 (한계 ${dcd.lim})`,
                    `Etch bias off the ${M.etchBias} nm reference by ${R(numOf(dcd) + ' nm')} (limit ${dcd.lim})`));
  if (ch) F.push(L(`${R(l.chamber)} 챔버 편중 ${R(numOf(ch) + ' nm')} · PM 후 RF ${R(l.rf + ' h')} 경과`,
                   `${R(l.chamber)} commonality ${R(numOf(ch) + ' nm')} · ${R(l.rf + ' h')} of RF since PM`));
  if (mon) { const age = (String(mon.v).match(/(\d+)d ago/) || [])[1];
    F.push(L(`${R(l.aciTool || l.adiTool)}의 monitor wafer가 ${R(numOf(mon) + ' nm')} 이동 (${R(age + '일 전')} 측정)`,
             `Monitor wafer on ${R(l.aciTool || l.adiTool)} drifted ${R(numOf(mon) + ' nm')} (measured ${R(age + 'd ago')})`)); }
  if (tmu) { const pc = (String(tmu.v).match(/=\s*([\d.]+)%/) || [])[1];
    F.push(L(`계측 불확도가 공정 예산의 ${R(pc + '%')} 소비 (허용 ${M.tmuBudget}%)`,
             `Metrology uncertainty uses ${R(pc + '%')} of the budget (limit ${M.tmuBudget}%)`)); }

  if (!outs.length) {
    F.push(L(`감시 지표 ${R((l.ev || []).length + '개')} 전부 관리 한계 이내 · 귀속 트리거 없음`,
             `All ${R((l.ev || []).length)} indicators within limit · no attribution trigger`));
    /* 정상이라고 다 같은 정상이 아니다. 한계에 가장 근접한 항목을 함께 적어
       이 로트가 얼마나 여유를 두고 통과했는지 보이게 한다. */
    let tight = null, ratio = -1;
    (l.ev || []).forEach(e => {
      const m = margin(e);
      if (!m || !m.cap) return;
      const used = (m.cap - m.left) / m.cap;
      if (used > ratio) { ratio = used; tight = {e, m}; }
    });
    if (tight) F.push(L(
      `한계에 가장 근접한 항목은 ${R(plainLabel(tight.e.k))} — 예산의 ${R(Math.round(ratio * 100) + '%')} 소비 (여유 ${R(tight.m.left.toFixed(2))})`,
      `Closest to its limit: ${R(plainLabel(tight.e.k))} — ${R(Math.round(ratio * 100) + '%')} of budget used (margin ${R(tight.m.left.toFixed(2))})`));
  }
  return F;
}

/* 규칙 KB의 조치 문안은 일반론이라 설비 ID가 없다.
   이 로트에서 실제로 손대야 할 설비를 verdict에 따라 짚어준다. */
function actionTarget(l) {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const pick = {
    PHOTO_DOSE:           [l.scanner, L('스캐너', 'scanner')],
    RETICLE_CD_ERROR:     [l.reticle, L('레티클', 'reticle')],
    ETCH_CHAMBER:         [l.chamber, L('식각 챔버', 'etch chamber')],
    METROLOGY_TOOL_DRIFT: [l.aciTool || l.adiTool, L('계측 장비', 'metrology tool')],
  }[l.verdict];
  if (!pick || !pick[0]) return '';
  return L(`조치 대상 — ${pick[1]} ${R(pick[0])}`, `Target — ${pick[1]} ${R(pick[0])}`);
}

/* 조치 문안 안에서 이 로트에 해당하는 설비 ID와 수치를 붉게 표시한다 */
function markLot(text, l) {
  let out = esc(text);
  const ids = [l.chamber, l.adiTool, l.aciTool, l.scanner, l.reticle].filter(Boolean);
  [...new Set(ids)].forEach(id => {
    out = out.split(id).join(`<b class="hl">${id}</b>`);
  });
  return out;
}

/* ── 이상 지문 시각화 ──────────────────────────────────────────────
   "어느 좌표계에서 어긋났는가"를 그림으로 보여준다.
   글자는 SVG 안에 넣지 않는다. 브라우저·화면 폭에 따라 잘리기 때문에
   그림은 도형만 그리고 설명은 HTML로 옆에 붙인다. */
function sigSVG(term, e) {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const HOT = '#BF4630', COLD = '#2C6DA6', LINE = '#C8D2D8';
  const sign = /^[-−]/.test(String(e.v).trim()) ? -1 : 1;
  const tint = sign > 0 ? HOT : COLD;
  const wafer = inner => `<circle cx="62" cy="58" r="44" fill="#FCFBFD" stroke="${LINE}" stroke-width="1.3"/>
      ${inner}<path d="M57 102h10l-5-8z" fill="${LINE}"/>`;
  /* 축과 기준선을 넣어 "무엇 대비 얼마나" 가 읽히게 한다.
     문장은 그림 밖 HTML에 있으므로 여기서는 단위·기준값만 최소로 적는다. */
  const AX = '#8B8593', TXT = '#57505C';
  const box = g => `<svg viewBox="0 0 150 132" role="img" aria-hidden="true">${g}</svg>`;
  const vaxis = (label, mid) => `
    <line x1="22" y1="14" x2="22" y2="104" stroke="${AX}" stroke-width="1.1"/>
    <line x1="22" y1="${mid}" x2="140" y2="${mid}" stroke="${AX}" stroke-width="1.1" stroke-dasharray="4 3"/>
    <text x="26" y="${mid - 4}" font-size="8" fill="${TXT}">${label}</text>`;
  const R = (svg, a, b, c) => ({svg, title: a, desc: b, concl: c, tint});

  switch (term) {
    case 'ADI':
      return R(box(wafer(`<circle cx="62" cy="58" r="44" fill="${tint}" fill-opacity=".32"/>`) +
        `<text x="10" y="126" font-size="8.5" fill="${TXT}">${L('웨이퍼 전면 = 같은 편차','whole wafer, same offset')}</text>`),
        L('웨이퍼 전면이 같은 방향으로 이동', 'The whole wafer shifts together'),
        L('중심과 가장자리 구분 없이 균일하게 이동합니다.', 'Center and edge move by the same amount.'),
        L('Dose 계열 지문', 'Dose-family fingerprint'));

    case 'RADIAL':
      return R(box(wafer(`<circle cx="62" cy="58" r="44" fill="${tint}" fill-opacity=".32"/>
          <circle cx="62" cy="58" r="29" fill="#FCFBFD"/>
          <circle cx="62" cy="58" r="14" fill="${sign > 0 ? COLD : HOT}" fill-opacity=".32"/>`) +
        `<line x1="18" y1="58" x2="106" y2="58" stroke="${AX}" stroke-width="1"/>
         <text x="10" y="126" font-size="8.5" fill="${TXT}">${L('가로축 = 웨이퍼 반경 (중심→엣지)','x: wafer radius, center → edge')}</text>`),
        L('중심과 가장자리가 반대 방향', 'Center and edge move apart'),
        L('평균은 그대로여도 산포가 벌어집니다.', 'The mean can stay flat while the spread grows.'),
        L('PEB · Coat 계열 지문', 'PEB / coat fingerprint'));

    case 'RETICLE_REPEAT': {
      let g = '';
      for (let fx = 0; fx < 3; fx++) for (let fy = 0; fy < 2; fy++) {
        const x = 8 + fx * 38, y = 20 + fy * 46;
        g += `<rect x="${x}" y="${y}" width="34" height="42" fill="none" stroke="${LINE}"/>
              <circle cx="${x + 24}" cy="${y + 11}" r="4.6" fill="${HOT}"/>`;
      }
      return R(box(g + `<text x="8" y="126" font-size="8.5" fill="${TXT}">${L('칸 = 노광 field · 점 = 이탈 site','box: exposure field, dot: offending site')}</text>`),
        L('모든 field의 같은 자리에서 반복', 'Repeats at the same site in every field'),
        L('웨이퍼 위치와 무관하게 동일한 패턴이 나타납니다.', 'The same pattern appears regardless of field position.'),
        L('Reticle 지문', 'Reticle fingerprint'));
    }

    case 'DELTA_CD': case 'DELTA_NA': {
      const adi = 56, aei = Math.max(20, 56 + sign * 18);
      return R(box(`<line x1="22" y1="14" x2="22" y2="88" stroke="${AX}" stroke-width="1.1"/>
        <line x1="22" y1="88" x2="140" y2="88" stroke="${AX}" stroke-width="1.1"/>
        <text x="4" y="20" font-size="8" fill="${TXT}">CD</text>
        <rect x="40" y="${88 - adi}" width="30" height="${adi}" fill="#C9D4D9" stroke="#14060F" stroke-width="1.1"/>
        <rect x="92" y="${88 - aei}" width="30" height="${aei}" fill="${tint}" fill-opacity=".32" stroke="${tint}" stroke-width="1.6"/>
        <path d="M74 60h12" stroke="${LINE}" stroke-width="1.5"/><path d="M82 55l6 5-6 5" fill="${LINE}"/>
        <text x="46" y="100" font-size="8.5" fill="${TXT}">ADI</text>
        <text x="98" y="100" font-size="8.5" fill="${tint}">AEI</text>
        <text x="4" y="126" font-size="8.5" fill="${TXT}">${L('두 막대 차이 = Etch bias','bar gap = etch bias')}</text>`),
        L('ADI는 정상, 식각 후에만 이동', 'ADI is clean; it moves only after etch'),
        L('노광 단계는 배제되고 후보가 둘로 좁혀집니다.', 'Litho is ruled out; two candidates remain.'),
        L('Etch 또는 Metrology', 'Etch or metrology'));
    }

    case 'CHAMBER': {
      const hot = (e.k.match(/CH-[A-D]/) || ['CH-?'])[0];
      let g = '';
      ['CH-A', 'CH-B', 'CH-C', 'CH-D'].forEach((c, i) => {
        const on = c === hot, x = 8 + (i % 2) * 58, y = 18 + Math.floor(i / 2) * 52;
        g += `<rect x="${x}" y="${y}" width="50" height="44" rx="6" fill="${on ? tint : '#fff'}"
                fill-opacity="${on ? .28 : 1}" stroke="${on ? tint : LINE}" stroke-width="${on ? 2.2 : 1.2}"/>
              <text x="${x + 25}" y="${y + 27}" text-anchor="middle" font-size="11"
                fill="${on ? tint : '#57505C'}" font-weight="${on ? 700 : 400}">${c}</text>`;
      });
      return R(box(g + `<text x="8" y="126" font-size="8.5" fill="${TXT}">${L('색칠된 칸 = 편차가 몰린 Chamber','filled box: the chamber carrying the deviation')}</text>`),
        L(`${hot} Chamber를 지난 Lot에만 집중`, `Concentrated on lots through ${hot}`),
        L('다른 Chamber를 지난 Lot은 정상입니다.', 'Lots through the other chambers are clean.'),
        L('Etch Chamber 지문', 'Etch chamber fingerprint'));
    }

    case 'MONITOR':
      return R(box(vaxis(L('기준선 0','baseline 0'), 62) +
        `<polyline points="26,62 52,61 74,62 100,${62 - sign * 16} 132,${62 - sign * 28}" fill="none"
          stroke="${tint}" stroke-width="2.6"/>
        <circle cx="132" cy="${62 - sign * 28}" r="4.4" fill="${tint}"/>
        <text x="4" y="20" font-size="8" fill="${TXT}">nm</text>
        <text x="4" y="126" font-size="8.5" fill="${TXT}">${L('가로축 = 시간 (반복 측정일)','x: time, repeat measurements')}</text>`),
        L('공정이 닿지 않은 웨이퍼가 이동', 'A wafer no process touched has moved'),
        L('Monitor wafer는 라인에 재투입하지 않습니다. 이동분은 측정 장비 기여입니다.',
          'The monitor wafer never re-enters the line, so the shift belongs to the tool.'),
        L('Metrology 지문', 'Metrology fingerprint'));

    case 'TMU': {
      const m = String(e.v).match(/=\s*(\d+(?:\.\d+)?)%/), pct = m ? Math.min(+m[1], 100) : 0;
      return R(box(`<rect x="14" y="48" width="120" height="26" rx="4" fill="#F2F5F6" stroke="${LINE}"/>
        <rect x="14" y="48" width="${120 * pct / 100}" height="26" rx="4" fill="${HOT}" fill-opacity=".38"/>
        <line x1="${14 + 120 * 0.2}" y1="38" x2="${14 + 120 * 0.2}" y2="84" stroke="${HOT}" stroke-width="2" stroke-dasharray="4 3"/>
        <text x="${14 + 120 * 0.2}" y="33" text-anchor="middle" font-size="9" fill="${HOT}">20%</text>
        <text x="14" y="92" font-size="8" fill="${TXT}">0%</text>
        <text x="134" y="92" text-anchor="end" font-size="8" fill="${TXT}">100%</text>
        <text x="14" y="126" font-size="8.5" fill="${TXT}">${L('막대 = 공정 예산 중 계측 몫','bar: share of tolerance used by metrology')}</text>`),
        L(`계측 오차가 공정 예산의 ${m ? m[1] : '—'}%를 소비`, `Measurement error uses ${m ? m[1] : '—'}% of the budget`),
        L('허용 기준 20%를 넘어 공정 변동과 측정 오차가 구분되지 않습니다.',
          'Past the 20% limit, process variation and measurement error can no longer be separated.'),
        L('이 장비 측정값으로 공정 조치 불가', 'No process action on this tool\u2019s readings'));
    }

    case 'SENSOR':
      return R(box(`<line x1="22" y1="14" x2="22" y2="96" stroke="${AX}" stroke-width="1.1"/>
        <line x1="22" y1="60" x2="140" y2="60" stroke="#57505C" stroke-width="1.8" stroke-dasharray="5 3"/>
        <text x="26" y="56" font-size="8" fill="${TXT}">Setting</text>
        <polyline points="26,60 56,60 88,${60 - sign * 12} 132,${60 - sign * 24}" fill="none" stroke="${tint}" stroke-width="2.6"/>
        <text x="86" y="${60 - sign * 30}" font-size="8" fill="${tint}">Sensor</text>
        <path d="M132 ${60 - sign * 24} V60" stroke="${HOT}" stroke-width="1.8"/>
        <circle cx="132" cy="${60 - sign * 24}" r="4" fill="${tint}"/>
        <text x="4" y="20" font-size="8" fill="${TXT}">mJ/cm²</text>
        <text x="4" y="126" font-size="8.5" fill="${TXT}">${L('세로 간격 = 실효 dose 오차','gap: delivered-dose error')}</text>`),
        L('Recipe는 그대로, 실조사량만 이동', 'Recipe unchanged; only the delivered dose moved'),
        L('Setting을 고쳐도 실효 dose는 그대로여서 재발합니다.',
          'Editing the setting would not change the delivered dose.'),
        L('Calibration 우선', 'Calibration first'));

    default: return null;
  }
}

/* ── 웨이퍼 맵 ────────────────────────────────────────────── */
function heat(v, s) {
  const k = Math.max(-1, Math.min(1, v / s)), a = [44,109,166], b = [243,241,244], c = [191,70,48];
  const mix = (x, y, m) => x.map((n, i) => Math.round(n + (y[i] - n) * m));
  return `rgb(${(k < 0 ? mix(b, a, -k) : mix(b, c, k)).join(',')})`;
}
function paintWafer(l) {
  const isAdi = S.waf === 'adi';
  const vals = isAdi ? l.adiMap : (l.deltaMap ? l.deltaMap.map(v => v - M.etchBias) : null);
  const scale = isAdi ? 4 : 3, g = $('#wafer');
  const tool = isAdi ? l.adiTool : l.aciTool;
  $('#hLo').textContent = `−${scale} nm (${t('d.narrow')})`;
  $('#hHi').textContent = `+${scale} nm (${t('d.wide')})`;
  $('#wafCap').textContent = isAdi
    ? `${t('d.wadi')} · ${LANG === 'ko' ? '웨이퍼 평균' : 'wafer mean'} ${l.adiMean} nm (target ${M.adiTarget} nm) · ${tool}`
    : (l.aciMean == null ? t('d.noaci')
      : `${t('d.wdelta')} · ${LANG === 'ko' ? '웨이퍼 평균' : 'wafer mean'} ${num(l.deltaMap.reduce((a, b) => a + b, 0) / l.deltaMap.length)} nm (ref ${M.etchBias} nm) · ${tool}`);
  if (!vals) {
    g.innerHTML = `<circle r="150" fill="#FAF9FB" stroke="#DCD7DE" stroke-dasharray="6 5"/>
      <text y="4" text-anchor="middle" font-size="12" fill="#6B6270" font-family="IBM Plex Sans KR">${esc(t('d.noaci'))}</text>`;
    return;
  }
  const seen = {};
  let s = `<circle r="150" fill="#FCFBFD" stroke="#DCD7DE" stroke-width="1.3"/>
    <path d="M -10 150 L 10 150 L 0 136 Z" fill="#DCD7DE"/>
    <line x1="-150" y1="0" x2="150" y2="0" stroke="#EDEAEF"/><line x1="0" y1="-150" x2="0" y2="150" stroke="#EDEAEF"/>`;
  DATA.sites.forEach(p => {
    const k = p.field_x + ',' + p.field_y; if (seen[k]) return; seen[k] = 1;
    s += `<rect x="${p.field_x * 26 - 13}" y="${-p.field_y * 33 - 16.5}" width="26" height="33" fill="none" stroke="#EDEAEF"/>`;
  });
  DATA.sites.forEach((p, i) => {
    s += `<circle cx="${p.wafer_x_mm}" cy="${-p.wafer_y_mm}" r="6" fill="${heat(vals[i], scale)}" stroke="#fff" stroke-width=".9"/>
      <circle class="spot" cx="${p.wafer_x_mm}" cy="${-p.wafer_y_mm}" r="11" fill="transparent" stroke="transparent"
      tabindex="0" role="img" data-i="${i}" aria-label="${p.site_id} ${num(vals[i])} nm"/>`;
  });
  g.innerHTML = s;
  g.querySelectorAll('.spot').forEach(c => {
    const show = () => {
      const i = +c.dataset.i, p = DATA.sites[i], v = vals[i];
      const abs = isAdi ? v + M.adiTarget : v + M.etchBias;
      showPop(`<h4>${esc(p.site_id)}</h4><p>
        <b>${LANG === 'ko' ? '실측' : 'Measured'}</b> <span class="mono">${num(abs)} nm</span><br>
        <b>${LANG === 'ko' ? '잔차' : 'Residual'}</b> <span class="mono">${v > 0 ? '+' : ''}${num(v)} nm</span><br>
        <b>Field</b> <span class="mono">(${p.field_x}, ${p.field_y})</span> · site ${p.site_in_field + 1}<br>
        <b>r/R</b> <span class="mono">${num(p.r_norm)}</span> · <b>Tool</b> <span class="mono">${esc(tool || '—')}</span></p>`, c);
    };
    c.addEventListener('mouseenter', show);
    c.addEventListener('focus', show);
    c.addEventListener('click', e => { e.stopPropagation(); show(); });
  });
}
/* ── 차트 공통 축 ─────────────────────────────────────────── */
function axes(o) {
  const X = v => o.x0 + (v - o.xmin) / (o.xmax - o.xmin) * (o.x1 - o.x0);
  const Y = v => o.y1 - (v - o.ymin) / (o.ymax - o.ymin) * (o.y1 - o.y0);
  const f = o.fmt || (v => v);
  let s = '';
  o.yt.forEach(v => s += `<line class="grid" x1="${o.x0}" y1="${Y(v)}" x2="${o.x1}" y2="${Y(v)}"/>
    <text x="${o.x0 - 9}" y="${Y(v) + 4}" text-anchor="end">${f(v)}</text>`);
  o.xt.forEach(v => s += `<line class="grid" x1="${X(v)}" y1="${o.y0}" x2="${X(v)}" y2="${o.y1}"/>
    <text x="${X(v)}" y="${o.y1 + 20}" text-anchor="middle">${v}</text>`);
  s += `<line class="axis" x1="${o.x0}" y1="${o.y0}" x2="${o.x0}" y2="${o.y1}"/>
    <line class="axis" x1="${o.x0}" y1="${o.y1}" x2="${o.x1}" y2="${o.y1}"/>
    <text class="axt" x="${(o.x0 + o.x1) / 2}" y="${o.y1 + 46}" text-anchor="middle">${o.xlab}</text>
    <text class="axt" x="${-(o.y0 + o.y1) / 2}" y="16" text-anchor="middle" transform="rotate(-90)">${o.ylab}</text>`;
  return {X, Y, s};
}
const METRICS = () => [
  {k: 'dbias', n: LANG === 'ko' ? 'ΔCD (etch bias) 편차' : 'Delta-CD deviation', lim: LIM.delta_bias, cen: CEN.delta_bias},
  {k: 'offset', n: LANG === 'ko' ? 'ADI 스칼라 이동' : 'ADI scalar shift', lim: LIM.adi_offset, cen: CEN.adi_offset},
  {k: 'radial', n: LANG === 'ko' ? 'ADI 반경 성분' : 'ADI radial shift', lim: LIM.adi_radial, cen: CEN.adi_radial},
];
function drawTrend() {
  const ms = METRICS(), m = ms.find(x => x.k === S.metric) || ms[0];
  $('#metricPick').innerHTML = ms.map(x =>
    `<button class="chip" data-k="${x.k}" aria-pressed="${x.k === m.k}">${esc(x.n)}</button>`).join('');
  $$('#metricPick [data-k]').forEach(b => b.onclick = () => { S.metric = b.dataset.k; drawTrend(); });
  const pts = DATA.lots.filter(l => l.m[m.k] != null).map(l => ({d: l.day, v: l.m[m.k] - m.cen, l}));
  const span = Math.max(m.lim * 2.2, ...pts.map(p => Math.abs(p.v))) * 1.1;
  const A = axes({x0: 64, x1: 968, y0: 22, y1: 300, xmin: 0, xmax: M.days - 1, ymin: -span, ymax: span,
    xt: [0, 5, 10, 15, 20, 25, 30, 35, 39], yt: [-span, -m.lim, 0, m.lim, span].map(v => +v.toFixed(2)),
    xlab: LANG === 'ko' ? `생산일 (0 = 첫 생산일, 총 ${M.days}일)` : `Production day (0–${M.days - 1})`,
    ylab: m.n + ' (nm)', fmt: v => v.toFixed(1)});
  let s = `<rect x="64" y="${A.Y(m.lim)}" width="904" height="${A.Y(-m.lim) - A.Y(m.lim)}" fill="rgba(99,70,112,.07)"/>${A.s}
    <line x1="64" y1="${A.Y(0)}" x2="968" y2="${A.Y(0)}" stroke="#B8B0BC" stroke-dasharray="4 4"/>`;
  pts.forEach(p => {
    const out = Math.abs(p.v) > m.lim;
    s += `<circle class="pt" cx="${A.X(p.d)}" cy="${A.Y(p.v)}" r="${out ? 5 : 3}" fill="${COLOR[p.l.verdict]}"
      fill-opacity="${p.l.verdict === 'NORMAL' ? .3 : .95}" stroke="${out ? '#fff' : 'none'}" stroke-width="1.2"
      tabindex="0" role="button" data-lot="${p.l.lot}" aria-label="${p.l.lot} ${num(p.v)} nm"/>`;
  });
  const g = $('#trendChart'); g.innerHTML = s;
  g.querySelectorAll('.pt').forEach(c => {
    const lot = DATA.lots.find(x => x.lot === c.dataset.lot);
    const show = () => showPop(`<h4>${lot.lot}</h4><p><b>${esc(m.n)}</b> <span class="mono">${num(lot.m[m.k] - m.cen)} nm</span><br>
      <b>${esc(t('th.limit'))}</b> <span class="mono">±${num(m.lim)}</span><br>
      <b>${LANG === 'ko' ? '판정' : 'Verdict'}</b> ${esc(verdictLabel(lot))}</p>
      <p style="margin-top:6px;color:#634670">${LANG === 'ko' ? '눌러서 이 로트 열기' : 'Click to open this lot'}</p>`, c);
    c.addEventListener('mouseenter', show); c.addEventListener('focus', show);
    c.addEventListener('click', e => { e.stopPropagation(); hidePop(); showView('lots'); openLot(c.dataset.lot); });
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } });
  });
  $('#trendLegend').innerHTML = [['NORMAL', shortLabel('NORMAL')], ['PHOTO_DOSE', 'Litho'],
    ['ETCH_CHAMBER', 'Etch'], ['METROLOGY_TOOL_DRIFT', 'Metrology'], ['INDETERMINATE', shortLabel('INDETERMINATE')]]
    .map(([k, n]) => `<span><i style="background:${COLOR[k]}"></i>${esc(n)}</span>`).join('') +
    `<span><i style="background:rgba(99,70,112,.15)"></i>${esc(t('th.limit'))} ±${num(m.lim)} nm</span>`;
}
const TOOLC = {'CDSEM-A': '#8B8593', 'CDSEM-B': '#2F6E74'};
function drawMonitor() {
  const span = Math.max(1.4, ...DATA.monitor.map(d => Math.abs(d.drift))) * 1.2;
  const A = axes({x0: 64, x1: 968, y0: 22, y1: 262, xmin: 0, xmax: M.days - 1, ymin: -span, ymax: span,
    xt: [0, 5, 10, 15, 20, 25, 30, 35, 39], yt: [-span, -LIM.tool_drift, 0, LIM.tool_drift, span].map(v => +v.toFixed(2)),
    xlab: LANG === 'ko' ? '생산일' : 'Production day',
    ylab: LANG === 'ko' ? '기준선 대비 이동량 (nm)' : 'Drift from baseline (nm)', fmt: v => v.toFixed(1)});
  let s = `<rect x="64" y="${A.Y(LIM.tool_drift)}" width="904" height="${A.Y(-LIM.tool_drift) - A.Y(LIM.tool_drift)}" fill="rgba(99,70,112,.07)"/>${A.s}`;
  Object.keys(TOOLC).forEach((tool, i) => {
    const r = DATA.monitor.filter(x => x.tool === tool);
    s += `<polyline points="${r.map(d => A.X(d.day) + ',' + A.Y(d.drift)).join(' ')}" fill="none"
      stroke="${TOOLC[tool]}" stroke-width="2.2" stroke-dasharray="${i ? '6 4' : ''}"/>`;
    r.forEach(d => s += `<circle cx="${A.X(d.day)}" cy="${A.Y(d.drift)}" r="3.4"
      fill="${Math.abs(d.drift) > LIM.tool_drift ? '#A8342B' : TOOLC[tool]}"/>`);
  });
  $('#monChart').innerHTML = s;
  $('#monLegend').innerHTML =
    `<span><i class="ln" style="border-color:${TOOLC['CDSEM-A']}"></i>CDSEM-A</span>
     <span><i class="ln" style="border-color:${TOOLC['CDSEM-B']};border-top-style:dashed"></i>CDSEM-B</span>
     <span><i style="background:rgba(99,70,112,.15)"></i>±${num(LIM.tool_drift)} nm</span>`;
}
function drawTmu() {
  const B = M.tmuBudget, top = Math.max(B * 1.6, ...DATA.tmu.map(x => x.ratio)) * 1.1;
  $('#tmuSub').textContent = LANG === 'ko'
    ? `공정 허용 반폭 ±${M.cdTol} nm 대비 소비율 · 예산 ${B}%`
    : `Consumption against ±${M.cdTol} nm tolerance · budget ${B}%`;
  const A = axes({x0: 64, x1: 968, y0: 22, y1: 262, xmin: 0, xmax: M.days - 1, ymin: 0, ymax: top,
    xt: [0, 5, 10, 15, 20, 25, 30, 35, 39], yt: [0, B, Math.round(top / 2), Math.round(top)]
      .filter((v, i, a) => a.indexOf(v) === i), xlab: LANG === 'ko' ? '생산일' : 'Production day',
    ylab: 'TMU / budget (%)', fmt: v => v + '%'});
  let s = `<rect x="64" y="22" width="904" height="${A.Y(B) - 22}" fill="rgba(168,52,43,.06)"/>${A.s}
    <line x1="64" y1="${A.Y(B)}" x2="968" y2="${A.Y(B)}" stroke="#A8342B" stroke-width="1.6" stroke-dasharray="6 4"/>
    <text x="70" y="${A.Y(B) - 8}" font-size="11" fill="#A8342B">${LANG === 'ko' ? `예산 ${B}% — 초과 시 공정 판정 근거 불가` : `Budget ${B}% — above this, readings cannot justify process action`}</text>`;
  Object.keys(TOOLC).forEach((tool, i) => {
    const r = DATA.tmu.filter(x => x.tool === tool).sort((a, b) => a.day - b.day);
    s += `<polyline points="${r.map(d => A.X(d.day) + ',' + A.Y(d.ratio)).join(' ')}" fill="none"
      stroke="${TOOLC[tool]}" stroke-width="2.2" stroke-dasharray="${i ? '6 4' : ''}"/>`;
    r.forEach(d => s += `<circle class="pt" cx="${A.X(d.day)}" cy="${A.Y(d.ratio)}" r="${d.ratio > B ? 5 : 3.4}"
      fill="${d.ratio > B ? '#A8342B' : TOOLC[tool]}" tabindex="0" role="img"
      data-tt="${tool}|${d.day}|${d.prec}|${d.match}|${d.tmu}|${d.ratio}"/>`);
  });
  const g = $('#tmuChart'); g.innerHTML = s;
  g.querySelectorAll('.pt').forEach(c => {
    const [tool, day, prec, mt, tmu, ratio] = c.dataset.tt.split('|');
    const show = () => showPop(`<h4>${esc(tool)} · D${day}</h4><p>
      <b>precision 3σ</b> <span class="mono">${prec} nm</span><br>
      <b>tool-to-tool match</b> <span class="mono">${mt} nm</span><br>
      <b>TMU</b> <span class="mono">√(${prec}² + ${mt}²) = ${tmu} nm</span><br>
      <b>${LANG === 'ko' ? '예산 소비' : 'Budget used'}</b> <span class="mono">${ratio}%</span></p>
      <p style="margin-top:6px;color:${+ratio > M.tmuBudget ? '#A8342B' : '#4A7052'}">
      ${+ratio > M.tmuBudget ? (LANG === 'ko' ? '예산 초과 — 이 장비 측정값으로 공정을 조치할 수 없습니다.' : 'Over budget — readings cannot justify process action.')
        : (LANG === 'ko' ? '예산 이내입니다.' : 'Within budget.')}</p>`, c);
    c.addEventListener('mouseenter', show); c.addEventListener('focus', show);
    c.addEventListener('click', e => { e.stopPropagation(); show(); });
  });
  $('#tmuLegend').innerHTML =
    `<span><i class="ln" style="border-color:${TOOLC['CDSEM-A']}"></i>CDSEM-A</span>
     <span><i class="ln" style="border-color:${TOOLC['CDSEM-B']};border-top-style:dashed"></i>CDSEM-B</span>
     <span><i style="background:#A8342B"></i>${LANG === 'ko' ? '예산 초과' : 'Over budget'}</span>`;
}
function drawChambers() {
  $('#chamSub').textContent = LANG === 'ko'
    ? `회색 띠 = 챔버 편중 관리 한계 ±${num(LIM.chamber_dev)} nm`
    : `Band = chamber deviation limit ±${num(LIM.chamber_dev)} nm`;
  const by = {}; DATA.chamberSeries.forEach(r => (by[r.chamber] = by[r.chamber] || []).push(r));
  const span = Math.max(...DATA.chamberSeries.map(r => Math.abs(r.dbias))) * 1.15;
  $('#chamPanel').innerHTML = Object.keys(by).sort().map(ch => {
    const r = by[ch].slice().sort((a, b) => a.day - b.day);
    const X = d => 8 + d / (M.days - 1) * 400, Y = v => 34 - v / span * 26;
    const worst = r.reduce((a, b) => Math.abs(b.dbias) > Math.abs(a.dbias) ? b : a);
    return `<div class="mini"><div><b>${ch}</b><small>max ${worst.dbias > 0 ? '+' : ''}${num(worst.dbias)} nm</small></div>
      <svg viewBox="0 0 416 68" style="width:100%;height:auto" role="img" aria-label="${ch}">
        <rect x="8" y="${Y(LIM.chamber_dev)}" width="400" height="${Y(-LIM.chamber_dev) - Y(LIM.chamber_dev)}" fill="rgba(99,70,112,.08)"/>
        <line x1="8" y1="34" x2="408" y2="34" stroke="#DCD7DE"/>
        <polyline points="${r.map(x => X(x.day) + ',' + Y(x.dbias)).join(' ')}" fill="none" stroke="#8C3D6B" stroke-width="1.8"/>
        <text x="8" y="62" font-size="9" font-family="IBM Plex Mono" fill="#6B6270">D0</text>
        <text x="386" y="62" font-size="9" font-family="IBM Plex Mono" fill="#6B6270">D${M.days - 1}</text>
      </svg></div>`;
  }).join('');
}


/* ── 공정 흐름 화면 ────────────────────────────────────────────────
   인사팀·비전공자가 첫 화면에서 "이게 뭘 하는 물건인지"를 알 수 있어야 한다.
   글로 설명하지 않고 그림으로 먼저 보여준 뒤, 표로 단계별 고려사항을 편다. */
const FLOW_STEPS = () => [
  {id:'coat', ko:['① Coat · Bake','Resist 도포 후 Soft bake',
        'Resist 두께 반경 분포 · Hotplate 온도 균일도',
        '반경 방향 CD 편차 (Center–Edge)'],
   en:['1 Coat & bake','Resist coat, soft bake',
        'Radial thickness profile · hotplate uniformity',
        'Center-to-edge CD spread']},
  {id:'expo', ko:['② Exposure','Reticle 패턴을 Resist에 전사',
        'Dose · Focus · Reticle CD 오차',
        'Dose → Wafer mean shift / Reticle → 동일 site 반복'],
   en:['2 Exposure','Reticle pattern transferred into resist',
        'Dose · focus · reticle CD error',
        'Dose → wafer mean shift / reticle → same-site repeat']},
  {id:'peb', ko:['③ PEB · Develop','PEB로 산 확산 반응 종결 후 현상',
        'PEB plate 온도 프로파일 · Develop 조건',
        '반경 방향 CD 기울기'],
   en:['3 PEB & develop','Acid reaction completed, pattern developed',
        'PEB plate temperature profile · develop conditions',
        'Radial CD tilt']},
  {id:'adi', meas:true, ko:['④ ADI','Resist 패턴 CD-SEM 측정',
        'Rework 가능 구간 · APC 피드백 대상',
        '전 로트 측정 (Actionable)'],
   en:['4 ADI','CD-SEM on the resist pattern',
        'Rework window · APC feedback target',
        'Every lot measured (actionable)']},
  {id:'etch', ko:['⑤ Etch','Resist를 Mask로 하부막 Plasma 식각',
        'Chamber seasoning · PM 후 RF hours · Chamber 간 편차',
        '특정 Chamber 로트에 ΔCD 편중'],
   en:['5 Etch','Plasma transfer into the underlying film',
        'Chamber seasoning · RF hours since PM · chamber spread',
        'Delta-CD concentrated on one chamber']},
  {id:'aei', meas:true, ko:['⑥ AEI','Resist strip 후 실구조 CD 측정',
        'Rework 불가 · Skip-lot (50%) 측정',
        'ΔCD = AEI − ADI · 원인 귀속 기준값'],
   en:['6 AEI','CD on the stripped structure',
        'No rework · skip-lot (50%)',
        'Delta-CD = AEI − ADI · attribution anchor']},
];

function flowDiagram() {
  const ko = LANG === 'ko';
  const L = (a, b) => ko ? a : b;
  const box = (x, label, sub, color, meas) => `
    <rect x="${x}" y="${meas ? 40 : 46}" width="132" height="${meas ? 76 : 64}" rx="8"
      fill="${meas ? '#E9F1F2' : '#fff'}" stroke="${color}" stroke-width="${meas ? 2.2 : 1.4}"/>
    <text x="${x + 66}" y="${meas ? 66 : 70}" text-anchor="middle" font-size="13" font-weight="600"
      fill="${color}">${label}</text>
    <text x="${x + 66}" y="${meas ? 85 : 88}" text-anchor="middle" font-size="10.5"
      fill="#6B6270">${sub}</text>
    ${meas ? `<text x="${x + 66}" y="${102}" text-anchor="middle" font-size="10"
      font-weight="600" fill="#2F6E74">${L('CD 측정', 'CD measured')}</text>` : ''}`;
  const arrow = x => `<path d="M${x} 78 h20" stroke="#B8B0BC" stroke-width="1.6"/>
    <path d="M${x + 16} 73 l6 5 -6 5" fill="#B8B0BC"/>`;
  const cols = [
    [10,  L('도포·베이크','Coat & bake'),   L('Track','Track'),    '#875D33', false],
    [162, L('노광','Expose'),               L('Scanner','Scanner'),'#875D33', false],
    [314, L('PEB·현상','PEB & develop'),    L('Track','Track'),    '#875D33', false],
    [466, L('ADI','ADI'),                   L('레지스트 상태','on resist'), '#2F6E74', true],
    [618, L('식각','Etch'),                 L('Chamber','Chamber'),'#8C3D6B', false],
    [770, L('AEI','AEI'),                   L('최종 구조','final structure'), '#2F6E74', true],
  ];
  let g = '';
  cols.forEach((c, i) => { g += box(c[0], c[1], c[2], c[3], c[4]); if (i < cols.length - 1) g += arrow(c[0] + 132); });
  return `<svg class="chart" viewBox="0 0 912 210" role="img"
     aria-label="${L('웨이퍼가 도포부터 AEI 측정까지 지나는 경로','Wafer path from coat to AEI measurement')}">
    <rect x="10" y="126" width="588" height="26" rx="6" fill="#EDF3EE"/>
    <text x="304" y="143" text-anchor="middle" font-size="11.5" fill="#4A7052" font-weight="600">
      ${L('Rework 가능 구간 — Resist strip 후 재노광',
           'Rework window — strip resist and re-expose')}</text>
    <rect x="618" y="126" width="284" height="26" rx="6" fill="#FBEFEE"/>
    <text x="760" y="143" text-anchor="middle" font-size="11" fill="#A8342B" font-weight="600">
      ${L('Rework 불가 — Hold / Scrap 대상','No rework — hold or scrap')}</text>
    ${g}
    <path d="M532 112 V176 H836 V112" fill="none" stroke="#2F6E74" stroke-width="1.4" stroke-dasharray="5 4"/>
    <text x="684" y="196" text-anchor="middle" font-size="12" fill="#2F6E74" font-weight="600">
      ${L('AEI CD − ADI CD = Etch bias · 원인 귀속의 기준값',
           'AEI CD − ADI CD = etch bias · the anchor for attribution')}</text>
  </svg>`;
}

function thirdSuspect() {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const card = (x, title, color, lines) => `
    <rect x="${x}" y="30" width="270" height="150" rx="9" fill="#fff" stroke="${color}" stroke-width="1.6"/>
    <text x="${x + 16}" y="56" font-size="13.5" font-weight="600" fill="${color}">${title}</text>
    ${lines.map((t, i) => `<text x="${x + 16}" y="${82 + i * 21}" font-size="11.5" fill="#3D3140">${t}</text>`).join('')}`;
  return `<svg class="chart" viewBox="0 0 860 200" role="img"
      aria-label="${L('세 가지 원인 후보','Three candidate causes')}">
    ${card(10, L('① 노광이 흔들렸나','1 Did lithography drift'), '#875D33',
      [L('ADI 단계에서 이미 이탈', 'Already off at ADI'),
       L('지문: Wafer mean / 반경 / 동일 site', 'Fingerprint: mean / radial / same site'),
       L('Rework 가능', 'Rework possible'),
       L('조치: Dose · PEB · Reticle', 'Action: dose, PEB, reticle')])}
    ${card(295, L('② 식각이 흔들렸나','2 Did etch drift'), '#8C3D6B',
      [L('ADI 정상 · ΔCD만 이탈', 'ADI clean, Delta-CD off'),
       L('지문: 특정 Chamber 편중', 'Fingerprint: one-chamber commonality'),
       L('Rework 불가', 'No rework'),
       L('조치: Chamber 격리 · PM 점검', 'Action: isolate chamber, review PM')])}
    ${card(580, L('③ 계측이 흔들렸나','3 Did metrology drift'), '#2F6E74',
      [L('ΔCD 이탈 · Chamber 무관', 'Delta-CD off, chamber-independent'),
       L('특정 CD-SEM 측정 로트에만 발생', 'Confined to one CD-SEM'),
       L('Monitor wafer 동반 이동 · TMU 초과', 'Monitor wafer drifts too · TMU over budget'),
       L('조치: 공정 보류 · Tool 재캘리브레이션', 'Action: hold process, recalibrate tool')])}
  </svg>`;
}

function judgeFlow() {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const steps = [
    [L('Excursion 감지','Excursion'), L('관리 한계 이탈 (±3σ)','Outside ±3σ control limit'), '#A8342B'],
    [L('성분 분해','Decompose'), L('좌표계별 지문 분리','Separate by coordinate system'), '#634670'],
    [L('Metrology 배제','Rule out metrology'), L('Monitor wafer · TMU 확인','Check monitor wafer and TMU'), '#2F6E74'],
    [L('Chamber 비교','Compare chambers'), L('Commonality 확인','Chamber commonality'), '#8C3D6B'],
    [L('Verification Gate','Verification gate'), L('요구 조건 코드 재검증','Required conditions re-checked in code'), '#1F0D1E'],
  ];
  let g = '', x = 10;
  steps.forEach((st, i) => {
    g += `<rect x="${x}" y="26" width="152" height="60" rx="8" fill="#fff" stroke="${st[2]}" stroke-width="1.5"/>
      <text x="${x + 76}" y="50" text-anchor="middle" font-size="12.5" font-weight="600" fill="${st[2]}">${st[0]}</text>
      <text x="${x + 76}" y="70" text-anchor="middle" font-size="10.5" fill="#6B6270">${st[1]}</text>`;
    if (i < steps.length - 1) g += `<path d="M${x + 152} 56 h18" stroke="#B8B0BC" stroke-width="1.6"/>
      <path d="M${x + 165} 51 l6 5 -6 5" fill="#B8B0BC"/>`;
    x += 170;
  });
  return `<svg class="chart" viewBox="0 0 870 150" role="img"
      aria-label="${L('판정 순서','Disposition order')}">${g}
    <rect x="352" y="104" width="300" height="30" rx="8" fill="#EDF3EE" stroke="#4A7052" stroke-width="1.2"/>
    <text x="502" y="124" text-anchor="middle" font-size="11.5" fill="#4A7052" font-weight="600">
      ${L('조건 미충족 시 원인 미지목 · 판정 보류','Condition unmet → no cause named · withheld')}</text>
  </svg>`;
}

function renderFlow() {
  const ko = LANG === 'ko';
  $('#flowDiagram').innerHTML = flowDiagram();
  $('#thirdSuspect').innerHTML = thirdSuspect();
  $('#judgeFlow').innerHTML = judgeFlow();
  $('#flowTable').innerHTML =
    `<thead><tr><th>${esc(t('th.step'))}</th><th>${esc(t('th.what'))}</th>
      <th>${esc(t('th.drift'))}</th><th>${esc(t('th.finger'))}</th></tr></thead><tbody>` +
    FLOW_STEPS().map(st => {
      const r = ko ? st.ko : st.en;
      return `<tr class="${st.meas ? 'measrow' : ''}"><td><b>${esc(r[0])}</b></td>
        <td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`;
    }).join('') + '</tbody>';
}


/* ── 개요(홈) 화면 ─────────────────────────────────────────────────
   "이게 무슨 Agent인가"를 개조식으로 먼저 답한다. */
function perfStats() {
  /* 기권을 허용하는 판정기의 표준 지표 — Coverage와 Selective Accuracy.
     El-Yaniv & Wiener(2010)의 risk–coverage 틀을 그대로 쓴다. */
  const c = VAL?.confusion;
  if (!c) return null;
  const rows = Object.keys(c);
  let total = 0, abstain = 0, exact = 0, falseAlarm = 0, normalTotal = 0, critical = 0;
  rows.forEach(r => Object.entries(c[r]).forEach(([pred, n]) => {
    total += n;
    if (pred === '??') abstain += n;
    else if (pred === r) exact += n;
    if (r === 'S0') { normalTotal += n; if (pred !== 'S0') falseAlarm += n; }
    if (r === 'S5' && pred === 'S4') critical += n;     /* 계측 drift → Etch 오귀속 */
  }));
  const decided = total - abstain;
  return {total, abstain, decided, exact, falseAlarm, normalTotal, critical,
          coverage: decided / total * 100,
          selAcc: decided ? exact / decided * 100 : 0};
}

function renderHome() {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const P = perfStats();

  $('#heroBullets').innerHTML = [
    L('<b>입력</b> · ADI·AEI CD 계측값, 설비 이력, Monitor wafer 재측정 이력',
      '<b>Input</b> · ADI and AEI CD, equipment history, monitor-wafer re-measurements'),
    L('<b>출력</b> · 원인 모듈 1개(Litho / Etch / Metrology) + 조치 순서. 근거 부족 시 보류',
      '<b>Output</b> · one module (Litho / Etch / Metrology) plus an action sequence, or a withheld verdict'),
    L('<b>전제</b> · 계측값도 틀릴 수 있다. 측정 장비를 원인 후보에서 빼지 않았다',
      '<b>Premise</b> · metrology can be wrong too, so the measuring tool stays on the suspect list'),
    L('<b>설계 원칙</b> · 수치는 도구만 만들고, 판정은 결정론적 Verification Gate가 내린다',
      '<b>Design rule</b> · tools produce every number; a deterministic verification gate makes the call'),
  ].map(x => `<li>${autoTerm(x)}</li>`).join('');

  $('#homeKpi').innerHTML = [
    [P ? P.total : DATA.lots.length, L('평가 Lot', 'Lots evaluated')],
    [P ? P.coverage.toFixed(1) + '%' : '—', L('Coverage (판정 수행률)', 'Coverage')],
    [P ? P.selAcc.toFixed(1) + '%' : '—', L('Selective Accuracy', 'Selective accuracy')],
    [P ? P.critical : 0, L('계측→Etch 오귀속', 'Metrology→Etch misattribution')],
  ].map(([v, k]) => `<div><b>${v}</b><small>${esc(k)}</small></div>`).join('');

  $('#probList').innerHTML = [
    L('CD Excursion이 뜨면 Litho와 Etch가 각자 자기 데이터로 결백을 주장한다. 합의가 늦어질수록 재공 손실이 커진다.',
      'When a CD excursion hits, litho and etch each argue from their own data. Every hour of debate costs material.'),
    L('ADI를 지나면 Rework window가 닫힌다. 그 뒤에 원인을 찾아봐야 Hold 아니면 Scrap이다.',
      'Past ADI the rework window is closed. Finding the cause after that only decides hold or scrap.'),
    L('그런데 이 논쟁은 계측값이 맞다는 전제 위에 있다. 측정기가 흔들린 것이라면 정상 Chamber의 Recipe를 건드리게 된다.',
      'And the whole argument assumes the numbers are right. If the tool drifted, a healthy chamber gets retuned.'),
  ].map(x => `<li>${autoTerm(x)}</li>`).join('');

  $('#apprList').innerHTML = [
    L('CD 잔차를 좌표계별로 쪼갠다. Wafer mean은 Dose, 반경은 PEB, 동일 site 반복은 Reticle의 지문이다.',
      'Split the CD residual by coordinate system: wafer mean points at dose, radial at PEB, same-site repetition at the reticle.'),
    L('ΔCD가 흔들리면 Chamber보다 Metrology를 먼저 배제한다. Monitor wafer와 TMU 예산을 본다.',
      'If Delta-CD moves, rule out metrology before the chamber: check the monitor wafer and the TMU budget.'),
    L('Verification Gate가 요구 조건을 다시 검사한다. 하나라도 못 채우면 원인을 지목하지 않는다.',
      'A verification gate re-checks the required conditions. One unmet condition means no cause is named.'),
    L('보류는 실패가 아니라 설계된 출력이다. 근거 없이 지목하는 것이 더 비싼 실수다.',
      'Withholding is a designed output, not a failure. Naming a cause without evidence costs more.'),
  ].map(x => `<li>${autoTerm(x)}</li>`).join('');

  $('#guideGrid').innerHTML = [
    ['flow', L('공정 흐름', 'Process flow'), L('Coat부터 AEI까지 · 단계별 변동 인자', 'Coat to AEI · drift factors by step')],
    ['lots', L('Lot Disposition', 'Lot disposition'), L('320 Lot 판정 결과 · 근거 · 조사 경로', '320 dispositions · evidence · trace')],
    ['trends', L('추이와 감시', 'Trends'), L('CD 추이 · CD-SEM 안정성 · TMU 예산', 'CD trend · CD-SEM stability · TMU budget')],
    ['valid', L('검증 결과', 'Validation'), L('블라인드 평가 · Coverage · 오귀속', 'Blind evaluation · coverage · misattribution')],
  ].map(([v, tt, d]) => `<button class="gocard" data-go="${v}"><b>${esc(tt)}</b><span>${esc(d)}</span></button>`).join('');

  $$('#v-home [data-go]').forEach(b => b.onclick = () => showView(b.dataset.go));
}

/* ── 검증 ─────────────────────────────────────────────────── */
function renderValidation() {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  const c = VAL?.confusion || {};
  const name = {S0: shortLabel('NORMAL'), S1: shortLabel('PHOTO_DOSE'), S2: shortLabel('PHOTO_TRACK_RADIAL'),
    S3: shortLabel('RETICLE_CD_ERROR'), S4: shortLabel('ETCH_CHAMBER'), S5: shortLabel('METROLOGY_TOOL_DRIFT'),
    '??': shortLabel('INDETERMINATE')};
  const preds = [...new Set(Object.values(c).flatMap(Object.keys))].sort();
  $('#confTable').innerHTML = Object.keys(c).length
    ? `<thead><tr><th>${L('주입한 이상', 'Injected')}</th>${preds.map(p => `<th class="num">${esc(name[p] || p)}</th>`).join('')}</tr></thead>
       <tbody>${Object.keys(c).sort().map(r => `<tr><td>${esc(name[r] || r)}</td>${preds.map(p => {
         const v = c[r][p] || 0;
         return `<td class="num" style="${r === p ? 'font-weight:700' : v ? 'color:#A8342B' : 'color:#C3BDC6'}">${v}</td>`;
       }).join('')}</tr>`).join('')}</tbody>`
    : `<tbody><tr><td class="sub">${L('검증 데이터를 불러오지 못했습니다.', 'Validation data unavailable.')}</td></tr></tbody>`;

  const P = perfStats();
  $('#valKpi').innerHTML = [
    [P ? P.total : '—', L('평가 Lot', 'Lots evaluated')],
    [P ? P.coverage.toFixed(1) + '%' : '—', L('Coverage', 'Coverage')],
    [P ? P.selAcc.toFixed(1) + '%' : '—', L('Selective Accuracy', 'Selective accuracy')],
    [P ? P.critical : '—', L('계측→Etch 오귀속', 'Metrology→Etch misattribution')],
  ].map(([v, k]) => `<div><b>${v}</b><small>${esc(k)}</small></div>`).join('');

  /* 지표마다 정의와 분모를 함께 적는다. 분모를 모르면 숫자를 읽을 수 없다. */
  const defs = P ? [
    [L('Coverage (판정 수행률)', 'Coverage'), `${P.decided} / ${P.total} = ${P.coverage.toFixed(1)}%`,
     L('판정을 내린 Lot ÷ 전체 Lot · 보류 제외', 'Lots given a verdict ÷ all lots; abstentions excluded')],
    [L('Selective Accuracy', 'Selective accuracy'), `${P.exact} / ${P.decided} = ${P.selAcc.toFixed(1)}%`,
     L('정답 일치 ÷ 판정을 내린 Lot · 보류는 분모에서 제외',
       'Exact matches ÷ lots given a verdict; abstentions excluded from the denominator')],
    [L('판정 보류 (Abstention)', 'Abstentions'), `${P.abstain} / ${P.total}`,
     L('근거 부족으로 원인 미지목 · Gate 미충족', 'No cause named for want of evidence — gate unmet')],
    [L('오경보 (False alarm)', 'False alarm'), `${P.falseAlarm} / ${P.normalTotal}`,
     L('정상 Lot을 이상으로 판정한 건수', 'Normal lots called abnormal')],
    [L('계측→Etch 오귀속', 'Metrology→Etch misattribution'), `${P.critical}`,
     L('대표 KPI · 정상 Chamber Recipe 변경으로 이어지는 최악 오류',
       'Headline KPI — the error that leads to touching a healthy chamber')],
  ] : [];
  $('#perfTable').innerHTML = defs.length
    ? `<thead><tr><th>${L('지표', 'Metric')}</th><th class="num">${L('값', 'Value')}</th>
        <th>${L('정의 · 분모', 'Definition and denominator')}</th></tr></thead>
       <tbody>${defs.map(d => `<tr><td><b>${esc(d[0])}</b></td><td class="num mono">${esc(d[1])}</td>
        <td class="sub">${esc(d[2])}</td></tr>`).join('')}</tbody>`
    : `<tbody><tr><td class="sub">${L('검증 데이터를 불러오지 못했습니다.', 'Validation data unavailable.')}</td></tr></tbody>`;

  /* 유형별 검출률 — 분모를 '판정 가능 구간'으로 명시한다. */
  const decidable = {S4: L('AEI 측정 Lot', 'AEI-measured lots'), S5: L('AEI 측정 Lot', 'AEI-measured lots')};
  $('#recallTable').innerHTML = Object.keys(c).length
    ? `<thead><tr><th>${L('주입한 이상', 'Injected')}</th><th class="num">${L('검출', 'Detected')}</th>
        <th class="num">${L('전체', 'Total')}</th><th class="num">${L('보류', 'Withheld')}</th>
        <th>${L('분모 기준', 'Denominator')}</th></tr></thead><tbody>` +
      Object.keys(c).filter(r => r !== 'S0').sort().map(r => {
        const row = c[r], tot = Object.values(row).reduce((a, b) => a + b, 0);
        const hit = row[r] || 0, ab = row['??'] || 0;
        return `<tr><td>${esc(name[r] || r)}</td><td class="num"><b>${hit}</b></td>
          <td class="num">${tot}</td><td class="num">${ab || '—'}</td>
          <td class="sub">${esc(decidable[r] || L('전체 Lot', 'All lots'))}</td></tr>`;
      }).join('') + '</tbody>'
    : `<tbody><tr><td class="sub">${L('검증 데이터를 불러오지 못했습니다.', 'Validation data unavailable.')}</td></tr></tbody>`;
}


/* ── 참고문헌 ──────────────────────────────────────────────────────
   학술지·학회 논문, 특허 원문(USPTO/Google Patents), 장비사 공식 자료,
   산업 표준 문서만 싣는다. 블로그·위키·2차 요약 사이트는 제외한다. */
const REFS = [
  {id:1, tag:'TMU',
   ko:'TMU 정의 — TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match의 제곱합 제곱근',
   en:'TMU definition — RSS of TIS-mean, TIS-3σ, dynamic precision and tool-to-tool match',
   cite:'J. Shin, J. Yeo, Y.-S. Kang, W. Han, “The impact of total measurement uncertainty (TMU) on overlay error correction,” Proc. SPIE 7638, Metrology, Inspection, and Process Control for Microlithography XXIV, 76382F (2010).',
   url:'https://doi.org/10.1117/12.845823', kind:'SPIE'},
  {id:2, tag:'TMU',
   ko:'TMU는 계측 장비 유발 오차의 표준 KPI — 정의 변형과 TIS 보정 후 평가 방법',
   en:'TMU as the standard KPI for tool-induced error; post-TIS-management evaluation',
   cite:'“Effective tool induced shift (eTIS) for determining the total measurement uncertainty (TMU) in overlay metrology,” Proc. SPIE 12496, 124963O (2023).',
   url:'https://doi.org/10.1117/12.2670420', kind:'SPIE'},
  {id:3, tag:'예산 기준',
   ko:'계측 불확도 허용 기준 — P/T < 10% 허용, 10~30% 조건부 허용, > 30% 불가',
   en:'Measurement-system acceptance — P/T < 10% acceptable, 10–30% conditional, > 30% unacceptable',
   cite:'Automotive Industry Action Group (AIAG), Measurement Systems Analysis (MSA) Reference Manual, 4th ed.',
   url:'', kind:'표준 문서'},
  {id:4, tag:'예산 기준',
   ko:'오버레이 계측 한정 기준 — 총 측정 불확도는 오버레이 예산의 10% 미만',
   en:'Overlay-specific guidance — total measurement uncertainty below 10% of the overlay budget',
   cite:'US 7,847,939 B2, “Overlay measurement target,” USPTO.',
   url:'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7847939', kind:'특허'},
  {id:5, tag:'ADI / AEI',
   ko:'CD 측정 시점의 정의 — ADI(현상 후)와 AEI(식각 후)',
   en:'Definition of the two CD measurement points — ADI and AEI',
   cite:'Hitachi High-Tech, Semiconductor Glossary (공식 기술 용어집).',
   url:'https://www.hitachi-hightech.com/global/en/knowledge/semiconductor/room/words.html', kind:'장비사 공식'},
  {id:6, tag:'Etch bias',
   ko:'ADI–AEI CD 차이의 정의와 제어 — 본 프로젝트의 etch bias와 동일한 양',
   en:'ADI–AEI CD difference: definition and control — the same quantity as etch bias here',
   cite:'US 8,101,092 B2, “Method for controlling ADI-AEI CD difference ratio of openings having different sizes.”',
   url:'https://patents.google.com/patent/US8101092B2/en', kind:'특허'},
  {id:7, tag:'ADI / AEI',
   ko:'ACI 표기의 유래 — 식각 후 세정이 뒤따르기 때문에 생긴 용어, AEI와 동일 대상',
   en:'Origin of the term ACI — cleaning follows etch; the same measurement as AEI',
   cite:'US 10,908,498 B2, “Optical proximity correction method and method of manufacturing mask by using the same,” USPTO.',
   url:'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10908498', kind:'특허'},
  {id:8, tag:'APC',
   ko:'ADI와 AEI 사이의 etch bias 때문에 CD 제어가 단순 피드백으로 끝나지 않는다는 근거',
   en:'Why CD control is not simple feedback: the etch bias between ADI and AEI',
   cite:'US 7,306,746 B2, “Critical dimension control in a semiconductor fabrication process,” USPTO.',
   url:'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7306746', kind:'특허'},
  {id:9, tag:'Excursion',
   ko:'Excursion 로트의 격리와 disposition(release / scrap) 절차',
   en:'Quarantine and disposition of excursion lots (release / scrap)',
   cite:'KLA, “Process Watch: Monitoring for excursions in automotive fabs” (2018).',
   url:'https://www.kla.com/documents/04_ProcessWatchAutomotive_2018_11.pdf', kind:'장비사 공식'},
  {id:10, tag:'판정 성능',
   ko:'기권을 허용하는 판정기의 평가 틀 — coverage와 selective risk의 trade-off',
   en:'Evaluation framework for classifiers with a reject option — the risk–coverage trade-off',
   cite:'V. Franc, D. Průša, V. Voráček, “Optimal Strategies for Reject Option Classifiers,” Journal of Machine Learning Research 24 (2023).',
   url:'https://jmlr.org/papers/volume24/21-0048/21-0048.pdf', kind:'학술지'},
  {id:11, tag:'SPC',
   ko:'관리 한계 산출과 OOC 판정 규칙의 근거',
   en:'Basis for control-limit estimation and out-of-control rules',
   cite:'D. C. Montgomery, Introduction to Statistical Quality Control, Wiley.',
   url:'', kind:'교과서'},
];

function renderRefs() {
  const ko = LANG === 'ko', L = (a, b) => ko ? a : b;
  $('#refList').innerHTML = REFS.map(r => `
    <div class="ref">
      <div class="refn mono">[${r.id}]</div>
      <div>
        <div class="reftag">${esc(r.kind)} · ${esc(r.tag)}</div>
        <p class="refuse">${esc(ko ? r.ko : r.en)}</p>
        <p class="refcite">${esc(r.cite)}</p>
        ${r.url ? `<a class="reflink mono" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a>`
                : `<span class="sub">${L('공개 링크 없음 · 유료 표준 문서 또는 단행본', 'No open link — paid standard or printed book')}</span>`}
      </div>
    </div>`).join('');
}

/* ── 용어 사전 ────────────────────────────────────────────── */
const GCAT = {
  basic: {ko: '기초', en: 'Basics', keys: ['wafer','lot','photo','etch','cd','pitch','field','reticle','chamber']},
  meas:  {ko: '측정', en: 'Measurement', keys: ['adi','aci','cdsem','xsem','golden','metro','tmu','precision','match','tis','cdu','skiplot']},
  ctrl:  {ko: '제어와 판정', en: 'Control', keys: ['excursion','attribution','limit','tolerance','apc','ocap','rework','changepoint','setting','sensor','dosemapper']},
  phys:  {ko: '물리', en: 'Physics', keys: ['dose','peb','delta','pm','epe','overlay']},
};
let gcat = 'basic';
function renderGlossary() {
  $('#gcats').innerHTML = Object.entries(GCAT).map(([k, v]) =>
    `<button class="chip" data-g="${k}" aria-pressed="${k === gcat}">${esc(LANG === 'ko' ? v.ko : v.en)}</button>`).join('');
  $$('#gcats [data-g]').forEach(b => b.onclick = () => { gcat = b.dataset.g; renderGlossary(); });
  $('#glist').innerHTML = GCAT[gcat].keys.filter(k => TERMS[k]).map(k => {
    const x = TERMS[k], d = LANG === 'en' && TERM_EN[k] ? TERM_EN[k] : x.d;
    return `<div class="gcard"><h3>${esc(x.k)}<span class="en">${esc(x.e)}</span></h3>
      <p>${esc(d)}</p>${x.s || ''}</div>`;
  }).join('');
}

/* ── 기준값 ───────────────────────────────────────────────── */
function renderRef() {
  const rows = [
    [LANG === 'ko' ? '로트 / 생산일' : 'Lots / days', `${M.lots} / ${M.days}`],
    ['ADI / AEI target', `${M.adiTarget} / ${M.aciTarget} nm`],
    [LANG === 'ko' ? '단면 BCD target' : 'Cross-section BCD target', `${M.vsemTarget} nm`],
    ['Etch bias', `${M.etchBias} nm`],
    [LANG === 'ko' ? '웨이퍼 내 CDU 3σ' : 'Within-wafer CDU 3σ', `${M.cdu3s} nm`],
    [LANG === 'ko' ? 'CD 공정 허용 반폭' : 'CD tolerance', `±${M.cdTol} nm`],
    ['TMU budget', `${M.tmuBudget}%`],
    [LANG === 'ko' ? '측정점 / 웨이퍼' : 'Sites per wafer', `${M.sites}`],
    ['ADI scalar limit', `±${num(LIM.adi_offset)} nm`],
    ['ADI radial limit', `±${num(LIM.adi_radial)} nm`],
    ['Reticle-repeat limit', `≤${num(LIM.adi_reticle)} nm`],
    ['ΔCD limit', `±${num(LIM.delta_bias)} nm`],
    ['Monitor drift limit', `±${num(LIM.tool_drift)} nm`],
    ['Chamber deviation limit', `±${num(LIM.chamber_dev)} nm`],
    ['Dose gap limit', `±${num(LIM.dose_gap_pct)}%`],
  ];
  $('#specTable').innerHTML = `<thead><tr><th>${LANG === 'ko' ? '항목' : 'Parameter'}</th><th class="num">${LANG === 'ko' ? '값' : 'Value'}</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td class="num">${esc(r[1])}</td></tr>`).join('')}</tbody>`;
  $('#ruleList').innerHTML = DATA.rules.map(r => {
    const k = ruleOf(r.id);
    return `<div class="mini" style="grid-template-columns:1fr">
      <div><b>${esc(LANG === 'ko' && k ? k.label : r.label)}</b>
      <small>${esc(r.id)} · ${esc(LANG === 'ko' && k ? k.module : r.module)}</small>
      <p class="sub" style="margin-top:7px;max-width:90ch">${esc(LANG === 'ko' && k ? k.cause : r.cause)}</p></div></div>`;
  }).join('');
}

/* ── 화면 전환 · 언어 ─────────────────────────────────────── */
const VIEWS = ['home', 'flow', 'lots', 'trends', 'valid', 'terms', 'ref', 'refs'];
let drawn = {};
function showView(v) {
  S.view = v;
  VIEWS.forEach(k => $('#v-' + k).hidden = k !== v);
  $$('#nav button').forEach(b => b.dataset.v === v
    ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'));
  if (v === 'home' && !drawn.hm) { renderHome(); drawn.hm = 1; }
  if (v === 'flow' && !drawn.fl) { renderFlow(); drawn.fl = 1; }
  if (v === 'trends' && !drawn.tr) { drawTrend(); drawMonitor(); drawTmu(); drawChambers(); drawn.tr = 1; }
  if (v === 'valid' && !drawn.va) { renderValidation(); drawn.va = 1; }
  if (v === 'terms' && !drawn.gl) { renderGlossary(); drawn.gl = 1; }
  if (v === 'ref' && !drawn.rf) { renderRef(); drawn.rf = 1; }
  if (v === 'refs' && !drawn.rs) { renderRefs(); drawn.rs = 1; }
  hidePop(); scrollTo({top: 0, behavior: 'instant'});
}
function applyLang() {
  document.documentElement.lang = LANG;
  const HTML_OK = new Set(['h.title']);   /* 줄바꿈 마크업이 필요한 항목만 허용 */
  $$('[data-t]').forEach(el => {
    const v = t(el.dataset.t);
    if (HTML_OK.has(el.dataset.t)) el.innerHTML = v; else el.textContent = v;
  });
  $$('[data-ph]').forEach(el => el.placeholder = t(el.dataset.ph));
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  fillSelects(); renderList(); drawn = {};
  if (S.lot) openLot(S.lot);
  if (S.view !== 'lots') showView(S.view); else hidePop();
}

/* ── 이벤트 ───────────────────────────────────────────────── */
$('#nav').onclick = e => { const b = e.target.closest('button'); if (b) showView(b.dataset.v); };
$('#goLots').onclick = () => showView('lots');
$('#homeBtn').onclick = () => { if (S.lot) closeLot(); showView('home'); };
$$('.lang button').forEach(b => b.onclick = () => {
  LANG = b.dataset.lang; try { localStorage.setItem('cdlang', LANG); } catch (e) {} applyLang();
});
$('#q').oninput = e => { S.q = e.target.value.trim(); renderList(); };
$('#fAbn').onclick = () => { S.abn = !S.abn; fillSelects(); renderList(); };
$('#fVerdict').onchange = e => { S.verdict = e.target.value; renderList(); };
$('#fScanner').onchange = e => { S.scanner = e.target.value; renderList(); };
$('#fChamber').onchange = e => { S.chamber = e.target.value; renderList(); };
$('#fMetro').onchange = e => { S.metro = e.target.value; renderList(); };
$('#fDayMin').oninput = e => { S.dmin = e.target.value === '' ? null : +e.target.value; renderList(); };
$('#fDayMax').oninput = e => { S.dmax = e.target.value === '' ? null : +e.target.value; renderList(); };
$('#fReset').onclick = () => {
  Object.assign(S, {q: '', abn: false, verdict: '', scanner: '', chamber: '', metro: '', dmin: null, dmax: null});
  $('#q').value = ''; $('#fDayMin').value = ''; $('#fDayMax').value = '';
  fillSelects(); renderList();
};
addEventListener('keydown', e => {
  if (e.key === '/' && !/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName)) {
    e.preventDefault(); $('#q').focus();
  }
});

/* 주소창 해시로 로트를 직접 열 수 있게 한다. 뒤로가기도 같은 경로로 동작한다. */
function syncHash() {
  const id = (location.hash.match(/lot=([\w-]+)/) || [])[1];
  if (id && DATA.lots.some(l => l.lot === id)) { if (S.lot !== id) { showView('lots'); openLot(id, false); } }
  else if (S.lot) closeLot(false);
}
addEventListener('hashchange', syncHash);
addEventListener('popstate', syncHash);

/* ── 시작 ─────────────────────────────────────────────────── */
applyLang();
showView(location.hash.includes('lot=') ? 'lots' : 'home');
syncHash();
