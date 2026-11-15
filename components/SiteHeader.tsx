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

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group relative py-1 text-[13px] text-ink-dim transition-colors hover:text-ink"
    >
      <span className={active ? "text-ink" : undefined}>{label}</span>
      <span
        className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-opacity ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
      />
    </Link>
  );
}

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
    <header className="sticky top-0 z-50 h-12 border-b border-line bg-bg/95">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-baseline gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-[18px] font-semibold tracking-tight text-ink">
            玄知
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] text-ink-faint">
            CRYPTOLLM
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/" label="首页" active={pathname === "/"} />

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
              className="group relative py-1 text-[13px] text-ink-dim transition-colors hover:text-ink"
            >
              <span className={productActive ? "text-ink" : undefined}>产品</span>
              <span
                className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-opacity ${
                  productActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
              />
            </button>

            <div
              className={`fixed left-0 right-0 top-12 z-50 transition-opacity ${
                productsOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="border-b border-line bg-bg">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-5 pb-8 pt-8">
                  {productGroups.map((group) => (
                    <div key={group.title}>
                      <div className="border-b border-line pb-3 font-mono text-[10px] text-ink-faint">
                        {group.title}
                      </div>
                      <div className="mt-3 flex flex-col">
                        {group.items.map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            onClick={() => setProductsOpen(false)}
                            className="py-2 text-[14px] text-ink transition-colors hover:text-accent"
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

          <NavLink
            href="/news"
            label="新闻动态"
            active={pathname.startsWith("/news")}
          />
          <NavLink
            href="/research"
            label="研究成果"
            active={pathname.startsWith("/research")}
          />
          <NavLink
            href="/community"
            label="加入社群"
            active={pathname.startsWith("/community")}
          />
          <NavLink
            href="/login"
            label="登录"
            active={pathname.startsWith("/login")}
          />
        </nav>

        <button
          type="button"
          aria-label="打开菜单"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-ink md:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
        <nav className="border-t border-line bg-bg px-5 py-4 md:hidden">
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-3 text-sm text-ink"
            >
              首页
            </Link>
            <div className="border-b border-line-soft py-3 font-mono text-[10px] text-ink-faint">
              模型
            </div>
            {productGroups[0].items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-3 pl-4 text-sm text-ink-dim"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-b border-line-soft py-3 font-mono text-[10px] text-ink-faint">
              其他产品
            </div>
            {productGroups[1].items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-3 pl-4 text-sm text-ink-dim"
              >
                {item.label}
              </Link>
            ))}
            {[
              { href: "/news", label: "新闻动态" },
              { href: "/research", label: "研究成果" },
              { href: "/community", label: "加入社群" },
              { href: "/login", label: "登录" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-3 text-sm text-ink-dim"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
