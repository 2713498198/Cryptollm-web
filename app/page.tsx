"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import { courses } from "@/content/courses";
import { news } from "@/content/news";
import { versions } from "@/content/versions";
import {
  CourseCard,
  LinkButton,
  NewsCard,
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

function PanelLayout({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[128px_1fr] md:gap-10">
      <div className="flex items-baseline justify-between border-t border-line pt-3 md:block">
        <div className="font-mono text-[10px] text-ink-faint">
          {String(index).padStart(2, "0")} / 07
        </div>
        <div className="font-mono text-[10px] text-ink-dim md:mt-2">
          {label}
        </div>
      </div>
      <div className="border-t border-line pt-3">{children}</div>
    </div>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[30px] font-semibold leading-tight tracking-tight text-ink md:text-[42px]">
      {children}
    </h2>
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
    <div
      key="hero"
      className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end"
    >
      <div>
        <div className="font-mono text-[10px] text-ink-faint">
          玄知 / CRYPTOLLM
        </div>
        <h1 className="mt-4 font-display text-[46px] font-semibold leading-[1.04] tracking-tight text-ink md:text-[86px]">
          可验证的
          <br />
          密码智能
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-8 text-ink-dim">
          面向密码学领域的大语言模型。分析密码算法，验证协议安全，审计工程实现。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <LinkButton href="/products/v3">体验 V3</LinkButton>
          <LinkButton href="/products/v4" variant="ghost">
            申请 V4 邀请码
          </LinkButton>
        </div>
      </div>

      <div className="border-t border-line font-mono text-[11px] text-ink-dim">
        {[
          ["CryptoLLM", "理解与推理"],
          ["CryptoHarness", "组织与执行"],
          ["CryptoVerifier", "检验与判定"],
        ].map(([name, role], index) => (
          <div
            key={name}
            className={`flex items-baseline justify-between gap-4 py-3 ${
              index > 0 ? "border-t border-line-soft" : ""
            }`}
          >
            <span className="text-ink">{name}</span>
            <span className="text-ink-faint">{role}</span>
          </div>
        ))}
        <div className="border-t border-line py-3 text-ink-faint">
          V3 公开访问 / V4 邀请码内测
        </div>
      </div>
    </div>,

    <PanelLayout key="capabilities" index={2} label="能力">
      <PanelTitle>从算法到工程</PanelTitle>
      <div className="mt-8 grid gap-0 md:grid-cols-3">
        {capabilities.map((capability, index) => (
          <div
            key={capability.title}
            className={`border-t border-line py-5 md:border-t-0 md:border-l md:px-6 ${
              index === 0 ? "md:border-l-0 md:pl-0" : ""
            }`}
          >
            <h3 className="font-display text-[22px] font-semibold text-ink">
              {capability.title}
            </h3>
            <p className="mt-3 max-w-xs text-[14px] leading-6 text-ink-dim">
              {capability.body}
            </p>
          </div>
        ))}
      </div>
    </PanelLayout>,

    <PanelLayout key="models" index={3} label="模型">
      <div className="flex items-baseline justify-between gap-4">
        <PanelTitle>玄知模型</PanelTitle>
        <span className="font-mono text-[10px] text-ink-faint">V4 → V1</span>
      </div>
      <div className="mt-6">
        {versions.map((version) => (
          <VersionCard key={version.slug} version={version} />
        ))}
      </div>
    </PanelLayout>,

    <PanelLayout key="platform" index={4} label="平台">
      <PanelTitle>基准与接口</PanelTitle>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="border-t border-line pt-4">
          <div className="font-mono text-[10px] text-ink-faint">
            Crypto bench
          </div>
          <h3 className="mt-3 font-display text-[24px] font-semibold text-ink">
            密码学基准测试
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-ink-dim">
            密码学基准测试。系统就绪后，入口链接会挂到官网。
          </p>
          <div className="mt-5">
            <LinkButton href="/bench" variant="ghost">
              进入 Crypto bench
            </LinkButton>
          </div>
        </div>
        <div className="border-t border-line pt-4">
          <div className="font-mono text-[10px] text-ink-faint">API</div>
          <h3 className="mt-3 font-display text-[24px] font-semibold text-ink">
            开放接口
          </h3>
          <p className="mt-3 text-[14px] leading-6 text-ink-dim">
            开放 API 访问，支持购买计费、用量管理与接入文档。
          </p>
          <div className="mt-5">
            <LinkButton href="/api" variant="ghost">
              查看 API
            </LinkButton>
          </div>
        </div>
      </div>
    </PanelLayout>,

    <PanelLayout key="courses" index={5} label="课程">
      <PanelTitle>课程与实验</PanelTitle>
      <div className="mt-6 grid gap-0 md:grid-cols-3 md:gap-6">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </PanelLayout>,

    <PanelLayout key="research-news" index={6} label="动态">
      <PanelTitle>研究与新闻</PanelTitle>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="md:border-r md:border-line md:pr-8">
          <div className="border-t border-line pt-4">
            <div className="font-mono text-[10px] text-ink-faint">
              论文 / PDF
            </div>
            <h3 className="mt-3 font-display text-[24px] font-semibold text-ink">
              研究成果
            </h3>
            <p className="mt-3 text-[14px] leading-6 text-ink-dim">
              论文研究成果以 PDF 形式集中展示，可查看与下载。
            </p>
            <div className="mt-4">
              <LinkButton href="/research" variant="ghost">
                查看研究成果
              </LinkButton>
            </div>
          </div>
        </div>
        {latestNews && <NewsCard item={latestNews} />}
      </div>
    </PanelLayout>,

    <PanelLayout key="community" index={7} label="社群">
      <PanelTitle>加入客户交流群</PanelTitle>
      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
          <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center border border-line bg-surface text-center">
            <span className="text-[13px] text-ink-dim">群二维码</span>
            <span className="mt-1 font-mono text-[10px] text-ink-faint">
              待补充
            </span>
          </div>
          <p className="max-w-sm text-[14px] leading-6 text-ink-dim">
            扫码加入玄知客户交流群，获取产品动态、活动通知与技术支持。群二维码与加群说明待补充。
          </p>
        </div>
        <LinkButton href="/community">查看加群方式</LinkButton>
      </div>
      <div className="mt-12 border-t border-line pt-4 font-mono text-[10px] text-ink-faint">
        © 2026 玄知 CryptoLLM / Powered by XDU NSS / ICP 备案号待补充
      </div>
    </PanelLayout>,
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100dvh_-_3rem)] overflow-hidden overscroll-none"
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
              <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center pl-5 pr-12 py-6 md:py-10 md:pr-5">
                {panel}
              </div>
            </div>
          </div>
        );
      })}

      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-1.5">
        {Array.from({ length: PANEL_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`第 ${index + 1} 屏`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => go(index, true)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`w-[2px] transition-all ${
                active === index
                  ? "h-6 bg-accent"
                  : "h-3 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
