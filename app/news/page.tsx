import type { Metadata } from "next";
import { news } from "@/content/news";
import { NewsCard, PlaceholderBadge, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "新闻中心",
  description: "玄知大模型新闻动态，同步公众号内容。",
};

export default function NewsPage() {
  return (
    <Section
      eyebrow="新闻中心"
      title="新闻"
      subtitle="同步公众号新闻。"
      headingLevel="h1"
    >
      <div className="mb-6 rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-ink">公众号同步</h2>
          <PlaceholderBadge />
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-dim">
          新闻内容同步自玄知官方公众号。公众号二维码与同步频率待补充，届时将在此展示公众号入口。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
