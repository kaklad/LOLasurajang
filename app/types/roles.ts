// app/types/roles.ts

export type RoleId =
  | "adc"        
  | "support"
  | "fighter"
  | "mage"
  | "assassin"
  | "tank";

export type AugmentTier = "S" | "A" | "B" | "C";

export type AugmentRarity = "silver" | "gold" | "prism";

export interface RoleGuide {
  id: RoleId;
  slug: string;
  nameKo: string;
  nameEn: string;
  shortLabel?: string;
  color?: string;
  summary: string;
  description: string;
  exampleChampions: string[];
  tags?: string[];
  sections: RoleSection[];
  augmentGroups: RoleAugmentGroup[];
  itemBuilds?: RoleItemBuild[];
  extraTips?: string[];
}
export interface RoleSection {
  id: string;
  title: string;
  body: string;
}

export interface RoleAugmentGroup {
  id: string;
  title: string;
  description?: string;
  augments: RoleAugmentRef[];
}

export interface RoleAugmentRef {
  augmentId: string;
  name: string;
  tier: "S" | "A" | "B" | "C";
  rarity?: AugmentRarity;
  reason?: string;
  tags?: string[];
}
export interface RoleItemBuild {
  id: string;         // "onhit", "crit" 같은 내부 ID
  name: string;       // "몰락+구인수 극공속 빌드"
  description: string;
  coreItems: { name: string; note?: string }[];
  situationalItems?: { name: string; note?: string }[];
  notes?: string;     // 전체적인 코멘트
}