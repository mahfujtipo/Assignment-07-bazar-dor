"use client";

import React, { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/Card";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error(`HTTP Error Status: ${res.status}`);
        }

        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.products || [];

        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("পণ্য লোড করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const numberBn = (number: number) =>
    new Intl.NumberFormat("bn-BD").format(number);

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const renderProducts = (items: Product[]) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((product) => (
        <ProductCard key={product.id || product.slug} product={product} />
      ))}
    </div>
  );

  const renderLoading = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-gray-100"
        />
      ))}
    </div>
  );

  return (
    <section
      id="products"
      className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 lg:px-8"
    >
      {loading && renderLoading()}

      {error && !loading && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div>
            <div className="mb-6 flex items-center gap-2">
              <FaCaretUp className="h-7 w-7 shrink-0 text-red-600" />
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  আজ দাম বেড়েছে
                </h2>
              </div>
            </div>

            {increasedProducts.length > 0 ? (
              renderProducts(increasedProducts)
            ) : (
              <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
                দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
              </p>
            )}
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <FaCaretDown className="h-7 w-7 shrink-0 text-green-600" />
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  আজ দাম কমেছে
                </h2>
              </div>
            </div>

            {decreasedProducts.length > 0 ? (
              renderProducts(decreasedProducts)
            ) : (
              <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
                দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
              </p>
            )}
          </div>

          <div id="all-products" className="scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                সব পণ্য
              </h2>
              <p className="mt-1.5 text-sm text-gray-500">
                মোট {numberBn(products.length)} টি পণ্য দেখানো হচ্ছে
              </p>
            </div>

            {products.length > 0 ? (
              renderProducts(products)
            ) : (
              <p className="rounded-xl bg-white p-5 text-center text-sm text-gray-500">
                কোনো পণ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
