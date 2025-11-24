// app/champion/[id]/page.tsx
import { getChampionById } from "../../lib/champions";
import { getRecommendationByChampionId } from "../../lib/recommendations";

interface PageProps {
  params: { id: string };
}

export default function ChampionPage({ params }: PageProps) {
  const champ = getChampionById(params.id);
  const rec = getRecommendationByChampionId(params.id);

  if (!champ) {
    return (
      <main className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
        <p>존재하지 않는 챔피언입니다.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        {/* 헤더: 챔피언 정보 */}
        <header className="flex items-center gap-4">
          <img
            src={champ.imageUrl}
            alt={champ.name}
            className="w-20 h-20 rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-bold">{champ.name}</h1>
            <p className="text-slate-400">{champ.title}</p>
            {rec && (
              <p className="mt-1 text-xs text-slate-500">
                패치 {rec.patch} 기준 / 모드: 아수라장
              </p>
            )}
          </div>
        </header>

        {/* 전체 메모 */}
        {rec?.notes && (
          <section>
            <h2 className="text-lg font-semibold mb-1">전체 팁</h2>
            <p className="text-sm text-slate-300 whitespace-pre-line">
              {rec.notes}
            </p>
          </section>
        )}

        {/* 빌드별 추천 (AD, AP 등) */}
        {rec ? (
          rec.builds.map((build) => (
            <section
              key={build.id}
              className="bg-slate-800/60 rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{build.name}</h2>
                {build.conditions && (
                  <span className="text-xs text-slate-400">
                    {build.conditions}
                  </span>
                )}
              </div>

              {/* 증강 추천 */}
              <div>
                <h3 className="text-sm font-semibold mb-1 text-emerald-300">
                  추천 증강
                </h3>
                <div className="space-y-2">
                  {build.augments.map((a) => (
                    <div
                      key={a.name}
                      className="flex items-start justify-between bg-slate-900/60 p-2 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{a.name}</div>
                        {a.note && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {a.note}
                          </p>
                        )}
                      </div>
                      <span
                        className={
                          "text-xs px-2 py-0.5 rounded-full font-bold " +
                          (a.tier === "S"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : a.tier === "A"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-sky-500/20 text-sky-300")
                        }
                      >
                        {a.tier} 티어
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 아이템 추천 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-sky-300">
                    핵심 아이템
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {build.items.core.map((item) => (
                      <li
                        key={item.name}
                        className="bg-slate-900/60 p-2 rounded"
                      >
                        <span className="font-semibold">{item.name}</span>
                        {item.note && (
                          <span className="block text-xs text-slate-400">
                            {item.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {build.items.situational && (
                  <div>
                    <h3 className="text-sm font-semibold mb-1 text-purple-300">
                      상황 아이템
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {build.items.situational.map((item) => (
                        <li
                          key={item.name}
                          className="bg-slate-900/60 p-2 rounded"
                        >
                          <span className="font-semibold">{item.name}</span>
                          {item.note && (
                            <span className="block text-xs text-slate-400">
                              {item.note}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          ))
        ) : (
          <section>
            <p className="text-sm text-slate-400">
              아직 이 챔피언에 대한 공략 데이터가 없습니다. (직접 추가 예정)
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
