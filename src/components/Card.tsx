"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat" | string;
    pct: number;
  };
  markets?: Market[];
}

interface ProductCardProps {
  product: Product;
}

export default function Card({ product }: ProductCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { id, nameBn, unit, image, today, change } = product;

  const unitBn =
    unit === "kg"
      ? "কেজি"
      : unit === "litre"
        ? "লিটার"
        : unit === "dozen"
          ? "ডজন"
          : unit === "piece"
            ? "টি"
            : unit;

  const formatBn = (num: number) => num.toLocaleString("bn-BD");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/Signin");
    } else {
      router.push(`/product/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-100 bg-[#fafcfb] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eff3f0] text-2xl">
          {image}
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-[#009245]">
            {nameBn}
          </h3>
          <span className="mt-0.5 text-xs text-gray-500">প্রতি {unitBn}</span>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <span className="block text-xs text-gray-400">আজকের দাম</span>
          <div className="mt-0.5 flex items-baseline gap-1 text-xl font-extrabold text-gray-900">
            <span>{formatBn(today)}</span>
            <span className="text-sm font-bold">টাকা</span>
          </div>
        </div>

        <div>
          {change.dir === "up" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf2f2] px-3 py-1 text-xs font-bold text-[#d9383a]">
              <span className="text-[9px]">▲</span>
              <span>{formatBn(Math.abs(change.pct))}%</span>
            </span>
          )}

          {change.dir === "down" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#edf7f2] px-3 py-1 text-xs font-bold text-[#009245]">
              <span className="text-[9px]">▼</span>
              <span>{formatBn(Math.abs(change.pct))}%</span>
            </span>
          )}

          {change.dir === "flat" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
              <span>—</span>
              <span>০.০%</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
