// app/roles/[slug]/page.tsx
import rolesRaw from "../../data/roles.json";
import type { RoleGuide, RoleId } from "@/app/types/roles";

interface RolePageProps {
    params: { slug: string };
}

interface SpellInfo {
    name: string;
    description: string;
}

const SPELL_RECOMMENDATIONS: Record<
    string,
    {
        core: SpellInfo[];
        situational: SpellInfo[];
        avoid: SpellInfo[];
    }
> = {
    adc: {
        core: [
            {
                name: "정화",
                description:
                    "상대에 CC가 별로 없으면 아쉬운 스펠"
            },
            {
                name: "방어막 / 힐",
                description:
                    "생존용 스펠."
            }
        ],
        situational: [
            {
                name: "유체화",
                description:
                    "이동 속도는 좋지만, 증강으로도 충분히 보완 가능"
            },
            {
                name: "점화",
                description:
                    "킬 캐치"
            }
        ],
        avoid: [

        ]
    }
};

export default function RoleDetailPage({ params }: RolePageProps) {

    const roles = rolesRaw as Record<RoleId, RoleGuide>;
    const role = roles["mage"];

    if (!role) {
        return (
            <main className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
                <p className="text-sm text-slate-400">존재하지 않는 역할군입니다.</p>
            </main>
        );
    }

    const spells = SPELL_RECOMMENDATIONS[role.id];

    return (
        <main className="min-h-screen bg-slate-900 text-slate-50">
            <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
                {/* 1. summary + 2. description */}
                <RoleHeader role={role} />

                {/* 3. 스펠 추천 */}
                {spells && <SpellSection spells={spells} />}

                {/* 4. 증강 추천 */}
                <RoleAugments role={role} />

                {/* 5. 아이템 빌드 추천 */}
                <RoleItemBuilds role={role} />

                {/* 6. 추가 공략 */}
                <RoleExtraTips role={role} /> 
            </div>
        </main>
    );
}

/* ---------------- 헤더 (summary / description) ---------------- */

function RoleHeader({ role }: { role: RoleGuide }) {
    return (
        <header className="space-y-2">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{role.nameKo}</h1>
                {role.shortLabel && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-600">
                        {role.shortLabel}
                    </span>
                )}
                <span className="text-xs text-slate-500">({role.nameEn})</span>
            </div>

            {/* summary: 조금 더 크게 */}
            <p className="text-base text-slate-100">{role.summary}</p>

            {/* description: 더 작은 글씨 */}
            <p className="text-sm text-slate-400 whitespace-pre-line">
                {role.description}
            </p>

        </header>
    );
}

/* ---------------- 스펠 추천 섹션 ---------------- */

function SpellSection({
    spells
}: {
    spells: {
        core: SpellInfo[];
        situational: SpellInfo[];
        avoid: SpellInfo[];
    };
}) {
    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">스펠 추천</h2>
            <div className="grid md:grid-cols-3 gap-3">
                <SpellColumn title="핵심 스펠" spells={spells.core} />
                <SpellColumn title="상황에 따라 선택" spells={spells.situational} />
            </div>
        </section>
    );
}

function SpellColumn({ title, spells }: { title: string; spells: SpellInfo[] }) {
    if (!spells || spells.length === 0) return null;

    return (
        <div className="bg-slate-800/80 rounded-xl p-3 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-300">{title}</h3>
            <ul className="space-y-1 text-xs text-slate-200">
                {spells.map((spell) => (
                    <li key={spell.name}>
                        <span className="font-semibold">{spell.name}</span>
                        <p className="text-[11px] text-slate-400">{spell.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------------- 증강 추천 섹션 ---------------- */

function RoleAugments({ role }: { role: RoleGuide }) {
  if (!role.augmentGroups || role.augmentGroups.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">증강 추천</h2>

      {role.augmentGroups.map((group) => (
        <div
          key={group.id}
          className="bg-slate-800/80 rounded-xl p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-emerald-300">
              {group.title}
            </h3>
            {group.description && (
              <span className="text-xs text-slate-400">
                {group.description}
              </span>
            )}
          </div>

          <div className="space-y-2">
            {group.augments.map((aug) => (
              <div
                key={aug.augmentId ?? aug.name}
                className="flex items-start justify-between gap-3 bg-slate-900/70 rounded-lg p-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={getAugNameClass(aug.rarity)}>
                      {aug.name}
                    </span>
                    <TierBadge tier={aug.tier} />
                  </div>
                  {aug.reason && (
                    <p className="mt-1 text-xs text-slate-400">
                      {aug.reason}
                    </p>
                  )}
                  {aug.tags && aug.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {aug.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}


function getAugNameClass(rarity?: "silver" | "gold" | "prism") {
  const base = "font-semibold";

  if (!rarity) return base;

  if (rarity === "silver") {
    return `${base} text-gray-200`;
  }

  if (rarity === "gold") {
    return `${base} text-yellow-300`;
  }

  // prism
  return `${base} bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text`;
}

function TierBadge({ tier }: { tier: "S" | "A" | "B" | "C" }) {
    const base =
        "text-[10px] px-2 py-0.5 rounded-full font-bold border border-current";

    if (tier === "S") {
        return <span className={`${base} text-yellow-300`}>S 티어</span>;
    }
    if (tier === "A") {
        return <span className={`${base} text-emerald-300`}>A 티어</span>;
    }
    if (tier === "B") {
        return <span className={`${base} text-sky-300`}>B 티어</span>;
    }
    return <span className={`${base} text-slate-300`}>C 티어</span>;
}

/* ---------------- 아이템 빌드 섹션 ---------------- */

function RoleItemBuilds({ role }: { role: RoleGuide }) {
    if (!role.itemBuilds || role.itemBuilds.length === 0) return null;

    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">아이템 빌드 추천</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {role.itemBuilds.map((build) => (
                    <div
                        key={build.id}
                        className="bg-slate-800/80 rounded-xl p-4 space-y-2"
                    >
                        <h3 className="text-lg font-semibold text-emerald-300">
                            {build.name}
                        </h3>
                        <p className="text-sm text-slate-300">{build.description}</p>

                        <div>
                            <h4 className="text-xs font-semibold text-sky-300 mt-2 mb-1">
                                핵심 아이템
                            </h4>
                            <ul className="space-y-1 text-sm">
                                {build.coreItems.map((item) => (
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

                        {build.situationalItems && build.situationalItems.length > 0 && (
                            <div>
                                <h4 className="text-xs font-semibold text-purple-300 mt-2 mb-1">
                                    상황 아이템
                                </h4>
                                <ul className="space-y-1 text-sm">
                                    {build.situationalItems.map((item) => (
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

                        {build.notes && (
                            <p className="text-xs text-slate-400 pt-1">{build.notes}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
/* ---------------- 텍스트 강조 함수 ---------------- */

function highlightTipText(text: string) {
  // '...' 또는 {...} 기준으로 split
  const parts = text.split(/('.*?'|\{.*?\})/g);

  return parts.map((part, index) => {
    // '...' → 에메랄드색
    if (part.startsWith("'") && part.endsWith("'")) {
      return (
        <span key={index} className="text-emerald-300 font-semibold">
          {part.replace(/'/g, "")}
        </span>
      );
    }

    // {...} → 파란색
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span key={index} className="text-sky-300 font-semibold">
          {part.replace(/\{|\}/g, "")}
        </span>
      );
    }

    // 기본 텍스트
    return <span key={index}>{part}</span>;
  });
}

/* ---------------- 추가 코멘트 ---------------- */

function RoleExtraTips({ role }: { role: RoleGuide }) {
  if (!role.extraTips || role.extraTips.length === 0) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">추가 코멘트</h2>
      <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
        {role.extraTips.map((tip, index) => (
          <li key={index}>{highlightTipText(tip)}</li>
        ))}
      </ol>
    </section>
  );
}