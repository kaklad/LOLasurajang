// app/roles/page.tsx
import Link from "next/link";
import { getAllRoles } from "../lib/roles";

export default function RolesPage() {
  const roles = getAllRoles();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        <header>
          <h1 className="text-3xl font-bold mb-2">역할군 별 공략</h1>
          <p className="text-sm text-slate-400">
            원딜, 서포터, 전사, 마법사, 암살자, 탱커 역할군 별로 어떤 증강과 아이템이 좋은지 정리한 페이지입니다.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={`/roles/${role.slug}`}
              className="group rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-400/70 p-4 flex flex-col justify-between transition"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold group-hover:text-emerald-300">
                    {role.nameKo}
                  </h2>
                  {role.shortLabel && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-200 border border-slate-600">
                      {role.shortLabel}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300">{role.summary}</p>
              </div>

              {role.exampleChampions?.length > 0 && (
                <div className="mt-3 text-xs text-slate-400">
                  예시 챔피언: {role.exampleChampions.join(", ")}
                </div>
              )}
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
