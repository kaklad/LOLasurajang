// app/components/ChampionCard.tsx
"use client";

import Link from "next/link";
import type { ChampionSummary } from "../lib/champions";

export default function ChampionCard({ champ }: { champ: ChampionSummary }) {
  return (
    <Link
      href={`/champion/${champ.id}`}
      className="flex flex-col items-center p-3 rounded-xl bg-slate-800/70 hover:bg-slate-700 transition"
    >
      <img
        src={champ.imageUrl}
        alt={champ.name}
        className="w-20 h-20 rounded-lg mb-2"
      />
      <div className="text-sm font-semibold text-slate-50 text-center">
        {champ.name}
      </div>
      <div className="text-xs text-slate-400">{champ.title}</div>
    </Link>
  );
}
