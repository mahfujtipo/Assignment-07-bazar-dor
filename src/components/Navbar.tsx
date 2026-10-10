"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useSyncExternalStore } from "react";
import Catagories from "@/components/catagories";
import { useSession, signOut } from "@/lib/auth-client";

const getBengaliDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const getServerDate = () => "";
const subscribe = () => () => {};

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const bengaliDate = useSyncExternalStore(
    subscribe,
    getBengaliDate,
    getServerDate,
  );

  const { data: session } = useSession();

  return (
    <header className="relative z-50 w-full border-b border-gray-200/80 bg-white/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 cursor-pointer items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009245] p-1.5 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:p-2">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <h1 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>
            <span className="text-[10px] text-gray-500 sm:text-xs">
              {bengaliDate}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-3 sm:flex">
          {session?.user ? (
            <details className="group relative z-[100]">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition [&::-webkit-details-marker]:hidden">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#009245] text-sm font-bold text-white">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <span className="text-base font-semibold text-gray-800">
                  {session.user.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="absolute right-0 top-[calc(100%+10px)] z-[999] w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-900/15">
                <div className="border-b border-gray-100 pb-3 mb-2">
                  <p className="text-base font-bold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#009245]"
                >
                  <span className="text-base">👤</span> আমার প্রোফাইল
                </Link>

                <button
                  onClick={async () => {
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          window.location.href = "/Signin";
                        },
                      },
                    });
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <span className="text-base">↪</span> সাইন আউট
                </button>
              </div>
            </details>
          ) : (
            <>
              <Link
                href="/Signin"
                className="cursor-pointer rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-[#009245] hover:bg-green-50 hover:text-[#009245]"
              >
                সাইন ইন
              </Link>
              <Link
                href="/Signup"
                className="cursor-pointer rounded-xl bg-[#009245] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#007a39]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Categories Bar */}
      <Suspense fallback={null}>
        <Catagories />
      </Suspense>

      {/* Marquee Ticker comes here from layout.tsx children */}
      {children}
    </header>
  );
}
