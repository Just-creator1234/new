// app/(Authors)/[slug]/page.jsx
import { getAuthorProfile } from "@/app/actions/author";
import AuthorProfilePageClient from "./AuthorProfilePageClient";

export default async function AuthorPage({ params }) {
  const { slug } = await params; // Next 15
  const data = await getAuthorProfile(slug);
  return <AuthorProfilePageClient {...data} />;
}