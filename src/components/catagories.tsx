import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default async function Catagories() {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await response.json();

  return (
    <div className="border-t border-gray-200 bg-white">
      {" "}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {" "}
        <div className="flex items-center gap-5 overflow-x-auto py-1.5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 py-1 text-sm font-medium text-gray-700 transition hover:text-[#009245]"
            >
              {" "}
              <span>{category.icon}</span>{" "}
              <span className="whitespace-nowrap">{category.nameBn}</span>{" "}
            </Link>
          ))}{" "}
        </div>{" "}
      </nav>{" "}
    </div>
  );
}
