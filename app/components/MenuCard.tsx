// app/components/MenuCard.tsx
"use client";

import Link from "next/link";

interface MenuCardProps {
  href: string;
  title: string;
  description: string;
}

export default function MenuCard({ href, title, description }: MenuCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-emerald-400/60 transition transform hover:-translate-y-1"
    >
      <div>
        <h2 className="text-xl font-bold mb-2 group-hover:text-emerald-300">
          {title}
        </h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <span className="mt-4 text-xs text-emerald-300 group-hover:translate-x-1 transition">
        자세히 보기 →
      </span>
    </Link>
  );
}
