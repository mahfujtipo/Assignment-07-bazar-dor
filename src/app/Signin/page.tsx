"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Simulate Auth Request (Replace with actual Auth API e.g., NextAuth / Firebase)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Logged in with:", { email, password });
      router.push("/");
    } catch (err) {
      setError("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = (provider: "Google" | "GitHub") => {
    console.log(`Authenticating with ${provider}...`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f5f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
          <p className="mt-2 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl border border-gray-100 bg-[#fbfcfb] p-8 shadow-sm">
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                ইমেইল
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#009245] focus:outline-none focus:ring-1 focus:ring-[#009245]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#009245] focus:outline-none focus:ring-1 focus:ring-[#009245]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full cursor-pointer rounded-xl bg-[#009245] py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-[#007a39] active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#fbfcfb] px-3 text-gray-500">অথবা</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialAuth("Google")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth("GitHub")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <FaGithub className="h-5 w-5 text-gray-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/Signup"
              className="cursor-pointer font-semibold text-[#009245] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </div>
        </div>

        <div>
          <Link
            href="/"
            className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
