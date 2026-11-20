"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/lib/auth-utils";
import {
  ChevronDownIcon,
  CopyIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from "./AuthIcons";
import { useAuth } from "./AuthProvider";

type UserMenuProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function UserMenu({
  mobile = false,
  onNavigate,
}: UserMenuProps) {
  const router = useRouter();
  const { user, isReady, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  if (!isReady || !user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={
          mobile
            ? "rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
            : "rounded-lg px-2.5 py-1.5 text-[14px] text-ink-dim transition-colors hover:text-ink"
        }
      >
        登录
      </Link>
    );
  }

  const handleCopy = async () => {
    try {
      await copyToClipboard(user.userId);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    onNavigate?.();
    router.push("/login");
  };

  if (mobile) {
    return (
      <div className="mt-2 border-t border-line-soft pt-2">
        <div className="flex items-center gap-3 px-3 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce4ff] text-[#5f7fff]">
            <UserIcon className="h-[19px] w-[19px]" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-ink">
              {user.username}
            </div>
            <div className="truncate text-xs text-ink-faint">
              账号 ID：{user.userId}
            </div>
          </div>
        </div>
        <Link
          href="/account/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-dim hover:bg-surface hover:text-ink"
        >
          <SettingsIcon className="h-[18px] w-[18px]" />
          账号设置
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-dim hover:bg-surface hover:text-ink"
        >
          <LogoutIcon className="h-[18px] w-[18px]" />
          退出登录
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 140);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex items-center gap-2 rounded-lg py-1 pl-2.5 pr-1 transition-colors hover:bg-surface">
        <Link
          href="/account/settings"
          className="hidden text-[14px] text-ink-dim transition-colors hover:text-ink sm:inline"
        >
          控制台
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label="打开用户菜单"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1 rounded-full"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce4ff] text-[#6582ff] ring-2 ring-transparent transition-all hover:ring-[#dce4ff]">
            <UserIcon className="h-[18px] w-[18px]" />
          </span>
          <ChevronDownIcon
            className={`h-3.5 w-3.5 text-ink-faint transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        role="menu"
        className={`absolute right-0 top-[calc(100%+8px)] z-[80] w-[264px] rounded-[12px] border border-[#e8ebf0] bg-white p-0 shadow-[0_14px_42px_rgba(24,39,75,0.14)] transition-all duration-150 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-6">
          <div className="flex items-center gap-2">
            <span className="max-w-[170px] truncate text-[18px] font-medium leading-6 text-ink">
              {user.username}
            </span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#fff0ed] text-[#ff5630]">
              <svg
                aria-hidden="true"
                fill="none"
                height="13"
                viewBox="0 0 16 16"
                width="13"
              >
                <rect
                  height="10"
                  rx="1.5"
                  stroke="currentColor"
                  width="12"
                  x="2"
                  y="3"
                />
                <path
                  d="M5 6h6M5 9h4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.2"
                />
              </svg>
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[14px] text-ink-faint">
            <span className="truncate">
              账号ID：{user.userId.slice(0, 8)}...
            </span>
            <button
              type="button"
              aria-label="复制账号 ID"
              onClick={handleCopy}
              className="relative shrink-0 rounded p-1 text-[#7b8494] transition-colors hover:bg-surface hover:text-ink"
            >
              <CopyIcon className="h-[18px] w-[18px]" />
              {copied && (
                <span className="absolute -right-7 -top-8 whitespace-nowrap rounded bg-ink px-2 py-1 text-[11px] text-white">
                  已复制
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-[#edf0f4]" />

        <div className="py-2">
          <Link
            role="menuitem"
            href="/account/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-6 py-3 text-[15px] text-ink transition-colors hover:bg-[#f7f9fc]"
          >
            <SettingsIcon className="h-[19px] w-[19px]" />
            账号设置
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-6 py-3 text-left text-[15px] text-ink transition-colors hover:bg-[#f7f9fc]"
          >
            <LogoutIcon className="h-[19px] w-[19px]" />
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}
