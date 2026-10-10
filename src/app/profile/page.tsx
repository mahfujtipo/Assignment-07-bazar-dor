"use client";

import Image from "next/image";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newName = data.name as string;

    if (!newName.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
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
            toast.success("প্রোফাইল নাম সফলভাবে আপডেট হয়েছে!");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে।");
          },
        },
      );
    } catch (err) {
      console.error(err);
      toast.error("কোথাও কোনো সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6">
      {/* টোস্ট নোটিফিকেশন এখন স্ক্রিনের ঠিক মাঝখানে দেখাবে */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="mx-auto max-w-xl">
        <div className="mb-6">
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm">
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
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/Signin";
                  },
                },
              });
            }}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            <span>↪</span> সাইন আউট
          </button>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">তথ্য</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                নাম
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 outline-none transition focus:border-[#009245] focus:ring-1 focus:ring-[#009245]/20"
                placeholder="আপনার নাম লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-[#009245] py-2.5 text-center text-xs font-semibold text-white shadow-sm transition hover:bg-[#007a39] disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
