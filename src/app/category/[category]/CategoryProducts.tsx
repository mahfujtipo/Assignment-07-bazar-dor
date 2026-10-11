"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard, { Product } from "@/components/Card";

export default function CategoryProducts({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadedCategory, setLoadedCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategoryProducts() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categorySlug)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch category products");
        }

        const data = await res.json();

        let productList: Product[] = [];

        if (Array.isArray(data)) {
          productList = data;
        } else if (Array.isArray(data.products)) {
          productList = data.products;
        } else if (Array.isArray(data.data)) {
          productList = data.data;
        }

        setProducts(productList);
        setLoadedCategory(categorySlug);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Failed to fetch category products:", err);
        setProducts([]);
        setError(true);
        setLoadedCategory(categorySlug);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCategoryProducts();

    return () => {
      controller.abort();
    };
  }, [categorySlug]);

  const numberBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

  const isLoading = loading || loadedCategory !== categorySlug;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") return a.today - b.today;
    if (sortBy === "high-to-low") return b.today - a.today;
    return 0;
  });

  const categoryTitle = products[0]?.categoryNameBn || categorySlug;
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fbfcfb] p-6 shadow-sm">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gray-200" />

            <div className="flex-1 space-y-3">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-[#fbfcfb] p-4 shadow-sm">
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="h-10 w-44 rounded-xl bg-gray-200" />
          </div>

          <div className="my-4 h-4 w-36 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="h-36 rounded-xl bg-gray-200" />

                <div className="mt-4 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-6 w-2/5 rounded bg-gray-200" />
                  <div className="h-10 rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-5xl">⚠️</div>

        <h2 className="text-2xl font-extrabold text-gray-900">
          পণ্য লোড করা যায়নি
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>

        <button
          onClick={() => {
            setLoadedCategory("");
            setLoading(true);
            setError(false);
          }}
          className="mt-6 rounded-xl bg-[#009245] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#007a39]"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 text-6xl">🔍</div>

        <h2 className="text-2xl font-extrabold text-gray-900">
          কোনো পণ্য পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই অথবা লিংকটি সঠিক
          নয়।
        </p>

        <Link
          href="/"
          className="mt-6 cursor-pointer rounded-xl bg-[#009245] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#007a39]"
        >
          হোম পেজে ফিরে যান
        </Link>
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
        <div className="text-sm font-semibold text-gray-700">সাজান:</div>

        <div className="relative flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-8 text-xs font-semibold text-gray-700 outline-none transition focus:border-[#009245]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>

          <div className="pointer-events-none absolute right-3 text-xs text-gray-500">
            ▼
          </div>
        </div>
      </div>

      <div className="my-4 text-xs text-gray-500">
        মোট {numberBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
