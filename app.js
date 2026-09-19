const TERMS = {
  excursion:{k:'Excursion (이상)',e:'excursion',d:'공정 지표가 관리 한계를 벗어나 정상 변동으로 볼 수 없는 상태입니다. fab에서는 excursion이 뜨면 원인을 찾아 조치할 때까지 해당 설비의 로트 투입을 멈추기도 합니다. 이 프로젝트가 판정하려는 대상이 바로 이 상태입니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="16" y1="55" x2="188" y2="55" stroke="#464646" stroke-dasharray="4 3"/><line x1="16" y1="30" x2="188" y2="30" stroke="#464646" stroke-dasharray="2 3"/><line x1="16" y1="80" x2="188" y2="80" stroke="#464646" stroke-dasharray="2 3"/><polyline points="24,58 44,52 64,57 84,54 104,50 124,44 144,34 164,22" fill="none" stroke="#464646" stroke-width="1.6"/><circle cx="164" cy="22" r="4" fill="#2B003F"/><text x="20" y="26" font-size="9" fill="#464646">UCL</text><text x="20" y="92" font-size="9" fill="#464646">LCL</text><text x="128" y="16" font-size="9" fill="#2B003F">excursion</text></svg>'},
  attribution:{k:'원인 귀속',e:'attribution / disposition',d:'이상이 어느 모듈에서 비롯됐는지 판정하고 조치 대상을 정하는 일입니다. fab에서는 로트를 어떻게 처리할지 정하는 행위를 disposition이라고 부릅니다. 이 에이전트의 출력이 곧 원인 귀속과 조치 권고입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="10" y="14" width="52" height="24" fill="none" stroke="#2B003F" stroke-width="1.4"/><text x="36" y="30" text-anchor="middle" font-size="10" fill="#2B003F">Litho</text><rect x="10" y="44" width="52" height="24" fill="none" stroke="#2B003F" stroke-width="1.4"/><text x="36" y="60" text-anchor="middle" font-size="10" fill="#2B003F">Etch</text><rect x="10" y="74" width="52" height="24" fill="#FFEEE5" stroke="#2B003F" stroke-width="2"/><text x="36" y="90" text-anchor="middle" font-size="10" fill="#2B003F">Metrology</text><path d="M68 86h34" stroke="#2B003F" stroke-width="1.6"/><path d="M97 81l7 5-7 5" fill="#2B003F"/><text x="108" y="82" font-size="10" fill="#464646">조치 대상</text><text x="108" y="96" font-size="10" fill="#464646">확정</text></svg>'},
  wafer:{k:'웨이퍼',e:'wafer',d:'회로를 만드는 실리콘 원판입니다. 현재 양산 표준은 지름 300 mm이며, 한 장에 수백 개의 칩(die)이 격자로 배열됩니다. 아래쪽 노치(notch)는 결정 방위와 장비 내 정렬 기준으로 쓰입니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="52" cy="55" r="42" fill="#FFFFFF" stroke="#464646" stroke-width="1.3"/><g stroke="#FFEEE5" stroke-width=".7"><line x1="20" y1="13" x2="20" y2="97"/><line x1="31" y1="13" x2="31" y2="97"/><line x1="42" y1="13" x2="42" y2="97"/><line x1="53" y1="13" x2="53" y2="97"/><line x1="64" y1="13" x2="64" y2="97"/><line x1="75" y1="13" x2="75" y2="97"/><line x1="86" y1="13" x2="86" y2="97"/><line x1="11" y1="24" x2="93" y2="24"/><line x1="11" y1="35" x2="93" y2="35"/><line x1="11" y1="46" x2="93" y2="46"/><line x1="11" y1="57" x2="93" y2="57"/><line x1="11" y1="68" x2="93" y2="68"/><line x1="11" y1="79" x2="93" y2="79"/><line x1="11" y1="90" x2="93" y2="90"/></g><path d="M47 97h10l-5-8z" fill="#464646"/><text x="104" y="38" font-size="10" fill="#464646">지름 300 mm</text><text x="104" y="56" font-size="10" fill="#464646">한 장에 die 수백 개</text><text x="104" y="74" font-size="10" fill="#464646">아래 노치 = 정렬 기준</text></svg>'},
  lot:{k:'로트',e:'lot',d:'웨이퍼 25장을 담아 함께 이동하는 생산 단위입니다. FOUP이라는 밀폐 용기에 담겨 공정을 거칩니다. 계측은 전수로 하지 않고 대표 슬롯만 뽑아 재며, 이 프로젝트는 앞·중간·뒤를 대표하도록 slot 3 / 13 / 23을 측정합니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="12" y="18" width="76" height="74" fill="none" stroke="#464646" stroke-width="1.3"/><rect x="18" y="22" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="24" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="27" width="64" height="4" fill="#2B003F" stroke="#464646" stroke-width=".5"/><rect x="18" y="30" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="33" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="36" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="38" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="41" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="44" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="47" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="50" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="52" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="55" width="64" height="4" fill="#2B003F" stroke="#464646" stroke-width=".5"/><rect x="18" y="58" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="61" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="64" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="66" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="69" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="72" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="75" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="78" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="80" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="83" width="64" height="4" fill="#2B003F" stroke="#464646" stroke-width=".5"/><rect x="18" y="86" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><rect x="18" y="89" width="64" height="4" fill="#FFEEE5" stroke="#464646" stroke-width=".5"/><text x="12" y="104" font-size="9" fill="#464646">FOUP · 25 slot</text><text x="100" y="40" font-size="10" fill="#2B003F">진한 칸 = 측정 슬롯</text><text x="100" y="58" font-size="10" fill="#464646">slot 3 / 13 / 23</text><text x="100" y="76" font-size="10" fill="#464646">front / center / rear</text></svg>'},
  photo:{k:'Litho (노광)',e:'photolithography',d:'레티클에 새겨진 회로 패턴을 빛으로 웨이퍼 위 감광막(photoresist)에 전사하는 공정입니다. 투영 렌즈가 패턴을 보통 1/4로 축소해 옮기며, 노광량(dose)과 초점(focus)이 선폭을 직접 좌우합니다. 노광 후 현상(develop)을 거치면 레지스트 패턴이 남습니다.',
    s:'<svg viewBox="0 0 200 110"><ellipse cx="46" cy="12" rx="16" ry="5" fill="#2B003F" opacity=".85"/><path d="M32 17 L26 34 M46 17 L46 34 M60 17 L66 34" stroke="#2B003F" stroke-width="1.2"/><rect x="22" y="34" width="48" height="5" fill="none" stroke="#464646" stroke-width="1.2"/><path d="M28 36h4M40 36h5M56 36h4" stroke="#000000" stroke-width="2"/><path d="M24 43 L44 60 L68 43" fill="none" stroke="#2B003F" stroke-width="1.3"/><path d="M40 62 L46 78 M52 62 L46 78" stroke="#2B003F" stroke-width="1.1"/><rect x="26" y="80" width="42" height="8" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><text x="80" y="20" font-size="10" fill="#2B003F">조명계 (dose)</text><text x="80" y="40" font-size="10" fill="#464646">레티클</text><text x="80" y="58" font-size="10" fill="#2B003F">투영 렌즈 · 1/4 축소</text><text x="80" y="88" font-size="10" fill="#464646">웨이퍼 (감광막)</text></svg>'},
  etch:{k:'Etch (식각)',e:'plasma etch',d:'레지스트 패턴을 마스크 삼아 아래층을 플라즈마로 깎아 패턴을 전사하는 공정입니다. 챔버 압력, 가스 조성, RF 파워, ESC 온도가 깎이는 속도와 프로파일을 결정합니다. 챔버 벽 상태가 변하면 라디칼 밀도가 달라져 선폭이 함께 흔들립니다.',
    s:'<svg viewBox="0 0 200 110"><text x="10" y="16" font-size="9" fill="#464646">before</text><rect x="10" y="22" width="70" height="10" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.1"/><rect x="10" y="32" width="70" height="16" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><path d="M20 54v10M45 54v10M70 54v10" stroke="#2B003F" stroke-width="1.6"/><text x="86" y="62" font-size="9" fill="#2B003F">플라즈마</text><text x="10" y="80" font-size="9" fill="#464646">after</text><path d="M14 104 L20 86 L44 86 L50 104 Z" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><path d="M56 104 L62 86 L86 86 L92 104 Z" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><text x="104" y="92" font-size="9" fill="#464646">측벽각(SWA)이 생김</text><text x="104" y="106" font-size="9" fill="#464646">폭도 함께 변함</text></svg>'},
  cd:{k:'CD (선폭)',e:'Critical Dimension',d:'패턴의 가로 방향 폭입니다. 두께(depth)가 아니라 폭이라는 점이 핵심입니다. 선(line)과 공간(space)이 반복되는 구조에서 pitch = CD + space 로 정의되며, pitch는 설계와 노광 조건이 정하는 고정값이고 CD는 공정 변동에 따라 움직이는 값입니다. 그래서 CD가 커지면 같은 pitch 안에서 space가 그만큼 줄어듭니다. 게이트 폭이 설계보다 수 nm만 좁아져도 문턱전압과 누설전류가 달라집니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="20" y="30" width="24" height="42" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><rect x="76" y="30" width="24" height="42" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><rect x="132" y="30" width="24" height="42" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><path d="M20 24h24" stroke="#2B003F" stroke-width="1.8"/><path d="M20 20v8M44 20v8" stroke="#2B003F" stroke-width="1.4"/><text x="24" y="16" font-size="9" fill="#2B003F">CD</text><path d="M44 82h32" stroke="#464646" stroke-width="1.8"/><path d="M44 78v8M76 78v8" stroke="#464646" stroke-width="1.4"/><text x="48" y="96" font-size="9" fill="#464646">space</text><path d="M20 104h56" stroke="#2B003F" stroke-width="1.8"/><path d="M20 100v8M76 100v8" stroke="#2B003F" stroke-width="1.4"/><text x="86" y="107" font-size="9" fill="#2B003F">pitch = CD + space (고정)</text><text x="108" y="24" font-size="9" fill="#464646">CD가 커지면</text><text x="108" y="38" font-size="9" fill="#464646">space가 줄어든다</text></svg>'},
  pitch:{k:'Pitch',e:'pitch',d:'반복 패턴에서 이웃한 선의 중심 간 거리, 즉 CD + space 입니다. 설계 규칙과 노광 해상도가 정하는 값이라 공정 중에는 변하지 않습니다. 그래서 CD 변동은 곧 space 변동이며, CD가 목표를 벗어나면 이웃 패턴과의 간격이 함께 틀어집니다.',
    s:'<svg viewBox="0 0 200 90"><rect x="18" y="26" width="22" height="34" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><rect x="70" y="26" width="22" height="34" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><rect x="122" y="26" width="22" height="34" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><line x1="29" y1="18" x2="29" y2="68" stroke="#2B003F" stroke-dasharray="3 2"/><line x1="81" y1="18" x2="81" y2="68" stroke="#2B003F" stroke-dasharray="3 2"/><path d="M29 74h52" stroke="#2B003F" stroke-width="1.8"/><path d="M29 70v8M81 70v8" stroke="#2B003F" stroke-width="1.4"/><text x="36" y="88" font-size="9" fill="#2B003F">pitch (중심 간 거리)</text><text x="150" y="46" font-size="9" fill="#464646">설계가 정하는</text><text x="150" y="60" font-size="9" fill="#464646">고정값</text></svg>'},
  adi:{k:'ADI (현상 후 측정)',e:'After Develop Inspection',d:'노광·현상을 마치고 식각 전 레지스트 패턴을 재는 측정입니다. 이 시점에는 레지스트를 벗기고 재노광하는 rework가 가능하고, 측정값이 스캐너 보정(APC)으로 되먹임되므로 actionable 측정으로 분류됩니다. 그래서 현업에서도 매 로트 또는 거의 매 로트 측정합니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="30" width="20" height="26" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.1"/><rect x="52" y="30" width="20" height="26" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.1"/><rect x="10" y="56" width="72" height="16" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><text x="10" y="24" font-size="9" fill="#2B003F">레지스트 패턴 (미식각)</text><text x="10" y="86" font-size="9" fill="#2B003F">rework 가능 · APC 피드백</text><path d="M92 50h22" stroke="#464646" stroke-width="1.3"/><path d="M109 45l7 5-7 5" fill="#464646"/><text x="122" y="46" font-size="9" fill="#464646">Etch 단계로</text><text x="122" y="60" font-size="9" fill="#464646">진행</text></svg>'},
  aci:{k:'ACI (식각 후 측정)',e:'After Clean Inspection · AEI',d:'식각과 세정을 마친 뒤 재는 측정입니다. After Etch Inspection(AEI)이라고도 씁니다. 실제 소자 구조를 재므로 최종 결과에 가깝고 식각이 유발한 오차까지 잡아내지만, 그 로트는 되돌릴 수 없습니다. 목적이 rework가 아니라 etch bias 특성화와 검증이어서 skip-lot으로 저빈도 측정합니다.',
    s:'<svg viewBox="0 0 200 100"><path d="M14 72 L19 40 L39 40 L44 72 Z" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><path d="M56 72 L61 40 L81 40 L86 72 Z" fill="#FFEEE5" stroke="#464646" stroke-width="1.1"/><text x="10" y="30" font-size="9" fill="#464646">레지스트 제거 · 소자 구조</text><text x="10" y="88" font-size="9" fill="#2B003F">되돌릴 수 없음 · skip-lot 측정</text><text x="100" y="52" font-size="9" fill="#464646">최종 결과에 가장 가까움</text></svg>'},
  epe:{k:'EPE',e:'Edge Placement Error',d:'패턴의 가장자리가 있어야 할 위치에서 얼마나 벗어났는지를 나타내는 종합 지표입니다. 오버레이 오차와 CD 변동이 함께 기여합니다. 노드가 미세해질수록 예산이 줄어 조금만 벗어나도 인접 패턴과 닿거나 떨어지는 불량이 됩니다. 이 프로젝트는 EPE 중 CD 성분에 한정했습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="18" y="26" width="56" height="18" fill="#FFEEE5" stroke="#000000" stroke-width="1.1"/><rect x="34" y="58" width="56" height="18" fill="none" stroke="#464646" stroke-width="1.4" stroke-dasharray="4 2"/><path d="M74 44 L74 58" stroke="#2B003F" stroke-width="2"/><path d="M74 44h16" stroke="#2B003F" stroke-width="2"/><text x="96" y="30" font-size="9" fill="#000000">위층 패턴</text><text x="96" y="50" font-size="9" fill="#2B003F">EPE = 가장자리 어긋남</text><text x="96" y="70" font-size="9" fill="#464646">아래층 패턴</text><text x="18" y="94" font-size="9" fill="#464646">EPE = 오버레이 오차 + CD 변동</text></svg>'},
  overlay:{k:'오버레이',e:'overlay',d:'위층 패턴과 아래층 패턴이 얼마나 정확히 겹쳤는지입니다. 수십 층을 쌓아 만들기 때문에 층 간 정렬이 어긋나면 콘택이 배선에 닿지 못합니다. 스크라이브 라인의 전용 target으로 측정하며, 실제 소자와 크기·밀도가 달라 생기는 차이를 device-to-target bias라고 부릅니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="24" y="34" width="44" height="34" fill="none" stroke="#464646" stroke-width="1.4"/><rect x="34" y="42" width="44" height="34" fill="none" stroke="#2B003F" stroke-width="1.4"/><path d="M46 51h10M51 46v10" stroke="#464646"/><path d="M56 59h10M61 54v10" stroke="#2B003F"/><path d="M51 51 L61 59" stroke="#000000" stroke-width="1.6"/><text x="92" y="42" font-size="9" fill="#464646">아래층 target</text><text x="92" y="58" font-size="9" fill="#2B003F">위층 target</text><text x="92" y="74" font-size="9" fill="#000000">둘의 차이 = overlay</text></svg>'},
  reticle:{k:'레티클',e:'reticle / photomask',d:'회로 패턴이 크롬 등으로 새겨진 석영 원판입니다. 투영 렌즈가 보통 1/4로 축소해 웨이퍼에 전사하므로 레티클 위 패턴은 웨이퍼보다 4배 큽니다. 레티클 자체에 CD 오차가 있으면 모든 웨이퍼의 같은 field 내 위치에서 동일한 오차가 반복되며, 이 반복성이 레티클 원인의 지문입니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="20" width="62" height="46" fill="#FFFFFF" stroke="#464646" stroke-width="1.2"/><path d="M24 32h12M42 32h12M24 44h12M42 44h8M24 56h20" stroke="#000000" stroke-width="2.4"/><text x="14" y="80" font-size="9" fill="#464646">레티클 (4배 크기)</text><path d="M84 44h20" stroke="#2B003F" stroke-width="1.3"/><path d="M99 39l7 5-7 5" fill="#2B003F"/><text x="86" y="34" font-size="9" fill="#2B003F">1/4 축소</text><rect x="112" y="32" width="30" height="22" fill="#FFFFFF" stroke="#464646" stroke-width="1.2"/><path d="M117 38h6M126 38h6M117 46h6M126 46h4" stroke="#000000" stroke-width="1.4"/><text x="112" y="70" font-size="9" fill="#464646">웨이퍼 field</text></svg>'},
  field:{k:'Field (노광 영역)',e:'exposure field',d:'한 번의 노광으로 패턴이 전사되는 사각 영역입니다. 웨이퍼 전면을 한 번에 찍을 수 없어 스텝-앤-스캔 방식으로 이 영역을 격자처럼 옮겨가며 반복 노광합니다. 이 프로젝트의 field 크기는 26 × 33 mm이고, 웨이퍼 한 장에서 반경 방향으로 펼친 9개 field를 골라 측정합니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="50" cy="55" r="42" fill="#FFFFFF" stroke="#FFEEE5"/><rect x="13" y="30" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="13" y="47" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="13" y="64" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="28" y="13" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="28" y="30" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="28" y="47" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="28" y="64" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="28" y="81" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="43" y="13" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="43" y="30" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="43" y="47" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="43" y="64" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="43" y="81" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="58" y="13" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="58" y="30" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="58" y="47" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="58" y="64" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="58" y="81" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="73" y="30" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><rect x="73" y="47" width="14" height="16" fill="#FFEEE5" stroke="#464646" stroke-width=".6"/><rect x="73" y="64" width="14" height="16" fill="none" stroke="#464646" stroke-width=".6"/><path d="M46 97h8l-4-7z" fill="#FFEEE5"/><text x="100" y="26" font-size="9" fill="#464646">한 칸 = 1회 노광 (26×33 mm)</text><text x="100" y="42" font-size="9" fill="#2B003F">진한 칸 = 측정 field 9개</text><text x="100" y="58" font-size="9" fill="#464646">center–mid–edge가</text><text x="100" y="72" font-size="9" fill="#464646">모두 표본에 들어오도록 배치</text></svg>'},
  chamber:{k:'Etch 챔버',e:'etch chamber',d:'플라즈마 식각이 일어나는 진공 반응기입니다. RF 파워로 가스를 이온화해 라디칼을 만들고, 웨이퍼는 정전척(ESC) 위에 고정되어 온도가 제어됩니다. 챔버 벽에 반응 부산물이 쌓이면 라디칼 밀도가 달라져 식각 속도와 선폭이 함께 흔들립니다. 이 프로젝트에는 4개(CH-A~D)가 있고 로트마다 번갈아 배정됩니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="16" y="18" width="78" height="72" rx="3" fill="#FFFFFF" stroke="#464646" stroke-width="1.3"/><path d="M24 26h62" stroke="#2B003F" stroke-width="2"/><g fill="#2B003F" opacity=".55"><circle cx="34" cy="42" r="2.2"/><circle cx="52" cy="38" r="2.2"/><circle cx="70" cy="44" r="2.2"/><circle cx="44" cy="52" r="2.2"/><circle cx="64" cy="54" r="2.2"/></g><rect x="30" y="64" width="50" height="5" fill="#FFEEE5" stroke="#464646" stroke-width=".9"/><rect x="34" y="69" width="42" height="8" fill="#FFEEE5" stroke="#464646" stroke-width=".9"/><text x="102" y="30" font-size="9" fill="#2B003F">RF · 가스 주입</text><text x="102" y="48" font-size="9" fill="#2B003F">플라즈마 (라디칼)</text><text x="102" y="70" font-size="9" fill="#464646">웨이퍼 / ESC (온도 제어)</text><text x="102" y="86" font-size="9" fill="#464646">벽면 상태가 CD에 영향</text></svg>'},
  golden:{k:'모니터 웨이퍼',e:'monitor wafer',d:'계측 장비의 안정성(stability)과 장비 간 정합(tool-to-tool matching)을 점검하려고 두는 전용 웨이퍼입니다. 이미 패턴이 형성되어 있고 공정 라인에는 다시 투입하지 않으며, 고정된 recipe로 같은 위치를 반복 측정합니다. 공정 변화가 개입하지 않으므로 값이 이동하면 그 이동분은 장비 기여로 귀속됩니다. 실제 fab에서도 CD-SEM 여러 대의 절대 선폭과 상호 정합을 이 방식으로 감시하며, 점검 주기는 일 단위인 경우도 흔합니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="36" cy="42" r="26" fill="#FFFFFF" stroke="#2B003F" stroke-width="1.3"/><path d="M24 34h24M24 42h24M24 50h24" stroke="#2B003F" stroke-width="2"/><text x="10" y="80" font-size="9" fill="#464646">패턴 고정 · 라인 미투입</text><line x1="106" y1="60" x2="188" y2="60" stroke="#FFEEE5"/><g fill="#2B003F"><circle cx="110" cy="60" r="2.6"/><circle cx="121" cy="60" r="2.6"/><circle cx="132" cy="60" r="2.6"/><circle cx="143" cy="60" r="2.6"/><circle cx="154" cy="60" r="2.6"/><circle cx="165" cy="62" r="2.6"/><circle cx="176" cy="64" r="2.6"/><circle cx="187" cy="66" r="2.6"/></g><text x="106" y="30" font-size="9" fill="#464646">동일 recipe 반복 측정</text><text x="106" y="88" font-size="9" fill="#2B003F">값이 이동하면 장비 drift</text></svg>'},
  cdsem:{k:'CD-SEM',e:'Critical Dimension SEM',d:'전자빔으로 패턴을 위에서 내려다보며 선폭을 재는 장비입니다. 서브나노미터급 정밀도를 내기 때문에 업계에서 the ruler of the fab이라고 불립니다. 2차 전자 신호의 세기 파형에서 패턴 가장자리를 찾아 두 edge 사이 거리를 CD로 산출합니다. 비파괴이지만 point 측정이라 웨이퍼당 측정 점수가 제한되며, 모던 장비 기준 대략 13~36점 수준입니다.',
    s:'<svg viewBox="0 0 200 110"><path d="M28 10v14" stroke="#2B003F" stroke-width="2.2"/><path d="M18 24h20l-10 20z" fill="none" stroke="#2B003F" stroke-width="1.3"/><rect x="10" y="52" width="38" height="9" fill="#FFEEE5" stroke="#464646" stroke-width="1"/><text x="10" y="76" font-size="9" fill="#464646">전자빔 · top-down</text><polyline points="66,74 78,74 84,44 92,44 98,74 118,74 124,44 132,44 138,74 152,74" fill="none" stroke="#000000" stroke-width="1.4"/><path d="M84 84h14" stroke="#2B003F" stroke-width="1.8"/><path d="M84 80v8M98 80v8" stroke="#2B003F" stroke-width="1.2"/><text x="80" y="98" font-size="9" fill="#2B003F">edge 사이 = CD</text><text x="66" y="32" font-size="9" fill="#464646">2차 전자 신호 파형</text></svg>'},
  xsem:{k:'단면 측정',e:'X-SEM / cross-section',d:'웨이퍼를 절단해 단면을 관찰하는 측정입니다. 프로파일의 아래폭(BCD)·중간폭(MCD)·위폭(TCD)과 측벽각을 모두 볼 수 있어 절대 기준으로 쓰입니다. 파괴 측정이라 극소 표본으로만 수행하며, 이 프로젝트에서는 주 3회 5점입니다. BCD 90 nm가 이 프로젝트의 최종 목표값입니다.',
    s:'<svg viewBox="0 0 200 110"><path d="M22 84 L34 26 L66 26 L78 84 Z" fill="#FFEEE5" stroke="#464646" stroke-width="1.2"/><path d="M34 22h32" stroke="#464646" stroke-width="2"/><path d="M28 55h44" stroke="#2B003F" stroke-width="2"/><path d="M22 90h56" stroke="#2B003F" stroke-width="2"/><text x="86" y="26" font-size="9" fill="#464646">TCD (위폭)</text><text x="86" y="59" font-size="9" fill="#2B003F">MCD (중간폭)</text><text x="86" y="94" font-size="9" fill="#2B003F">BCD (아래폭) · 목표 90 nm</text></svg>'},
  dose:{k:'Dose (노광량)',e:'exposure dose',d:'감광막에 전달되는 빛의 총량입니다. Positive tone 레지스트에서는 dose가 커질수록 선이 가늘어집니다. 웨이퍼 전면에 동일하게 걸리는 성분이므로, 웨이퍼 평균 CD가 통째로 이동하면 dose 계열을 먼저 의심합니다. dose 1% 변화가 CD 몇 nm에 해당하는지를 dose sensitivity라고 부르고, 이 값으로 보정량을 계산합니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="30" y1="20" x2="30" y2="86" stroke="#FFEEE5"/><line x1="30" y1="86" x2="176" y2="86" stroke="#FFEEE5"/><polyline points="40,30 70,42 100,54 130,66 164,78" fill="none" stroke="#2B003F" stroke-width="2"/><text x="6" y="30" font-size="9" fill="#464646">CD</text><text x="140" y="102" font-size="9" fill="#464646">dose</text><text x="86" y="34" font-size="9" fill="#2B003F">dose ↑ → CD ↓</text><text x="52" y="70" font-size="9" fill="#464646">기울기 = dose sensitivity</text></svg>'},
  peb:{k:'PEB (노광 후 열처리)',e:'Post Exposure Bake',d:'노광 후 웨이퍼를 가열판에서 굽는 단계입니다. 화학증폭형 레지스트에서는 이때 산 촉매 반응이 진행되어 잠상이 완성되므로, 판의 온도가 몇 십분의 1도만 달라져도 선폭이 바뀝니다. 가열판의 온도 분포는 중심-엣지 형태를 띠기 때문에 웨이퍼 반경 방향 지문으로 나타납니다.',
    s:'<svg viewBox="0 0 200 110"><circle cx="48" cy="50" r="34" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.2"/><circle cx="48" cy="50" r="22" fill="#FFEEE5" stroke="#2B003F" stroke-width=".9"/><circle cx="48" cy="50" r="10" fill="#FFEEE5" stroke="#2B003F" stroke-width=".9"/><text x="34" y="96" font-size="9" fill="#2B003F">가열판 온도 분포</text><text x="94" y="38" font-size="9" fill="#464646">중심과 엣지의</text><text x="94" y="54" font-size="9" fill="#464646">온도 차이가</text><text x="94" y="70" font-size="9" fill="#2B003F">반경 방향 CD 지문으로</text></svg>'},
  delta:{k:'Etch bias (ΔCD)',e:'etch bias',d:'ACI CD에서 ADI CD를 뺀 값으로, 식각을 거치며 선폭이 가로 방향으로 얼마나 변했는지를 뜻합니다. 깎인 깊이(etch depth)와는 다른 값입니다. 음수면 식각이 선을 좁힌 것이고, 이 프로젝트의 기준값은 −20 nm입니다. ADI가 정상인데 이 값만 흐르면 원인 후보는 Etch 또는 Metrology로 좁혀집니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="30" width="34" height="40" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.2"/><text x="16" y="24" font-size="9" fill="#2B003F">ADI CD</text><path d="M64 50h20" stroke="#464646" stroke-width="1.3"/><path d="M79 45l7 5-7 5" fill="#464646"/><rect x="96" y="30" width="22" height="40" fill="#FFEEE5" stroke="#464646" stroke-width="1.2"/><text x="94" y="24" font-size="9" fill="#464646">ACI CD</text><path d="M96 80h22" stroke="#2B003F" stroke-width="1.6"/><path d="M118 80h12" stroke="#2B003F" stroke-width="1.6" stroke-dasharray="3 2"/><text x="100" y="96" font-size="9" fill="#2B003F">가로 폭이 좁아진 양</text><text x="136" y="46" font-size="9" fill="#464646">깊이 변화가</text><text x="136" y="60" font-size="9" fill="#464646">아님</text></svg>'},
  pm:{k:'PM · 챔버 시즈닝',e:'Preventive Maintenance / seasoning',d:'설비를 정기적으로 열어 세정하고 부품을 교체하는 작업입니다. 세정 직후에는 챔버 벽면 상태가 리셋되어 식각 특성이 크게 달라지고(first wafer effect), 이후 반응 부산물이 벽에 쌓이면서 라디칼 밀도가 서서히 변해 etch bias가 완만하게 흐릅니다. 이 현상을 chamber seasoning이라 부르며, 실제 fab에서 CD 드리프트의 대표적 원인 중 하나입니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="24" y1="86" x2="182" y2="86" stroke="#FFEEE5"/><line x1="24" y1="18" x2="24" y2="86" stroke="#FFEEE5"/><polyline points="30,32 36,58 48,64 66,68 88,72 110,76" fill="none" stroke="#2B003F" stroke-width="1.8"/><polyline points="120,30 126,56 138,62 156,66 176,72" fill="none" stroke="#2B003F" stroke-width="1.8"/><line x1="115" y1="18" x2="115" y2="86" stroke="#2B003F" stroke-dasharray="3 2"/><text x="98" y="14" font-size="9" fill="#2B003F">PM</text><text x="30" y="24" font-size="9" fill="#2B003F">세정 직후 급변</text><text x="52" y="102" font-size="9" fill="#464646">PM 후 경과 시간 (RF hours)</text><text x="2" y="52" font-size="9" fill="#464646">bias</text></svg>'},
  limit:{k:'관리 한계',e:'control limit',d:'정상 변동으로 인정하는 범위입니다. 이 프로젝트에서는 이상 주입 이전 기준선 10일 데이터의 평균 ± 3σ로 엔진이 스스로 계산하며, 사람이 임의로 정하지 않습니다. SPC 관례상 관리 한계를 안정적으로 추정하려면 20~25개 이상의 표본군이 필요해 기준선 구간을 그만큼 확보했습니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="18" y1="50" x2="186" y2="50" stroke="#464646" stroke-dasharray="4 3"/><rect x="18" y="30" width="168" height="40" fill="#FFEEE5"/><line x1="18" y1="30" x2="186" y2="30" stroke="#464646" stroke-dasharray="2 3"/><line x1="18" y1="70" x2="186" y2="70" stroke="#464646" stroke-dasharray="2 3"/><g fill="#464646"><circle cx="26" cy="52" r="2.4"/><circle cx="37" cy="48" r="2.4"/><circle cx="48" cy="53" r="2.4"/><circle cx="59" cy="47" r="2.4"/><circle cx="70" cy="51" r="2.4"/><circle cx="81" cy="49" r="2.4"/><circle cx="92" cy="54" r="2.4"/><circle cx="103" cy="46" r="2.4"/><circle cx="114" cy="50" r="2.4"/><circle cx="125" cy="52" r="2.4"/><circle cx="136" cy="48" r="2.4"/><circle cx="147" cy="51" r="2.4"/><circle cx="158" cy="47" r="2.4"/><circle cx="169" cy="53" r="2.4"/><circle cx="180" cy="49" r="2.4"/></g><circle cx="170" cy="22" r="4" fill="#2B003F"/><text x="22" y="26" font-size="9" fill="#464646">평균 + 3σ</text><text x="22" y="84" font-size="9" fill="#464646">평균 − 3σ</text><text x="126" y="16" font-size="9" fill="#2B003F">한계 이탈</text></svg>'},
  rework:{k:'Rework (재작업)',e:'rework',d:'레지스트를 벗겨내고 노광부터 다시 하는 것입니다. 식각 전 ADI 시점에만 가능하며, 식각이 끝나면 구조가 확정되어 되돌릴 수 없습니다. 그래서 원인 판정이 빠를수록 살릴 수 있는 웨이퍼가 늘어납니다. 이 프로젝트가 ADI 계열 판정을 먼저 수행하는 이유입니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="34" width="42" height="24" fill="none" stroke="#2B003F" stroke-width="1.2"/><text x="35" y="50" text-anchor="middle" font-size="9" fill="#2B003F">노광</text><path d="M60 46h20" stroke="#464646"/><path d="M75 41l7 5-7 5" fill="#464646"/><rect x="84" y="34" width="42" height="24" fill="none" stroke="#2B003F" stroke-width="1.2"/><text x="105" y="50" text-anchor="middle" font-size="9" fill="#2B003F">ADI</text><path d="M130 46h20" stroke="#464646"/><path d="M145 41l7 5-7 5" fill="#464646"/><rect x="154" y="34" width="36" height="24" fill="none" stroke="#2B003F" stroke-width="1.2"/><text x="172" y="50" text-anchor="middle" font-size="9" fill="#2B003F">Etch</text><path d="M105 62 L105 78 L35 78 L35 62" fill="none" stroke="#2B003F" stroke-width="1.4"/><path d="M30 67l5-7 5 7" fill="#2B003F"/><text x="60" y="92" font-size="9" fill="#2B003F">rework (ADI에서만 가능)</text></svg>'},
  metro:{k:'Metrology (계측)',e:'metrology',d:'형성된 구조의 치수를 재는 일과 그 장비를 통칭합니다. 이 프로젝트에는 CD-SEM 2대(CDSEM-A, CDSEM-B)가 있고 로트마다 둘 중 하나가 측정을 맡습니다. 어느 장비가 쟀는지를 데이터에 기록해 두는 것이 계측 원인 판정의 열쇠입니다. 이 컬럼이 없으면 어떤 알고리즘을 써도 장비 drift를 공정 이상과 구분할 수 없습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="24" width="42" height="30" rx="2" fill="none" stroke="#464646" stroke-width="1.3"/><text x="37" y="43" text-anchor="middle" font-size="9" fill="#464646">CDSEM-A</text><rect x="16" y="60" width="42" height="30" rx="2" fill="none" stroke="#2B003F" stroke-width="1.6"/><text x="37" y="79" text-anchor="middle" font-size="9" fill="#2B003F">CDSEM-B</text><path d="M64 39h26M64 75h26" stroke="#464646"/><text x="96" y="42" font-size="9" fill="#464646">같은 구조를 재도</text><text x="96" y="58" font-size="9" fill="#464646">장비마다 offset이 다르다</text><text x="96" y="78" font-size="9" fill="#2B003F">→ 측정 장비 ID 기록 필수</text></svg>'},
  skiplot:{k:'Skip-lot 샘플링',e:'skip-lot sampling',d:'모든 로트를 측정하지 않고 일정 비율만 골라 재는 방식입니다. 계측은 장비 투자비와 사이클 타임을 동시에 소모하므로, 공정 능력지수(Cp/Cpk)가 좋을수록 skip 비율을 높입니다. 이 프로젝트는 ADI를 전 로트, ACI를 절반 로트에서 측정합니다.',
    s:'<svg viewBox="0 0 200 90"><rect x="14" y="30" width="14" height="18" fill="#2B003F" stroke="#464646" stroke-width=".8"/><rect x="31" y="30" width="14" height="18" fill="#ffffff" stroke="#464646" stroke-width=".8"/><rect x="48" y="30" width="14" height="18" fill="#2B003F" stroke="#464646" stroke-width=".8"/><rect x="65" y="30" width="14" height="18" fill="#ffffff" stroke="#464646" stroke-width=".8"/><rect x="82" y="30" width="14" height="18" fill="#2B003F" stroke="#464646" stroke-width=".8"/><rect x="99" y="30" width="14" height="18" fill="#ffffff" stroke="#464646" stroke-width=".8"/><rect x="116" y="30" width="14" height="18" fill="#2B003F" stroke="#464646" stroke-width=".8"/><rect x="133" y="30" width="14" height="18" fill="#ffffff" stroke="#464646" stroke-width=".8"/><rect x="150" y="30" width="14" height="18" fill="#2B003F" stroke="#464646" stroke-width=".8"/><rect x="167" y="30" width="14" height="18" fill="#ffffff" stroke="#464646" stroke-width=".8"/><text x="14" y="72" font-size="9" fill="#2B003F">■ 측정</text><text x="62" y="72" font-size="9" fill="#464646">□ skip</text><text x="120" y="72" font-size="9" fill="#464646">skip 비율은</text><text x="120" y="86" font-size="9" fill="#464646">Cp/Cpk로 결정</text></svg>'},
  apc:{k:'APC · R2R 제어',e:'Advanced Process Control, run-to-run',d:'앞 로트의 계측 결과로 다음 로트의 공정 조건을 자동 보정하는 제어 방식입니다. ADI에서 잰 CD와 오버레이가 스캐너 보정값으로 되먹임되는 것이 대표적입니다. 그래서 ADI는 actionable 측정, ACI는 검증 측정으로 구분합니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="16" y="30" width="44" height="26" fill="none" stroke="#2B003F" stroke-width="1.2"/><text x="38" y="47" text-anchor="middle" font-size="9" fill="#2B003F">스캐너</text><path d="M64 43h24" stroke="#464646"/><path d="M83 38l7 5-7 5" fill="#464646"/><rect x="92" y="30" width="44" height="26" fill="none" stroke="#2B003F" stroke-width="1.2"/><text x="114" y="47" text-anchor="middle" font-size="9" fill="#2B003F">ADI 계측</text><path d="M114 60 L114 78 L38 78 L38 60" fill="none" stroke="#2B003F" stroke-width="1.4"/><path d="M33 65l5-7 5 7" fill="#2B003F"/><text x="46" y="92" font-size="9" fill="#2B003F">보정값 되먹임 (run-to-run)</text></svg>'},
  tmu:{k:'TMU (총 측정 불확도)',e:'Total Measurement Uncertainty',d:'계측 장비가 만들어내는 오차의 총량을 나타내는 업계 표준 KPI입니다. 오버레이에서는 TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match를 제곱합 제곱근으로 합쳐 정의합니다. 이 프로젝트는 CD를 다루므로 TIS 항(0도/180도 회전으로 정의되는 오버레이 전용 항)은 제외하고 precision과 match 두 항만 씁니다. 측정 불확도는 공정 허용 예산의 20% 이내여야 한다는 것이 통상 기준입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="70" width="34" height="24" fill="#FFEEE5" stroke="#464646" stroke-width="1"/><text x="18" y="106" font-size="9" fill="#464646">precision</text><rect x="62" y="46" width="34" height="48" fill="#FFEEE5" stroke="#464646" stroke-width="1"/><text x="62" y="106" font-size="9" fill="#464646">match</text><text x="102" y="72" font-size="13" fill="#464646">=</text><rect x="120" y="34" width="34" height="60" fill="#FFEEE5" stroke="#2B003F" stroke-width="1.6"/><text x="122" y="106" font-size="9" fill="#2B003F">TMU</text><text x="118" y="26" font-size="9" fill="#2B003F">RSS 합성</text><line x1="164" y1="34" x2="186" y2="34" stroke="#2B003F" stroke-dasharray="3 2"/><text x="160" y="28" font-size="8" fill="#2B003F">예산 20%</text></svg>'},
  precision:{k:'Dynamic precision',e:'dynamic precision',d:'같은 지점을 같은 조건으로 여러 번 반복 측정했을 때 값이 얼마나 흩어지는지입니다. 보통 3σ로 표기하며, 장비 자체의 재현성을 뜻합니다. 이 프로젝트에서는 모니터 웨이퍼의 각 site를 5회씩 반복 측정해 산출합니다. 참값은 변하지 않으므로 흩어짐은 전부 장비 기여입니다.',
    s:'<svg viewBox="0 0 200 90"><line x1="26" y1="45" x2="176" y2="45" stroke="#FFEEE5"/><g fill="#2B003F"><circle cx="86" cy="45" r="3"/><circle cx="94" cy="45" r="3"/><circle cx="78" cy="45" r="3"/><circle cx="99" cy="45" r="3"/><circle cx="83" cy="45" r="3"/></g><path d="M74 60h30" stroke="#2B003F" stroke-width="1.6"/><path d="M74 56v8M104 56v8" stroke="#2B003F" stroke-width="1.2"/><text x="66" y="78" font-size="9" fill="#2B003F">반복 측정의 3σ</text><text x="30" y="30" font-size="9" fill="#464646">같은 site · 같은 recipe · 5회</text></svg>'},
  match:{k:'Tool-to-tool match',e:'tool matching',d:'같은 구조를 서로 다른 장비로 쟀을 때 값이 얼마나 다른지입니다. 로트마다 어느 장비가 측정을 맡을지 달라지므로, 장비 간 차이가 크면 공정이 변한 것인지 장비가 바뀐 것인지 구분할 수 없게 됩니다. 이 프로젝트는 두 장비가 모니터 웨이퍼의 같은 site를 잰 평균의 차이로 산출합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="26" y1="40" x2="176" y2="40" stroke="#FFEEE5"/><line x1="26" y1="66" x2="176" y2="66" stroke="#FFEEE5"/><g fill="#464646"><circle cx="70" cy="40" r="3.4"/><circle cx="96" cy="40" r="3.4"/><circle cx="122" cy="40" r="3.4"/></g><g fill="#2B003F"><circle cx="82" cy="66" r="3.4"/><circle cx="108" cy="66" r="3.4"/><circle cx="134" cy="66" r="3.4"/></g><text x="26" y="34" font-size="9" fill="#464646">CDSEM-A</text><text x="26" y="82" font-size="9" fill="#2B003F">CDSEM-B</text><path d="M150 40 L150 66" stroke="#2B003F" stroke-width="1.8"/><text x="154" y="56" font-size="9" fill="#2B003F">match</text></svg>'},
  tolerance:{k:'공정 허용 예산',e:'process tolerance',d:'CD가 벗어나도 되는 폭입니다. 이 프로젝트에서는 웨이퍼 내 CDU 3σ 4.2 nm에서 공정 능력지수 Cp가 약 1.43이 되도록 ±6.0 nm로 설정했습니다. 계측 불확도는 이 예산의 20% 이내, 즉 1.2 nm 이내여야 한다는 것이 통상 기준입니다.'},
  setting:{k:'Setting값',e:'Recipe Input / setpoint',d:'Recipe에 적혀 있어 장비에 지시되는 값입니다. 노광량 Setting 32.0 mJ/cm2는 이만큼 조사하라는 지시일 뿐, 실제로 그만큼 조사되었는지를 보장하지 않습니다. Setting은 변경 이력이 남으므로, 이슈 시점과 Setting 변경 시점이 어긋나면 그 항목은 원인 후보에서 배제할 수 있습니다.',
    s:'<svg viewBox="0 0 200 100"><rect x="14" y="26" width="80" height="44" fill="#FFFFFF" stroke="#464646" stroke-width="1.2"/><text x="22" y="44" font-size="10" fill="#464646">Recipe</text><text x="22" y="61" font-size="11" fill="#000000" font-family="IBM Plex Mono">dose = 32.0</text><text x="14" y="86" font-size="9" fill="#464646">장비에 내리는 지시값</text><text x="106" y="42" font-size="9" fill="#2B003F">지시했다는 뜻일 뿐</text><text x="106" y="58" font-size="9" fill="#2B003F">그대로 조사됐다는</text><text x="106" y="74" font-size="9" fill="#2B003F">보장은 아니다</text></svg>'},
  sensor:{k:'Energy Sensor 실측값',e:'energy sensor readback',d:'스캐너 내부 에너지 센서가 실제로 조사된 광량을 적산해 읽은 값입니다. CD가 반응하는 것은 Setting이 아니라 이 실효 dose입니다. Setting은 그대로인데 이 값만 이동했다면 광원 교체 후 Dose Mapper Calibration 누락, 센서 열화·오염, 조명계 투과율 변화를 의심합니다. 이 경우 Recipe를 고쳐도 실효 dose는 그대로여서 재발합니다.',
    s:'<svg viewBox="0 0 200 110"><line x1="26" y1="86" x2="182" y2="86" stroke="#FFEEE5"/><line x1="26" y1="20" x2="26" y2="86" stroke="#FFEEE5"/><line x1="26" y1="58" x2="182" y2="58" stroke="#464646" stroke-dasharray="5 3"/><text x="32" y="54" font-size="9" fill="#464646">Setting 32.0 (고정)</text><polyline points="34,60 62,58 90,59 112,50 134,40 160,34" fill="none" stroke="#2B003F" stroke-width="2"/><text x="106" y="28" font-size="9" fill="#2B003F">Sensor 실측</text><path d="M160 34 L160 58" stroke="#2B003F" stroke-width="1.6"/><text x="104" y="76" font-size="9" fill="#2B003F">이 괴리가 실효 dose 오차</text><text x="46" y="104" font-size="9" fill="#464646">시간</text></svg>'},
  dosemapper:{k:'Dose Mapper Calibration',e:'dose sensor calibration',d:'에너지 센서가 읽는 값과 웨이퍼 면에 실제 도달하는 광량 사이의 변환 관계를 다시 맞추는 작업입니다. 광원(Laser Source)을 교체하면 파장 대역폭(E95)과 pulse energy 특성이 달라지므로 같은 Setting에서도 실효 dose가 달라질 수 있습니다. 그래서 Source 교체는 Calibration 재수행을 필수 절차로 Change Control Checklist에 넣습니다.'},
  changepoint:{k:'변경점 · PM/Inform 이력',e:'change point / maintenance log',d:'설비에 가해진 모든 변경의 기록입니다. 부품 교체, PM, Recipe 변경, Calibration 수행 이력이 시점과 함께 남습니다. 이상 분석의 출발점은 항상 이상이 시작된 시점과 일치하는 변경점이 있는가이며, 시점이 어긋나면 그 항목은 원인 후보에서 배제합니다.'},
  ocap:{k:'SPC 관리도 · OCAP',e:'Statistical Process Control / Out of Control Action Plan',d:'지표를 관리 한계와 함께 시계열로 관리하고(SPC 관리도), 한계를 벗어났을 때 누가 무엇을 하는지 사전에 정해두는 절차(OCAP)입니다. Setting값만 감시하면 Setting과 실측의 괴리를 놓치므로, Sensor 실측값 자체에 관리도를 거는 것이 재발 방지의 핵심입니다.'},
  gate_ok:{k:'검증됨',e:'Verified',d:'이 판정이 요구하는 규칙 기반 검증 항목을 결정론적 코드가 다시 확인했고 모두 통과했습니다.'},
  gate_hold:{k:'근거 부족',e:'Needs evidence',d:'요구 조건 중 하나 이상을 충족하지 못해 원인을 지목하지 않고 보류했습니다. 판정 실패가 아니라 근거 부족을 명시한 상태입니다.'},
  tmu:{k:'TMU (계측 불확도)',e:'Total Measurement Uncertainty',d:'계측 장비가 만들어내는 오차의 총량을 나타내는 업계 표준 지표입니다. 오버레이에서는 TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match 네 항의 제곱합 제곱근으로 정의합니다. 이 값이 공정 허용 예산의 20%를 넘으면 측정값으로 공정을 판단하기 어려워집니다. 공정이 정상인지 아닌지가 측정 오차에 묻혀버리기 때문입니다.',
    s:'<svg viewBox="0 0 200 110"><rect x="18" y="30" width="150" height="30" fill="#FFFFFF" stroke="#FFEEE5"/><rect x="18" y="30" width="30" height="30" fill="#FFEEE5" stroke="#2B003F"/><text x="20" y="24" font-size="9" fill="#2B003F">계측 몫 (TMU)</text><text x="80" y="50" font-size="9" fill="#464646">공정에 남는 몫</text><path d="M18 70h150" stroke="#464646" stroke-width="1.4"/><path d="M18 66v8M168 66v8" stroke="#464646" stroke-width="1.2"/><text x="52" y="86" font-size="9" fill="#464646">공정 허용 예산 T</text><text x="18" y="104" font-size="9" fill="#2B003F">계측 몫은 20% 이내여야 한다</text></svg>'},
  precision:{k:'Dynamic precision',e:'dynamic precision',d:'같은 위치를 여러 번 반복 측정했을 때 값이 얼마나 흩어지는지입니다. 보통 3σ로 표기합니다. 웨이퍼를 내렸다 다시 올리지 않고 연속 측정하므로 순수하게 장비의 반복성만 봅니다. 이 프로젝트는 모니터 웨이퍼의 각 site를 3회씩 반복 측정해 산출합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="24" y1="50" x2="176" y2="50" stroke="#FFEEE5"/><g fill="#2B003F"><circle cx="70" cy="46" r="3"/><circle cx="78" cy="52" r="3"/><circle cx="86" cy="48" r="3"/><circle cx="94" cy="54" r="3"/><circle cx="102" cy="47" r="3"/></g><path d="M68 68h38" stroke="#2B003F" stroke-width="1.6"/><path d="M68 64v8M106 64v8" stroke="#2B003F" stroke-width="1.2"/><text x="66" y="84" font-size="9" fill="#2B003F">이 흩어짐이 precision</text><text x="24" y="30" font-size="9" fill="#464646">같은 자리를 3회 반복 측정</text></svg>'},
  match:{k:'Tool-to-tool match',e:'tool-to-tool matching',d:'같은 구조를 서로 다른 장비로 쟀을 때 값이 얼마나 다른지입니다. 로트마다 측정 장비가 바뀌므로, 장비 간 차이가 크면 공정이 변한 것처럼 보입니다. 그래서 fab에서는 여러 대의 CD-SEM을 하나의 fleet으로 묶어 상시 정합을 관리합니다.',
    s:'<svg viewBox="0 0 200 100"><line x1="26" y1="70" x2="176" y2="70" stroke="#FFEEE5"/><circle cx="78" cy="44" r="4" fill="#464646"/><circle cx="112" cy="44" r="4" fill="#2B003F"/><path d="M78 54h34" stroke="#2B003F" stroke-width="1.6"/><path d="M78 50v8M112 50v8" stroke="#2B003F" stroke-width="1.2"/><text x="52" y="36" font-size="9" fill="#464646">CDSEM-A</text><text x="118" y="36" font-size="9" fill="#2B003F">CDSEM-B</text><text x="66" y="88" font-size="9" fill="#2B003F">같은 자리, 다른 값 = match 오차</text></svg>'},
  tis:{k:'TIS',e:'Tool Induced Shift',d:'측정 대상을 0°와 180°로 회전시켜 두 번 잰 값의 차이로 정의되는 장비 고유의 비대칭 오차입니다. 오버레이 계측에서 정확도를 평가하는 표준 항목이며, 광학계의 비대칭에서 비롯됩니다. 회전 측정으로 정의되는 항이라 top-down CD 측정에는 그대로 적용되지 않아, 이 프로젝트의 TMU 계산에서는 제외했습니다.'},
  cdu:{k:'CDU',e:'CD Uniformity',d:'웨이퍼 안에서 선폭이 얼마나 고른지를 나타내는 지표로 보통 3σ로 표기합니다. 평균이 목표에 맞아도 CDU가 나쁘면 웨이퍼 일부는 스펙을 벗어납니다. 이 데이터의 웨이퍼 내 CDU는 3σ 기준 약 4.2 nm입니다.',
    s:'<svg viewBox="0 0 200 100"><g fill="#FFEEE5" stroke="#464646" stroke-width=".8"><rect x="62" y="74" width="9" height="8"/><rect x="72" y="62" width="9" height="20"/><rect x="82" y="44" width="9" height="38"/><rect x="92" y="27" width="9" height="55"/><rect x="102" y="20" width="9" height="62"/><rect x="112" y="27" width="9" height="55"/><rect x="122" y="44" width="9" height="38"/><rect x="132" y="62" width="9" height="20"/><rect x="142" y="74" width="9" height="8"/></g><line x1="100" y1="18" x2="100" y2="82" stroke="#2B003F" stroke-dasharray="3 2"/><path d="M62 88h76" stroke="#2B003F" stroke-width="1.6"/><path d="M62 84v8M138 84v8" stroke="#2B003F" stroke-width="1.2"/><text x="82" y="100" font-size="9" fill="#2B003F">3σ</text><text x="146" y="34" font-size="9" fill="#2B003F">평균</text></svg>'}
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
  aci:'CD measured after etch and clean; also called AEI. Closest to the final structure and catches etch-induced error, but the lot cannot be reworked. Purpose is etch-bias characterisation, so it runs skip-lot.',
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
  delta:'ACI CD minus ADI CD — how much etch changed the lateral width. Not etch depth. Reference here is -20 nm. If ADI is clean and only this moves, the candidates narrow to Etch or Metrology.',
  pm:'Opening the tool for clean and part replacement. Right after a wet clean the wall state is reset and etch behaviour jumps (first wafer effect); by-products then accumulate and bias drifts slowly. This is chamber seasoning.',
  limit:'The range accepted as normal variation. Here the engine derives it from the 10-day baseline as mean ± 3σ rather than a human setting it. SPC practice needs 20–25 subgroups for a stable estimate.',
  rework:'Stripping the resist and re-exposing. Only possible before etch, so the faster the attribution the more wafers survive.',
  metro:'Measuring the dimensions of what was built, and the tools that do it. Two CD-SEMs are in this dataset and each lot is measured by one of them. Recording which tool measured is the key to attributing tool drift.',
  skiplot:'Measuring a fraction of lots rather than all of them. Metrology costs both capital and cycle time, so the better the process capability (Cp/Cpk) the higher the skip rate. ADI is every lot here, ACI half.',
  apc:'Correcting the next lot automatically from the previous lot measurement. ADI CD and overlay feeding back as scanner corrections is the classic case — which is why ADI is actionable and ACI is verification.',
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
  gate_ok:'Deterministic code re-checked every rule-specific verification condition required for this disposition, and all conditions passed.',
  gate_hold:'One or more required verification conditions were not met, so the system withholds attribution instead of forcing a cause.',
  cdu:'How uniform CD is across the wafer, usually quoted as 3σ. Even on-target on average, poor CDU puts part of the wafer out of spec. About 4.2 nm here.',

};

/* ── English rule copy: UI language never falls back to Korean ── */
const EN_RULE = {
  PHOTO_DOSE: {
    label: 'Exposure dose drift', module: 'Litho',
    cause: 'The wafer-average ADI CD shifted while the radial, slit and reticle-repeat components stayed inside their limits. That is a wafer-wide mean-shift signature, so a uniform driver should be checked first. If the recipe Setting is stable but the Energy Sensor reading moved, the effective dose has separated from the commanded dose; Dose Mapper / Energy Sensor calibration becomes the first suspect.',
    action: 'Order matters. (1) Compare the recipe Setting with the Energy Sensor reading. If they disagree, recalibrate the Dose Mapper / Energy Sensor before changing the recipe. (2) Check PM / change history for laser-source replacement, illumination-optics replacement and the latest calibration. (3) Separate a step change from a gradual drift in the Energy Sensor trend. (4) Review source parameters such as pulse-energy stability, E95 bandwidth and illumination transmission. (5) Confirm that Track develop / PEB conditions did not change. (6) Verify recovery with a rework lot while the wafer is still before etch. (7) Put the Energy Sensor reading itself under SPC and add calibration to the change-control checklist after source replacement.'
  },
  PHOTO_TRACK_RADIAL: {
    label: 'Track / PEB radial profile shift', module: 'Litho (Track)',
    cause: 'The ADI residual shows an out-of-limit radial coefficient: centre-to-edge CD separation increased while the wafer mean remained comparatively stable. A uniform dose shift does not create this pattern. The signature is consistent with a PEB hot-plate temperature profile or radial coating-thickness change, and a normal Delta-CD argues against an etch-originated shift.',
    action: '(1) Review the Track PEB plate temperature map, including zone setpoints and actual temperatures. (2) Check coater spin profile and radial resist-thickness uniformity. (3) Match the onset against Track PM / calibration / maintenance history. (4) Do not hide a radial signature with scanner dose correction; correcting only the wafer mean can worsen centre-to-edge CDU.'
  },
  RETICLE_CD_ERROR: {
    label: 'Reticle CD error', module: 'Litho (Reticle)',
    cause: 'The deviation appears at the same in-field site and repeats across fields. Because it is fixed to field coordinates rather than wafer or radial coordinates, the reticle itself is the leading source.',
    action: '(1) Expose the same reticle on another scanner and check whether the same site repeats. If it follows the reticle, the reticle is implicated; if it follows the scanner, investigate the scanner fingerprint. (2) Review mask CD inspection results and recent clean / repair history. (3) Check pellicle contamination and mask CD degradation. (4) Do not start with scanner dose or etch-recipe correction; a site-fixed signature will not be removed by wafer-wide compensation.'
  },
  ETCH_CHAMBER: {
    label: 'Etch chamber deviation / PM drift', module: 'Etch',
    cause: 'ADI is normal, but Delta-CD moved and the excursion is concentrated in one chamber with a radial component. The leading causes are plasma-uniformity, gas-flow or ESC-temperature changes, or cumulative chamber drift after PM.',
    action: '(1) Isolate the chamber and re-measure etch bias with a chamber-matching wafer. (2) Plot bias versus RF hours to separate seasoning drift from a one-time shift, and distinguish the first-wafer-effect region after PM from the slower drift that follows. (3) Review OES, RF and pressure traces for the affected interval. (4) Compare chamber PM / wet-clean timing with the CD change point. (5) ACI is not reworkable; if needed, temporarily adjust the upstream ADI target for subsequent lots and restore it after chamber recovery.'
  },
  METROLOGY_TOOL_DRIFT: {
    label: 'Metrology tool offset drift', module: 'Metrology',
    cause: 'Delta-CD moved without being confined to one etch chamber, but the shift appears only on lots measured by one metrology tool. A monitor wafer that never saw the process moved in the same direction, which points to metrology offset drift rather than a process change.',
    action: '(1) Hold process action; changing chamber recipes now can move a healthy process. (2) Review the CD-SEM monitor-wafer history and the latest calibration, then recalibrate. (3) Recalculate the tool-to-tool matching offset. (4) Re-evaluate lots measured by the affected tool during the suspect interval. (5) Consider shortening the monitor-wafer cadence. (6) Decompose TMU into precision and tool-to-tool match; if match dominates, re-align the fleet, and if precision dominates, investigate recipe settings such as frame count, magnification and landing energy as well as tool condition.'
  },
  INDETERMINATE: {
    label: 'Attribution withheld', module: '',
    cause: 'An excursion was detected, but the evidence is not strong enough to assign a source. Chamber concentration and metrology drift may both fall short of their required conditions, or a required evidence stream may be missing.',
    action: 'Request more evidence: chamber-matching wafer data, an interim monitor-wafer re-measurement and, where useful, a cross-section taper check. Do not name an action owner without enough evidence.'
  },
  NORMAL: {
    label: 'Normal', module: '',
    cause: 'All monitored components are within their control limits.',
    action: 'No action required.'
  }
};

/* ── Glossary names and diagram localization ── */
const TERM_EN_NAME = {
  excursion:'Excursion', attribution:'Attribution / disposition', wafer:'Wafer', lot:'Lot',
  photo:'Photolithography (Litho)', etch:'Plasma etch', cd:'CD (Critical Dimension)', pitch:'Pitch',
  adi:'ADI (After Develop Inspection)', aci:'ACI / AEI (After Clean / Etch Inspection)',
  epe:'EPE (Edge Placement Error)', overlay:'Overlay', reticle:'Reticle / photomask', field:'Exposure field',
  chamber:'Etch chamber', golden:'Monitor wafer / golden wafer', cdsem:'CD-SEM', xsem:'Cross-section SEM',
  dose:'Exposure dose', peb:'PEB (Post Exposure Bake)', delta:'Delta-CD / etch bias', pm:'PM / chamber seasoning',
  limit:'Control limit', rework:'Rework', metro:'Metrology', skiplot:'Skip-lot sampling', apc:'APC / run-to-run control',
  tmu:'TMU (Total Measurement Uncertainty)', precision:'Dynamic precision', match:'Tool-to-tool matching',
  tolerance:'Process tolerance', setting:'Recipe Setting', sensor:'Energy Sensor actual', dosemapper:'Dose Mapper calibration',
  changepoint:'Change point / maintenance history', ocap:'SPC / OCAP', gate_ok:'Verification passed',
  gate_hold:'Attribution withheld', tis:'TIS (Tool Induced Shift)', cdu:'CDU (CD Uniformity)'
};

const SVG_TEXT_EN = {
  '조치 대상':'Action owner','확정':'confirmed','지름 300 mm':'300 mm diameter','한 장에 die 수백 개':'Hundreds of die per wafer',
  '아래 노치 = 정렬 기준':'Bottom notch = alignment reference','진한 칸 = 측정 슬롯':'Dark slots = sampled wafers',
  '조명계 (dose)':'Illumination (dose)','레티클':'Reticle','투영 렌즈 · 1/4 축소':'Projection lens · 4x reduction','웨이퍼 (감광막)':'Wafer (photoresist)',
  '플라즈마':'Plasma','측벽각(SWA)이 생김':'Sidewall angle (SWA)','폭도 함께 변함':'CD changes with profile',
  'pitch = CD + space (고정)':'pitch = CD + space (fixed)','CD가 커지면':'If CD increases','space가 줄어든다':'space decreases',
  'pitch (중심 간 거리)':'pitch (centre-to-centre)','설계가 정하는':'set by design','고정값':'fixed value',
  '레지스트 패턴 (미식각)':'Resist pattern (pre-etch)','rework 가능 · APC 피드백':'Reworkable · APC feedback','Etch 단계로':'To Etch','진행':'process',
  '레지스트 제거 · 소자 구조':'Resist removed · device feature','되돌릴 수 없음 · skip-lot 측정':'Not reworkable · skip-lot','최종 결과에 가장 가까움':'Closest to final structure',
  '위층 패턴':'Upper-layer pattern','EPE = 가장자리 어긋남':'EPE = edge displacement','아래층 패턴':'Lower-layer pattern','EPE = 오버레이 오차 + CD 변동':'EPE = overlay error + CD variation',
  '아래층 target':'Lower-layer target','위층 target':'Upper-layer target','둘의 차이 = overlay':'Difference = overlay',
  '레티클 (4배 크기)':'Reticle image (4x)','1/4 축소':'4x → 1x','웨이퍼 field':'Wafer field','한 칸 = 1회 노광 (26×33 mm)':'One cell = one exposure (26×33 mm)',
  '진한 칸 = 측정 field 9개':'Dark cells = 9 sampled fields','center–mid–edge가':'centre / mid / edge','모두 표본에 들어오도록 배치':'all included in sampling',
  'RF · 가스 주입':'RF · gas feed','플라즈마 (라디칼)':'Plasma (radicals)','웨이퍼 / ESC (온도 제어)':'Wafer / ESC (temperature control)','벽면 상태가 CD에 영향':'Wall condition shifts CD',
  '패턴 고정 · 라인 미투입':'Fixed pattern · never returned to line','동일 recipe 반복 측정':'Repeated on a fixed recipe','값이 이동하면 장비 drift':'Movement = tool drift',
  '전자빔 · top-down':'Electron beam · top-down','edge 사이 = CD':'Edge-to-edge = CD','2차 전자 신호 파형':'Secondary-electron waveform',
  'TCD (위폭)':'TCD (top CD)','MCD (중간폭)':'MCD (middle CD)','BCD (아래폭) · 목표 90 nm':'BCD (bottom CD) · target 90 nm',
  'dose ↑ → CD ↓':'dose ↑ → CD ↓','기울기 = dose sensitivity':'slope = dose sensitivity','가열판 온도 분포':'Hot-plate temperature profile',
  '중심과 엣지의':'Centre-to-edge','온도 차이가':'temperature difference','반경 방향 CD 지문으로':'creates a radial CD','ADI CD':'ADI CD','ACI CD':'ACI CD',
  '가로 폭이 좁아진 양':'Lateral width change','깊이 변화가':'Not an etch-depth','아님':'measurement','세정 직후 급변':'Step after clean','PM 후 경과 시간 (RF hours)':'Time after PM (RF hours)',
  '평균 + 3σ':'mean + 3σ','평균 − 3σ':'mean − 3σ','한계 이탈':'out of limit','노광':'Litho','rework (ADI에서만 가능)':'rework (ADI only)',
  '같은 구조를 재도':'Re-measuring the same structure','장비마다 offset이 다르다':'each tool can have a different offset','→ 측정 장비 ID 기록 필수':'→ tool ID must be recorded',
  '■ 측정':'■ measured','□ skip':'□ skipped','skip 비율은':'skip rate set by','Cp/Cpk로 결정':'Cp / Cpk','스캐너':'Scanner','ADI 계측':'ADI metrology','보정값 되먹임 (run-to-run)':'Correction fed back (run-to-run)',
  '예산 20%':'20% budget','반복 측정의 3σ':'3σ of repeated readings','같은 site · 같은 recipe · 5회':'same site · same recipe · 5 repeats',
  '같은 구조를 재도':'Same structure re-measured','장비에 내리는 지시값':'Command sent to the tool','지시했다는 뜻일 뿐':'A command does not prove','그대로 조사됐다는':'that the same energy','보장은 아니다':'reached the wafer',
  'Setting 32.0 (고정)':'Setting 32.0 (fixed)','Sensor 실측':'Sensor actual','이 괴리가 실효 dose 오차':'This gap is an effective-dose error','시간':'Time',
  '계측 몫 (TMU)':'Measurement share (TMU)','공정에 남는 몫':'Budget left for process','공정 허용 예산 T':'Process tolerance T','계측 몫은 20% 이내여야 한다':'Target: TMU ≤ 20% of T',
  '이 흩어짐이 precision':'This scatter = precision','같은 자리를 3회 반복 측정':'Same site measured 3 times','같은 자리, 다른 값 = match 오차':'Same site, different reading = match error','평균':'mean'
};

const TERM_SVG_OVERRIDE = {
  reticle: {
    ko: `<svg viewBox="0 0 320 180" aria-hidden="true"><rect x="28" y="52" width="96" height="64" rx="2" fill="#FFFFFF" stroke="#464646" stroke-width="2"/><g fill="#000000"><rect x="46" y="70" width="20" height="6"/><rect x="76" y="70" width="20" height="6"/><rect x="46" y="88" width="20" height="6"/><rect x="76" y="88" width="13" height="6"/><rect x="46" y="106" width="28" height="6"/></g><path d="M146 84h50" stroke="#9A6814" stroke-width="3"/><path d="M188 76l13 8-13 8z" fill="#9A6814"/><text x="146" y="66" class="cap" fill="#9A6814">1/4 축소</text><rect x="220" y="68" width="66" height="38" rx="2" fill="#FFFFFF" stroke="#464646" stroke-width="2"/><g fill="#000000"><rect x="232" y="79" width="12" height="4"/><rect x="250" y="79" width="12" height="4"/><rect x="232" y="91" width="12" height="4"/><rect x="250" y="91" width="8" height="4"/></g><text x="28" y="142" class="lbl">레티클 (4배 크기)</text><text x="220" y="132" class="lbl">웨이퍼 field</text></svg>`,
    en: `<svg viewBox="0 0 320 180" aria-hidden="true"><rect x="28" y="52" width="96" height="64" rx="2" fill="#FFFFFF" stroke="#464646" stroke-width="2"/><g fill="#000000"><rect x="46" y="70" width="20" height="6"/><rect x="76" y="70" width="20" height="6"/><rect x="46" y="88" width="20" height="6"/><rect x="76" y="88" width="13" height="6"/><rect x="46" y="106" width="28" height="6"/></g><path d="M146 84h50" stroke="#9A6814" stroke-width="3"/><path d="M188 76l13 8-13 8z" fill="#9A6814"/><text x="136" y="66" class="cap" fill="#9A6814">4x → 1x reduction</text><rect x="220" y="68" width="66" height="38" rx="2" fill="#FFFFFF" stroke="#464646" stroke-width="2"/><g fill="#000000"><rect x="232" y="79" width="12" height="4"/><rect x="250" y="79" width="12" height="4"/><rect x="232" y="91" width="12" height="4"/><rect x="250" y="91" width="8" height="4"/></g><text x="28" y="142" class="lbl">Reticle image (4x)</text><text x="220" y="132" class="lbl">Wafer field (1x)</text></svg>`
  },
  cdsem: {
    ko: `<svg viewBox="0 0 340 190" aria-hidden="true"><path d="M72 28v30" stroke="#55639A" stroke-width="4"/><path d="M52 58h40L72 94z" fill="none" stroke="#55639A" stroke-width="3"/><rect x="34" y="122" width="78" height="20" fill="#F7E5DB" stroke="#464646" stroke-width="2"/><text x="34" y="162" class="lbl">전자빔 · top-down</text><text x="154" y="54" class="lbl">2차 전자 신호 파형</text><path d="M152 124 L164 78 L182 78 L194 124 L224 124 L236 78 L254 78 L266 124" fill="none" stroke="#000000" stroke-width="3"/><path d="M164 148h72" stroke="#55639A" stroke-width="3"/><path d="M164 140v16M236 140v16" stroke="#55639A" stroke-width="3"/><text x="164" y="174" class="cap" fill="#55639A">edge 사이 = CD</text></svg>`,
    en: `<svg viewBox="0 0 340 190" aria-hidden="true"><path d="M72 28v30" stroke="#55639A" stroke-width="4"/><path d="M52 58h40L72 94z" fill="none" stroke="#55639A" stroke-width="3"/><rect x="34" y="122" width="78" height="20" fill="#F7E5DB" stroke="#464646" stroke-width="2"/><text x="34" y="162" class="lbl">Electron beam · top-down</text><text x="142" y="54" class="lbl">Secondary-electron waveform</text><path d="M152 124 L164 78 L182 78 L194 124 L224 124 L236 78 L254 78 L266 124" fill="none" stroke="#000000" stroke-width="3"/><path d="M164 148h72" stroke="#55639A" stroke-width="3"/><path d="M164 140v16M236 140v16" stroke="#55639A" stroke-width="3"/><text x="150" y="174" class="cap" fill="#55639A">CD = edge-to-edge distance</text></svg>`
  },
  tmu: {
    ko: `<svg viewBox="0 0 340 190" aria-hidden="true"><rect x="36" y="72" width="220" height="38" rx="3" fill="#FFFFFF" stroke="#E8D7D0" stroke-width="2"/><rect x="36" y="72" width="44" height="38" rx="3" fill="#EEF0F8" stroke="#55639A" stroke-width="2"/><text x="36" y="56" class="cap" fill="#55639A">계측 몫 (TMU)</text><text x="112" y="96" class="lbl">공정에 남는 몫</text><path d="M36 132h220" stroke="#464646" stroke-width="3"/><path d="M36 123v18M256 123v18" stroke="#464646" stroke-width="3"/><text x="104" y="154" class="lbl">공정 허용 예산 T</text><text x="36" y="176" class="cap" fill="#55639A">계측 몫은 20% 이내여야 한다</text></svg>`,
    en: `<svg viewBox="0 0 340 190" aria-hidden="true"><rect x="36" y="72" width="220" height="38" rx="3" fill="#FFFFFF" stroke="#E8D7D0" stroke-width="2"/><rect x="36" y="72" width="44" height="38" rx="3" fill="#EEF0F8" stroke="#55639A" stroke-width="2"/><text x="36" y="56" class="cap" fill="#55639A">Measurement share (TMU)</text><text x="110" y="96" class="lbl">Budget left for process</text><path d="M36 132h220" stroke="#464646" stroke-width="3"/><path d="M36 123v18M256 123v18" stroke="#464646" stroke-width="3"/><text x="104" y="154" class="lbl">Process tolerance T</text><text x="36" y="176" class="cap" fill="#55639A">Target: TMU ≤ 20% of T</text></svg>`
  },
  peb: {
    ko: `<svg viewBox="0 0 340 200" aria-hidden="true"><defs><radialGradient id="peb-ko" cx="42%" cy="45%" r="60%"><stop offset="0%" stop-color="#F7D9C9"/><stop offset="42%" stop-color="#F7E9D5"/><stop offset="72%" stop-color="#D9EFEA"/><stop offset="100%" stop-color="#B9DDD6"/></radialGradient></defs><circle cx="96" cy="104" r="66" fill="url(#peb-ko)" stroke="#0F766E" stroke-width="2.5"/><circle cx="96" cy="104" r="46" fill="none" stroke="#0F766E" stroke-opacity=".45" stroke-width="1.5"/><circle cx="96" cy="104" r="24" fill="none" stroke="#B6534A" stroke-opacity=".55" stroke-width="1.5"/><text x="48" y="184" class="lbl">가열판 온도 분포</text><text x="190" y="78" class="lbl">중심과 엣지의</text><text x="190" y="100" class="lbl">온도 차이가</text><text x="190" y="124" class="cap" fill="#0F766E">반경 방향 CD 지문</text><text x="190" y="146" class="lbl">으로 나타남</text></svg>`,
    en: `<svg viewBox="0 0 340 200" aria-hidden="true"><defs><radialGradient id="peb-en" cx="42%" cy="45%" r="60%"><stop offset="0%" stop-color="#F7D9C9"/><stop offset="42%" stop-color="#F7E9D5"/><stop offset="72%" stop-color="#D9EFEA"/><stop offset="100%" stop-color="#B9DDD6"/></radialGradient></defs><circle cx="96" cy="104" r="66" fill="url(#peb-en)" stroke="#0F766E" stroke-width="2.5"/><circle cx="96" cy="104" r="46" fill="none" stroke="#0F766E" stroke-opacity=".45" stroke-width="1.5"/><circle cx="96" cy="104" r="24" fill="none" stroke="#B6534A" stroke-opacity=".55" stroke-width="1.5"/><text x="32" y="184" class="lbl">Hot-plate temperature profile</text><text x="188" y="76" class="lbl">Centre-to-edge</text><text x="188" y="98" class="lbl">temperature difference</text><text x="188" y="124" class="cap" fill="#0F766E">creates a radial</text><text x="188" y="146" class="cap" fill="#0F766E">CD fingerprint</text></svg>`
  }
};


Object.assign(TERM_SVG_OVERRIDE, {
  wafer: {
    ko: `<svg viewBox="0 0 340 220" aria-hidden="true"><circle cx="92" cy="92" r="62" fill="#FFFFFF" stroke="#464646" stroke-width="2.5"/><g stroke="#C6907A" stroke-width="1.2"><line x1="44" y1="44" x2="44" y2="140"/><line x1="62" y1="38" x2="62" y2="146"/><line x1="80" y1="34" x2="80" y2="150"/><line x1="98" y1="32" x2="98" y2="152"/><line x1="116" y1="34" x2="116" y2="150"/><line x1="134" y1="38" x2="134" y2="146"/><line x1="152" y1="44" x2="152" y2="140"/><line x1="36" y1="56" x2="148" y2="56"/><line x1="32" y1="74" x2="152" y2="74"/><line x1="30" y1="92" x2="154" y2="92"/><line x1="32" y1="110" x2="152" y2="110"/><line x1="36" y1="128" x2="148" y2="128"/></g><path d="M84 154h16l-8-18z" fill="#464646"/><text x="184" y="76" class="cap" fill="#B6534A">300 mm 웨이퍼</text><text x="184" y="104" class="lbl">• 다이 수백 개가 배치됨</text><text x="184" y="126" class="lbl">• 아래 notch = 정렬 기준</text><text x="36" y="194" class="lbl">격자선은 die 배열 예시</text></svg>`,
    en: `<svg viewBox="0 0 340 220" aria-hidden="true"><circle cx="92" cy="92" r="62" fill="#FFFFFF" stroke="#464646" stroke-width="2.5"/><g stroke="#C6907A" stroke-width="1.2"><line x1="44" y1="44" x2="44" y2="140"/><line x1="62" y1="38" x2="62" y2="146"/><line x1="80" y1="34" x2="80" y2="150"/><line x1="98" y1="32" x2="98" y2="152"/><line x1="116" y1="34" x2="116" y2="150"/><line x1="134" y1="38" x2="134" y2="146"/><line x1="152" y1="44" x2="152" y2="140"/><line x1="36" y1="56" x2="148" y2="56"/><line x1="32" y1="74" x2="152" y2="74"/><line x1="30" y1="92" x2="154" y2="92"/><line x1="32" y1="110" x2="152" y2="110"/><line x1="36" y1="128" x2="148" y2="128"/></g><path d="M84 154h16l-8-18z" fill="#464646"/><text x="184" y="76" class="cap" fill="#B6534A">300 mm wafer</text><text x="184" y="104" class="lbl">• carries hundreds of die</text><text x="184" y="126" class="lbl">• bottom notch = alignment reference</text><text x="38" y="194" class="lbl">Grid shows an example die layout</text></svg>`
  },
  field: {
    ko: `<svg viewBox="0 0 340 220" aria-hidden="true"><circle cx="92" cy="102" r="66" fill="none" stroke="#E7CFC4" stroke-width="2"/><g stroke="#464646" stroke-width="1.5"><rect x="44" y="54" width="24" height="24" fill="#FFFFFF"/><rect x="68" y="54" width="24" height="24" fill="#F7E5DB"/><rect x="92" y="54" width="24" height="24" fill="#FFFFFF"/><rect x="116" y="54" width="24" height="24" fill="#F7E5DB"/><rect x="32" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="56" y="78" width="24" height="24" fill="#F7E5DB"/><rect x="80" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="104" y="78" width="24" height="24" fill="#F7E5DB"/><rect x="128" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="44" y="102" width="24" height="24" fill="#F7E5DB"/><rect x="68" y="102" width="24" height="24" fill="#FFFFFF"/><rect x="92" y="102" width="24" height="24" fill="#F7E5DB"/><rect x="116" y="102" width="24" height="24" fill="#FFFFFF"/><rect x="56" y="126" width="24" height="24" fill="#FFFFFF"/><rect x="80" y="126" width="24" height="24" fill="#F7E5DB"/><rect x="104" y="126" width="24" height="24" fill="#FFFFFF"/></g><text x="182" y="76" class="cap" fill="#55639A">한 칸 = 1회 노광 field</text><text x="182" y="102" class="lbl">• 26 × 33 mm 예시</text><text x="182" y="124" class="lbl">• 진한 칸 = 측정한 field</text><text x="182" y="146" class="lbl">• center / mid / edge 포함</text><text x="34" y="196" class="lbl">웨이퍼 반경 방향으로 9개 field 표본</text></svg>`,
    en: `<svg viewBox="0 0 340 220" aria-hidden="true"><circle cx="92" cy="102" r="66" fill="none" stroke="#E7CFC4" stroke-width="2"/><g stroke="#464646" stroke-width="1.5"><rect x="44" y="54" width="24" height="24" fill="#FFFFFF"/><rect x="68" y="54" width="24" height="24" fill="#F7E5DB"/><rect x="92" y="54" width="24" height="24" fill="#FFFFFF"/><rect x="116" y="54" width="24" height="24" fill="#F7E5DB"/><rect x="32" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="56" y="78" width="24" height="24" fill="#F7E5DB"/><rect x="80" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="104" y="78" width="24" height="24" fill="#F7E5DB"/><rect x="128" y="78" width="24" height="24" fill="#FFFFFF"/><rect x="44" y="102" width="24" height="24" fill="#F7E5DB"/><rect x="68" y="102" width="24" height="24" fill="#FFFFFF"/><rect x="92" y="102" width="24" height="24" fill="#F7E5DB"/><rect x="116" y="102" width="24" height="24" fill="#FFFFFF"/><rect x="56" y="126" width="24" height="24" fill="#FFFFFF"/><rect x="80" y="126" width="24" height="24" fill="#F7E5DB"/><rect x="104" y="126" width="24" height="24" fill="#FFFFFF"/></g><text x="182" y="76" class="cap" fill="#55639A">One cell = one exposure field</text><text x="182" y="102" class="lbl">• 26 × 33 mm example</text><text x="182" y="124" class="lbl">• dark cells = sampled fields</text><text x="182" y="146" class="lbl">• centre / mid / edge included</text><text x="38" y="196" class="lbl">Nine sampled fields across the wafer radius</text></svg>`
  },
  cd: {
    ko: `<svg viewBox="0 0 340 230" aria-hidden="true"><rect x="40" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><rect x="132" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><rect x="224" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><path d="M40 42h42" stroke="#B6534A" stroke-width="5"/><path d="M40 30v24M82 30v24" stroke="#B6534A" stroke-width="4"/><text x="54" y="24" class="cap" fill="#B6534A">CD</text><path d="M82 178h50" stroke="#464646" stroke-width="5"/><path d="M82 166v24M132 166v24" stroke="#464646" stroke-width="4"/><text x="90" y="212" class="cap" fill="#464646">space</text><path d="M40 202h92" stroke="#B6534A" stroke-width="5"/><path d="M40 190v24M132 190v24" stroke="#B6534A" stroke-width="4"/><text x="156" y="206" class="cap" fill="#B6534A">pitch = CD + space (fixed)</text><text x="184" y="98" class="lbl">CD가 커지면</text><text x="184" y="122" class="lbl">space는 줄어듭니다</text></svg>`,
    en: `<svg viewBox="0 0 340 230" aria-hidden="true"><rect x="40" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><rect x="132" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><rect x="224" y="62" width="42" height="88" fill="#F7E5DB" stroke="#000000" stroke-width="2"/><path d="M40 42h42" stroke="#B6534A" stroke-width="5"/><path d="M40 30v24M82 30v24" stroke="#B6534A" stroke-width="4"/><text x="54" y="24" class="cap" fill="#B6534A">CD</text><path d="M82 178h50" stroke="#464646" stroke-width="5"/><path d="M82 166v24M132 166v24" stroke="#464646" stroke-width="4"/><text x="90" y="212" class="cap" fill="#464646">space</text><path d="M40 202h92" stroke="#B6534A" stroke-width="5"/><path d="M40 190v24M132 190v24" stroke="#B6534A" stroke-width="4"/><text x="156" y="206" class="cap" fill="#B6534A">pitch = CD + space (fixed)</text><text x="184" y="98" class="lbl">If CD increases,</text><text x="184" y="122" class="lbl">space decreases.</text></svg>`
  }
});

function glossaryName(key) {
  const x = TERMS[key] || {};
  return LANG === 'en' ? (TERM_EN_NAME[key] || x.e || x.k || key) : (x.k || key);
}
function glossarySecondary(key) {
  const x = TERMS[key] || {};
  if (LANG === 'en') return '';
  return x.e || '';
}
function glossaryDesc(key) {
  const x = TERMS[key] || {};
  return LANG === 'en' && TERM_EN[key] ? TERM_EN[key] : (x.d || '');
}
function localizeSvgText(svg) {
  if (LANG !== 'en' || !svg) return svg || '';
  return svg.replace(/>([^<>]+)</g, (m, raw) => {
    const lead = raw.match(/^\s*/)?.[0] || '';
    const trail = raw.match(/\s*$/)?.[0] || '';
    const core = raw.trim();
    return `>${lead}${SVG_TEXT_EN[core] || core}${trail}<`;
  });
}
function glossarySvg(key) {
  const o = TERM_SVG_OVERRIDE[key];
  const raw = o ? (LANG === 'en' ? o.en : o.ko) : (TERMS[key]?.s || '');
  const svg = localizeSvgText(raw);
  return svg ? `<div class="gvisual">${svg}</div>` : '';
}
function glossaryTitleHtml(key, tag='h3') {
  const sec = glossarySecondary(key);
  return `<${tag}>${esc(glossaryName(key))}${sec ? `<span class="en">${esc(sec)}</span>` : ''}</${tag}>`;
}

const KO_RULE = {"PHOTO_DOSE": {"label": "노광 dose drift", "risk": "정상", "module": "Photo", "cause": "웨이퍼 평균 ADI CD가 통째로 이동했고, 반경 성분·슬릿 지문·레티클 반복 성분은 모두 관리 한계 안이다. 즉 어긋남이 웨이퍼 특정 위치에 몰리지 않고 전면에 균일하게 걸린 형태(wafer mean shift)이며, 이는 웨이퍼 전체에 동일하게 작용하는 인자의 지문이다. 노광량(dose)이 여기에 해당한다. Setting값(Recipe Input)은 유지되어 있는데 Energy Sensor 실측값만 이탈했다면 실효 dose와 Setting 사이에 괴리가 생긴 것이고, 이는 Dose Mapper / Energy Sensor Calibration 이탈을 먼저 의심해야 하는 상황이다.", "action": "순서가 중요하다. (1) Setting값과 Energy Sensor 실측값의 괴리부터 확인한다. 괴리가 있으면 Recipe를 건드리기 전에 Dose Mapper / Energy Sensor Calibration을 재수행한다. Setting만 조정하면 실효 dose는 그대로여서 재발한다. (2) PM / Inform 이력에서 해당 시점의 변경점을 조회한다 — Laser Source 교체, 조명계 광학 부품 교체, 최근 Calibration 수행 일자. CD 변화 시점과 일치하는 변경점이 있으면 1차 유력 원인으로 지목한다. (3) Energy Sensor 시계열이 단발성 step 변화인지 지속 drift인지 구분한다. step이면 변경점 연계, drift면 센서 열화·오염을 본다. (4) 광원 특성 파라미터를 함께 조회한다 — Pulse Energy Stability(Energy Sigma), Bandwidth(E95), 조명계 Transmission Efficiency. Source 교체 후 파장 특성이 달라지면 같은 Setting에서도 실효 dose가 달라진다. (5) Track 측 Develop / PEB 조건에 변경점이 없음을 확인해 Photo 원인 귀속의 배제 근거를 확보한다. (6) 조치 후 rework lot으로 Before/After CD 회복 여부를 검증한다. ADI 시점이므로 스펙 이탈 웨이퍼는 아직 rework window 안에 있다. (7) 재발 방지 — Energy Sensor 실측값에 SPC 관리도를 걸고 Setting 대비 편차가 한계를 넘으면 알람이 뜨는 OCAP을 수립한다. Source 교체를 Change Control Checklist에 Calibration 필수 항목으로 반영한다."}, "PHOTO_TRACK_RADIAL": {"label": "트랙/PEB 반경 프로파일 변화", "risk": "주의", "module": "Photo(Track)", "cause": "ADI 잔차를 (r/R)²로 회귀했을 때 반경 계수가 관리 한계를 넘었다. 웨이퍼 중심과 엣지의 CD 차이가 벌어진 형태이고, 웨이퍼 평균 자체는 크게 움직이지 않았다. dose처럼 전면에 균일하게 걸리는 인자로는 이 모양이 나오지 않는다. PEB plate 온도 프로파일이나 코팅 두께의 반경 분포가 바뀐 형태이며, ΔCD(etch bias)는 정상이므로 Etch 이후 요인은 배제된다.", "action": "(1) 해당 Track의 PEB plate 온도 맵(zone별 설정값과 실측값)을 조회한다. zone 히터 이상이나 온도 보정 테이블 변경 이력이 있는지 본다. (2) 코터 회전 프로파일과 레지스트 도포 두께의 반경 분포를 확인한다. (3) Track PM / Inform 이력에서 해당 시점의 변경점을 조회한다. (4) 반경 성분은 스캐너 dose 보정으로 상쇄되지 않는다. wafer mean만 맞추는 R2R 피드백으로 덮으면 중심과 엣지가 반대 방향으로 벌어져 CDU가 더 나빠진다. dose 보정으로 대응하지 말 것."}, "RETICLE_CD_ERROR": {"label": "레티클 CD 오차", "risk": "주의", "module": "Photo(Reticle)", "cause": "특정 site에서만 편차가 나타나고 모든 field에서 동일하게 반복된다. 웨이퍼·반경 좌표계와 무관하므로 마스크 자체의 CD 오차로 귀속된다.", "action": "(1) 해당 레티클을 다른 스캐너에서 노광해 동일 site에서 같은 편차가 재현되는지 확인한다. 재현되면 레티클, 스캐너를 따라가면 스캐너 지문이다. (2) 마스크 CD 측정 성적서와 최근 세정·수리 이력을 조회한다. (3) Pellicle 오염이나 마스크 CD 열화 가능성을 함께 본다. (4) 스캐너 dose나 Etch recipe를 먼저 건드리지 말 것. 이 성분은 site에 고정되어 있어 전면 보정으로는 상쇄되지 않는다."}, "ETCH_CHAMBER": {"label": "식각 챔버 편차 / PM drift", "risk": "위험", "module": "Etch", "cause": "ADI는 정상인데 ΔCD가 이동했고, 특정 챔버에서만 나타나며 웨이퍼 반경 성분을 동반한다. 플라즈마 균일도·가스 흐름·ESC 온도 변화 또는 PM 이후 누적 drift로 귀속된다.", "action": "(1) 해당 챔버를 격리하고 chamber matching 웨이퍼로 etch bias를 재측정한다. (2) RF hours 대비 bias 추이를 확인해 seasoning drift인지 단발성 이상인지 가른다. PM 직후 급변(first wafer effect) 구간과 그 이후 완만한 drift 구간을 구분해서 본다. (3) OES / RF / 압력 트레이스에서 해당 기간의 변화점을 조회한다. (4) 챔버 PM 이력과 wet clean 일자를 CD 변화 시점과 대조한다. (5) ACI는 되돌릴 수 없다. 이후 로트는 ADI Target을 임시 보정해 최종 CD를 스펙 안으로 넣고, 챔버 조치 완료 후 원복한다."}, "METROLOGY_TOOL_DRIFT": {"label": "계측 장비 offset drift", "risk": "위험", "module": "Metrology", "cause": "ΔCD가 이동했지만 특정 챔버에 몰리지 않고, 특정 계측 장비로 측정한 로트에서만 나타난다. 공정이 건드리지 않은 monitor wafer의 재측정값이 같은 방향으로 이동했으므로 공정 변화가 아니라 계측 장비의 offset drift다.", "action": "(1) 공정 조치를 보류한다. 이 상태에서 챔버 recipe를 건드리면 정상 설비를 틀어놓게 된다. (2) 해당 CD-SEM의 monitor wafer 재측정 이력과 최근 calibration 일자를 조회하고 재캘리브레이션을 수행한다. (3) 두 장비의 tool-to-tool matching offset을 재산출한다. (4) 영향 기간에 해당 장비로 측정된 로트를 모두 재판정한다. (5) monitor wafer 점검 주기를 단축할지 검토한다. 이번 사례에서 판정 보류가 발생한 원인이 감시 주기 부족이었다. (6) TMU 항을 분해해 precision과 tool-to-tool match 중 어느 쪽이 예산을 먹는지 본다. match가 주범이면 fleet matching 재조정, precision이 주범이면 recipe(프레임 수, 배율, landing energy)나 장비 컨디션을 본다."}, "INDETERMINATE": {"label": "판정 보류", "risk": "주의", "module": "-", "cause": "이상은 탐지되었으나 원인을 특정할 증거가 부족하다. 챔버 편중과 계측 drift가 모두 기준에 못 미치거나, 근거 데이터가 없는 경우다.", "action": "추가 측정 요청 — 해당 챔버 매칭 웨이퍼, monitor wafer 임시 재측정, 단면 taper 확인. 근거 없이 조치 대상을 지정하지 않는다."}, "NORMAL": {"label": "정상", "risk": "정상", "module": "-", "cause": "모든 성분이 관리 한계 내에 있다.", "action": "조치 없음."}};
/* ============================================================
   CD 이상 원인 분석 — 화면 로직
   판정·게이트·에이전트 로직은 건드리지 않는다. 표시 계층만 담당.
   ============================================================ */
const M = DATA.meta, LIM = DATA.limits, CEN = DATA.centers;
const INV = typeof INVESTIGATIONS !== 'undefined' ? INVESTIGATIONS : {};
const VAL = typeof VALIDATION !== 'undefined' ? VALIDATION : null;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num = (v, d = 2) => (v == null || v === '' || isNaN(v)) ? '—' : (+v).toFixed(d);
const SCROLL_BEHAVIOR = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

let LANG = 'ko';
try { LANG = localStorage.getItem('cdlang') || 'ko'; } catch (e) {}

/* ── UI 문구 ───────────────────────────────────────────────── */
const T = {
  brand:        ['CD 이상 원인 분석', 'CD Excursion Attribution'],
  brandsub:     ['ADI·ACI 근거로 Litho·Etch·Metrology 원인을 좁힙니다', 'Evidence-based attribution across Litho, Etch, and Metrology'],
  search:       ['로트·장비·챔버 검색', 'Search lot, tool, chamber'],
  'nav.lots':   ['로트 검토', 'Lot Review'],
  'nav.trends': ['추이와 감시', 'Trends'],
  'nav.valid':  ['검증 결과', 'Validation'],
  'nav.terms':  ['용어 사전', 'Glossary'],
  'nav.ref':    ['기준값', 'Reference'],
  'list.title': ['로트 검토', 'Lot Review'],
  'list.sub':   ['조치가 필요한 로트를 우선 확인하고, 필요하면 전체 로트로 범위를 넓혀 검토합니다.', 'Review lots needing action first, then broaden to all lots when needed.'],
  'list.reset': ['초기화', 'Reset'],
  'list.abn':   ['검토 필요만', 'Needs review'],
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
  'd.status':   ['상태', 'Status'],
  'd.changed':  ['무엇이 달라졌나', 'What changed'],
  'd.cause':    ['추정 원인', 'Likely cause'],
  'd.nochange': ['관리 한계를 벗어난 지표가 없습니다', 'No monitored indicator moved outside its control limit'],
  'd.evbtn':    ['기술 근거 보기', 'View evidence'],
  'd.tracebtn': ['조사 경로 보기', 'View investigation trace'],
  'd.prod':     ['생산일', 'Production date'],
  'd.whynormal':['감시 지표 {n}개 확인 · {n}개 모두 한계 이내 · 귀속 트리거 없음',
                 '{n} indicators checked · {n} within limit · no attribution trigger'],
  st_ok:        ['정상', 'Normal'],
  st_review:    ['검토 필요', 'Review'],
  st_action:    ['조치 필요', 'Action required'],
  verified:     ['검증 완료', 'Verified'],
  needev:       ['근거 부족', 'Needs evidence'],
  'th.plain':   ['지표', 'Indicator'],
  'th.margin':  ['한계까지', 'Margin'],
  'th.source':  ['출처', 'Source'],
  near:         ['한계 근접', 'Near limit'],
  home:         ['홈', 'Home'],
  skip:         ['본문으로 건너뛰기', 'Skip to content'],
  'q.hint':     ['예: L0319, SCN-02, RET-B, CH-A', 'Try L0319, SCN-02, RET-B, or CH-A'],
  'q.quick':    ['빠른 시작', 'Quick start'],
  'q.abn':      ['검토가 필요한 로트만', 'Only lots needing review'],
  'q.first':    ['첫 이상 로트 열기', 'Open the first flagged lot'],
  'intro.title':['CD 이상을 어디서부터 확인해야 할지 빠르게 좁혀보세요', 'Narrow a CD excursion to the most likely module'],
  'intro.body': ['로트를 고르면 상태 → 변화 → 추정 원인 → 권고 조치 → 기술 근거 순서로 보여줍니다.',
                 'Choose a lot to see status → change → likely cause → recommended action → technical evidence.'],
  'hero.eyebrow':['Semiconductor decision support','Semiconductor decision support'],
  'hero.title':['CD 이상 원인을 어디서부터 확인해야 할지 빠르게 좁혀보세요','Quickly narrow where to inspect first for a CD excursion'],
  'hero.body1':['로트를 고르면','Choose a lot and read it in this order:'],
  'hero.flow':['상태 → 변화 → 추정 원인 → 권고 조치 → 기술 근거','status → change → likely cause → recommended action → technical evidence'],
  'hero.body2':['순서로 보여줍니다. 처음 보는 사람은 결론부터, 엔지니어는 근거까지 내려가며 확인할 수 있습니다.','First-time users can start with the decision; engineers can drill down to the evidence.'],
  'hero.start':['로트 검토 시작','Start lot review'],
  'hero.first':['첫 이상 로트 열기','Open first flagged lot'],
  'hero.glossary':['용어 사전','Glossary'],
  'hero.stat.lots':['평가 로트','lots evaluated'],
  'hero.stat.modules':['원인 모듈 후보 · Litho / Etch / Metrology','candidate modules · Litho / Etch / Metrology'],
  'hero.stat.steps':['읽기 단계 · 상태에서 기술 근거까지','reading steps · decision to technical evidence'],
  'hero.visual.title':['이 분석 도구에서 할 수 있는 일','What this analysis tool helps you do'],
  'hero.visual.1t':['우선 확인할 로트 찾기','Find the lots that need attention first'],
  'hero.visual.1d':['검색과 필터로 검토가 필요한 로트를 먼저 찾습니다.','Use search and filters to surface lots that need review.'],
  'hero.visual.2t':['이상 신호를 공정 좌표계로 분리','Separate the excursion by process signature'],
  'hero.visual.2d':['ADI·ACI·ΔCD·챔버·계측 drift를 함께 보고 원인 후보를 좁힙니다.','Use ADI, ACI, Delta-CD, chamber and metrology drift evidence to narrow the source.'],
  'hero.visual.3t':['조치와 검증 근거까지 확인','Review actions and verification evidence'],
  'hero.visual.3d':['추천 조치, Evidence, Investigation Trace, Verification Gate를 이어서 확인합니다.','Continue into recommended actions, Evidence, Investigation Trace and the Verification Gate.'],
  'homecard.begin.k':['For beginners','For beginners'],
  'homecard.begin.t':['처음 방문했다면','If this is your first visit'],
  'homecard.begin.p':['이 웹은 CD 이상이 생겼을 때 노광·식각·계측 중 어느 모듈부터 확인할지 근거를 따라 좁혀주는 분석 도구입니다.','This analysis tool narrows a CD excursion to the first module you should inspect: Litho, Etch, or Metrology.'],
  'homecard.begin.1':['홈에서 전체 흐름을 먼저 파악','Start here to understand the workflow'],
  'homecard.begin.2':['검토가 필요한 로트만 빠르게 필터링','Filter quickly to lots needing review'],
  'homecard.begin.3':['모르는 용어는 용어 사전에서 확인','Use the glossary for unfamiliar terms'],
  'homecard.read.k':['How to read','How to read'],
  'homecard.read.t':['무엇을 읽게 되나요?','How should I read a lot?'],
  'homecard.read.p':['로트를 열면 중요한 판단부터 기술 근거까지 같은 순서로 읽습니다.','Every lot follows the same hierarchy from decision to technical evidence.'],
  'homecard.read.1':['상태 — 정상 / 검토 / 조치 필요','Status — Normal / Review / Action required'],
  'homecard.read.2':['변화 — 어떤 지표가 한계를 벗어났는지','Change — which indicators moved outside limits'],
  'homecard.read.3':['원인·조치 — 무엇을 먼저 확인할지','Cause & action — what to inspect first'],
  'homecard.read.4':['근거 — Evidence / Trace / Gate','Evidence — Evidence / Trace / Gate'],
  'homecard.eng.k':['Decision support','Decision support'],
  'homecard.eng.t':['이 도구가 지원하는 판단','Decision support scope'],
  'homecard.eng.p':['단순 이상 탐지를 넘어 원인 후보와 조치 우선순위를 분리해 불필요한 공정 변경을 줄이는 의사결정을 지원합니다.','Beyond anomaly detection, it separates likely sources and action priority to reduce unnecessary process changes.'],
  'homecard.eng.1':['계측 drift와 실제 공정 이상 분리','Separate metrology drift from a true process excursion'],
  'homecard.eng.2':['Track·Reticle·Etch chamber 신호 구분','Distinguish Track, Reticle and Etch chamber signatures'],
  'homecard.eng.3':['판정 근거와 검증 게이트를 함께 추적','Trace the evidence and deterministic verification gate'],
  'filter.group':['로트 필터', 'Lot filters'],
  'filter.verdict':['판정 필터', 'Verdict filter'],
  'filter.scanner':['스캐너 필터', 'Scanner filter'],
  'filter.chamber':['챔버 필터', 'Chamber filter'],
  'filter.metro':['계측 장비 필터', 'Metrology tool filter'],
  'filter.daymin':['최소 생산일', 'Minimum production day'],
  'filter.daymax':['최대 생산일', 'Maximum production day'],
  'filter.period':['생산 기간 필터', 'Production period filter'],
  'filter.sort':['정렬 기준', 'Sort order'],
  'sort.lotdesc':['최신 로트순', 'Latest lot ID first'],
  'sort.lotasc':['오래된 로트순', 'Oldest lot ID first'],
  'sort.daydesc':['최신 생산일순', 'Latest production day first'],
  'filter.advanced':['고급 필터', 'Advanced filters'],
  'period.all':['전체 기간', 'All dates'],
  'period.3':['최근 3 생산일', 'Latest 3 production days'],
  'period.7':['최근 7 생산일', 'Latest 7 production days'],
  'period.14':['최근 14 생산일', 'Latest 14 production days'],
  'queue.lead':['처음에는 처리 우선순위만 확인하세요. 필요한 경우에만 전체 목록과 상세 필터를 펼칠 수 있습니다.','Start with priority only. Open the full queue and detailed filters only when you need them.'],
  'queue.review':['검토 필요', 'Needs review'],
  'queue.hold':['판정 보류', 'Withheld'],
  'queue.normal':['정상', 'Normal'],
  'queue.openreview':['검토 필요 로트 보기', 'View lots needing review'],
  'queue.openall':['전체 로트 보기', 'View all lots'],
  'queue.note':['로트를 선택하면 상태 → 변화 → 추정 원인 → 조치 순서로 먼저 보여주고, 기술 근거는 필요할 때 펼쳐봅니다.','Open a lot to see status → change → likely cause → action first; technical evidence stays available on demand.'],
  'queue.difflegend':['보라색 강조는 바로 위에 표시된 로트와 달라진 공정 경로입니다.','Purple highlights mark process-path values that differ from the visible lot immediately above.'],
  'queue.changed':['변경','Changed'],
  'detail.technical':['기술 세부정보', 'Technical details'],
  'd.fullreview':['판정 설명과 전체 권고 조치', 'Full rationale and recommended actions'],
  'd.context':['로트 공정 경로', 'Lot process path'],
  'd.actionmore':['추가 권고 조치는 아래에서 확인할 수 있습니다.', 'Additional recommended actions are available below.'],
  'd.agentpath':['Agent 판단 갈래길', 'Agent decision path'],
  'd.agentpathsub':['판정 결과와 Verification Gate를 기준으로 이번 로트의 선택 경로를 요약합니다. 회색은 고려했지만 선택되지 않은 갈래입니다.','This summarizes the selected path from the disposition and Verification Gate. Gray branches were considered but not selected.'],
  'copylink':['링크 복사', 'Copy link'],
  'copied':['링크 복사됨', 'Link copied'],
  'd.out':      ['한계를 벗어난 지표', 'Out-of-limit components'],
  'd.clear':    ['감시 중인 지표 {n}개 모두 관리 한계 이내', 'All {n} monitored components within control limits'],
  'd.all':      ['전체 측정 지표', 'All measured evidence'],
  'd.allsub':   ['관리 한계는 기준선 10일 데이터의 평균 ± 3σ로 엔진이 스스로 산출합니다', 'Control limits are derived by the engine from the 10-day baseline (mean ± 3σ)'],
  'd.gate':     ['검증 게이트', 'Verification gate'],
  'd.gatesub':  ['판정이 요구하는 조건을 코드가 다시 확인합니다. 하나라도 불충족이면 보류합니다', 'Code re-checks every condition the rule requires. One failure withholds the disposition'],
  'd.gatenone': ['정상 판정은 추가 요구 조건이 없습니다. 감시 지표 전부가 관리 한계 이내인 것이 근거입니다.',
                 'A normal disposition requires no rule-specific gate. The basis is that every monitored component stayed within limits.'],
  'd.trace':    ['조사 경로', 'Investigation trace'],
  'd.tracesub': ['에이전트가 실제로 호출한 도구 순서', 'Tool calls the agent actually made'],
  'd.tracesum': ['도구 {n}회 호출 · 이탈 지표 {o}개 · 게이트 {g}', '{n} tool calls · {o} out of limit · gate {g}'],
  'human.kicker':['Engineer review','Engineer review'],
  'human.title':['사람 확인 지점','Human review checkpoint'],
  'human.desc':['에이전트는 권고까지만 제시합니다. 실제 공정·설비 조치 전에는 엔지니어 확인이 필요합니다.','The agent stops at a recommendation. An engineer must review it before any real process or equipment action.'],
  'human.session':['이 데모의 선택은 화면 세션의 검토 기록만 바꾸며 실제 설비를 제어하지 않습니다.','These controls only update the review state in this browser session; they do not control equipment.'],
  'human.approve':['권고 조치 승인','Approve recommendation'],
  'human.evidence':['추가 근거 요청','Request more evidence'],
  'human.hold':['판정 보류','Withhold disposition'],
  'human.auto':['조치 권고가 없어 추가 승인 없이 확인할 수 있습니다.','No action is proposed, so no additional approval is required.'],
  'human.blocked':['Verification Gate가 미충족이라 권고 조치 승인을 선택할 수 없습니다.','The Verification Gate is not satisfied, so recommendation approval is disabled.'],
  'human.state.approve':['검토 기록: 권고 조치 승인','Review state: recommendation approved'],
  'human.state.evidence':['검토 기록: 추가 근거 요청','Review state: more evidence requested'],
  'human.state.hold':['검토 기록: 판정 보류','Review state: disposition withheld'],
  'branch.signal':['이상 신호','Signal check'],
  'branch.none':['이탈 없음','No excursion'],
  'branch.count':['이탈 지표 {n}개','{n} out-of-limit indicators'],
  'branch.metro':['계측 신뢰성','Measurement reliability'],
  'branch.metrohit':['계측 drift branch 선택','Metrology-drift branch selected'],
  'branch.metropass':['계측 이상 근거 부족 → 공정 signature 확인','No metrology trigger → inspect process signature'],
  'branch.signature':['원인 signature','Source signature'],
  'branch.litho':['Litho','Litho'],
  'branch.etch':['Etch','Etch'],
  'branch.metrology':['Metrology','Metrology'],
  'branch.withheld':['보류','Withheld'],
  'branch.verify':['검증','Verification'],
  'branch.pass':['Gate 통과','Gate passed'],
  'branch.hold':['Gate 보류','Gate withheld'],
  'branch.normal':['정상','Normal'],
  'd.wafer':    ['웨이퍼 맵', 'Wafer map'],
  'd.wafersub': ['점 하나가 CD-SEM 측정 site입니다. 올리면 실측값이 나옵니다', 'Each dot is a CD-SEM site. Hover for the measured value'],
  'd.wadi':     ['ADI CD 잔차', 'ADI CD residual'],
  'd.wdelta':   ['Etch bias 잔차', 'Etch bias residual'],
  'd.noaci':    ['이 로트는 skip-lot으로 ACI를 측정하지 않았습니다', 'ACI skipped for this lot (skip-lot sampling)'],
  'd.narrow':   ['목표보다 좁음', 'narrower than target'],
  'd.wide':     ['목표보다 넓음', 'wider than target'],
  'd.ctx':      ['공정 경로', 'Process path'],
  'th.metric':  ['지표', 'Metric'],
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
  'tr.step':['급변 표시','Notable step change'],
  'tr.stepnote':['직전 생산일 대비 변화가 평소 변동보다 큰 지점입니다. 원인으로 단정하지 않고 PM·Calibration·계측 범위를 먼저 확인합니다.','The change versus the previous production day is unusually large. Treat it as a review point, not a cause; first check PM, calibration and measurement coverage.'],
  'tr.delta':['직전 생산일 대비 변화','Change vs previous production day'],
  'tr.check':['확인 항목','Check'],
  'tr.checktrend':['PM / change event / calibration / 측정 범위','PM / change event / calibration / measurement coverage'],
  'tr.checkmetro':['Calibration / monitor wafer 주기 / tool 상태','Calibration / monitor-wafer cadence / tool condition'],
  'tr.checktmu':['precision과 tool-to-tool match 중 어떤 항이 증가했는지','Which term increased: precision or tool-to-tool match'],
  'tr.mon':     ['CD-SEM 안정성', 'CD-SEM stability'],
  'tr.monsub':  ['모니터 웨이퍼 반복 측정 · 기준선 대비 이동량', 'Monitor-wafer re-measurement · drift from baseline'],
  'tr.tmu':     ['TMU / 공정 예산', 'TMU / process budget'],
  'tr.cham':    ['Etch 챔버별 bias', 'Etch bias by chamber'],
  'va.kpi':     ['핵심 지표', 'Headline metrics'],
  'va.matrix':  ['블라인드 평가', 'Blind evaluation'],
  'va.matrixsub':['세로 = 주입한 이상 · 가로 = 에이전트 판정', 'Row = injected scenario · column = predicted disposition'],
  'gl.title':   ['용어 사전', 'Glossary'],
  'gl.sub':     ['점선 용어에 마우스를 올리거나, 키보드로 포커스하거나, 클릭하면 설명을 볼 수 있습니다', 'Hover, focus, or click any dotted term to view the same definition'],
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
const COLOR = {NORMAL:'#0F766E', PHOTO_DOSE:'#6B3C7A', PHOTO_TRACK_RADIAL:'#55639A',
  RETICLE_CD_ERROR:'#55639A', ETCH_CHAMBER:'#B6534A', METROLOGY_TOOL_DRIFT:'#0F766E',
  INDETERMINATE:'#9A6814'};
const BCLASS = {Normal:'b-ok', Watch:'b-watch', High:'b-bad'};
/* 상단은 3단계 상태로 단순화하고, 세부 verdict는 근거 영역에서 그대로 보존한다. */
function status3(l) {
  if (l.verdict === 'NORMAL') return {k:'st_ok', cls:'p-ok'};
  if (l.verdict === 'INDETERMINATE' || l.risk === 'Watch') return {k:'st_review', cls:'p-review'};
  return {k:'st_action', cls:'p-action'};
}

/* 지표명 — 장비 접두사는 분리해서 보존 */
const EV_KO = [
  [/^ADI scalar component$/, 'ADI 스칼라 성분', 'ADI'],
  [/^ADI radial component$/, 'ADI 반경 성분', 'RADIAL'],
  [/^Reticle-repeat component$/, '레티클 반복 성분', 'RETICLE_REPEAT'],
  [/^Dose Setting vs Energy Sensor$/, 'Dose Setting vs Energy Sensor', 'SENSOR'],
  [/^Focus Setting vs Sensor$/, 'Focus Setting vs Sensor', 'FOCUS'],
  [/^Delta-CD$/, 'ΔCD (etch bias)', 'DELTA_NA'],
  [/^Delta-CD.*$/, 'ΔCD (etch bias) 편차', 'DELTA_CD'],
  [/measurement uncertainty TMU \/ process budget$/, '계측 불확도 TMU / 공정 예산', 'TMU'],
  [/monitor wafer drift$/, 'monitor wafer 이동량', 'MONITOR'],
  [/chamber deviation$/, '챔버 편중', 'CHAMBER'],
  [/^Cross-section taper shift \(supporting\)$/, '단면 taper 변화 (보조)', 'TAPER'],
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
/* 전문 용어는 보존하되, 첫 줄은 사람이 바로 이해할 수 있는 이름을 쓴다. */
const PLAIN = {
  ADI:            ['웨이퍼 전체 CD 이동', 'Across-wafer CD shift'],
  RADIAL:         ['중심–가장자리 CD 차이', 'Center-to-edge CD difference'],
  RETICLE_REPEAT: ['같은 위치에서 반복되는 오차', 'Error repeating at the same site'],
  SENSOR:         ['설정 노광량 vs 실제 조사량', 'Dose setting vs delivered dose'],
  FOCUS:          ['초점 설정 vs 실제 초점', 'Focus setting vs actual focus'],
  DELTA_CD:       ['식각 전후 선폭 변화량', 'CD change across etch'],
  DELTA_NA:       ['식각 전후 선폭 변화량', 'CD change across etch'],
  TMU:            ['측정 오차가 공정 예산에서 차지하는 비중', 'Share of process budget used by measurement uncertainty'],
  MONITOR:        ['계측기 자체의 값 이동', 'Drift of the metrology tool itself'],
  CHAMBER:        ['챔버 간 CD 편차', 'CD bias across etch chambers'],
  TAPER:          ['단면 기울기 변화 (참고)', 'Cross-section taper change (reference)'],
};
/* 출처는 해당 지표가 계산되는 데이터 계층만 표시한다. */
const SOURCE = {
  ADI:            ['ADI CD-SEM', 'ADI CD-SEM'],
  RADIAL:         ['ADI CD-SEM', 'ADI CD-SEM'],
  RETICLE_REPEAT: ['ADI CD-SEM', 'ADI CD-SEM'],
  SENSOR:         ['스캐너 센서 로그', 'Scanner sensor log'],
  FOCUS:          ['스캐너 센서 로그', 'Scanner sensor log'],
  DELTA_CD:       ['ADI + ACI CD-SEM', 'ADI + ACI CD-SEM'],
  DELTA_NA:       ['ADI + ACI CD-SEM', 'ADI + ACI CD-SEM'],
  TMU:            ['모니터 웨이퍼', 'Monitor wafer'],
  MONITOR:        ['모니터 웨이퍼', 'Monitor wafer'],
  CHAMBER:        ['ACI CD / 챔버 그룹', 'ACI CD / chamber grouping'],
  TAPER:          ['단면 X-SEM', 'Cross-section X-SEM'],
};
const plainLabel = k => {
  const p = PLAIN[evTerm(k)];
  return p ? p[LANG === 'ko' ? 0 : 1] : evLabel(k);
};
const sourceLabel = k => {
  const p = SOURCE[evTerm(k)];
  return p ? p[LANG === 'ko' ? 0 : 1] : '—';
};
/* PASS/FAIL뿐 아니라 관리 한계까지 남은 여유를 보여준다. 파싱 가능한 지표만 계산한다. */
function margin(e) {
  const term = evTerm(e.k), v = String(e.v), lim = String(e.lim);
  if (!term || /reference|^-$/.test(lim) || /N\/A|not measured/i.test(v)) return null;
  const nums = str => (str.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  let val, cap, unit = /%/.test(lim + v) ? '%' : (/nm/i.test(lim + v) ? ' nm' : '');
  if (term === 'SENSOR') {
    const m = v.match(/\(([+-]?\d+(?:\.\d+)?)%\)/); val = m && +m[1]; cap = nums(lim)[0]; unit = '%';
  } else if (term === 'TMU') {
    const m = v.match(/=\s*(\d+(?:\.\d+)?)%/); val = m && +m[1]; cap = nums(lim)[0]; unit = '%';
  } else if (term === 'FOCUS') {
    const m = v.match(/→\s*([+-]?\d+(?:\.\d+)?)/); val = m && +m[1]; cap = nums(lim)[0]; unit = ' nm';
  } else {
    val = nums(v)[0]; cap = Math.abs(nums(lim)[0]);
  }
  if (val == null || cap == null || isNaN(val) || isNaN(cap) || !cap) return null;
  const left = cap - Math.abs(val);
  return {left, cap, unit, near:left >= 0 && left <= cap * 0.2};
}
function marginLabel(m) {
  if (!m) return '—';
  const v = Math.abs(m.left).toFixed(2) + m.unit;
  return m.left >= 0 ? v : (LANG === 'ko' ? v + ' 초과' : v + ' over');
}
function rowState(e) {
  if (e.hit) return {cls:'s-bad', text:t('out')};
  const m = margin(e);
  return m && m.near ? {cls:'s-near', text:t('near')} : {cls:'s-ok', text:t('within')};
}

/* 지표 → 용어 사전 키 */
const EV_GLOSS = {ADI:'adi', RADIAL:'peb', RETICLE_REPEAT:'reticle', SENSOR:'sensor', FOCUS:'dose',
  DELTA_CD:'delta', DELTA_NA:'delta', TMU:'tmu', MONITOR:'golden', CHAMBER:'chamber', TAPER:'xsem'};

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
const enRuleOf = v => EN_RULE[v] || null;
const verdictLabel = l => LANG === 'ko' ? (VERDICT_KO[l.verdict] || l.label) : (enRuleOf(l.verdict)?.label || l.label || l.verdict);
const shortLabel = v => SHORT[LANG][v] || v;
const riskLabel = r => LANG === 'ko' ? (RISK_KO[r] || r) : r;
const causeText = l => LANG === 'ko' ? (ruleOf(l.verdict)?.cause || l.cause) : (enRuleOf(l.verdict)?.cause || l.cause);
const actionText = l => LANG === 'ko' ? (ruleOf(l.verdict)?.action || l.action) : (enRuleOf(l.verdict)?.action || l.action);
const moduleText = l => {
  if (!l?.module || l.module === '-') return '';
  return LANG === 'ko' ? (MODULE_KO[l.module] || l.module) : (enRuleOf(l.verdict)?.module || l.module);
};
const verdictHeading = l => {
  const v = verdictLabel(l), m = moduleText(l);
  return m ? `${v} · ${m}` : v;
};
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
function summarizeCopy(text, n = 2) {
  const parts = String(text || '').match(/[^.!?]+[.!?]?/g) || [];
  const out = parts.map(x => x.trim()).filter(Boolean).slice(0, n).join(' ');
  return out || String(text || '');
}
const HUMAN_REVIEW = Object.create(null);
function reviewStateText(v) {
  if (v === 'approve') return t('human.state.approve');
  if (v === 'evidence') return t('human.state.evidence');
  if (v === 'hold') return t('human.state.hold');
  return '';
}
function humanReviewMarkup(l, gateReady) {
  if (l.verdict === 'NORMAL') return `<section class="human-review auto" aria-label="${esc(t('human.title'))}">
    <span class="human-kicker">${esc(t('human.kicker'))}</span><h3>${esc(t('human.title'))}</h3>
    <p>${esc(t('human.auto'))}</p><p class="human-note">${esc(t('human.session'))}</p></section>`;
  const cur = HUMAN_REVIEW[l.lot] || '';
  return `<section class="human-review" id="humanReview" aria-label="${esc(t('human.title'))}">
    <span class="human-kicker">${esc(t('human.kicker'))}</span><h3>${esc(t('human.title'))}</h3>
    <p>${esc(t('human.desc'))}</p>
    ${gateReady ? '' : `<p class="human-note"><b>${esc(t('human.blocked'))}</b></p>`}
    <div class="human-actions" role="group" aria-label="${esc(t('human.title'))}">
      <button class="gbtn" type="button" data-review="approve" aria-pressed="${cur === 'approve'}" ${gateReady ? '' : 'disabled'}>${esc(t('human.approve'))}</button>
      <button class="gbtn" type="button" data-review="evidence" aria-pressed="${cur === 'evidence'}">${esc(t('human.evidence'))}</button>
      <button class="gbtn" type="button" data-review="hold" aria-pressed="${cur === 'hold'}">${esc(t('human.hold'))}</button>
    </div>
    <p class="human-state" id="humanState" aria-live="polite">${esc(reviewStateText(cur))}</p>
    <p class="human-note">${esc(t('human.session'))}</p>
  </section>`;
}
function bindHumanReview(l) {
  $$('#detail [data-review]').forEach(b => b.onclick = () => {
    HUMAN_REVIEW[l.lot] = b.dataset.review;
    $$('#detail [data-review]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const st = $('#humanState'); if (st) st.textContent = reviewStateText(b.dataset.review);
    const a = $('#announce'); if (a) a.textContent = reviewStateText(b.dataset.review);
  });
}
function branchGroup(l) {
  if (l.verdict === 'METROLOGY_TOOL_DRIFT') return 'metrology';
  if (l.verdict === 'ETCH_CHAMBER') return 'etch';
  if (['PHOTO_DOSE','PHOTO_TRACK_RADIAL','RETICLE_CD_ERROR'].includes(l.verdict)) return 'litho';
  if (l.verdict === 'INDETERMINATE') return 'withheld';
  return 'normal';
}
function branchPathMarkup(l, gateReady, outs, inv) {
  const g = branchGroup(l), count = outs.length;
  const option = (k, label) => `<span class="branch-option ${g === k ? 'selected' : ''}">${esc(label)}</span>`;
  if (g === 'normal') return `<div class="branch-wrap"><p class="branch-intro">${esc(t('d.agentpathsub'))}</p>
    <div class="branch-flow">
      <div class="branch-node active"><span class="stepno">01</span><b>${esc(t('branch.signal'))}</b><small>${esc(t('branch.none'))}</small></div>
      <div class="branch-arrow">→</div>
      <div class="branch-node branch-result pass"><span class="stepno">02</span><b>${esc(t('branch.normal'))}</b><small>${esc(t('branch.pass'))}</small></div>
    </div></div>`;
  const metroText = g === 'metrology' ? t('branch.metrohit') : t('branch.metropass');
  return `<div class="branch-wrap"><p class="branch-intro">${esc(t('d.agentpathsub'))}</p>
    <div class="branch-flow">
      <div class="branch-node active"><span class="stepno">01</span><b>${esc(t('branch.signal'))}</b><small>${esc(t('branch.count', {n:count}))}</small></div>
      <div class="branch-arrow">→</div>
      <div class="branch-node active"><span class="stepno">02</span><b>${esc(t('branch.metro'))}</b><small>${esc(metroText)}</small></div>
      <div class="branch-arrow">→</div>
      <div class="branch-node active"><span class="stepno">03</span><b>${esc(t('branch.signature'))}</b><div class="branch-options">${option('metrology',t('branch.metrology'))}${option('litho',t('branch.litho'))}${option('etch',t('branch.etch'))}${option('withheld',t('branch.withheld'))}</div></div>
      <div class="branch-arrow">→</div>
      <div class="branch-node branch-result ${gateReady ? 'pass' : 'hold'}"><span class="stepno">04</span><b>${esc(t('branch.verify'))}</b><small>${esc(gateReady ? t('branch.pass') : t('branch.hold'))} · ${esc(String(inv?.tool_calls ?? 0))} ${esc(LANG === 'ko' ? '회 도구 호출' : 'tool calls')}</small></div>
    </div></div>`;
}
function median(xs) {
  const a = xs.filter(Number.isFinite).slice().sort((x,y)=>x-y); if (!a.length) return 0;
  const m = Math.floor(a.length/2); return a.length%2 ? a[m] : (a[m-1]+a[m])/2;
}
function notableSteps(rows, valueFn, minJump) {
  const r = rows.slice().sort((a,b)=>a.day-b.day), diffs=[];
  for (let i=1;i<r.length;i++) if (r[i].day !== r[i-1].day) diffs.push(Math.abs(valueFn(r[i])-valueFn(r[i-1])));
  const threshold = Math.max(minJump || 0, median(diffs) * 3);
  const out=[];
  for (let i=1;i<r.length;i++) {
    if (r[i].day === r[i-1].day) continue;
    const delta=valueFn(r[i])-valueFn(r[i-1]);
    if (Math.abs(delta) >= threshold && Math.abs(delta) > 0) out.push({row:r[i],prev:r[i-1],delta,threshold});
  }
  return out;
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
  const x = TERMS[key]; if (!x) return '';
  const sec = glossarySecondary(key);
  return `<h4>${esc(glossaryName(key))}${sec ? `<span class="en">${esc(sec)}</span>` : ''}</h4><p>${esc(glossaryDesc(key))}</p>${glossarySvg(key)}`;
}
document.addEventListener('mouseover', e => {
  const el = e.target.closest('.term,.info,.verify-tip'); if (el) showPop(termHTML(el.dataset.t), el);
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('.term,.info,.verify-tip') && !e.relatedTarget?.closest('#pop')) hidePop();
});
document.addEventListener('focusin', e => {
  const el = e.target.closest('.term,.info,.verify-tip'); if (el) showPop(termHTML(el.dataset.t), el);
});
document.addEventListener('click', e => {
  const el = e.target.closest('.term,.info,.verify-tip');
  if (el) { e.preventDefault(); showPop(termHTML(el.dataset.t), el); }
  else if (!e.target.closest('#pop')) hidePop();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && pop.style.display === 'block') { hidePop(); e.stopImmediatePropagation(); }
});
addEventListener('scroll', hidePop, {passive: true});
const infoBtn = k => k && TERMS[k] ? `<button class="info" type="button" data-t="${k}" aria-label="${LANG === 'ko' ? '설명 보기' : 'Show definition'}">i</button>` : '';

/* ── 상태 ─────────────────────────────────────────────────── */
const S = {view: 'home', lot: null, q: '', abn: true, verdict: '', scanner: '', chamber: '',
           metro: '', period: 0, sort: 'lotdesc', queueOpen: false, metric: 'dbias', waf: 'adi'};
const MAX_DAY = Math.max(...DATA.lots.map(l => Number(l.day) || 0));

function outCount(l) { return (l.ev || []).filter(e => e.hit).length; }
/* 긴 측정값 문자열에서 한눈에 읽을 머리값만 뽑고 나머지는 보조줄로 내린다 */
function lotSeq(lot) {
  const m = String(lot || '').match(/(\d+)/);
  return m ? Number(m[1]) : -1;
}
function compareLotsById(a, b, dir = 'desc') {
  const diff = lotSeq(a.lot) - lotSeq(b.lot);
  if (diff !== 0) return dir === 'asc' ? diff : -diff;
  return String(a.lot || '').localeCompare(String(b.lot || ''));
}

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
  const rows = DATA.lots.filter(l =>
    (!S.abn || l.verdict !== 'NORMAL') &&
    (!S.verdict || l.verdict === S.verdict) &&
    (!S.scanner || l.scanner === S.scanner) &&
    (!S.chamber || l.chamber === S.chamber) &&
    (!S.metro || l.adiTool === S.metro || l.aciTool === S.metro) &&
    (!S.period || l.day >= MAX_DAY - (S.period - 1)) &&
    (!q || [l.lot, l.scanner, l.reticle, l.chamber, l.adiTool, l.aciTool]
      .some(v => String(v || '').toLowerCase().includes(q)))
  );

  const sortMode = S.sort || 'lotdesc';
  return rows.sort((a, b) => {
    if (sortMode === 'daydesc') {
      return b.day - a.day || compareLotsById(a, b, 'desc');
    }
    if (sortMode === 'lotasc') {
      return compareLotsById(a, b, 'asc') || b.day - a.day;
    }
    return compareLotsById(a, b, 'desc') || b.day - a.day;
  });
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
  if ($('#fPeriod')) {
    $('#fPeriod').innerHTML = [
      [0, t('period.all')], [3, t('period.3')], [7, t('period.7')], [14, t('period.14')]
    ].map(([v, label]) => `<option value="${v}"${Number(S.period) === Number(v) ? ' selected' : ''}>${esc(label)}</option>`).join('');
  }
  if ($('#fSort')) {
    $('#fSort').innerHTML = [
      ['lotdesc', t('sort.lotdesc')], ['lotasc', t('sort.lotasc')], ['daydesc', t('sort.daydesc')]
    ].map(([v, label]) => `<option value="${v}"${S.sort === v ? ' selected' : ''}>${esc(label)}</option>`).join('');
  }
  const hold = DATA.lots.filter(l => l.verdict === 'INDETERMINATE').length;
  const normal = DATA.lots.filter(l => l.verdict === 'NORMAL').length;
  if ($('#sumReview')) $('#sumReview').textContent = abn;
  if ($('#sumHold')) $('#sumHold').textContent = hold;
  if ($('#sumNormal')) $('#sumNormal').textContent = normal;
}

/* ── 로트 목록 ────────────────────────────────────────────── */
function setQueueOpen(open, mode = 'review') {
  S.queueOpen = open;
  if (open) S.abn = mode !== 'all';
  if ($('#queueIntro')) $('#queueIntro').hidden = open;
  if ($('#queueTools')) $('#queueTools').hidden = !open;
  fillSelects();
  renderList();
}
function syncQueueView() {
  if ($('#queueIntro')) $('#queueIntro').hidden = !!S.queueOpen;
  if ($('#queueTools')) $('#queueTools').hidden = !S.queueOpen;
}

function renderList() {
  const rows = filtered();
  if ($('#listCount')) $('#listCount').textContent = S.queueOpen ? `${rows.length}${t('list.of')} / ${DATA.lots.length}` : `${DATA.lots.length}`;
  const box = $('#lotlist');
  if (!box) return;
  if (!S.queueOpen) { box.innerHTML = ''; return; }
  if (!rows.length) {
    box.innerHTML = `<div class="empty"><p>${esc(t('list.none'))}</p><button class="gbtn" id="emptyReset">${esc(t('list.reset'))}</button></div>`;
    $('#emptyReset').onclick = () => $('#fReset').click();
    return;
  }
  const changedChip = (label, value, changed) => `<span class="meta-chip${changed ? ' diff' : ''}"${changed ? ` title="${esc(LANG === 'ko' ? '바로 위 로트와 다른 값' : 'Different from the visible lot immediately above')}"` : ''}>${esc(label)} ${esc(value || '—')}${changed ? `<span class="diff-mark">${esc(t('queue.changed'))}</span>` : ''}</span>`;
  box.innerHTML = rows.slice(0, 400).map((l, i) => {
    const prev = i ? rows[i - 1] : null;
    const o = outCount(l), g = gateOk(l);
    const sig = o
      ? `<span class="signal-count alert"><b>${o}</b><span>${esc(LANG === 'ko' ? '개 이탈' : 'out of limit')}</span></span>`
      : `<span class="signal-count"><b>0</b><span>${esc(LANG === 'ko' ? '개 이탈' : 'out of limit')}</span></span>`;
    return `<button class="lotrow" role="option" data-lot="${l.lot}" aria-selected="false">
      <span class="dot" style="background:${COLOR[l.verdict]}"></span>
      <span><span class="lotid">${l.lot}</span>
        <span class="meta-line">
          <span class="meta-date">${esc(l.date)}</span>
          ${changedChip('Scanner', l.scanner, !!prev && l.scanner !== prev.scanner)}
          ${changedChip('Chamber', l.chamber, !!prev && l.chamber !== prev.chamber)}
          ${changedChip('CD-SEM', l.adiTool, !!prev && l.adiTool !== prev.adiTool)}
          ${l.aciMean == null ? `<span class="meta-chip">ACI skip</span>` : ''}
        </span></span>
      <span class="lotright">
        ${sig}
        ${g ? '' : `<span class="badge b-hold">${esc(t('gatehold'))}</span>`}
        <span class="badge ${BCLASS[l.risk] || 'b-ok'}">${esc(shortLabel(l.verdict))}</span>
      </span></button>`;
  }).join('');
  box.querySelectorAll('.lotrow').forEach(b => b.onclick = () => openLot(b.dataset.lot));
}

/* ── 로트 상세 ────────────────────────────────────────────── */
function openLot(id, push = true) {
  if (S.view !== 'lots') showView('lots');
  const l = DATA.lots.find(x => x.lot === id); if (!l) return;
  S.lot = id; S.waf = 'adi';
  try {
    const want = location.pathname + '#lot=' + id;
    if (location.pathname + location.hash !== want) push ? history.pushState(null, '', want)
                                                        : history.replaceState(null, '', want);
  } catch (e) {}
  $('#listCard').hidden = true; $('#detail').hidden = false;
  const inv = INV[id], g = gateOk(l), outs = (l.ev || []).filter(e => e.hit);
  const A = actionSteps(actionText(l));
  const causeFull = causeText(l), causeShort = summarizeCopy(causeFull, 2);
  const previewSteps = A.steps.slice(0, 2);

  const chips = [];
  if (l.module && l.module !== '-') chips.push(LANG === 'ko' ? (MODULE_KO[l.module] || l.module) : l.module);
  chips.push(`Scanner ${l.scanner}`, `Reticle ${l.reticle}`, `Chamber ${l.chamber}`,
             `ADI ${l.adiTool}`, l.aciTool ? `ACI ${l.aciTool}` : `ACI skip`, `Day ${l.day}`,
             `RF ${l.rf}h`);

  const evRows = (l.ev || []).map(e => {
    const tm = EV_GLOSS[evTerm(e.k)], m = margin(e), st = rowState(e);
    return `<tr class="${e.hit ? 'alert' : ''}">
      <td><span class="pl">${esc(plainLabel(e.k))}</span>${infoBtn(tm)}
        <span class="tech mono">${esc(evLabel(e.k))}</span></td>
      <td class="num">${esc(e.v)}</td><td class="num">${esc(e.lim)}</td>
      <td class="num">${m ? `<span class="${m.left < 0 ? 'bad' : ''}">${esc(marginLabel(m))}</span>` : '—'}</td>
      <td class="src">${esc(sourceLabel(e.k))}</td>
      <td><span class="state ${st.cls}">${esc(st.text)}</span></td></tr>`;
  }).join('');

  const evCards = [...(l.ev || [])].sort((a, b) => Number(b.hit) - Number(a.hit)).map(e => {
    const m = margin(e), st = rowState(e);
    return `<article class="metric-card ${e.hit ? 'alert' : ''}">
      <div class="metric-card-head"><strong>${esc(plainLabel(e.k))}</strong><span class="state ${st.cls}">${esc(st.text)}</span></div>
      <div class="metric-grid">
        <div class="metric-cell"><small>${esc(t('th.value'))}</small><b>${esc(e.v)}</b></div>
        <div class="metric-cell"><small>${esc(t('th.limit'))}</small><b>${esc(e.lim)}</b></div>
        <div class="metric-cell"><small>${esc(t('th.margin'))}</small><b class="${m && m.left < 0 ? 'bad' : ''}">${m ? esc(marginLabel(m)) : '—'}</b></div>
      </div>
      <div class="metric-source">${esc(t('th.source'))}: ${esc(sourceLabel(e.k))} · <span class="mono">${esc(evLabel(e.k))}</span></div>
    </article>`;
  }).join('');

  const gateRows = (l.gate || []).length
    ? (l.gate || []).map(x => `<tr class="${x.ok ? '' : 'alert'}"><td>${esc(gateLabel(x.c))}</td>
        <td><span class="state ${x.ok ? 's-ok' : 's-bad'}">${esc(x.ok ? t('pass') : t('fail'))}</span></td></tr>`).join('')
    : `<tr><td colspan="2" class="sub">${esc(t('d.gatenone'))}</td></tr>`;

  const st = status3(l);
  const changed = outs.length ? outs.map(e => plainLabel(e.k)).join(' · ') : t('d.nochange');
  const previewAction = previewSteps.length
    ? `<ol class="action-preview">${previewSteps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>${A.steps.length > previewSteps.length ? `<p class="more-hint">${esc(t('d.actionmore'))}</p>` : ''}`
    : `<p class="summary-copy">${esc(A.lead)}</p>`;

  $('#detail').innerHTML = `
<div class="crumb" aria-label="${esc(LANG === 'ko' ? '현재 위치' : 'Breadcrumb')}">
  <button class="gbtn" id="bHome">${esc(t('home'))}</button>
  <span class="sub" aria-hidden="true">/</span>
  <button class="linkbtn" id="bBack">${esc(LANG === 'ko' ? '로트 목록' : 'Lots')}</button>
  <span class="sub" aria-hidden="true">/</span><span class="sub mono currentloc" aria-current="page">${l.lot}</span>
  <span class="spacer"></span>
  <button class="gbtn" id="bCopy">${esc(t('copylink'))}</button>
  <button class="gbtn" id="bPrev">${esc(t('prev'))}</button>
  <button class="gbtn" id="bNext">${esc(t('next'))}</button>
</div>

<div class="panel decision">
  <div class="lothead">
    <div style="flex:1;min-width:220px">
      <h1 id="lotTitle" tabindex="-1">${l.lot}</h1>
      <div class="headbadges">
        <span class="pill ${st.cls}">${esc(t(st.k))}</span>
        <button class="pill p-verify verify-tip ${g ? 'p-verified' : 'p-holdgate'}" data-t="${g ? 'gate_ok' : 'gate_hold'}" type="button">${esc(g ? t('verified') : t('needev'))}</button>
      </div>
      <div class="asof">${esc(t('d.prod'))} <span class="mono">${esc(l.date)}</span></div>
    </div>
  </div>

  <div class="dsec"><h3>${esc(t('d.changed'))}</h3><p>${esc(changed)}</p></div>
  <div class="dsec"><h3>${esc(t('d.cause'))}</h3>
    <p class="cause-title"><b style="color:${COLOR[l.verdict]}">${esc(verdictHeading(l))}</b></p>
    <p class="summary-copy" style="margin-top:6px">${esc(causeShort)}</p></div>
  <div class="dsec"><h3>${esc(t('d.act'))}</h3>${previewAction}</div>

  ${humanReviewMarkup(l, g)}

  <div class="jump">
    <button class="gbtn" data-open-jump="actionPanel">${esc(t('d.fullreview'))}</button>
    <button class="gbtn" data-open-jump="branchPanel">${esc(t('d.agentpath'))}</button>
    <button class="gbtn" data-open-jump="evPanel">${esc(t('d.evbtn'))}</button>
  </div>
</div>

<details class="panel disclosure" id="actionPanel">
  <summary><span><strong>${esc(t('d.fullreview'))}</strong><small>${esc(verdictHeading(l))}</small></span></summary>
  <div class="disclosure-body full-action-copy">
    <h3>${esc(t('d.cause'))}</h3><p class="cause">${esc(causeFull)}</p>
    <h3 style="margin-top:20px">${esc(t('d.act'))}</h3>
    ${A.steps.length ? `${A.lead ? `<p>${esc(A.lead)}</p>` : ''}<ol class="steps">${A.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : `<p>${esc(A.lead)}</p>`}
    ${l.extra ? `<div class="actnote mono">${esc(l.extra)}</div>` : ''}
  </div>
</details>

<details class="panel disclosure" id="branchPanel">
  <summary><span><strong>${esc(t('d.agentpath'))}</strong><small>${esc(branchGroup(l) === 'normal' ? t('branch.normal') : verdictHeading(l))}</small></span></summary>
  <div class="disclosure-body">${branchPathMarkup(l, g, outs, inv)}</div>
</details>

<details class="panel disclosure" id="contextPanel">
  <summary><span><strong>${esc(t('d.context'))}</strong><small>${esc(l.scanner)} · ${esc(l.chamber)} · ${esc(l.adiTool)}</small></span></summary>
  <div class="disclosure-body"><div class="ctxchips">${chips.map(c => `<span class="ctxchip">${esc(c)}</span>`).join('')}</div></div>
</details>

<details class="panel disclosure" id="evPanel">
  <summary><span><strong>${esc(t('d.all'))}</strong><small>${outs.length ? esc(`${outs.length} ${LANG === 'ko' ? '개 이탈' : 'out of limit'}`) : esc(t('d.whynormal', {n:(l.ev || []).length}))}</small></span></summary>
  <div class="disclosure-body">
    ${outs.length
      ? `<h3>${esc(t('d.out'))}</h3><div class="outgrid">${outs.map(e => { const h = headline(e.v); return `<div class="outcard">
          <div class="k">${esc(plainLabel(e.k))}</div><div class="v">${esc(h.head)}</div>
          <div class="l">${h.rest ? esc(h.rest) + ' · ' : ''}${esc(t('th.limit'))} ${esc(e.lim)} · <span class="mono">${esc(evLabel(e.k))}</span></div></div>`; }).join('')}</div>`
      : `<div class="allclear">✓ ${esc(t('d.whynormal', {n:(l.ev || []).length}))}</div>`}
    <h3 class="table-title">${esc(t('d.all'))}</h3><p class="sub evidence-note">${esc(t('d.allsub'))}</p>
    <div class="tw evidence-table"><table><thead><tr><th scope="col">${esc(t('th.plain'))}</th><th class="num" scope="col">${esc(t('th.value'))}</th>
      <th class="num" scope="col">${esc(t('th.limit'))}</th><th class="num" scope="col">${esc(t('th.margin'))}</th>
      <th scope="col">${esc(t('th.source'))}</th><th scope="col">${esc(t('th.state'))}</th></tr></thead>
      <tbody>${evRows}</tbody></table></div>
    <div class="evidence-cards">${evCards}</div>
  </div>
</details>

<details class="panel disclosure" id="gatePanel">
  <summary><span><strong>${esc(t('d.gate'))}</strong><small>${esc(g ? t('verified') : t('needev'))}</small></span></summary>
  <div class="disclosure-body">
    <p class="sub evidence-note">${esc(t('d.gatesub'))}</p>
    <div class="tw gate-table"><table><thead><tr><th scope="col">${esc(t('th.cond'))}</th><th scope="col">${esc(t('th.met'))}</th></tr></thead>
      <tbody>${gateRows}</tbody></table></div>
  </div>
</details>

<details class="panel disclosure" id="tracePanel">
  <summary><span><strong>${esc(t('d.trace'))}</strong><small>${esc(`${inv?.tool_calls ?? 0} ${LANG === 'ko' ? '회 도구 호출' : 'tool calls'}`)}</small></span></summary>
  <div class="disclosure-body">
    <p class="sub evidence-note">${esc(t('d.tracesub'))}</p>
    <div class="tracehead"><span>${t('d.tracesum', {n:`<b>${inv?.tool_calls ?? '—'}</b>`, o:`<b>${outs.length}</b>`, g:`<b>${g ? t('pass') : t('fail')}</b>`})}</span></div>
    ${renderTrace(inv)}
  </div>
</details>

<details class="panel disclosure" id="waferPanel">
  <summary><span><strong>${esc(t('d.wafer'))}</strong><small>${esc(t('d.wafersub'))}</small></span></summary>
  <div class="disclosure-body">
    <div class="segs">
      <button class="chip" data-waf="adi" aria-pressed="true">${esc(t('d.wadi'))}</button>
      <button class="chip" data-waf="delta" aria-pressed="false">${esc(t('d.wdelta'))}</button>
    </div>
    <div class="wafwrap">
      <svg class="wafer" id="wafer" viewBox="-178 -178 356 356" role="img" aria-label="${esc(t('d.wafer'))}"></svg>
      <div class="heat"><span class="mono" id="hLo"></span><span class="bar"></span><span class="mono" id="hHi"></span></div>
      <p class="sub" id="wafCap" style="margin-top:12px;text-align:center"></p>
    </div>
  </div>
</details>`;

  $('#bHome').onclick = goHome;
  $('#bBack').onclick = closeLot;
  $('#bCopy').onclick = async () => {
    try { await navigator.clipboard.writeText(location.href); $('#bCopy').textContent = t('copied'); }
    catch (e) { $('#bCopy').textContent = location.href; }
    setTimeout(() => { if ($('#bCopy')) $('#bCopy').textContent = t('copylink'); }, 1600);
  };
  $('#bPrev').onclick = () => step(-1);
  $('#bNext').onclick = () => step(1);
  bindHumanReview(l);
  $$('#detail [data-open-jump]').forEach(b => b.onclick = () => {
    const el = $('#' + b.dataset.openJump); if (!el) return;
    el.open = true; el.scrollIntoView({behavior:SCROLL_BEHAVIOR, block:'start'});
    requestAnimationFrame(() => el.querySelector('summary')?.focus());
  });
  $$('#detail [data-waf]').forEach(b => b.onclick = () => {
    S.waf = b.dataset.waf;
    $$('#detail [data-waf]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    paintWafer(l);
  });
  paintWafer(l);
  scrollTo({top: 0, behavior: 'auto'});
  requestAnimationFrame(() => {
    $('#lotTitle')?.focus();
    const a = $('#announce'); if (a) a.textContent = `${l.lot} · ${t(st.k)} · ${verdictLabel(l)}`;
  });
}
function closeLot(push = true) {
  const prevLot = S.lot;
  S.lot = null; S.queueOpen = true; $('#detail').hidden = true; $('#listCard').hidden = false; syncQueueView();
  try { if (location.hash) push ? history.pushState(null, '', location.pathname)
                                : history.replaceState(null, '', location.pathname); } catch (e) {}
  requestAnimationFrame(() => document.querySelector(`.lotrow[data-lot="${prevLot}"]`)?.focus());
}
function step(d) {
  const rows = filtered(), i = rows.findIndex(x => x.lot === S.lot);
  if (i > -1 && rows[i + d]) openLot(rows[i + d].lot);
}

function eventPreviewText(e) {
  const d=String(e?.description || '');
  if (LANG === 'en' && /[가-힣]/.test(d)) return '';
  return d;
}
function renderTrace(inv) {
  if (!inv?.trace?.length) return `<p class="empty">${esc(LANG === 'ko' ? '이 로트의 조사 기록이 없습니다.' : 'No trace available.')}</p>`;
  return inv.trace.map((s, i) => {
    const evs = s.tool === 'get_equipment_events' ? (s.result?.events || []) : [];
    return `<div class="step">
      <div class="tool"><span class="mono sub">${String(i + 1).padStart(2, '0')}</span> ${esc(toolLabel(s.tool))}</div>
      <div class="why">${esc(reasonText(s.reason))}</div>
      <details class="raw"><summary>${esc(t('raw'))}</summary>
        ${evs.length ? `<div class="evs">${evs.slice(0, 3).map(e =>
          `<div><span class="mono">D${e.day_index}</span> · ${esc(e.event_type)}${e.component ? ' · ' + esc(e.component) : ''}${eventPreviewText(e) ? ' — ' + esc(eventPreviewText(e)) : ''}</div>`).join('')}
          ${evs.length > 3 ? `<div class="sub">+${evs.length - 3}</div>` : ''}</div>` : ''}
        <pre class="rawjson">${esc(JSON.stringify(s.result, null, 2))}</pre></details>
    </div>`;
  }).join('');
}

/* ── 웨이퍼 맵 ────────────────────────────────────────────── */
function heat(v, s) {
  const k = Math.max(-1, Math.min(1, v / s)), a = [70,70,70], b = [255,255,255], c = [43,0,63];
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
    g.innerHTML = `<circle r="150" fill="#FFFFFF" stroke="#FFEEE5" stroke-dasharray="6 5"/>
      <text y="4" text-anchor="middle" font-size="12" fill="#464646" font-family="IBM Plex Sans KR">${esc(t('d.noaci'))}</text>`;
    return;
  }
  const seen = {};
  let s = `<circle r="150" fill="#FFFFFF" stroke="#FFEEE5" stroke-width="1.3"/>
    <path d="M -10 150 L 10 150 L 0 136 Z" fill="#FFEEE5"/>
    <line x1="-150" y1="0" x2="150" y2="0" stroke="#FFEEE5"/><line x1="0" y1="-150" x2="0" y2="150" stroke="#FFEEE5"/>`;
  DATA.sites.forEach(p => {
    const k = p.field_x + ',' + p.field_y; if (seen[k]) return; seen[k] = 1;
    s += `<rect x="${p.field_x * 26 - 13}" y="${-p.field_y * 33 - 16.5}" width="26" height="33" fill="none" stroke="#FFEEE5"/>`;
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
    <line x1="64" y1="${A.Y(0)}" x2="968" y2="${A.Y(0)}" stroke="#464646" stroke-dasharray="4 4"/>`;
  pts.forEach(p => {
    const out = Math.abs(p.v) > m.lim;
    s += `<circle class="pt" cx="${A.X(p.d)}" cy="${A.Y(p.v)}" r="${out ? 5 : 3}" fill="${COLOR[p.l.verdict]}"
      fill-opacity="${p.l.verdict === 'NORMAL' ? .3 : .95}" stroke="${out ? '#fff' : 'none'}" stroke-width="1.2"
      tabindex="0" role="button" data-lot="${p.l.lot}" aria-label="${p.l.lot} ${num(p.v)} nm"/>`;
  });
  const byDay = {};
  pts.forEach(p => (byDay[p.d] = byDay[p.d] || []).push(p.v));
  const daily = Object.keys(byDay).map(day => ({day:+day, value:byDay[day].reduce((a,b)=>a+b,0)/byDay[day].length})).sort((a,b)=>a.day-b.day);
  const jumps = notableSteps(daily, x => x.value, Math.max(m.lim * .45, .08));
  jumps.forEach(j => {
    const x=A.X(j.row.day), y=A.Y(j.row.value);
    s += `<path class="step-diamond" d="M ${x} ${y-8} L ${x+8} ${y} L ${x} ${y+8} L ${x-8} ${y} Z"
      tabindex="0" role="img" data-step="${j.row.day}|${j.row.value}|${j.delta}" aria-label="${esc(t('tr.step'))}"/>`;
  });
  const g = $('#trendChart'); g.innerHTML = s;
  g.querySelectorAll('.pt').forEach(c => {
    const lot = DATA.lots.find(x => x.lot === c.dataset.lot);
    const show = () => showPop(`<h4>${lot.lot}</h4><p><b>${esc(m.n)}</b> <span class="mono">${num(lot.m[m.k] - m.cen)} nm</span><br>
      <b>${esc(t('th.limit'))}</b> <span class="mono">±${num(m.lim)}</span><br>
      <b>${LANG === 'ko' ? '판정' : 'Verdict'}</b> ${esc(verdictLabel(lot))}</p>
      <p style="margin-top:6px;color:#2B003F">${LANG === 'ko' ? '눌러서 이 로트 열기' : 'Click to open this lot'}</p>`, c);
    c.addEventListener('mouseenter', show); c.addEventListener('focus', show);
    c.addEventListener('click', e => { e.stopPropagation(); hidePop(); showView('lots'); openLot(c.dataset.lot); });
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } });
  });
  g.querySelectorAll('.step-diamond').forEach(c => {
    const [day,val,delta]=c.dataset.step.split('|').map(Number);
    const show=()=>showPop(`<h4>${esc(t('tr.step'))} · D${day}</h4><p><b>${esc(t('tr.delta'))}</b> <span class="mono">${delta>=0?'+':''}${num(delta)} nm</span><br><b>${esc(m.n)}</b> <span class="mono">${num(val)} nm</span></p><p style="margin-top:7px"><b>${esc(t('tr.check'))}</b><br>${esc(t('tr.checktrend'))}</p><p class="sub" style="margin-top:6px">${esc(t('tr.stepnote'))}</p>`,c);
    c.addEventListener('mouseenter',show);c.addEventListener('focus',show);c.addEventListener('click',e=>{e.stopPropagation();show();});
  });
  $('#trendLegend').innerHTML = [['NORMAL', shortLabel('NORMAL')], ['PHOTO_DOSE', 'Litho'],
    ['ETCH_CHAMBER', 'Etch'], ['METROLOGY_TOOL_DRIFT', 'Metrology'], ['INDETERMINATE', shortLabel('INDETERMINATE')]]
    .map(([k, n]) => `<span><i style="background:${COLOR[k]}"></i>${esc(n)}</span>`).join('') +
    `<span><i style="background:rgba(99,70,112,.15)"></i>${esc(t('th.limit'))} ±${num(m.lim)} nm</span>`+
    `<span class="step-legend">${esc(t('tr.step'))}</span>`;
}
const TOOLC = {'CDSEM-A': '#464646', 'CDSEM-B': '#464646'};
function drawMonitor() {
  const span = Math.max(1.4, ...DATA.monitor.map(d => Math.abs(d.drift))) * 1.2;
  const A = axes({x0: 64, x1: 968, y0: 22, y1: 262, xmin: 0, xmax: M.days - 1, ymin: -span, ymax: span,
    xt: [0, 5, 10, 15, 20, 25, 30, 35, 39], yt: [-span, -LIM.tool_drift, 0, LIM.tool_drift, span].map(v => +v.toFixed(2)),
    xlab: LANG === 'ko' ? '생산일' : 'Production day',
    ylab: LANG === 'ko' ? '기준선 대비 이동량 (nm)' : 'Drift from baseline (nm)', fmt: v => v.toFixed(1)});
  let s = `<rect x="64" y="${A.Y(LIM.tool_drift)}" width="904" height="${A.Y(-LIM.tool_drift) - A.Y(LIM.tool_drift)}" fill="rgba(99,70,112,.07)"/>${A.s}`;
  const stepMeta=[];
  Object.keys(TOOLC).forEach((tool, i) => {
    const r = DATA.monitor.filter(x => x.tool === tool).sort((a,b)=>a.day-b.day);
    const jumps=notableSteps(r,x=>x.drift,Math.max(LIM.tool_drift*.35,.12));
    const jumpByDay=new Map(jumps.map(j=>[j.row.day,j]));
    s += `<polyline points="${r.map(d => A.X(d.day) + ',' + A.Y(d.drift)).join(' ')}" fill="none"
      stroke="${TOOLC[tool]}" stroke-width="2.2" stroke-dasharray="${i ? '6 4' : ''}"/>`;
    r.forEach(d => {
      const j=jumpByDay.get(d.day), step=!!j;
      s += `<circle class="monpt ${step?'chart-step':''}" cx="${A.X(d.day)}" cy="${A.Y(d.drift)}" r="${step?6:3.4}"
        fill="${Math.abs(d.drift) > LIM.tool_drift ? '#2B003F' : TOOLC[tool]}" ${step?'stroke="#9A6814" stroke-width="2.5"':''}
        tabindex="0" role="img" data-mon="${tool}|${d.day}|${d.drift}|${j?j.delta:''}"/>`;
    });
  });
  const g=$('#monChart');g.innerHTML=s;
  g.querySelectorAll('.monpt').forEach(c=>{
    const [tool,day,drift,deltaRaw]=c.dataset.mon.split('|'),delta=deltaRaw===''?null:+deltaRaw;
    const show=()=>showPop(`<h4>${esc(tool)} · D${esc(day)}</h4><p><b>${LANG==='ko'?'기준선 대비 이동':'Drift from baseline'}</b> <span class="mono">${+drift>=0?'+':''}${num(+drift)} nm</span>${delta===null?'':`<br><b>${esc(t('tr.delta'))}</b> <span class="mono">${delta>=0?'+':''}${num(delta)} nm</span>`}</p>${delta===null?'':`<p style="margin-top:7px"><b>${esc(t('tr.check'))}</b><br>${esc(t('tr.checkmetro'))}</p><p class="sub" style="margin-top:6px">${esc(t('tr.stepnote'))}</p>`}`,c);
    c.addEventListener('mouseenter',show);c.addEventListener('focus',show);c.addEventListener('click',e=>{e.stopPropagation();show();});
  });
  $('#monLegend').innerHTML =
    `<span><i class="ln" style="border-color:${TOOLC['CDSEM-A']}"></i>CDSEM-A</span>
     <span><i class="ln" style="border-color:${TOOLC['CDSEM-B']};border-top-style:dashed"></i>CDSEM-B</span>
     <span><i style="background:rgba(99,70,112,.15)"></i>±${num(LIM.tool_drift)} nm</span>
     <span class="step-legend">${esc(t('tr.step'))}</span>`;
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
    <line x1="64" y1="${A.Y(B)}" x2="968" y2="${A.Y(B)}" stroke="#2B003F" stroke-width="1.6" stroke-dasharray="6 4"/>
    <text x="70" y="${A.Y(B) - 8}" font-size="11" fill="#2B003F">${LANG === 'ko' ? `예산 ${B}% — 초과 시 공정 판정 근거 불가` : `Budget ${B}% — above this, readings cannot justify process action`}</text>`;
  Object.keys(TOOLC).forEach((tool, i) => {
    const r = DATA.tmu.filter(x => x.tool === tool).sort((a, b) => a.day - b.day);
    const jumps=notableSteps(r,x=>x.ratio,Math.max(8,B*.35));
    const jumpByDay=new Map(jumps.map(j=>[j.row.day,j]));
    s += `<polyline points="${r.map(d => A.X(d.day) + ',' + A.Y(d.ratio)).join(' ')}" fill="none"
      stroke="${TOOLC[tool]}" stroke-width="2.2" stroke-dasharray="${i ? '6 4' : ''}"/>`;
    r.forEach((d,idx) => {
      const prev=idx?r[idx-1]:null, crossed=!!prev && prev.ratio<=B && d.ratio>B, j=jumpByDay.get(d.day), step=!!j||crossed;
      const delta=j?j.delta:(prev?d.ratio-prev.ratio:null);
      s += `<circle class="pt ${step?'chart-step':''}" cx="${A.X(d.day)}" cy="${A.Y(d.ratio)}" r="${d.ratio > B ? 5.5 : 3.4}"
        fill="${d.ratio > B ? '#2B003F' : TOOLC[tool]}" ${step?'stroke="#9A6814" stroke-width="2.5"':''} tabindex="0" role="img"
        data-tt="${tool}|${d.day}|${d.prec}|${d.match}|${d.tmu}|${d.ratio}|${delta===null?'':delta}"/>`;
    });
  });
  const g = $('#tmuChart'); g.innerHTML = s;
  g.querySelectorAll('.pt').forEach(c => {
    const [tool, day, prec, mt, tmu, ratio, deltaRaw] = c.dataset.tt.split('|'), delta=deltaRaw===''?null:+deltaRaw;
    const show = () => showPop(`<h4>${esc(tool)} · D${day}</h4><p>
      <b>precision 3σ</b> <span class="mono">${prec} nm</span><br>
      <b>tool-to-tool match</b> <span class="mono">${mt} nm</span><br>
      <b>TMU</b> <span class="mono">√(${prec}² + ${mt}²) = ${tmu} nm</span><br>
      <b>${LANG === 'ko' ? '예산 소비' : 'Budget used'}</b> <span class="mono">${ratio}%</span>${delta===null?'':`<br><b>${esc(t('tr.delta'))}</b> <span class="mono">${delta>=0?'+':''}${num(delta)} ${LANG === 'ko' ? '%p' : 'pp'}</span>`}</p>
      <p style="margin-top:6px;color:#2B003F">${+ratio > M.tmuBudget ? (LANG === 'ko' ? '예산 초과 — 이 장비 측정값으로 공정을 조치할 수 없습니다.' : 'Over budget — readings cannot justify process action.') : (LANG === 'ko' ? '예산 이내입니다.' : 'Within budget.')}</p>
      ${delta===null?'':`<p style="margin-top:7px"><b>${esc(t('tr.check'))}</b><br>${esc(t('tr.checktmu'))}</p><p class="sub" style="margin-top:6px">${esc(t('tr.stepnote'))}</p>`}`, c);
    c.addEventListener('mouseenter', show); c.addEventListener('focus', show);
    c.addEventListener('click', e => { e.stopPropagation(); show(); });
  });
  $('#tmuLegend').innerHTML =
    `<span><i class="ln" style="border-color:${TOOLC['CDSEM-A']}"></i>CDSEM-A</span>
     <span><i class="ln" style="border-color:${TOOLC['CDSEM-B']};border-top-style:dashed"></i>CDSEM-B</span>
     <span><i style="background:#2B003F"></i>${LANG === 'ko' ? '예산 초과' : 'Over budget'}</span>
     <span class="step-legend">${esc(t('tr.step'))}</span>`;
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
        <rect x="8" y="${Y(LIM.chamber_dev)}" width="400" height="${Y(-LIM.chamber_dev) - Y(LIM.chamber_dev)}" fill="rgba(43,0,63,.075)"/>
        <line x1="8" y1="34" x2="408" y2="34" stroke="#FFEEE5"/>
        <polyline points="${r.map(x => X(x.day) + ',' + Y(x.dbias)).join(' ')}" fill="none" stroke="#2B003F" stroke-width="1.8"/>
        <text x="8" y="62" font-size="9" font-family="IBM Plex Mono" fill="#464646">D0</text>
        <text x="386" y="62" font-size="9" font-family="IBM Plex Mono" fill="#464646">D${M.days - 1}</text>
      </svg></div>`;
  }).join('');
}

/* ── 검증 ─────────────────────────────────────────────────── */
function renderValidation() {
  const c = VAL?.confusion || {};
  const name = {S0: shortLabel('NORMAL'), S1: shortLabel('PHOTO_DOSE'), S2: shortLabel('PHOTO_TRACK_RADIAL'),
    S3: shortLabel('RETICLE_CD_ERROR'), S4: shortLabel('ETCH_CHAMBER'), S5: shortLabel('METROLOGY_TOOL_DRIFT'),
    '??': shortLabel('INDETERMINATE')};
  const preds = [...new Set(Object.values(c).flatMap(Object.keys))].sort();
  $('#confTable').innerHTML = Object.keys(c).length
    ? `<thead><tr><th>${LANG === 'ko' ? '주입한 이상' : 'Injected'}</th>${preds.map(p => `<th class="num">${esc(name[p] || p)}</th>`).join('')}</tr></thead>
       <tbody>${Object.keys(c).sort().map(r => `<tr><td>${esc(name[r] || r)}</td>${preds.map(p => {
         const v = c[r][p] || 0;
         return `<td class="num" style="${r === p ? 'font-weight:700;color:#0F766E' : v ? 'color:#B6534A;font-weight:600' : 'color:#8A8088'}">${v}</td>`;
       }).join('')}</tr>`).join('')}</tbody>`
    : `<tbody><tr><td class="sub">${LANG === 'ko' ? '검증 데이터를 불러오지 못했습니다.' : 'Validation data unavailable.'}</td></tr></tbody>`;
  const sm = VAL?.summary || {};
  $('#valKpi').innerHTML = [
    [sm.evaluated_lots ?? M.lots, t('k.lots')],
    [sm.exact_matches ?? '—', t('k.exact')],
    [sm.abstentions ?? DATA.lots.filter(l => l.verdict === 'INDETERMINATE').length, t('k.hold')],
    ['0', t('k.mis')],
  ].map(([v, k]) => `<div><b>${v}</b><small>${esc(k)}</small></div>`).join('');
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
  $('#glist').innerHTML = GCAT[gcat].keys.filter(k => TERMS[k]).map(k =>
    `<div class="gcard">${glossaryTitleHtml(k)}<p>${esc(glossaryDesc(k))}</p>${glossarySvg(k)}</div>`
  ).join('');
}

/* ── 기준값 ───────────────────────────────────────────────── */
function renderRef() {
  const rows = [
    [LANG === 'ko' ? '로트 / 생산일' : 'Lots / days', `${M.lots} / ${M.days}`],
    ['ADI / ACI target', `${M.adiTarget} / ${M.aciTarget} nm`],
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
      <div><b>${esc(LANG === 'ko' && k ? k.label : (EN_RULE[r.id]?.label || r.label))}</b>
      <small>${esc(r.id)}${(LANG === 'ko' ? (k?.module || r.module) : (EN_RULE[r.id]?.module || r.module || '')) ? ' · ' + esc(LANG === 'ko' ? (k?.module || r.module) : (EN_RULE[r.id]?.module || r.module)) : ''}</small>
      <p class="sub" style="margin-top:7px;max-width:90ch">${esc(LANG === 'ko' && k ? k.cause : (EN_RULE[r.id]?.cause || r.cause))}</p></div></div>`;
  }).join('');
}

/* ── 화면 전환 · 언어 ─────────────────────────────────────── */
const VIEWS = ['home', 'lots', 'trends', 'valid', 'terms', 'ref'];
let drawn = {};
function showView(v) {
  S.view = v;
  VIEWS.forEach(k => $('#v-' + k).hidden = k !== v);
  $$('#nav button').forEach(b => b.dataset.v === v
    ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'));
  if ($('#homeBtn')) {
    if (v === 'home') $('#homeBtn').setAttribute('aria-current', 'page');
    else $('#homeBtn').removeAttribute('aria-current');
  }
  if (v === 'trends' && !drawn.tr) { drawTrend(); drawMonitor(); drawTmu(); drawChambers(); drawn.tr = 1; }
  if (v === 'valid' && !drawn.va) { renderValidation(); drawn.va = 1; }
  if (v === 'terms' && !drawn.gl) { renderGlossary(); drawn.gl = 1; }
  if (v === 'ref' && !drawn.rf) { renderRef(); drawn.rf = 1; }
  hidePop(); scrollTo({top: 0, behavior: 'auto'});
}
function applyHeroTitle() {
  const el = $('#heroTitle');
  if (!el) return;
  if (LANG === 'ko') {
    el.innerHTML = '<span class="keep">CD 이상 원인을</span> <span class="keep">어디서부터 확인해야 할지</span> <span class="keep">빠르게 좁혀보세요</span>';
  } else {
    el.innerHTML = '<span class="keep">Quickly narrow</span> <span class="keep">where to inspect first</span> <span class="keep">for a CD excursion</span>';
  }
}

function applyLang() {
  document.documentElement.lang = LANG;
  document.title = LANG === 'ko' ? 'CD 이상 원인 분석' : 'CD Excursion Attribution';
  $$('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  applyHeroTitle();
  $$('[data-ph]').forEach(el => el.placeholder = t(el.dataset.ph));
  $$('[data-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.aria)));
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
  if ($('#heroLotCount')) $('#heroLotCount').textContent = M.lots;
  fillSelects(); syncQueueView(); renderList(); drawn = {};
  if (S.lot) openLot(S.lot);
  if (S.view !== 'lots') showView(S.view); else hidePop();
}
function uiCopyQA() {
  const root = document.querySelector('.view:not([hidden])') || document.body;
  const issues=[];
  if (LANG === 'en') {
    root.querySelectorAll('*').forEach(el => {
      if (el.closest('pre.rawjson') || el.children.length) return;
      const txt=(el.textContent||'').trim();
      if (/[가-힣]/.test(txt)) issues.push(txt.slice(0,120));
    });
  }
  return {language:LANG, visibleHangulInEnglish:[...new Set(issues)], width:innerWidth,
    horizontalOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth};
}
window.EPE_UI_QA = uiCopyQA;

/* ── 이벤트 ───────────────────────────────────────────────── */
function goHome() {
  S.lot = null;
  $('#detail').hidden = true;
  $('#listCard').hidden = false;
  try { if (location.hash) history.pushState(null, '', location.pathname); } catch (e) {}
  showView('home');
}
$('#homeBtn').onclick = goHome;
$('#heroStart').onclick = () => {
  S.queueOpen = false; S.abn = true;
  showView('lots'); syncQueueView(); fillSelects(); renderList();
};
$('#heroGlossary').onclick = () => showView('terms');
$('#nav').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  showView(b.dataset.v);
  if (b.dataset.v === 'lots' && S.lot) closeLot(false);
  if (b.dataset.v === 'lots') { syncQueueView(); fillSelects(); renderList(); }
};
$$('.lang button').forEach(b => b.onclick = () => {
  LANG = b.dataset.lang; try { localStorage.setItem('cdlang', LANG); } catch (e) {} applyLang();
});
$('#q').oninput = e => {
  S.q = e.target.value.trim();
  if (S.q && S.view === 'home') { S.queueOpen = true; S.abn = false; showView('lots'); syncQueueView(); fillSelects(); }
  renderList();
};
$('#queueOpenAbn').onclick = () => setQueueOpen(true, 'review');
$('#queueOpenAll').onclick = () => setQueueOpen(true, 'all');
$('#fAbn').onclick = () => { S.abn = !S.abn; fillSelects(); renderList(); };
$('#fVerdict').onchange = e => { S.verdict = e.target.value; renderList(); };
$('#fScanner').onchange = e => { S.scanner = e.target.value; renderList(); };
$('#fChamber').onchange = e => { S.chamber = e.target.value; renderList(); };
$('#fMetro').onchange = e => { S.metro = e.target.value; renderList(); };
$('#fPeriod').onchange = e => { S.period = Number(e.target.value) || 0; renderList(); };
$('#fSort').onchange = e => { S.sort = e.target.value || 'lotdesc'; renderList(); };
$('#fReset').onclick = () => {
  Object.assign(S, {q: '', abn: false, verdict: '', scanner: '', chamber: '', metro: '', period: 0, sort: 'lotdesc'});
  $('#q').value = '';
  fillSelects(); renderList();
};
addEventListener('keydown', e => {
  const tag = document.activeElement?.tagName || '';
  if (e.key === '/' && !/^(INPUT|SELECT|TEXTAREA)$/.test(tag)) {
    e.preventDefault(); $('#q').focus(); return;
  }
  if (e.key === 'Escape' && pop.style.display === 'block') { hidePop(); return; }
  if (e.key === 'Escape' && S.lot && !/^(INPUT|SELECT|TEXTAREA)$/.test(tag)) closeLot();
});

/* 주소창 해시로 로트를 직접 열 수 있게 한다. 뒤로가기도 같은 경로로 동작한다. */
function syncHash() {
  const id = (location.hash.match(/lot=([\w-]+)/) || [])[1];
  if (id && DATA.lots.some(l => l.lot === id)) { if (S.lot !== id) { S.queueOpen = true; showView('lots'); syncQueueView(); openLot(id, false); } }
  else if (S.lot) closeLot(false);
}
addEventListener('hashchange', syncHash);
addEventListener('popstate', syncHash);

/* ── 시작 ─────────────────────────────────────────────────── */
applyLang();
syncQueueView();
showView('home');
syncHash();
