"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type TouchEvent,
} from "react";
import { courses } from "@/content/courses";
import { news } from "@/content/news";
import { versions } from "@/content/versions";
import {
  CourseCard,
  GRADIENTS,
  HoverOverlay,
  LinkButton,
  ModelIcon,
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

const searchVersions = versions.slice(0, 2);

const modules: Array<{
  href: string;
  icon: "model" | "activity";
  hoverClass: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
}> = [
  {
    href: "/products/v4",
    icon: "model",
    hoverClass: "bg-[linear-gradient(135deg,#0b57f0_0%,#7c4dff_100%)]",
    title: "玄知 V4",
    tagline: "邀请码内测",
    description: "内测版本，需要申请邀请码后才能体验。",
    cta: "申请邀请码",
  },
  {
    href: "/products/v3",
    icon: "model",
    hoverClass: "bg-[linear-gradient(135deg,#0ea5e9_0%,#0b57f0_100%)]",
    title: "玄知 V3",
    tagline: "公开访问",
    description: "打开即用，无需申请。以对话方式使用，面向所有人开放。",
    cta: "立即体验",
  },
  {
    href: "/courses",
    icon: "activity",
    hoverClass: "bg-[linear-gradient(135deg,#7c4dff_0%,#0ea5e9_100%)]",
    title: "课程",
    tagline: "学习资源",
    description: "课程视频、课件、实验系统与配套教材的集中入口。",
    cta: "查看课程",
  },
];

const PANEL_COUNT = 7;
const NAV_COOLDOWN_MS = 850;

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 md:mb-8">
      <div className="text-[12px] font-medium tracking-wide text-ink-faint">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-ink-dim md:text-[15px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.73 5.65H17.56Q17.64 5.48 17.66 5.22Q17.68 5.06 17.68 4.68Q17.68 4.14 17.49 3.62Q17.31 3.1 16.94 2.73Q16.57 2.37 16.06 2.14Q15.54 1.92 15.02 1.92Q13.93 1.92 13.08 2.53Q12.4 3 11.76 3.97Q11.32 3.17 10.66 2.67Q9.76 2.04 8.63 2.04Q8.04 2.04 7.57 2.23Q7.05 2.44 6.69 2.86Q6.34 3.22 6.15 3.74Q5.96 4.25 5.96 4.8Q5.96 4.99 6.02 5.29Q6.08 5.6 6.08 5.76H4.03Q3.16 5.69 2.57 6.29Q1.98 6.9 1.98 7.81V9.63Q1.98 10.43 2.51 11.01Q3.04 11.59 3.79 11.68V18.68Q3.79 19.58 4.24 20.36Q4.69 21.14 5.46 21.61Q6.22 22.08 7.17 22.08H16.83Q17.73 22.08 18.51 21.63Q19.29 21.18 19.75 20.41Q20.21 19.63 20.21 18.68V11.68Q20.96 11.59 21.49 11.01Q22.02 10.43 22.02 9.63V7.81Q21.83 6.87 21.24 6.28Q20.61 5.65 19.73 5.65ZM15.14 3.83Q15.3 3.83 15.48 3.91Q15.65 3.99 15.75 4.09Q15.84 4.18 15.91 4.35Q15.98 4.51 15.98 4.69Q15.98 4.87 15.91 5.09Q15.84 5.32 15.75 5.41Q15.65 5.5 15.48 5.57Q15.3 5.65 15.14 5.65H13.08Q13.49 4.87 13.84 4.47Q14.43 3.83 15.14 3.83ZM8.02 4.21Q8.18 4.04 8.36 3.94Q8.53 3.83 8.63 3.83Q9.29 3.83 9.81 4.42Q10.23 4.87 10.56 5.65H8.63Q8.25 5.65 8.02 5.41Q7.92 5.32 7.85 5.15Q7.78 4.99 7.78 4.81Q7.78 4.63 7.85 4.47Q7.92 4.3 8.02 4.21ZM10.92 20.15H7.05Q6.44 20.15 6.02 19.7Q5.61 19.25 5.61 18.68V11.68H11.03V20.15ZM10.92 10.01H4.03Q3.94 10.01 3.87 9.93Q3.79 9.84 3.79 9.75V7.81Q3.79 7.74 3.87 7.66Q3.94 7.58 4.03 7.58H11.03V10.01ZM18.15 18.68Q18.15 19.3 17.72 19.72Q17.28 20.15 16.72 20.15H12.85V11.68H18.27V18.68ZM20.09 9.63Q20.09 9.72 20.02 9.8Q19.95 9.87 19.85 9.87H12.85V7.46H19.85Q19.95 7.46 20.02 7.53Q20.09 7.6 20.09 7.7Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 20V12" />
      <path d="M12 20V4" />
      <path d="M19 20V8" />
      <path d="M2 20h20" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 5a2 2 0 0 1 2-2h4v18H6a2 2 0 0 1-2-2z" />
      <path d="M20 5a2 2 0 0 0-2-2h-4v18h4a2 2 0 0 0 2-2z" />
    </svg>
  );
}

function ModuleCard({
  href,
  icon,
  hoverClass,
  title,
  tagline,
  description,
  cta,
}: {
  href: string;
  icon: "model" | "activity";
  hoverClass: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[12px] border border-white bg-white/60 p-5 text-left backdrop-blur-md transition-all hover:border-white/90 md:min-h-[300px]"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${hoverClass}`}
      />
      <div className="relative z-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
          {icon === "model" ? <ModelIcon /> : <ActivityIcon />}
        </div>
        <h3 className="mt-4 text-[20px] font-semibold leading-8 text-ink transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        <span className="text-[12px] text-accent transition-colors duration-300 group-hover:text-white/80">
          {tagline}
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-[15px] leading-6 text-ink-dim transition-colors duration-300 group-hover:text-white/90">
          {description}
        </p>
        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-10 group-hover:opacity-100">
          <div className="mt-4 flex items-center gap-1 text-[14px] font-medium text-ink transition-colors duration-300 group-hover:text-white">
            {cta}
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [selectedVersion, setSelectedVersion] = useState("v3");
  const [query, setQuery] = useState("");
  const [versionOpen, setVersionOpen] = useState(false);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const navigatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartScroll = useRef(0);
  const panelScrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleHighlightRef = useRef<HTMLHeadingElement>(null);

  const latestNews = [...news].sort((a, b) =>
    b.date.localeCompare(a.date),
  )[0];
  const featuredVersion = versions[0];
  const otherVersions = versions.slice(1);

  const selected =
    searchVersions.find((version) => version.slug === selectedVersion) ??
    searchVersions[1];

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

  useEffect(() => {
    const wrapper = titleRef.current;
    const highlight = titleHighlightRef.current;
    if (!wrapper || !highlight) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let running = false;
    let targetX = -1000;
    let targetY = -1000;
    let x = -1000;
    let y = -1000;
    let opacity = 0;
    let active = false;

    const tick = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      opacity += ((active ? 1 : 0) - opacity) * 0.18;

      if (opacity <= 0.01 && !active) {
        highlight.style.opacity = "0";
        running = false;
        return;
      }

      wrapper.style.setProperty("--x", `${x}px`);
      wrapper.style.setProperty("--y", `${y}px`);
      highlight.style.opacity = String(opacity);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      active = true;
      start();
    };

    const onPointerLeave = () => {
      active = false;
      start();
    };

    wrapper.addEventListener("pointermove", onPointerMove, { passive: true });
    wrapper.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVersionOpen(false);
    const target = `/products/${selected.slug}`;
    const trimmed = query.trim();
    router.push(trimmed ? `${target}?q=${encodeURIComponent(trimmed)}` : target);
  };

  const panels = [
    <div key="hero">
      <div ref={titleRef} className="relative mx-auto w-fit">
        <h1 className="text-center text-[34px] font-medium leading-[48px] tracking-tight text-ink md:text-[48px] md:leading-[56px]">
          让密码更智能，让世界更安全
        </h1>
        <h1
          ref={titleHighlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-center text-[34px] font-medium leading-[48px] tracking-tight md:text-[48px] md:leading-[56px]"
          style={{
            backgroundImage:
              "radial-gradient(120px circle at var(--x) var(--y), rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0) 72%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            opacity: 0,
          }}
        >
          让密码更智能，让世界更安全
        </h1>
      </div>

      <form onSubmit={submit} className="mx-auto mt-10 w-full max-w-[640px]">
        <div className="flex h-[60px] items-center rounded-full border border-white bg-white/50 px-7 shadow-[0_12px_40px_rgba(20,20,23,0.08)] backdrop-blur-md transition-colors focus-within:border-accent/30">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setVersionOpen((value) => !value)}
              aria-haspopup="listbox"
              aria-expanded={versionOpen}
              className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[14px] font-medium text-ink transition-colors hover:bg-white/70"
            >
              {selected.name}
              <ChevronDownIcon />
            </button>

            {versionOpen && (
              <ul
                role="listbox"
                className="absolute left-0 top-full z-30 mt-1.5 w-44 overflow-hidden rounded-[12px] border border-line bg-white p-1 shadow-[0_16px_40px_rgba(20,20,23,0.14)]"
              >
                {searchVersions.map((version) => (
                  <li key={version.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={version.slug === selectedVersion}
                      onClick={() => {
                        setSelectedVersion(version.slug);
                        setVersionOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-left text-[13px] transition-colors ${
                        version.slug === selectedVersion
                          ? "bg-surface-2 text-ink"
                          : "text-ink-dim hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span>{version.name}</span>
                      <span className="text-[11px] text-ink-faint">
                        {version.tagline}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span className="h-6 w-px shrink-0 bg-line" aria-hidden="true" />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="开始探索"
            aria-label="搜索"
            className="search-input min-w-0 flex-1 bg-transparent px-4 text-[16px] leading-6 text-ink outline-none placeholder:text-ink-dim"
            style={{ outline: "none" }}
          />

          <button
            type="submit"
            aria-label="发送"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-ink transition-colors hover:text-accent"
          >
            <SendIcon />
          </button>
        </div>
      </form>

      <div className="mx-auto mt-14 grid w-full gap-5 md:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard key={module.href} {...module} />
        ))}
      </div>
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
      <Link
        href={`/products/${featuredVersion.slug}`}
        className="group relative block overflow-hidden rounded-[20px] border border-white/80 bg-[linear-gradient(135deg,#f8fbff_0%,#e8f2ff_55%,#f3efff_100%)] p-5 transition-colors hover:border-white/90 md:p-8"
      >
        <HoverOverlay gradient={GRADIENTS.blueViolet} />
        <div className="relative z-10 grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
                <ModelIcon />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-dim">
                <span className="rounded-md bg-white/70 px-2 py-0.5 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/90">
                  当前版本
                </span>
                <span className="transition-colors duration-300 group-hover:text-white/80">
                  {featuredVersion.tagline}
                </span>
              </div>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-white md:text-4xl">
              {featuredVersion.name}
            </h3>
            <p className="mt-3 max-w-xl text-[14px] leading-7 text-ink-dim transition-colors duration-300 group-hover:text-white/90 md:text-[15px]">
              {featuredVersion.description}
            </p>
            <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
              {featuredVersion.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-md border border-white/80 bg-white/60 px-2.5 py-1 text-[12px] text-ink-dim transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white/80"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-6 max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-10 group-hover:opacity-100">
              <span className="flex items-center gap-1 text-[14px] font-medium text-ink transition-colors duration-300 group-hover:text-white">
                查看 V4
                <ArrowRightIcon />
              </span>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-[18px] border border-white/80 bg-white/45 backdrop-blur transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/15">
              <span className="text-[88px] font-semibold leading-none tracking-tight text-accent/20 transition-colors duration-300 group-hover:text-white/90">
                V4
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {otherVersions.map((version, index) => (
          <VersionCard
            key={version.slug}
            version={version}
            gradient={
              [GRADIENTS.cyanBlue, GRADIENTS.violetCyan, GRADIENTS.blueViolet][
                index
              ]
            }
          />
        ))}
      </div>
    </div>,

    <div key="platform">
      <SectionHead
        eyebrow="产品 · 平台"
        title="Crypto bench 与 API"
        subtitle="面向密码学评估与接入的一站式平台能力。"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/bench"
          className="group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-white/90"
        >
          <HoverOverlay gradient={GRADIENTS.blueViolet} />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
            <ChartIcon />
          </div>
          <h3 className="relative z-10 mt-4 text-[17px] font-semibold text-ink transition-colors duration-300 group-hover:text-white">
            Crypto bench
          </h3>
          <p className="relative z-10 mt-3 flex-1 text-[14px] leading-6 text-ink-dim transition-colors duration-300 group-hover:text-white/90">
            密码学基准测试。系统就绪后，入口链接会挂到官网。
          </p>
          <div className="relative z-10 mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100">
            <span className="flex items-center gap-1 text-[13px] font-medium text-ink transition-colors duration-300 group-hover:text-white">
              进入 Crypto bench
              <ArrowRightIcon />
            </span>
          </div>
        </Link>
        <Link
          href="/api"
          className="group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-white/90"
        >
          <HoverOverlay gradient={GRADIENTS.cyanBlue} />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
            <TerminalIcon />
          </div>
          <h3 className="relative z-10 mt-4 text-[17px] font-semibold text-ink transition-colors duration-300 group-hover:text-white">
            API
          </h3>
          <p className="relative z-10 mt-3 flex-1 text-[14px] leading-6 text-ink-dim transition-colors duration-300 group-hover:text-white/90">
            开放 API 访问，支持购买计费、用量管理与接入文档。
          </p>
          <div className="relative z-10 mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100">
            <span className="flex items-center gap-1 text-[13px] font-medium text-ink transition-colors duration-300 group-hover:text-white">
              查看 API
              <ArrowRightIcon />
            </span>
          </div>
        </Link>
      </div>
    </div>,

    <div key="courses">
      <SectionHead
        eyebrow="产品 · 课程"
        title="学习资源"
        subtitle="从视频、课件到实验系统与配套教材，系统学习玄知模型。"
      />
      <div className="grid gap-4 md:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              icon={<CourseIcon />}
              gradient={
                [GRADIENTS.violetCyan, GRADIENTS.blueViolet, GRADIENTS.cyanBlue][
                  index
                ]
              }
            />
        ))}
      </div>
    </div>,

    <div key="research-news">
      <SectionHead
        eyebrow="动态"
        title="研究与新闻"
        subtitle="论文研究成果与产品动态，随时掌握。"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/research"
          className="group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface p-6 transition-colors hover:border-white/90"
        >
          <HoverOverlay gradient={GRADIENTS.blueViolet} />
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.8)] text-white">
            <DocumentIcon />
          </div>
          <div className="relative z-10 mt-4 flex items-center justify-between">
            <span className="text-[12px] text-ink-faint transition-colors duration-300 group-hover:text-white/70">
              论文 · PDF
            </span>
            <span className="transition-colors duration-300 group-hover:text-white/80">
              <PlaceholderBadge />
            </span>
          </div>
          <h3 className="relative z-10 mt-2 text-[17px] font-semibold text-ink transition-colors duration-300 group-hover:text-white">
            研究成果
          </h3>
          <p className="relative z-10 mt-3 flex-1 text-[14px] leading-6 text-ink-dim transition-colors duration-300 group-hover:text-white/90">
            论文研究成果以 PDF 形式集中展示，可查看与下载。
          </p>
          <div className="relative z-10 mt-auto max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-10 group-hover:opacity-100">
            <span className="block pt-5 text-[13px] text-accent transition-colors duration-300 group-hover:text-white">
              查看研究成果
            </span>
          </div>
        </Link>
        {latestNews && (
          <NewsCard item={latestNews} gradient={GRADIENTS.cyanBlue} />
        )}
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
