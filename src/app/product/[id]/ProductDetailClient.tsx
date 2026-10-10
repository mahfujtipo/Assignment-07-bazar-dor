"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/components/Card";

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
        );

        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const formatBn = (num: number) => num.toLocaleString("bn-BD");

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-100" />
        <div className="mt-6 h-28 w-full animate-pulse rounded-2xl bg-gray-100" />
        <div className="mt-6 h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-gray-500">পণ্যটি খুঁজে পাওয়া যায়নি।</p>
        <Link
          href="/"
          className="mt-4 inline-block font-semibold text-[#009245] hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const {
    nameBn,
    category,
    categoryNameBn,
    unit,
    image,
    today,
    yesterday,
    change,
    markets = [],
  } = product;

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

  const priceDiff = Math.abs(today - yesterday);

  const marketMins = markets.map((m) => m.min).filter(Boolean);
  const marketMaxs = markets.map((m) => m.max).filter(Boolean);

  const lowestPrice = marketMins.length > 0 ? Math.min(...marketMins) : today;
  const highestPrice = marketMaxs.length > 0 ? Math.max(...marketMaxs) : today;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-800">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${category}`} className="hover:text-gray-800">
          {categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-900">{nameBn}</span>
      </nav>

      {/* Main Header Card */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#eff3f0] text-4xl">
            {image}
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{nameBn}</h1>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unitBn} • {categoryNameBn}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {change.dir === "up" &&
                `গতকালকের তুলনায় আজ দাম বেড়েছে - ${formatBn(priceDiff)} টাকা`}
              {change.dir === "down" &&
                `গতকালকের তুলনায় আজ দাম কমেছে - ${formatBn(priceDiff)} টাকা`}
              {change.dir === "flat" &&
                "গতকালকের তুলনায় আজ দাম অপরিবর্তিত রয়েছে"}
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-center sm:w-auto sm:min-w-[160px]">
          <span className="text-xs text-gray-400">আজকের দাম</span>

          <div className="mt-1 text-2xl font-black text-gray-900">
            {formatBn(today)}
          </div>

          <span className="text-xs text-gray-500">টাকা / {unitBn}</span>

          <div className="mt-2">
            {change.dir === "up" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf2f2] px-2.5 py-0.5 text-xs font-bold text-[#d9383a]">
                <span>▲</span>
                <span>{formatBn(Math.abs(change.pct))}%</span>
              </span>
            )}

            {change.dir === "down" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#edf7f2] px-2.5 py-0.5 text-xs font-bold text-[#009245]">
                <span>▼</span>
                <span>{formatBn(Math.abs(change.pct))}%</span>
              </span>
            )}

            {change.dir === "flat" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
                <span>— ০.০%</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Grid */}
      <div className="rounded-3xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <span className="text-xs text-gray-400">সর্বনিম্ন দাম</span>
            <div className="mt-1 text-xl font-bold text-[#009245]">
              {formatBn(lowestPrice)} টাকা
            </div>
            <span className="mt-1 block text-xs text-gray-500">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <span className="text-xs text-gray-400">সর্বোচ্চ দাম</span>
            <div className="mt-1 text-xl font-bold text-[#d9383a]">
              {formatBn(highestPrice)} টাকা
            </div>
            <span className="mt-1 block text-xs text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <span className="text-xs text-gray-400">গড় দাম</span>
            <div className="mt-1 text-xl font-bold text-gray-900">
              {formatBn(today)} টাকা
            </div>
            <span className="mt-1 block text-xs text-gray-500">
              প্রতি {unitBn}-এর হিসাব
            </span>
          </div>
        </div>
      </div>

      {/* Markets Table */}
      <div className="rounded-3xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3">সর্বনিম্ন</th>
                  <th className="px-4 py-3">সর্বোচ্চ</th>
                  <th className="px-4 py-3">গড়</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {markets.map((m, idx) => {
                  const avg = Math.round((m.min + m.max) / 2);

                  return (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-bold text-gray-900">
                        {m.market}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{m.division}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {formatBn(m.min)} টাকা
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {formatBn(m.max)} টাকা
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900">
                        {formatBn(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            বাজার ভিত্তিক দামের তথ্য যুক্ত করা হয়নি।
          </p>
        )}
      </div>
    </div>
  );
}
