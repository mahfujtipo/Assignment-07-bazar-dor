import React from "react";
import HeroSection from "@/components/Herosection";
import ProductGrid from "@/components/ProductGrid";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <HeroSection />
      <ProductGrid />
    </main>
  );
}
