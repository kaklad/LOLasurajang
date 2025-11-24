// app/lib/recommendations.ts
import data from "../data/champion-recommendations.json";

export type AugmentTier = "S" | "A" | "B" | "C";

export interface ChampionBuild {
  id: string;
  name: string;
  conditions?: string;
  augments: {
    name: string;
    tier: AugmentTier;
    note?: string;
  }[];
  items: {
    core: { name: string; note?: string }[];
    situational?: { name: string; note?: string }[];
  };
}

export interface ChampionRecommendation {
  championId: string;
  patch: string;
  notes?: string;
  builds: ChampionBuild[];
}

const recFile = data as unknown as {
  mode: string;
  updatedAt: string;
  champions: ChampionRecommendation[];
};

export function getRecommendationByChampionId(
  championId: string
): ChampionRecommendation | null {
  return (
    recFile.champions.find(
      (c) => c.championId.toLowerCase() === championId.toLowerCase()
    ) ?? null
  );
}
