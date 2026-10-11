"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast"; // <-- পরিবর্তন করা হলো
import { signIn } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Controlled states for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "সাইন ইন করতে সমস্যা হয়েছে।");
        // ভুল হলে পাসওয়ার্ড ফিল্ড খালি করে দেওয়া হবে
        setPassword("");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে! 🎉");

        // সফলভাবে সাইন-ইন হলে ফিল্ডগুলো পরিষ্কার করে দেওয়া হবে
        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
      console.error("Signin catch error:", err);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err: any) {
      toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
      console.error("Social signin error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f5f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            সাইন ইন করুন
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে সাইন ইন করুন।
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-[#fbfcfb] p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="new-email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#009245] focus:outline-none focus:ring-1 focus:ring-[#009245]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#009245] focus:outline-none focus:ring-1 focus:ring-[#009245]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-xl bg-[#009245] py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-[#007a39] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "প্রসেসিং হচ্ছে..." : "সাইন ইন"}
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
              onClick={() => handleSocialSignIn("google")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-[#333] hover:bg-gray-50"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-semibold text-[#333] hover:bg-gray-50"
            >
              <FaGithub className="h-5 w-5 text-gray-900" />
              <span>GitHub দিয়ে চালিয়ে যান</span>
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
