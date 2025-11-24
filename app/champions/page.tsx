// app/page.tsx
import { getAllChampions } from "../lib/champions";
import ChampionCard from "../components/ChampionCard";

export default function HomePage() {
  const champions = getAllChampions();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">
          칼바람 아수라장 챔피언별 공략
        </h1>
        <p className="text-slate-400 mb-6 text-sm">
          챔피언을 선택하면 추천 증강과 아이템 빌드를 볼 수 있어요.
        </p>

        {/* TODO: 나중에 검색/필터 추가 */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {champions.map((champ) => (
            <ChampionCard key={champ.id} champ={champ} />
          ))}
        </div>
      </div>
    </main>
  );
}
