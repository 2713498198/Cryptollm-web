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

export function DetailSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`mx-auto px-5 py-16 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
      <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
      <div className="mt-8 h-8 w-2/3 animate-pulse rounded bg-surface-2" />
      <div className="mt-6 h-4 w-full animate-pulse rounded bg-surface-2" />
      <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-surface-2" />
    </div>
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

export const GRADIENTS = {
  blueViolet: "bg-[linear-gradient(135deg,#0b57f0_0%,#7c4dff_100%)]",
  cyanBlue: "bg-[linear-gradient(135deg,#0ea5e9_0%,#0b57f0_100%)]",
  violetCyan: "bg-[linear-gradient(135deg,#7c4dff_0%,#0ea5e9_100%)]",
  blueCyan: "bg-[linear-gradient(135deg,#0b57f0_0%,#0ea5e9_100%)]",
  violetBlue: "bg-[linear-gradient(135deg,#7c4dff_0%,#0b57f0_100%)]",
} as const;

export function HoverOverlay({ gradient }: { gradient: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
    />
  );
}

export function ModelIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10.39 2.34Q11.14 1.92 12 1.92Q12.86 1.92 13.61 2.34L19.71 5.76Q20.47 6.2 20.92 6.97Q21.36 7.74 21.36 8.62V15.38Q21.36 16.26 20.92 17.03Q20.47 17.8 19.71 18.24L13.61 21.66Q12.86 22.08 12 22.08Q11.14 22.08 10.39 21.66L4.29 18.24Q3.53 17.8 3.08 17.03Q2.64 16.26 2.64 15.38V8.62Q2.64 7.74 3.08 6.97Q3.53 6.2 4.29 5.76ZM4.41 15.38Q4.41 15.77 4.62 16.12Q4.83 16.47 5.18 16.68L11.14 20.03Q11.12 19.92 11.12 19.82V12.65L10.95 12.56L4.41 8.69ZM13.02 12.61Q12.95 12.63 12.88 12.68V19.82Q12.88 19.92 12.86 20.01L18.82 16.68Q19.17 16.47 19.38 16.12Q19.59 15.77 19.59 15.38V8.95ZM12.72 3.9Q12.4 3.71 12 3.71Q11.6 3.71 11.28 3.9L5.39 7.2L11.86 11.02Q12.02 11.12 12.16 11.02L18.82 7.32Z" />
    </svg>
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

export function VersionCard({
  version,
  gradient = GRADIENTS.cyanBlue,
}: {
  version: Version;
  gradient?: string;
}) {
  return (
    <Link
      href={`/products/${version.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface p-4 transition-colors hover:border-white/90 md:p-6"
    >
      <HoverOverlay gradient={gradient} />
      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
        <ModelIcon />
      </div>
      <div className="relative z-10 mt-4 flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-ink transition-colors duration-300 group-hover:text-white md:text-[17px]">
          {version.name}
        </h3>
        {version.features.includes("待补充") && (
          <span className="transition-colors duration-300 group-hover:text-white/80">
            <PlaceholderBadge />
          </span>
        )}
      </div>
      {version.tagline !== "待补充" && (
        <p className="relative z-10 mt-1 text-[12px] text-accent transition-colors duration-300 group-hover:text-white/80 md:text-[13px]">
          {version.tagline}
        </p>
      )}
      <p className="relative z-10 mt-3 hidden flex-1 text-[14px] leading-6 text-ink-dim transition-colors duration-300 group-hover:text-white/90 md:block">
        {version.description}
      </p>
      <div className="relative z-10 mt-4 flex items-center justify-between text-[12px] md:mt-6 md:text-[13px]">
        <span className="text-ink-dim transition-colors duration-300 group-hover:text-white/70">
          {version.videos.length} 个宣传视频
        </span>
        <span className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100">
          <span className="text-accent transition-colors duration-300 group-hover:text-white">
            查看详情
          </span>
        </span>
      </div>
    </Link>
  );
}

export function CourseCard({
  course,
  gradient,
  icon,
}: {
  course: Course;
  gradient?: string;
  icon?: ReactNode;
}) {
  const enhanced = Boolean(gradient);
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group flex flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors ${
        enhanced
          ? "relative overflow-hidden hover:border-white/90"
          : "hover:border-accent/30 hover:bg-[#fbfdff]"
      }`}
    >
      {enhanced && <HoverOverlay gradient={gradient as string} />}
      {icon && (
        <div className="relative z-10 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
          {icon}
        </div>
      )}
      <h3
        className={`relative z-10 text-[17px] font-semibold text-ink ${
          enhanced
            ? "transition-colors duration-300 group-hover:text-white"
            : ""
        }`}
      >
        {course.title}
      </h3>
      <p
        className={`relative z-10 mt-4 flex-1 text-[14px] leading-6 text-ink-dim ${
          enhanced
            ? "transition-colors duration-300 group-hover:text-white/90"
            : ""
        }`}
      >
        {course.summary}
      </p>
      <div
        className={`relative z-10 mt-6 ${
          enhanced
            ? "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100"
            : ""
        }`}
      >
        <span
          className={`text-[13px] text-accent ${
            enhanced
              ? "transition-colors duration-300 group-hover:text-white"
              : ""
          }`}
        >
          查看课程
        </span>
      </div>
    </Link>
  );
}

export function NewsCard({
  item,
  gradient,
}: {
  item: NewsItem;
  gradient?: string;
}) {
  const enhanced = Boolean(gradient);
  return (
    <Link
      href={`/news/${item.slug}`}
      className={`group flex flex-col gap-2 rounded-[14px] border border-line bg-surface p-6 transition-colors ${
        enhanced
          ? "relative overflow-hidden hover:border-white/90"
          : "hover:border-accent/30 hover:bg-[#fbfdff]"
      }`}
    >
      {enhanced && <HoverOverlay gradient={gradient as string} />}
      <div
        className={`relative z-10 flex flex-wrap items-center gap-2 text-xs text-ink-faint ${
          enhanced
            ? "transition-colors duration-300 group-hover:text-white/70"
            : ""
        }`}
      >
        <span
          className={`rounded-md bg-surface-2 px-2 py-0.5 text-ink-dim ${
            enhanced
              ? "transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/90"
              : ""
          }`}
        >
          {item.category}
        </span>
        <span>{item.date}</span>
        <span>{item.source}</span>
      </div>
      <h3
        className={`relative z-10 text-[15px] font-semibold leading-6 text-ink ${
          enhanced
            ? "transition-colors duration-300 group-hover:text-white"
            : ""
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`relative z-10 line-clamp-2 text-[14px] leading-6 text-ink-dim ${
          enhanced
            ? "transition-colors duration-300 group-hover:text-white/90"
            : ""
        }`}
      >
        {item.summary}
      </p>
      <div
        className={`relative z-10 mt-auto ${
          enhanced
            ? "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-10 group-hover:opacity-100"
            : ""
        }`}
      >
        <span
          className={`block pt-6 text-[13px] text-accent ${
            enhanced
              ? "transition-colors duration-300 group-hover:text-white"
              : ""
          }`}
        >
          阅读全文
        </span>
      </div>
    </Link>
  );
}
