"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuItem = { href: string; label: string };
type MenuGroup = { title: string; items: MenuItem[] };

const productGroups: MenuGroup[] = [
  {
    title: "模型",
    items: [
      { href: "/products/v4", label: "玄知 V4" },
      { href: "/products/v3", label: "玄知 V3" },
      { href: "/products/v2", label: "玄知 V2" },
      { href: "/products/v1", label: "玄知 V1" },
    ],
  },
  {
    title: "其他产品",
    items: [
      { href: "/courses", label: "课程" },
      { href: "/bench", label: "Crypto bench" },
      { href: "/api", label: "API" },
    ],
  },
];

function NavMenu({
  label,
  groups,
  active,
}: {
  label: string;
  groups: MenuGroup[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeSoon}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onFocus={openMenu}
        className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
          active ? "text-ink" : "text-ink-dim hover:text-ink"
        }`}
      >
        {label}
      </button>

      <div
        className={`fixed left-0 right-0 top-12 z-50 transition-opacity ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="border-b border-line-soft bg-white/95 shadow-sm backdrop-blur-xl">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 py-10">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="px-3 text-[12px] text-ink-faint">
                  {group.title}
                </div>
                <div className="mt-3 flex flex-col">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const productActive =
    pathname.startsWith("/products") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/bench") ||
    pathname.startsWith("/api");

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          <span>玄知</span>
          <span className="text-[13px] font-normal text-ink-dim">CryptoLLM</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          <Link
            href="/"
            className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
              pathname === "/" ? "text-ink" : "text-ink-dim hover:text-ink"
            }`}
          >
            首页
          </Link>

          <NavMenu
            label="产品"
            groups={productGroups}
            active={productActive}
          />
          <Link
            href="/news"
            className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
              pathname.startsWith("/news")
                ? "text-ink"
                : "text-ink-dim hover:text-ink"
            }`}
          >
            新闻动态
          </Link>
          <Link
            href="/research"
            className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
              pathname.startsWith("/research")
                ? "text-ink"
                : "text-ink-dim hover:text-ink"
            }`}
          >
            研究成果
          </Link>

          <Link
            href="/community"
            className="rounded-full px-3 py-1.5 text-[13px] text-ink-dim transition-colors hover:text-ink"
          >
            加入社群
          </Link>
          <Link
            href="/login"
            className="rounded-full px-3 py-1.5 text-[13px] text-ink-dim transition-colors hover:text-ink"
          >
            登录
          </Link>
        </nav>

        <button
          type="button"
          aria-label="打开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 8h16M4 12h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line-soft bg-white px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              首页
            </Link>
            <div className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink">
              产品
            </div>
            <div className="px-6 pt-1 text-xs text-ink-faint">模型</div>
            {productGroups[0].items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-6 pt-2 text-xs text-ink-faint">其他产品</div>
            {productGroups[1].items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/news"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              新闻动态
            </Link>
            <Link
              href="/research"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              研究成果
            </Link>
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              加入社群
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              登录
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
