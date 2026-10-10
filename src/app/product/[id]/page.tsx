import ProductDetailClient from "./ProductDetailClient";

export const instant = false;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailClient productId={id} />;
}
