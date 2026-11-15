"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { courses } from "@/content/courses";
import { news } from "@/content/news";
import { versions } from "@/content/versions";
import {
  CourseCard,
  LinkButton,
  NewsCard,
  PlaceholderBadge,
  VersionCard,
} from "@/components/ui";

const capabilities = [
  {
    title: "算法分析",
    body: "识别算法漏洞与风险，分析适用场景，给出评估与建议。",
  },
  {
    title: "协议验证",
    body: "解析协议结构与交互流程，定位潜在攻击路径，提出改进建议。",
  },
  {
    title: "工程审计",
    body: "检查实现中的安全缺陷与合规风险，提供修复与审计建议。",
  },
];

const sectionCount = 7;

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-[13px] font-medium tracking-wide text-ink-dim">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActive(Math.max(0, Math.min(sectionCount - 1, idx)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: index * el.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-[calc(100dvh_-_3rem)] snap-y snap-mandatory overflow-y-auto overscroll-contain"
      >
        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">
              玄知 CryptoLLM
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-ink-dim md:text-[19px]">
              面向密码学领域的大语言模型。分析密码算法，验证协议安全，审计工程实现。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/products/v3">体验 V3</LinkButton>
              <LinkButton href="/products/v4" variant="ghost">
                申请 V4 邀请码
              </LinkButton>
            </div>
            <p className="mt-6 text-[13px] text-ink-faint">
              V3 公开访问 · V4 邀请码内测
            </p>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="能力" title="能做什么" />
            <div className="grid gap-5 md:grid-cols-3">
              {capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="rounded-3xl bg-surface p-7"
                >
                  <h3 className="text-[17px] font-semibold text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-6 text-ink-dim">
                    {capability.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="产品 · 模型" title="玄知模型" />
            <div className="grid gap-5 md:grid-cols-2">
              {versions.map((version) => (
                <VersionCard key={version.slug} version={version} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="产品 · 平台" title="Crypto bench 与 API" />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col rounded-3xl bg-surface p-7">
                <h3 className="text-[17px] font-semibold text-ink">
                  Crypto bench
                </h3>
                <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
                  密码学基准测试。系统就绪后，入口链接会挂到官网。
                </p>
                <div className="mt-6">
                  <LinkButton href="/bench" variant="ghost">
                    进入 Crypto bench
                  </LinkButton>
                </div>
              </div>
              <div className="flex flex-col rounded-3xl bg-surface p-7">
                <h3 className="text-[17px] font-semibold text-ink">API</h3>
                <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
                  开放 API 访问，支持购买计费、用量管理与接入文档。
                </p>
                <div className="mt-6">
                  <LinkButton href="/api" variant="ghost">
                    查看 API
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="产品 · 课程" title="学习资源" />
            <div className="grid gap-5 md:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="动态" title="研究与新闻" />
            <div className="grid gap-5 md:grid-cols-2">
              <Link
                href="/research"
                className="flex flex-col rounded-3xl bg-surface p-7 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-ink-faint">论文 · PDF</span>
                  <PlaceholderBadge />
                </div>
                <h3 className="mt-2 text-[17px] font-semibold text-ink">
                  研究成果
                </h3>
                <p className="mt-4 flex-1 text-[14px] leading-6 text-ink-dim">
                  论文研究成果以 PDF 形式集中展示，可查看与下载。
                </p>
                <div className="mt-auto pt-6 text-[13px] text-accent">
                  查看研究成果 →
                </div>
              </Link>
              <div className="flex flex-col gap-4">
                {news.map((item) => (
                  <NewsCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100dvh_-_3rem)] snap-start items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead eyebrow="社群" title="加入交流群" />
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-3xl bg-surface text-center">
                <span className="text-sm text-ink-dim">群二维码</span>
                <span className="text-xs text-ink-faint">待补充</span>
              </div>
              <div className="max-w-md">
                <p className="text-[14px] leading-6 text-ink-dim">
                  扫码加入客户交流群。二维码与说明待补充。
                </p>
                <div className="mt-5">
                  <LinkButton href="/community">查看加群方式</LinkButton>
                </div>
              </div>
            </div>
            <div className="mt-16 border-t border-line-soft pt-6 text-[12px] text-ink-faint">
              © 2026 玄知 CryptoLLM · Powered by XDU NSS · ICP 备案号待补充
            </div>
          </div>
        </section>
      </div>

      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2.5">
        {Array.from({ length: sectionCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`第 ${index + 1} 屏`}
            onClick={() => go(index)}
            className={`rounded-full transition-all ${
              active === index
                ? "h-2.5 w-2.5 bg-accent"
                : "h-2 w-2 bg-line hover:bg-ink-faint"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
