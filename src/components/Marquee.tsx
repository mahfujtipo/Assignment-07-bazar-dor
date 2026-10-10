"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Product } from "@/components/Card";

export default function ProductsMarquee() {
  const router = useRouter();
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarqueeData() {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
        );
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.products || [];
          setProducts(list);
        }
      } catch (err) {
        console.error("Marquee fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMarqueeData();
  }, []);

  const handleClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    if (!session) {
      router.push("/Signin");
    } else {
      router.push(`/product/${id}`);
    }
  };

  if (loading || products.length === 0) {
    return (
      <div className="h-10 w-full animate-pulse border-y border-gray-200 bg-[#f4f7f4]" />
    );
  }

  const numberBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

  const getUnitBn = (unit: string) => {
    switch (unit) {
      case "kg":
        return "কেজি";
      case "litre":
        return "লিটার";
      case "dozen":
        return "ডজন";
      case "piece":
        return "টি";
      default:
        return unit;
    }
  };

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-[#f4f7f4] py-2.5 shadow-xs">
      <Marquee speed={70} pauseOnHover={true} gradient={false}>
        <div className="flex w-max items-center gap-12 px-4 text-xs font-medium sm:text-sm">
          {products.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            return (
              <div
                key={product.id || product.slug}
                onClick={(e) => handleClick(e, product.id)}
                className="flex shrink-0 cursor-pointer items-center gap-2 text-gray-800 transition hover:opacity-80"
              >
                <span className="text-base">{product.image}</span>
                <span className="font-bold text-gray-900">
                  {product.nameBn}
                </span>

                <span className="text-gray-600">
                  {numberBn(product.today)} টাকা/{getUnitBn(product.unit)}
                </span>

                {isUp && (
                  <span className="flex items-center gap-0.5 font-bold text-red-600">
                    <span>▲</span>
                    <span>{numberBn(Math.abs(product.change.pct))}%</span>
                  </span>
                )}

                {isDown && (
                  <span className="flex items-center gap-0.5 font-bold text-[#009245]">
                    <span>▼</span>
                    <span>{numberBn(Math.abs(product.change.pct))}%</span>
                  </span>
                )}

                {!isUp && !isDown && (
                  <span className="text-gray-400">— ০.০%</span>
                )}

                <span className="ml-6 text-gray-300">|</span>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
}
