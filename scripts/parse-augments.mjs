// scripts/parse-augments.mjs
import fs from "fs";
import * as cheerio from "cheerio";

// CLI 인자로 넣으면 그걸 쓰고, 없으면 기본 경로 사용
const inputPath = process.argv[2] ?? "./data/augments_data.txt";
const outputPath = process.argv[3] ?? "./data/augments.json";

console.log(`Reading HTML from: ${inputPath}`);

const html = fs.readFileSync(inputPath, "utf8");
const $ = cheerio.load(html);

// 결과를 담을 배열
const augments = [];

$(".augment-card").each((_, el) => {
  const name = $(el).find(".augment-name").text().trim();

  // 설명에 들어 있는 이상한 공백/줄바꿈 정리
  let description = $(el).find(".augment-description").text();
  description = description.replace(/\s+/g, " ").trim();

  if (!name) return; // 이름 없는 카드면 스킵

  augments.push({
    name,
    description,
  });
});

fs.writeFileSync(outputPath, JSON.stringify(augments, null, 2), "utf8");
console.log(`Done! Extracted ${augments.length} augments → ${outputPath}`);
