import type { Metadata } from "next";
import Image from "next/image";
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
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      images: item.coverImage ? [{ url: item.coverImage }] : undefined,
    },
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

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[12px] text-ink-dim">
          {item.category}
        </span>
        <span>{item.date}</span>
        <span className="h-1 w-1 rounded-full bg-ink-faint" />
        <span>{item.source}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {item.title}
      </h1>
      <p className="mt-5 text-[16px] leading-8 text-ink-dim">{item.summary}</p>

      {item.coverImage && (
        <div className="relative mt-8 aspect-[1280/544] overflow-hidden rounded-2xl bg-surface-2">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8">
        {item.blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="mt-12 text-2xl font-semibold tracking-tight text-ink md:text-[28px]"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="mt-6 border-l-2 border-accent pl-5 text-[18px] font-medium leading-8 text-ink"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.type === "image") {
            return (
              <figure key={index} className="mt-8">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width ?? 1080}
                  height={block.height ?? 720}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full rounded-2xl"
                />
                {block.caption && (
                  <figcaption className="mt-3 text-center text-[12px] leading-5 text-ink-faint">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          return (
            <p
              key={index}
              className="mt-5 text-[16px] leading-8 text-ink-dim"
            >
              {block.text}
            </p>
          );
        })}
      </div>

      {item.externalUrl && (
        <div className="mt-12 border-t border-line-soft pt-6">
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-accent hover:underline"
          >
            查看公众号原文 →
          </a>
        </div>
      )}
    </article>
  );
}
