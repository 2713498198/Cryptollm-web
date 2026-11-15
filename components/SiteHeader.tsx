"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "首页" },
  { href: "/products", label: "产品" },
  { href: "/bench", label: "Crypto bench" },
  { href: "/api", label: "API" },
  { href: "/courses", label: "课程" },
  { href: "/news", label: "新闻" },
  { href: "/research", label: "研究" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "text-ink"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/api"
            className="ml-2 rounded-full px-3 py-1.5 text-[13px] text-ink-dim transition-colors hover:text-ink"
          >
            登录
          </Link>
          <Link
            href="/community"
            className="ml-2 rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-strong"
          >
            加入社群
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
              href="/api"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            >
              登录
            </Link>
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              加入社群
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
