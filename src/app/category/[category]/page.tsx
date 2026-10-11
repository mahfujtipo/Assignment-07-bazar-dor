import CategoryProducts from "./CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  return <CategoryProducts categorySlug={category} />;
}
