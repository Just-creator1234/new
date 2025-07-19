import CategoryClient from "./CategoryClient";

// Next 15 – always async for route files
export default async function CategoryPage({ params }) {
  const { slug } = await params;          
  return <CategoryClient slug={slug} />;   
}