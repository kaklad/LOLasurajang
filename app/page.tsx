// app/page.tsx
import MenuCard from "./components/MenuCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-4xl mx-auto py-16 px-4 space-y-8">
        {/* 헤더 */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold">
            칼바람 아수라장 공략 허브
          </h1>
          <p className="text-slate-400 text-sm">
            역할군, 챔피언, 색다른 시너지까지 한 번에 정리한 아수라장 전용 공략 사이트.
          </p>
        </header>

        {/* 메뉴 그리드 */}
        <section className="grid md:grid-cols-3 gap-4">
          <MenuCard
            href="/roles"
            title="역할군 별 공략"
            description="탱커, 브루저, 메이지, 원딜 등 역할군에 따라 어떤 증강/아이템이 좋은지 한눈에 보기."
          />
          <MenuCard
            href="/champions"
            title="챔피언 별 공략"
            description="각 챔피언별로 추천 증강, 아이템 빌드, 상황별 운영법을 정리한 개인 공략 모음."
          />
          <MenuCard
            href="/synergies"
            title="재미있는 시너지"
            description="친구랑 같이 하면 더 재밌는 조합, 특정 증강 + 챔피언 꿀조합 등을 모아둔 재미용 메뉴."
          />
        </section>
      </div>
    </main>
  );
}
