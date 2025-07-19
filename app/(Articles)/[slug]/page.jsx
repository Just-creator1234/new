// app/articles/[slug]/page.js
import { getArticlePage } from '@/app/actions/article';
import ArticlePageClient from './ArticlePageClient'; // your client component

export default async function ArticlePage({ params }) {
  const data = await getArticlePage(params.slug);
  return <ArticlePageClient article={data.post} relatedArticles={data.relatedArticles} />;
}