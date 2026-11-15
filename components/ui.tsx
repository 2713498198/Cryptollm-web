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
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-[14px] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-strong"
      : "bg-transparent text-accent hover:underline";

  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed opacity-40 ${
          variant === "primary" ? "bg-accent text-white" : "text-ink-dim"
        }`}
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
    <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-0.5 text-xs text-ink-dim">
      待补充
    </span>
  );
}

export function VideoSlot({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-2xl bg-surface">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-dim shadow-sm">
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
      className="group flex flex-col rounded-3xl bg-surface p-7 transition-colors hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[17px] font-semibold text-ink">{version.name}</h3>
        {version.features.includes("待补充") && <PlaceholderBadge />}
      </div>
      <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
        {version.description}
      </p>
      <div className="mt-6 flex items-center justify-between text-[13px]">
        <span className="text-ink-dim">{version.videos.length} 个宣传视频</span>
        <span className="text-accent">查看详情 →</span>
      </div>
    </Link>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-3xl bg-surface p-7 transition-colors hover:bg-surface-2"
    >
      <h3 className="text-[17px] font-semibold text-ink">{course.title}</h3>
      <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
        {course.summary}
      </p>
      <div className="mt-6 text-[13px] text-accent">查看课程 →</div>
    </Link>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col gap-2 rounded-3xl bg-surface p-7 transition-colors hover:bg-surface-2"
    >
      <div className="flex items-center gap-2 text-xs text-ink-faint">
        <span>{item.date}</span>
        <span className="h-0.5 w-0.5 rounded-full bg-ink-faint" />
        <span>{item.source}</span>
      </div>
      <h3 className="text-[15px] font-semibold leading-6 text-ink">
        {item.title}
      </h3>
      <p className="line-clamp-2 text-[14px] leading-6 text-ink-dim">
        {item.body[0]}
      </p>
    </Link>
  );
}
