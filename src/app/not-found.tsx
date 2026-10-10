import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-extrabold text-[#009245]">৪০৪</h1>
        <h2 className="text-2xl font-bold text-gray-900">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500">
          আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা এর ঠিকানা ভুল রয়েছে।
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block rounded-xl bg-[#009245] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007a39]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
