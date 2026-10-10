"use client";

import React, { Suspense, use, useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/Card";

function CategoryPageContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`,
        );
        if (res.ok) {
          const data = await res.json();
          const productList = Array.isArray(data) ? data : data.products || [];
          setProducts(productList);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  const numberBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") return a.today - b.today;
    if (sortBy === "high-to-low") return b.today - a.today;
    return 0;
  });

  const categoryTitle = products[0]?.categoryNameBn || categorySlug;
  const categoryIcon = products[0]?.categoryIcon || "🍚";

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-100" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f5f3] text-4xl">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {numberBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-[#fbfcfb] p-4 shadow-sm">
        <div className="text-sm font-semibold text-gray-700"></div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">সাজান</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#009245]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম থেকে বেশি দাম</option>
            <option value="high-to-low">বেশি থেকে কম দাম</option>
          </select>
        </div>
      </div>

      <div className="my-4 text-xs text-gray-500">
        মোট {numberBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-100" />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        </div>
      }
    >
      <CategoryPageContent params={params} />
    </Suspense>
  );
}
