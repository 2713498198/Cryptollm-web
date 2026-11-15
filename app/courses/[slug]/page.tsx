import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { LinkButton, PlaceholderBadge } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const items = [
    { label: "课程视频", url: course.videoUrl, desc: "待补充" },
    { label: "课程课件", url: course.slidesUrl, desc: "待补充" },
    { label: "实验系统", url: course.labUrl, desc: "待补充" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <Link
        href="/courses"
        className="text-[13px] text-ink-dim transition-colors hover:text-ink"
      >
        ← 返回课程
      </Link>
      <div className="mt-8 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-accent">课程</span>
          <PlaceholderBadge />
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          {course.title}
        </h1>
        <p className="mt-6 text-base leading-8 text-ink-dim">{course.summary}</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col rounded-2xl border border-line bg-surface p-6"
          >
            <h2 className="text-base font-semibold text-ink">{item.label}</h2>
            <p className="mt-2 flex-1 text-sm text-ink-dim">{item.desc}</p>
            <div className="mt-4">
              <LinkButton
                href={item.url ?? "#"}
                variant="ghost"
                disabled={!item.url}
              >
                {item.url ? "前往" : "待补充"}
              </LinkButton>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-ink">配套教材</h2>
            <p className="mt-2 text-sm text-ink-dim">{course.textbook.title}</p>
          </div>
          {course.textbook.taobaoUrl ? (
            <LinkButton href={course.textbook.taobaoUrl} external>
              前往淘宝购买
            </LinkButton>
          ) : (
            <span className="text-sm text-ink-faint">淘宝链接待补充</span>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface/50 p-6">
        <h2 className="text-base font-semibold text-ink">课程宣传视频</h2>
        <p className="mt-2 text-sm text-ink-dim">
          3–5 分钟课程宣传视频，成品到位后在此展示。
        </p>
      </div>
    </div>
  );
}
