"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast"; // <-- পরিবর্তন করা হলো

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const currentName = session.user.name ?? "";

      setName(currentName);
      setOriginalName(currentName.trim());
    }
  }, [session?.user?.name]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    if (newName === originalName) {
      toast("আপনি আপনার নাম পরিবর্তন করেননি!"); // ইনফো বা সাধারণ টোস্টের জন্য
      return;
    }

    try {
      setLoading(true);

      await authClient.updateUser(
        {
          name: newName,
        },
        {
          onSuccess: () => {
            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉");

            setTimeout(() => {
              router.push("/profile");
              router.refresh();
            }, 1000);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে।");
          },
        },
      );
    } catch (err) {
      console.error(err);
      toast.error("কোথাও কোনো সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              তথ্য আপডেট করুন
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            প্রোফাইলে ফিরে যান
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                নাম
              </label>

              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#009245] focus:ring-1 focus:ring-[#009245]"
                placeholder="আপনার নাম লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || isPending || !session?.user}
              className="w-full cursor-pointer rounded-xl bg-[#009245] py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#007a39] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
