"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
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

const PANEL_COUNT = 7;
const NAV_COOLDOWN_MS = 850;

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5 md:mb-8">
      <div className="text-[12px] font-medium tracking-wide text-ink-faint">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const navigatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartScroll = useRef(0);
  const panelScrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const latestNews = [...news].sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0];
  const featuredVersion = versions[0];
  const otherVersions = versions.slice(1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const go = useCallback((index: number, force = false) => {
    const next = Math.max(0, Math.min(PANEL_COUNT - 1, index));
    if (next === activeRef.current) return;
    if (!force && navigatingRef.current) return;

    navigatingRef.current = true;
    activeRef.current = next;
    setActive(next);

    window.setTimeout(() => {
      navigatingRef.current = false;
    }, NAV_COOLDOWN_MS);
  }, []);

  const next = useCallback(() => go(activeRef.current + 1), [go]);
  const prev = useCallback(() => go(activeRef.current - 1), [go]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      const scrollable = target.closest<HTMLElement>("[data-panel-scroll]");

      if (scrollable) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >=
          scrollable.scrollHeight - 1;
        if (
          (event.deltaY > 0 && !atBottom) ||
          (event.deltaY < 0 && !atTop)
        ) {
          return;
        }
      }

      event.preventDefault();
      if (Math.abs(event.deltaY) < 4) return;
      if (event.deltaY > 0) next();
      else prev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const tag = target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const isInteractive = tag === "BUTTON" || tag === "A";
      if (event.key === " " && isInteractive) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        event.preventDefault();
        next();
      } else if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        event.preventDefault();
        prev();
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        go(PANEL_COUNT - 1, true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, next, prev]);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches[0].clientY;
    touchStartScroll.current =
      panelScrollRefs.current[activeRef.current]?.scrollTop ?? 0;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;

    const currentScroll =
      panelScrollRefs.current[activeRef.current]?.scrollTop ?? 0;
    if (Math.abs(currentScroll - touchStartScroll.current) > 4) {
      touchStartY.current = null;
      return;
    }

    const delta = touchStartY.current - event.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) next();
    else prev();
  };

  const panels = [
    <div key="hero">
      <div className="text-[13px] font-medium text-ink-dim">
        玄知 CryptoLLM
      </div>
      <h1 className="mt-3 text-[44px] font-medium leading-[1.05] tracking-tight text-ink md:text-[64px]">
        让密码更智能
        <br />
        让世界更安全
      </h1>
      <p className="mt-6 max-w-2xl text-[16px] leading-8 text-ink-dim md:text-[18px]">
        面向密码学领域的大语言模型。玄知 V4 以 CryptoHarness 与
        CryptoVerifier，让复杂密码任务可执行、可复核。
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <LinkButton href="/products/v4">申请 V4 邀请码</LinkButton>
        <LinkButton href="/products/v3" variant="ghost">
          体验 V3
        </LinkButton>
      </div>
      <p className="mt-6 text-[13px] text-ink-faint">
        V4 邀请码内测 / V3 公开访问
      </p>
    </div>,

    <div key="capabilities">
      <SectionHead eyebrow="能力" title="能做什么" />
      <div className="grid gap-0 md:grid-cols-3">
        {capabilities.map((capability, index) => (
          <div
            key={capability.title}
            className={`border-t border-line-soft py-5 md:border-t-0 md:py-0 md:px-6 ${
              index > 0 ? "md:border-l" : "md:pl-0"
            } ${index === capabilities.length - 1 ? "md:pr-0" : ""}`}
          >
            <h3 className="text-[17px] font-semibold text-ink">
              {capability.title}
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-ink-dim">
              {capability.body}
            </p>
          </div>
        ))}
      </div>
    </div>,

    <div key="models">
      <SectionHead eyebrow="产品 · 模型" title="玄知模型" />
      <div className="grid gap-6 rounded-[20px] border border-white/80 bg-[linear-gradient(135deg,#f8fbff_0%,#e8f2ff_55%,#f3efff_100%)] p-5 md:grid-cols-[1.25fr_0.75fr] md:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-ink-dim">
            <span className="rounded-md bg-white/70 px-2 py-0.5">
              当前版本
            </span>
            <span>{featuredVersion.tagline}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-4xl">
            {featuredVersion.name}
          </h3>
          <p className="mt-3 max-w-xl text-[14px] leading-7 text-ink-dim md:text-[15px]">
            {featuredVersion.description}
          </p>
          <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
            {featuredVersion.features.map((feature) => (
              <span
                key={feature}
                className="rounded-md border border-white/80 bg-white/60 px-2.5 py-1 text-[12px] text-ink-dim"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <LinkButton href={`/products/${featuredVersion.slug}`}>
              查看 V4
            </LinkButton>
          </div>
        </div>
        <div className="hidden items-center justify-center md:flex">
          <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-[18px] border border-white/80 bg-white/45 backdrop-blur">
            <span className="text-[88px] font-semibold leading-none tracking-tight text-accent/20">
              V4
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {otherVersions.map((version) => (
          <VersionCard key={version.slug} version={version} />
        ))}
      </div>
    </div>,

    <div key="platform">
      <SectionHead eyebrow="产品 · 平台" title="Crypto bench 与 API" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
          <h3 className="text-[17px] font-semibold text-ink">Crypto bench</h3>
          <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-dim">
            密码学基准测试。系统就绪后，入口链接会挂到官网。
          </p>
          <div className="mt-5">
            <LinkButton href="/bench" variant="ghost">
              进入 Crypto bench
            </LinkButton>
          </div>
        </div>
        <div className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
          <h3 className="text-[17px] font-semibold text-ink">API</h3>
          <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-dim">
            开放 API 访问，支持购买计费、用量管理与接入文档。
          </p>
          <div className="mt-5">
            <LinkButton href="/api" variant="ghost">
              查看 API
            </LinkButton>
          </div>
        </div>
      </div>
    </div>,

    <div key="courses">
      <SectionHead eyebrow="产品 · 课程" title="学习资源" />
      <div className="grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>,

    <div key="research-news">
      <SectionHead eyebrow="动态" title="研究与新闻" />
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/research"
          className="flex flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-accent/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-ink-faint">论文 · PDF</span>
            <PlaceholderBadge />
          </div>
          <h3 className="mt-2 text-[17px] font-semibold text-ink">研究成果</h3>
          <p className="mt-3 flex-1 text-[14px] leading-6 text-ink-dim">
            论文研究成果以 PDF 形式集中展示，可查看与下载。
          </p>
          <div className="mt-auto pt-5 text-[13px] text-accent">
            查看研究成果
          </div>
        </Link>
        {latestNews && <NewsCard item={latestNews} />}
      </div>

    </div>,

    <div key="community">
      <SectionHead eyebrow="社群" title="加入客户交流群" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-[18px] border border-line bg-surface p-4 text-center">
          <span className="text-sm text-ink-dim">群二维码</span>
          <span className="mt-1 text-xs text-ink-faint">待补充</span>
        </div>
        <div className="max-w-md">
          <h3 className="text-[17px] font-semibold text-ink">客户交流群</h3>
          <p className="mt-3 text-[14px] leading-6 text-ink-dim">
            扫码加入玄知客户交流群，获取产品动态、活动通知与技术支持。群二维码与加群说明待补充。
          </p>
          <div className="mt-5">
            <LinkButton href="/community">查看加群方式</LinkButton>
          </div>
        </div>
      </div>
      <div className="mt-10 text-[12px] text-ink-faint">
        © 2026 玄知 CryptoLLM · Powered by XDU NSS · ICP 备案号待补充
      </div>
    </div>,
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100dvh_-_3.5rem)] overflow-hidden overscroll-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {panels.map((panel, index) => {
        const isActive = active === index;
        return (
          <div
            key={index}
            aria-hidden={!isActive}
            inert={!isActive}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(0, ${(index - active) * 100}%, 0)`,
              opacity: isActive ? 1 : 0,
              transition:
                "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
            }}
          >
            <div
              ref={(el) => {
                panelScrollRefs.current[index] = el;
              }}
              data-panel-scroll
              className="h-full w-full overflow-y-auto overscroll-contain"
            >
              <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center pl-5 pr-12 py-5 md:py-10 md:pr-5">
                {panel}
              </div>
            </div>
          </div>
        );
      })}

      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2">
        {Array.from({ length: PANEL_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`第 ${index + 1} 屏`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => go(index, true)}
            className="flex h-6 w-6 items-center justify-center rounded-full"
          >
            <span
              className={`rounded-full transition-all ${
                active === index
                  ? "h-1.5 w-4 bg-accent"
                  : "h-1.5 w-1.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
