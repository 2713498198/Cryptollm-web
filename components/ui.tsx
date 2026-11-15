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
      <div className="border-t border-line pt-4">
        {eyebrow && (
          <div className="font-mono text-[10px] tracking-[0.04em] text-ink-faint">
            {eyebrow}
          </div>
        )}
        <Heading className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-[44px]">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-ink-dim">
            {subtitle}
          </p>
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
    "inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-bg hover:bg-accent"
      : "text-ink underline decoration-line underline-offset-4 hover:decoration-ink";

  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed border border-line text-ink-faint opacity-60`}
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
    <span className="inline-flex border border-line px-2 py-0.5 font-mono text-[10px] text-ink-faint">
      待补充
    </span>
  );
}

export function VideoSlot({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center border border-line bg-surface">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-faint">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
      </div>
      <div className="mt-3 text-[13px] text-ink">{title}</div>
      {note && (
        <div className="mt-1 font-mono text-[10px] text-ink-faint">{note}</div>
      )}
    </div>
  );
}

export function VersionCard({ version }: { version: Version }) {
  const isLatest = version.slug === "v4";

  return (
    <Link
      href={`/products/${version.slug}`}
      className={`group grid grid-cols-[52px_1fr_auto] items-baseline gap-3 border-t border-line py-4 transition-colors md:grid-cols-[96px_1fr_auto] md:gap-4 md:py-6 ${
        isLatest ? "bg-surface/50" : ""
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-xl font-semibold text-ink md:text-2xl">
          {version.name.replace("玄知 ", "")}
        </span>
        {version.features.includes("待补充") && <PlaceholderBadge />}
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="hidden font-display text-[22px] font-semibold text-ink md:block">
            {version.name}
          </h3>
          {version.tagline !== "待补充" && (
            <span className="font-mono text-[10px] text-accent">
              {version.tagline}
            </span>
          )}
          {isLatest && (
            <span className="font-mono text-[10px] text-ink-faint">最新</span>
          )}
        </div>
        <p className="mt-2 hidden max-w-2xl text-[14px] leading-6 text-ink-dim md:block">
          {version.description}
        </p>
      </div>

      <div className="font-mono text-[10px] text-ink-faint transition-colors group-hover:text-ink">
        查看
      </div>
    </Link>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`} className="group block border-t border-line py-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[21px] font-semibold text-ink">
          {course.title}
        </h3>
        <span className="font-mono text-[10px] text-ink-faint transition-colors group-hover:text-ink">
          查看
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-6 text-ink-dim">{course.summary}</p>
    </Link>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="group block border-t border-line py-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[10px] text-ink-faint">
        <span>{item.category}</span>
        <span>{item.date}</span>
        <span>{item.source}</span>
      </div>
      <h3 className="mt-3 font-display text-[21px] font-semibold leading-snug text-ink">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-[14px] leading-6 text-ink-dim">
        {item.summary}
      </p>
      <div className="mt-4 text-[12px] text-ink-dim underline decoration-line underline-offset-4 transition-colors group-hover:text-ink">
        阅读全文
      </div>
    </Link>
  );
}
