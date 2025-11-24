// data/types.ts
export type SynergyTier = "S" | "A" | "B" | "C";

export type Role =
  | "top"
  | "jungle"
  | "mid"
  | "adc"
  | "support"
  | "fighter"
  | "assassin"
  | "mage"
  | "tank"
  | "marksman";

export type AugmentCategory = "공격" | "생존" | "유틸" | "기타";

export type Rarity = "silver" | "gold" | "prismatic";

export type AugmentRarity = "silver" | "gold" | "prism";

export interface Augment {
  augmentId: string;
  name: string;
  tier: "S" | "A" | "B" | "C";
  rarity?: AugmentRarity;   // 👈 여기 추가
  reason?: string;
  tags?: string[];
}

export interface ItemRef {
  id: number | string;        // Riot item ID or custom string
  name: string;
  note?: string;
}

export interface ChampionBuild {
  id: string;                 // "ad", "ap", "tank" 등 내부 구분용
  name: string;               // "AD 브루저", "AP 폭딜" 같은 표시용
  position?: Role[];          // 이 빌드가 주로 쓰이는 포지션/역할
  conditions?: string;        // "상대 탱커 많을 때" 같은 설명

  augments: {
    augmentId: string;        // Augment.id 참조
    tier: SynergyTier;
    note?: string;            // 왜 좋은지 코멘트
    tags?: string[];          // "초반강함", "한타" 등
  }[];

  items: {
    starter?: ItemRef[];      // 시작템
    boots?: ItemRef[];        // 신발
    core: ItemRef[];          // 핵심 아이템
    situational?: ItemRef[];  // 상황 아이템
  };
}

export interface ChampionRecommendation {
  championId: string;        // Riot 챔피언 ID ex: "Aatrox"
  patch: string;             // "15.23" 같은 기준 패치
  notes?: string;            // 이 챔피언 전체에 대한 한줄 메모
  builds: ChampionBuild[];
}

export interface ChampionRecommendationsFile {
  updatedAt: string;         // ISO 날짜 문자열
  mode: "aram-asurajang";    // 혹은 나중에 다른 모드도 추가 가능
  champions: ChampionRecommendation[];
}
