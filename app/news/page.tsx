import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { news } from "@/content/news";
import { NewsCard, PlaceholderBadge, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "新闻动态",
  description: "玄知大模型新闻动态，同步 NSSLab-Xidian 公众号内容。",
};

export default function NewsPage() {
  const [featured, ...rest] = [...news].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <Section
      eyebrow="新闻"
      title="新闻动态"
      subtitle="同步玄知公众号，记录产品、研究与团队动态。"
      headingLevel="h1"
    >
      <Link
        href={`/news/${featured.slug}`}
        className="group grid gap-8 border-t border-line pt-6 md:grid-cols-[1.1fr_1fr] md:items-start"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-ink-faint">
            <span className="border border-line px-2 py-0.5 text-ink-dim">
              {featured.category}
            </span>
            <span>{featured.date}</span>
            <span>{featured.source}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-[44px]">
            {featured.title}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-ink-dim">
            {featured.summary}
          </p>
          <div className="mt-6 text-[12px] text-ink-dim underline decoration-line underline-offset-4 group-hover:text-ink">
            阅读全文
          </div>
        </div>

        {featured.coverImage && (
          <div className="relative aspect-[1280/544] overflow-hidden border border-line bg-surface-2">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </Link>

      {rest.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-[26px] font-semibold text-ink">更多动态</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 grid gap-6 border-t border-line pt-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-[24px] font-semibold text-ink">公众号同步</h2>
            <PlaceholderBadge />
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-ink-dim">
            新闻内容同步自玄知官方公众号 NSSLab-Xidian。公众号二维码与更新频率待补充，后续文章会持续更新到这里。
          </p>
        </div>
        <div className="flex h-32 w-32 flex-col items-center justify-center border border-line text-center">
          <span className="text-sm text-ink-dim">公众号二维码</span>
          <span className="mt-1 text-xs text-ink-faint">待补充</span>
        </div>
      </div>
    </Section>
  );
}
