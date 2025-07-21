/* app/Authors/[slug]/page.jsx */
import prisma from "@/lib/prisma";
import AuthorProfilePageClient from "./AuthorProfilePageClient";

/* ---------- metadata ---------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await prisma.user.findUnique({
    where: { slug },
    include: { profile: true },
  });
  return author
    ? { title: `${author.name} – SpeedyNews` }
    : { title: "Author not found" };
}

/* ---------- page ---------- */
export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await prisma.user.findUnique({
    where: { slug },
    include: { profile: true },
  });
  if (!author) return <div>Author not found</div>;

  /* articles & popular articles */
  const articles = await prisma.post.findMany({
    where: { authorId: author.id },
    orderBy: { createdAt: "desc" },
    take: 12,
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      excerpt: true,
      createdAt: true,
      viewCount: true,
      categories: { select: { name: true }, take: 1 },
    },
  });

  const popularArticles = [...articles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 4);

  const totalViews =
    (
      await prisma.post.aggregate({
        where: { authorId: author.id },
        _sum: { viewCount: true },
      })
    )._sum.viewCount ?? 0;

  return (
    <AuthorProfilePageClient
      author={{
        name: author.name ?? "Unknown",
        role: author.profile?.headline ?? "Writer",
        bio: author.profile?.bio ?? "",
        social: {
          twitter: author.profile?.twitter ?? "",
          linkedin: author.profile?.linkedin ?? "",
          email: author.email,
        },
        joinDate: author.createdAt,
        stats: {
          articles: await prisma.post.count({ where: { authorId: author.id } }),
          followers: author.profile?.followersCount ?? 0,
          views: totalViews,
        },
        avatar: author.profile?.avatar ?? null,
        specialties: author.profile?.specialties ?? [],
      }}
      articles={articles}
      popularArticles={popularArticles}
    />
  );
}