"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const productGroups = [
  {
    title: "探索产品",
    items: [
      { href: "/products/v1", label: "玄知 V1" },
      { href: "/products/v2", label: "玄知 V2" },
      { href: "/products/v3", label: "玄知 V3" },
      { href: "/products/v4", label: "玄知 V4" },
    ],
  },
  {
    title: "选购与接入",
    items: [
      { href: "/courses", label: "课程" },
      { href: "/bench", label: "Crypto bench" },
      { href: "/api", label: "API" },
    ],
  },
  {
    title: "了解",
    items: [
      { href: "/news", label: "新闻动态" },
      { href: "/research", label: "研究成果" },
    ],
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productActive =
    pathname.startsWith("/products") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/bench") ||
    pathname.startsWith("/api");

  const openProducts = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setProductsOpen(true);
  };

  const closeProductsSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setProductsOpen(false);
      closeTimer.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

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

          <div
            className="relative"
            onMouseEnter={openProducts}
            onMouseLeave={closeProductsSoon}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setProductsOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setProductsOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
              onFocus={openProducts}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                productActive ? "text-ink" : "text-ink-dim hover:text-ink"
              }`}
            >
              产品
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div
              className={`fixed left-0 right-0 top-12 z-50 transition-opacity ${
                productsOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <div className="border-b border-line-soft bg-white/95 shadow-sm backdrop-blur-xl">
                <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8 px-5 pb-8 pt-10">
                  {productGroups.map((group) => (
                    <div key={group.title}>
                      <div className="px-3 text-[12px] text-ink-faint">
                        {group.title}
                      </div>
                      <div className="mt-3 flex flex-col">
                        {group.items.map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => setProductsOpen(false)}
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

          <Link
            href="/community"
            className="rounded-full px-3 py-1.5 text-[13px] text-ink-dim transition-colors hover:text-ink"
          >
            加入社群
          </Link>
          <Link
            href="/api"
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
            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              课程
            </Link>
            <Link
              href="/bench"
              onClick={() => setOpen(false)}
              className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              Crypto bench
            </Link>
            <Link
              href="/api"
              onClick={() => setOpen(false)}
              className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              API
            </Link>
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              加入社群
            </Link>
            <Link
              href="/api"
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
