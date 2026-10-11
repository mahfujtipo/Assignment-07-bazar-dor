"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

interface Category {
  id: string;

  slug: string;

  nameBn: string;

  icon: string;
}

export default function Catagories() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );

        if (response.ok) {
          const data = await response.json();

          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="border-t border-gray-100 bg-white py-2.5">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 no-scrollbar sm:px-6 lg:px-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 shrink-0 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 bg-white py-2.5">
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#009245] text-white shadow-sm"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#009245]"
                }`}
              >
                <span>{category.icon}</span>

                <span className="whitespace-nowrap">{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
