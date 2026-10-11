"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast"; // <-- পরিবর্তন করা হলো

export default function ProfilePage() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
          setTimeout(() => {
            // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক রাউটটি দিন (যেমন: /Signin অথবা /signin)
            window.location.href = "/Signin";
          }, 1000);
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              আমার প্রোফাইল
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>
          <Link
            href="/profile/update"
            className="rounded-xl bg-[#009245] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#007a39]"
          >
            প্রোফাইল আপডেট করুন
          </Link>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#009245] text-base font-bold text-white">
                  {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                {session?.user?.name || "লোড হচ্ছে..."}
              </h2>
              <p className="text-xs text-gray-500 truncate max-w-[200px]">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            <span>↪</span> সাইন আউট
          </button>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
