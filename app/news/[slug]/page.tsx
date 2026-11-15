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

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] text-ink-faint">
        <span className="border border-line px-2 py-0.5 text-ink-dim">
          {item.category}
        </span>
        <span>{item.date}</span>
        <span>{item.source}</span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-[52px]">
        {item.title}
      </h1>
      <p className="mt-5 text-[16px] leading-8 text-ink-dim">{item.summary}</p>

      {item.coverImage && (
        <div className="relative mt-8 aspect-[1280/544] overflow-hidden border border-line bg-surface-2">
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
                className="mt-12 font-display text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={index}
                className="mt-6 border-l border-accent pl-5 font-display text-[22px] font-medium leading-8 text-ink"
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
                  className="h-auto w-full border border-line"
                />
                {block.caption && (
                  <figcaption className="mt-3 font-mono text-[10px] leading-5 text-ink-faint">
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
            className="text-[12px] text-ink-dim underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            查看公众号原文
          </a>
        </div>
      )}
    </article>
  );
}
