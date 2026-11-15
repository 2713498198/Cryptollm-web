import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "@/content/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.body[0],
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/news"
        className="text-[13px] text-ink-dim transition-colors hover:text-ink"
      >
        ← 返回新闻动态
      </Link>
      <div className="mt-6 flex items-center gap-3 text-sm text-ink-faint">
        <span>{item.date}</span>
        <span className="h-1 w-1 rounded-full bg-ink-faint" />
        <span>{item.source}</span>
      </div>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {item.title}
      </h1>
      <div className="mt-8 space-y-6">
        {item.body.map((paragraph, index) => (
          <p key={index} className="text-base leading-8 text-ink-dim">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
