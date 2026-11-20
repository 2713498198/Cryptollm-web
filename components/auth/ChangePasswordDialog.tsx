"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AuthUser } from "./AuthProvider";
import {
  ChevronDownIcon,
  EyeIcon,
  EyeOffIcon,
  XIcon,
} from "./AuthIcons";
import { maskPhone } from "@/lib/auth-utils";

type ChangePasswordDialogProps = {
  open: boolean;
  user: AuthUser;
  onClose: () => void;
  onSuccess: (message: string) => void;
};

export default function ChangePasswordDialog({
  open,
  user,
  onClose,
  onSuccess,
}: ChangePasswordDialogProps) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    codeInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(
      () => setCountdown((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [countdown]);

  if (!open) return null;

  const sendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    setError("");
    codeInputRef.current?.focus();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("请输入 6 位验证码");
      return;
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("密码至少 8 个字符，且需同时包含字母和数字");
      return;
    }
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    onSuccess("密码校验通过，后端密码修改接口接入后将正式生效");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1b2434]/[0.28] px-4 py-8 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-[496px] overflow-y-auto rounded-[10px] border border-[#e3e6eb] bg-white px-6 py-6 shadow-[0_22px_70px_rgba(22,32,51,0.24)] sm:px-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              id="change-password-title"
              className="text-[24px] font-semibold tracking-tight text-ink"
            >
              修改密码
            </h2>
          </div>
          <button
            type="button"
            aria-label="关闭修改密码窗口"
            onClick={onClose}
            className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-[#9aa0aa] transition-colors hover:bg-surface hover:text-ink"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form className="mt-5" onSubmit={submit}>
          <div className="space-y-4">
            <div className="flex h-[54px] overflow-hidden rounded-[9px] border border-[#dfe3e9] bg-[#fafbfc]">
              <span className="flex w-[102px] shrink-0 items-center justify-center gap-2 border-r border-[#e5e8ed] text-[16px] text-[#5f6570]">
                +86
                <ChevronDownIcon className="h-4 w-4" />
              </span>
              <span className="flex flex-1 items-center px-4 text-[16px] text-[#8e949e]">
                {maskPhone(user.phone)}
              </span>
            </div>

            <div className="flex h-[54px] overflow-hidden rounded-[9px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
              <label className="min-w-0 flex-1">
                <span className="sr-only">验证码</span>
                <input
                  ref={codeInputRef}
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="请输入验证码"
                  className="h-full w-full bg-transparent px-4 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                />
              </label>
              <button
                type="button"
                disabled={countdown > 0}
                onClick={sendCode}
                className="w-[126px] shrink-0 border-l border-[#e5e8ed] text-[15px] font-medium text-accent transition-colors hover:bg-[#f7f9ff] disabled:cursor-default disabled:text-ink-faint"
              >
                {countdown > 0 ? `${countdown}s 后重试` : "获取验证码"}
              </button>
            </div>

            <div className="flex h-[54px] overflow-hidden rounded-[9px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
              <label className="min-w-0 flex-1">
                <span className="sr-only">新密码</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="至少8个字符，包含字母+数字"
                  className="h-full w-full bg-transparent px-4 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                />
              </label>
              <button
                type="button"
                aria-label={showPassword ? "隐藏新密码" : "显示新密码"}
                onClick={() => setShowPassword((value) => !value)}
                className="flex w-12 items-center justify-center text-[#6f7580] transition-colors hover:text-ink"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex h-[54px] overflow-hidden rounded-[9px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
              <label className="min-w-0 flex-1">
                <span className="sr-only">再次输入新密码</span>
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="请再次输入密码"
                  className="h-full w-full bg-transparent px-4 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                />
              </label>
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "隐藏确认密码" : "显示确认密码"
                }
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="flex w-12 items-center justify-center text-[#6f7580] transition-colors hover:text-ink"
              >
                {showConfirmPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="min-h-[28px] pt-2" aria-live="polite">
            {error && (
              <p className="text-[13px] leading-5 text-[#e5484d]">{error}</p>
            )}
          </div>

          <div className="mt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[46px] min-w-[112px] rounded-[8px] bg-[#f1f3f7] px-6 text-[16px] font-medium text-ink transition-colors hover:bg-[#e9ecf2]"
            >
              取消
            </button>
            <button
              type="submit"
              className="h-[46px] min-w-[112px] rounded-[8px] bg-[#1d1f22] px-6 text-[16px] font-medium text-white transition-colors hover:bg-black"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
