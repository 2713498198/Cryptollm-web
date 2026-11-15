import Link from "next/link";
import type { ReactNode } from "react";
import type { Course, NewsItem, Version } from "@/content/types";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  headingLevel = "h2",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  headingLevel?: "h1" | "h2";
  children: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="text-[13px] font-medium tracking-wide text-ink-dim">
            {eyebrow}
          </div>
        )}
        <Heading className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-[34px] md:leading-tight">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-3 text-[15px] leading-7 text-ink-dim">{subtitle}</p>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  external,
  disabled,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-[10px] px-5 py-2.5 text-[13px] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[linear-gradient(180deg,#1a6bff_0%,#0b57f0_100%)] text-white hover:brightness-105"
      : "border border-line bg-white text-ink hover:border-accent/40";

  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed border border-line bg-white text-ink-faint opacity-60`}
      >
        {children}
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function PlaceholderBadge() {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-white px-2.5 py-0.5 text-[11px] text-ink-dim">
      待补充
    </span>
  );
}

export function VideoSlot({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-[14px] border border-line bg-surface">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-dim">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      </div>
      <div className="mt-3 text-sm text-ink">{title}</div>
      {note && <div className="mt-1 text-xs text-ink-faint">{note}</div>}
    </div>
  );
}

export function VersionCard({ version }: { version: Version }) {
  return (
    <Link
      href={`/products/${version.slug}`}
      className="group flex flex-col rounded-[14px] border border-line bg-surface p-4 transition-colors hover:border-accent/30 hover:bg-[#fbfdff] md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-ink md:text-[17px]">
          {version.name}
        </h3>
        {version.features.includes("待补充") && <PlaceholderBadge />}
      </div>
      {version.tagline !== "待补充" && (
        <p className="mt-1 text-[12px] text-accent md:text-[13px]">
          {version.tagline}
        </p>
      )}
      <p className="mt-3 hidden flex-1 text-[14px] leading-6 text-ink-dim md:block">
        {version.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-[12px] md:mt-6 md:text-[13px]">
        <span className="text-ink-dim">{version.videos.length} 个宣传视频</span>
        <span className="text-accent">查看详情</span>
      </div>
    </Link>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-[#fbfdff]"
    >
      <h3 className="text-[17px] font-semibold text-ink">{course.title}</h3>
      <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
        {course.summary}
      </p>
      <div className="mt-6 text-[13px] text-accent">查看课程</div>
    </Link>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col gap-2 rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-[#fbfdff]"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-faint">
        <span className="rounded-md bg-surface-2 px-2 py-0.5 text-ink-dim">
          {item.category}
        </span>
        <span>{item.date}</span>
        <span>{item.source}</span>
      </div>
      <h3 className="text-[15px] font-semibold leading-6 text-ink">
        {item.title}
      </h3>
      <p className="line-clamp-2 text-[14px] leading-6 text-ink-dim">
        {item.summary}
      </p>
      <div className="mt-auto pt-6 text-[13px] text-accent">
        阅读全文
      </div>
    </Link>
  );
}
