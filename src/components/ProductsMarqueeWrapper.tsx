import { Suspense } from "react";
import ProductsMarquee from "./Marquee";

export default function ProductsMarqueeWrapper() {
  return (
    <Suspense
      fallback={
        <div className="h-10 animate-pulse border-y border-gray-100 bg-gray-50" />
      }
    >
      <ProductsMarquee />
    </Suspense>
  );
}
