// app/synergies/page.tsx
export default function SynergiesPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-4">
        <h1 className="text-3xl font-bold">재미있는 시너지</h1>
        <p className="text-slate-400 text-sm">
          특정 증강 + 챔피언 조합, 둘이서 할 때 좋은 듀오 조합, 이상한데 강한 시너지 등을 모을 공간입니다.
        </p>

        <div className="mt-4 text-sm text-slate-300">
          예시 아이디어:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <b>유레카 + 베이가</b> — 주문력 뻥튀기 + 스킬 가속으로 Q 스택 쌓기 극대화
            </li>
            <li>
              <b>거인 학살자 + 신지드</b> — 상대 탱커를 작게 만들고 도트딜로 갈아버리기
            </li>
            <li>
              <b>특정 증강 두 개 + 특정 챔피언</b> 같은 “미친 조합” 카드 모음
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
