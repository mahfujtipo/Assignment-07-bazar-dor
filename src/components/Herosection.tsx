"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setFormattedDate(new Intl.DateTimeFormat("bn-BD", options).format(new Date()));
  }, []);

  return (
    <section className="mx-auto mb-4 w-full max-w-7xl px-3 sm:mb-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#f4f7f4] p-5 sm:rounded-3xl sm:p-8 md:p-10 lg:p-14">
        <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <div className="flex w-full min-w-0 flex-1 flex-col items-start space-y-4 text-left sm:space-y-5">
            <div className="inline-flex min-h-[32px] max-w-full items-center rounded-full bg-[#e2ebe2] px-3 py-1.5 text-xs font-semibold text-[#009245] sm:px-4 sm:text-sm">
              {formattedDate}
            </div>

            <h1 className="text-2xl font-extrabold leading-snug break-words text-gray-900 sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="w-full max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="w-full pt-1 sm:w-auto sm:pt-2">
              <Link
                href="/products"
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#009245] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#007a39] active:scale-95 sm:w-auto sm:px-6 sm:text-base"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-1 justify-center md:justify-end">
            <div className="relative h-44 w-44 shrink-0 sm:h-56 sm:w-56 md:h-60 md:w-60 lg:h-72 lg:w-72">
              <Image
                src="/bazar-hero.png"
                alt="আজকের বাজার দর হিরো ব্যানার"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 240px, 288px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}