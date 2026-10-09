import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const bengaliDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      {" "}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {" "}
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {" "}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009245] p-1.5 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:p-2">
            {" "}
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />{" "}
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
        <nav className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-[#009245] hover:bg-green-50 hover:text-[#009245]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#009245] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#007a39] hover:shadow-md"
          >
            সাইন আপ
          </Link>
        </nav>
        <details className="group relative sm:hidden">
          <summary
            aria-label="মেনু খুলুন বা বন্ধ করুন"
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition duration-200 hover:border-[#009245]/40 hover:bg-green-50 [&::-webkit-details-marker]:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6 transition-transform duration-200 group-open:rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>

          <div className="invisible absolute right-0 top-[calc(100%+8px)] flex w-fit translate-y-2 flex-col items-start gap-2 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl shadow-gray-900/10 transition-all duration-200 group-open:visible group-open:translate-y-0 group-open:opacity-100">
            <Link
              href="/login"
              className="w-fit whitespace-nowrap rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#009245] hover:bg-green-50 hover:text-[#009245]"
            >
              সাইন ইন
            </Link>

            <Link
              href="/register"
              className="w-fit whitespace-nowrap rounded-lg bg-[#009245] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007a39]"
            >
              সাইন আপ
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
