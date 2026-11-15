"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/news", label: "新闻" },
  { href: "/research", label: "研究" },
];

const productGroups = [
  {
    title: "探索产品",
    items: [
      { href: "/products", label: "全部版本", large: true },
      { href: "/products/v3", label: "玄知 V3", large: true },
      { href: "/products/v4", label: "玄知 V4", large: true },
      { href: "/products/v1", label: "玄知 V1", large: true },
      { href: "/products/v2", label: "玄知 V2", large: true },
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
      { href: "/community", label: "加入社群" },
    ],
  },
];

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

          <div className="group relative">
            <button
              type="button"
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

            <div className="invisible fixed left-0 right-0 top-12 z-50 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="border-b border-line-soft bg-white/95 shadow-sm backdrop-blur-xl">
                <div className="mx-auto grid max-w-6xl grid-cols-[1.3fr_1fr_1fr] gap-10 px-5 pb-8 pt-10">
                  {productGroups.map((group) => (
                    <div key={group.title}>
                      <div className="text-[12px] text-ink-faint">
                        {group.title}
                      </div>
                      <div className="mt-4 flex flex-col">
                        {group.items.map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            className={
                              "large" in item && item.large
                                ? "py-1 text-[22px] font-semibold tracking-tight text-ink hover:text-ink-dim"
                                : "py-1.5 text-[13px] text-ink-dim hover:text-ink"
                            }
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mx-auto max-w-6xl px-5 pb-5">
                  <Link
                    href="/products"
                    className="text-[12px] text-ink-faint hover:text-ink"
                  >
                    查看全部产品
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                  active ? "text-ink" : "text-ink-dim hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

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
              href="/products"
              onClick={() => setOpen(false)}
              className="rounded-lg py-2.5 pl-8 pr-3 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              全部版本
            </Link>
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
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
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
