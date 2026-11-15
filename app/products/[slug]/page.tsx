import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { versions } from "@/content/versions";
import { LinkButton, PlaceholderBadge, VideoSlot } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return versions.map((version) => ({ slug: version.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const version = versions.find((v) => v.slug === slug);
  if (!version) return {};
  return {
    title: version.name,
    description: version.description,
  };
}

export default async function VersionPage({ params }: Props) {
  const { slug } = await params;
  const version = versions.find((v) => v.slug === slug);
  if (!version) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <Link
        href="/"
        className="text-[13px] text-ink-dim transition-colors hover:text-ink"
      >
        ← 返回首页
      </Link>
      <div className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-ink-dim">版本</span>
          {version.features.includes("待补充") && <PlaceholderBadge />}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          {version.name}
        </h1>
        <p className="mt-3 text-lg text-accent">{version.tagline}</p>
        <p className="mt-6 text-[15px] leading-8 text-ink-dim">
          {version.description}
        </p>
      </div>

      <div className="mt-10 grid gap-5 rounded-[14px] border border-line bg-surface p-6 md:grid-cols-3">
        {version.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="text-sm text-ink-dim">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-ink">宣传视频</h2>
        <p className="mt-2 text-sm text-ink-dim">
          3 个宣传视频，成品到位后替换。
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {version.videos.map((video) => (
            <VideoSlot key={video.title} title={video.title} note={video.note} />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[14px] border border-line bg-surface p-6">
        <h2 className="text-xl font-semibold text-ink">使用入口</h2>
        <p className="mt-2 text-sm text-ink-dim">{version.access.note}</p>
        <div className="mt-5">
          {version.access.type === "none" ? (
            <LinkButton href="/" variant="ghost">
              返回首页
            </LinkButton>
          ) : (
            <LinkButton
              href={version.access.url ?? "#"}
              variant="primary"
              disabled={!version.access.url}
            >
              {version.access.label}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}
