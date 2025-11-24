// app/lib/champions.ts
import championsJson from "../data/champions.json";

const DDRAGON_VERSION = "15.23.1"; // 아까 확인한 최신 버전

export type ChampionSummary = {
  id: string;       // "Aatrox"
  name: string;     // "아트록스"
  title: string;    // "다르킨의 검"
  imageUrl: string; // 아이콘 URL
};

export function getAllChampions(): ChampionSummary[] {
  const data = (championsJson as any).data;

  return Object.keys(data).map((key) => {
    const c = data[key];
    return {
      id: c.id,
      name: c.name,
      title: c.title,
      imageUrl: `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${c.image.full}`
    };
  });
}

export function getChampionById(id: string): ChampionSummary | null {
  const champs = getAllChampions();
  return champs.find((c) => c.id.toLowerCase() === id.toLowerCase()) ?? null;
}
