import { ProblemSet } from '../types';

export const problems: ProblemSet = {
  "easy": {
    "title": "비버의 비밀번호 🪙",
    "difficulty": "하 (Easy) - 정보의 표현 및 패턴 인식",
    "color": "#10b981",
    "svg": "<svg width=\"240\" height=\"120\" viewBox=\"0 0 240 120\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"120\" fill=\"#f0fdf4\" rx=\"8\"/><circle cx=\"40\" cy=\"60\" r=\"15\" fill=\"#fbbf24\" stroke=\"#d97706\" stroke-width=\"2\"/><circle cx=\"80\" cy=\"60\" r=\"15\" fill=\"#94a3b8\" stroke=\"#475569\" stroke-width=\"2\"/><circle cx=\"120\" cy=\"60\" r=\"15\" fill=\"#fbbf24\" stroke=\"#d97706\" stroke-width=\"2\"/><circle cx=\"160\" cy=\"60\" r=\"15\" fill=\"#fbbf24\" stroke=\"#d97706\" stroke-width=\"2\"/><path d=\"M40 85 L160 85\" stroke=\"#64748b\" stroke-width=\"2\" stroke-dasharray=\"4\"/><text x=\"120\" y=\"110\" text-anchor=\"middle\" font-size=\"12\" fill=\"#1e293b\">금색=1, 은색=0</text></svg>",
    "story": "비버 마을의 창고에는 <strong>금색 동전</strong>과 <strong>은색 동전</strong>이 나란히 놓여 있습니다. 비버들은 이를 이용해 비밀번호를 만듭니다. 금색 동전 한 개는 숫자 <strong>1</strong>을 의미하고, 은색 동전 한 개는 숫자 <strong>0</strong>을 의미합니다.",
    "question": "동전이 '금색-은색-금색-금색' 순서로 놓여 있다면, 이 비밀번호를 숫자로 바르게 표현한 것은 무엇일까요?",
    "options": [
      { "id": "1", "text": "① 1011" },
      { "id": "2", "text": "② 1101" },
      { "id": "3", "text": "③ 0110" },
      { "id": "4", "text": "④ 1001" }
    ],
    "correct": "1",
    "customVisual": "<div class=\"p-4 bg-white rounded-lg border border-emerald-100 shadow-sm\"><div class=\"flex items-center gap-2 mb-2\"><span class=\"text-xl\">🪙</span> <span class=\"font-medium\">비트(Bit)의 이해</span></div><p class=\"text-sm text-gray-600\">동전 하나가 하나의 정보를 담는 가장 작은 단위인 '비트'가 됩니다.</p></div>",
    "explanation": "<h4>✏️ 문제 핵심 해설</h4><p>금색을 1, 은색을 0으로 약속했으므로, 제시된 순서(금-은-금-금)를 그대로 치환하면 1-0-1-1이 됩니다.</p><h4>🖥️ 컴퓨터 과학 개념</h4><p>컴퓨터는 모든 정보를 0과 1의 조합인 <strong>이진법(Binary)</strong>으로 처리합니다. 이 문제에서 동전의 색깔이 정보를 구분하는 기준이 되듯, 현대 소자에서는 전압의 유무로 이를 결정합니다.</p>",
    "hint": "각 동전의 색깔을 약속된 숫자로 하나씩 차례대로 바꿔보세요!"
  },
  "medium": {
    "title": "사과 상자 이진수 계산기 🍎",
    "difficulty": "중 (Medium) - 이진법 및 데이터 표현",
    "color": "#f59e0b",
    "svg": "<svg width=\"240\" height=\"120\" viewBox=\"0 0 240 120\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"120\" fill=\"#fffbeb\" rx=\"8\"/><rect x=\"20\" y=\"40\" width=\"30\" height=\"30\" fill=\"#d97706\" rx=\"2\"/><rect x=\"70\" y=\"40\" width=\"30\" height=\"30\" fill=\"#d97706\" rx=\"2\"/><rect x=\"120\" y=\"40\" width=\"30\" height=\"30\" fill=\"#d97706\" rx=\"2\"/><rect x=\"170\" y=\"40\" width=\"30\" height=\"30\" fill=\"#d97706\" rx=\"2\"/><text x=\"35\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">8개</text><text x=\"85\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">4개</text><text x=\"135\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">2개</text><text x=\"185\" y=\"85\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">1개</text></svg>",
    "story": "비버는 사과를 보관할 때 특별한 상자들을 사용합니다. 왼쪽에서부터 각 상자에는 <strong>8개, 4개, 2개, 1개</strong>의 사과가 들어갑니다. 비버는 상자를 <strong>사용(1)</strong>하거나 <strong>사용하지 않음(0)</strong>으로써 원하는 개수의 사과를 딱 맞춰 가져가려고 합니다.",
    "question": "비버가 정확히 <strong>13개</strong>의 사과를 가져가기 위해 사용해야 하는 상자들을 이진수(0과 1)로 표현하면 무엇일까요? (왼쪽 8개 상자부터 순서대로)",
    "options": [
      { "id": "1", "text": "① 1011 (8 + 2 + 1)" },
      { "id": "2", "text": "② 1101 (8 + 4 + 1)" },
      { "id": "3", "text": "③ 1110 (8 + 4 + 2)" },
      { "id": "4", "text": "④ 0111 (4 + 2 + 1)" }
    ],
    "correct": "2",
    "customVisual": "<div class=\"visual-title font-bold mb-2\">🔬 [실험도구] 상자 조합을 클릭해 보세요:</div><div class=\"flex gap-2 mb-4\" id=\"apple-box-container\"><button class=\"apple-box-item px-3 py-2 bg-amber-100 border-2 border-amber-600 rounded cursor-pointer transition-all hover:bg-amber-200\" data-val=\"8\">📦 8개</button><button class=\"apple-box-item px-3 py-2 bg-amber-100 border-2 border-amber-600 rounded cursor-pointer transition-all hover:bg-amber-200\" data-val=\"4\">📦 4개</button><button class=\"apple-box-item px-3 py-2 bg-amber-100 border-2 border-amber-600 rounded cursor-pointer transition-all hover:bg-amber-200\" data-val=\"2\">📦 2개</button><button class=\"apple-box-item px-3 py-2 bg-amber-100 border-2 border-amber-600 rounded cursor-pointer transition-all hover:bg-amber-200\" data-val=\"1\">📦 1개</button></div><div class=\"live-counter text-lg font-mono p-3 bg-white rounded border border-amber-200\">🧺 선택한 사과 합계: <span id=\"live-sum\" class=\"text-amber-600 font-bold\">0</span>개</div>",
    "explanation": "<h4>✏️ 문제 핵심 해설</h4><p>13을 만들기 위해서는 8 + 4 + 1 조합이 필요합니다. 따라서 8개 상자(사용), 4개 상자(사용), 2개 상자(미사용), 1개 상자(사용) 순서가 되어 1101이 됩니다.</p><h4>🖥️ 컴퓨터 과학 개념</h4><p>이는 각 자릿수가 <strong>2의 거듭제곱(1, 2, 4, 8, ...)</strong>의 가중치를 가지는 <strong>이진법 가중치 시스템</strong>입니다. 상자를 여닫는 스위치처럼 0과 1로 큰 숫자를 표현하는 원리입니다.</p>",
    "hint": "큰 사과 상자부터 차례대로 넣으면서 13이 넘지 않도록 선택해 보세요!"
  },
  "hard": {
    "title": "운하의 수문 조절 ⚙️",
    "difficulty": "상 (Hard) - 알고리즘 최적화 및 경로",
    "color": "#8b5cf6",
    "svg": "<svg width=\"240\" height=\"120\" viewBox=\"0 0 240 120\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"240\" height=\"120\" fill=\"#f5f3ff\" rx=\"8\"/><path d=\"M20 60 Q 60 20, 120 60 T 220 60\" stroke=\"#6366f1\" fill=\"none\" stroke-width=\"4\"/><circle cx=\"70\" cy=\"45\" r=\"8\" fill=\"#ef4444\"/><circle cx=\"120\" cy=\"60\" r=\"8\" fill=\"#ef4444\"/><circle cx=\"170\" cy=\"75\" r=\"8\" fill=\"#ef4444\"/><text x=\"120\" y=\"20\" text-anchor=\"middle\" font-size=\"10\" fill=\"#4338ca\">상류 → 하류</text></svg>",
    "story": "비버는 운하를 따라 통나무를 운반해야 합니다. 운하에는 3개의 <strong>수문(A, B, C)</strong>이 있는데, 각 수문은 물의 양에 따라 <strong>열림(Open)</strong> 또는 <strong>닫힘(Closed)</strong> 상태가 됩니다. 상류에서 하류로 가려면 수문들이 특정 규칙을 만족해야 합니다. 수문 B가 열리려면 A가 반드시 먼저 열려 있어야 하고, C가 열리려면 B와 A가 모두 열려 있어야 합니다.",
    "question": "통나무가 하류(C를 지나서)까지 무사히 도달하기 위해 비버가 수문을 조작하는 <strong>최소 동작 횟수</strong>와 <strong>순서</strong>를 논리적으로 판단했을 때 틀린 설명은?",
    "options": [
      { "id": "1", "text": "① A를 먼저 열지 않고 B를 열 수 없다." },
      { "id": "2", "text": "② 모든 수문이 열려 있어야 하류에 도착한다." },
      { "id": "3", "text": "③ C를 가장 먼저 열어도 통나무는 이동한다." },
      { "id": "4", "text": "④ 이 구조는 의존성(Dependency)이 중첩된 형태이다." }
    ],
    "correct": "3",
    "customVisual": "<div class=\"logic-box p-3 bg-violet-50 rounded-lg border border-violet-200\"><div class=\"font-bold mb-2\">🔗 규칙 확인 (조건부 실행)</div><ul class=\"text-sm space-y-1 list-disc pl-4\"><li>B Open IF A == Open</li><li>C Open IF B == Open (AND A == Open)</li></ul></div>",
    "explanation": "<h4>✏️ 문제 핵심 해설</h4><p>문제의 조건에 따르면 C가 열리려면 반드시 B와 A가 먼저 열려 있어야 합니다. 따라서 C를 가장 먼저 열 수 없으며, 열더라도 앞의 수문이 막혀있다면 통나무는 이동할 수 없습니다.</p><h4>🖥️ 컴퓨터 과학 개념</h4><p>이는 알고리즘 설계에서 중요한 <strong>의존성 관리(Dependency Management)</strong>와 <strong>위상 정렬(Topological Sort)</strong>의 기초 개념입니다. 특정 작업을 수행하기 위해 반드시 선행되어야 하는 작업의 순서를 결정하는 논리입니다.</p>",
    "hint": "수문이 열리는 선행 조건을 다시 한번 꼼꼼히 읽어보세요!"
  }
};
