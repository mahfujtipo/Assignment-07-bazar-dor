import Link from "next/link";
import Marquee from "react-fast-marquee";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default async function ProductsMarquee() {
  let products: Product[] = [];

  const apiUrls = [
    "https://api.api-store.workers.dev/api/bazardor/products",
    "https://api.abcz.workers.dev/api/bazardor/products",
  ];

  for (const url of apiUrls) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(
          `Products API failed: ${url}`,
          response.status,
          response.statusText,
        );
        continue;
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        console.error("Products API returned an unexpected response:", data);
        continue;
      }

      products = data as Product[];
      break;
    } catch (error) {
      console.error(`Failed to fetch products from ${url}:`, error);
    }
  }

  const formatBn = (num: number) => num.toLocaleString("bn-BD");

  return (
    <div className="border-y border-gray-100 bg-gray-50 py-2">
      <Marquee speed={80} pauseOnHover gradient={false}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="mx-5 flex shrink-0 cursor-pointer items-center gap-2 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                {formatBn(product.today)} টাকা
                {product.unit === "kg"
                  ? "/কেজি"
                  : product.unit === "litre"
                    ? "/লিটার"
                    : product.unit === "dozen"
                      ? "/ডজন"
                      : ""}
              </span>

              {product.change?.dir === "up" && (
                <span className="flex items-center font-semibold text-red-600">
                  <FaCaretUp />
                  {formatBn(product.change.pct)}%
                </span>
              )}

              {product.change?.dir === "down" && (
                <span className="flex items-center font-semibold text-green-600">
                  <FaCaretDown />
                  {formatBn(Math.abs(product.change.pct))}%
                </span>
              )}
            </Link>
          ))
        ) : (
          <span className="mx-5 text-sm text-gray-500">
            এই মুহূর্তে পণ্যের দাম লোড করা যাচ্ছে না।
          </span>
        )}
      </Marquee>
    </div>
  );
}
