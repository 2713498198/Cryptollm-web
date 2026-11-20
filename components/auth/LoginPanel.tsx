"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "./AuthProvider";
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "./AuthIcons";

type LoginMode = "phone" | "account";
type Notice = {
  tone: "error" | "info" | "success";
  message: string;
};

const phonePattern = /^1[3-9]\d{9}$/;

export default function LoginPanel() {
  const router = useRouter();
  const { loginWithPhone } = useAuth();
  const [mode, setMode] = useState<LoginMode>("phone");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [account, setAccount] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [showAccountPassword, setShowAccountPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(
      () => setCountdown((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [countdown]);

  const switchMode = (nextMode: LoginMode) => {
    setMode(nextMode);
    setNotice(null);
  };

  const sendVerificationCode = () => {
    if (!phonePattern.test(phone)) {
      setNotice({ tone: "error", message: "请输入正确的 11 位手机号" });
      return;
    }
    if (countdown > 0) return;

    setCountdown(60);
    setNotice({
      tone: "success",
      message: "验证码已发送，开发环境可输入任意 6 位数字",
    });
    codeInputRef.current?.focus();
  };

  const submitPhoneLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phonePattern.test(phone)) {
      setNotice({ tone: "error", message: "请输入正确的 11 位手机号" });
      return;
    }
    if (!/^\d{6}$/.test(verificationCode)) {
      setNotice({ tone: "error", message: "请输入 6 位验证码" });
      return;
    }

    setSubmitting(true);
    setNotice(null);
    await new Promise((resolve) => window.setTimeout(resolve, 550));
    const result = loginWithPhone(phone);
    setSubmitting(false);
    setNotice({
      tone: "success",
      message: result.isNewUser
        ? "首次登录成功，已为你创建账号"
        : "登录成功，正在进入控制台",
    });
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    router.push("/");
  };

  const submitAccountLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!account.trim() || !accountPassword) {
      setNotice({ tone: "error", message: "请输入账号和密码" });
      return;
    }
    setNotice({
      tone: "info",
      message: "账号密码登录界面已完成，认证功能将在后端接入后开放",
    });
  };

  return (
    <div className="relative flex min-h-[calc(100dvh_-_3.5rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-[12%] h-52 w-52 rounded-full bg-accent/[0.045] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[5%] right-[5%] h-64 w-64 rounded-full bg-violet/[0.045] blur-3xl"
      />

      <div className="relative w-full max-w-[496px] rounded-[18px] border border-[#e7eaf0] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(36,55,88,0.10)] sm:px-8 sm:py-9">
        <div
          role="tablist"
          aria-label="登录方式"
          className="flex items-center gap-8 border-b border-[#edf0f4]"
        >
          <button
            role="tab"
            type="button"
            aria-selected={mode === "phone"}
            onClick={() => switchMode("phone")}
            className={`relative pb-4 text-[18px] font-semibold transition-colors ${
              mode === "phone" ? "text-ink" : "text-[#666b75] hover:text-ink"
            }`}
          >
            手机号登录
            <span
              className={`absolute inset-x-0 bottom-[-1px] mx-auto h-[3px] rounded-full bg-accent transition-all ${
                mode === "phone" ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={mode === "account"}
            onClick={() => switchMode("account")}
            className={`relative pb-4 text-[18px] transition-colors ${
              mode === "account"
                ? "font-semibold text-ink"
                : "font-normal text-[#666b75] hover:text-ink"
            }`}
          >
            账号登录
            <span
              className={`absolute inset-x-0 bottom-[-1px] mx-auto h-[3px] rounded-full bg-accent transition-all ${
                mode === "account" ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </button>
        </div>

        {mode === "phone" ? (
          <form className="mt-8" onSubmit={submitPhoneLogin}>
            <div className="space-y-5">
              <div className="flex h-[62px] overflow-hidden rounded-[12px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
                <button
                  type="button"
                  aria-label="国家或地区代码 +86"
                  className="flex w-[104px] shrink-0 items-center justify-center gap-2 border-r border-[#e5e8ed] text-[16px] font-medium text-[#353942]"
                >
                  +86
                  <ChevronDownIcon className="h-4 w-4 text-[#6f7580]" />
                </button>
                <label className="min-w-0 flex-1">
                  <span className="sr-only">手机号</span>
                  <input
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))
                    }
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="请输入手机号"
                    className="h-full w-full bg-transparent px-5 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                  />
                </label>
              </div>

              <div className="flex h-[62px] overflow-hidden rounded-[12px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">验证码</span>
                  <input
                    ref={codeInputRef}
                    value={verificationCode}
                    onChange={(event) =>
                      setVerificationCode(
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    placeholder="请输入验证码"
                    className="h-full w-full bg-transparent px-5 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                  />
                </label>
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={countdown > 0}
                  className="w-[132px] shrink-0 border-l border-[#e5e8ed] text-[15px] font-medium text-accent transition-colors hover:bg-[#f7f9ff] disabled:cursor-default disabled:text-ink-faint"
                >
                  {countdown > 0 ? `${countdown}s 后重试` : "获取验证码"}
                </button>
              </div>
            </div>

            <div className="mt-3 min-h-[24px]" aria-live="polite">
              {notice && (
                <p
                  className={`text-[13px] leading-6 ${
                    notice.tone === "error"
                      ? "text-[#e5484d]"
                      : notice.tone === "success"
                        ? "text-[#168a55]"
                        : "text-accent"
                  }`}
                >
                  {notice.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex h-[60px] w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#1e63ff_0%,#0b57f0_100%)] text-[18px] font-semibold text-white shadow-[0_8px_18px_rgba(11,87,240,0.18)] transition-all hover:translate-y-[-1px] hover:shadow-[0_10px_22px_rgba(11,87,240,0.25)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "登录中..." : "登录 / 注册"}
            </button>

            <p className="mt-6 text-center text-[12px] leading-5 text-[#9aa0aa]">
              未注册手机号验证后将自动创建账号
            </p>
          </form>
        ) : (
          <form className="mt-8" onSubmit={submitAccountLogin}>
            <div className="space-y-5">
              <label className="block">
                <span className="sr-only">用户名、邮箱或手机号</span>
                <input
                  value={account}
                  onChange={(event) => setAccount(event.target.value)}
                  autoComplete="username"
                  placeholder="请输入用户名/邮箱/手机号"
                  className="h-[62px] w-full rounded-[12px] border border-[#dfe3e9] bg-white px-5 text-[16px] text-ink outline-none transition-colors placeholder:text-[#999eaa] focus:border-accent focus:ring-4 focus:ring-accent/[0.06]"
                />
              </label>

              <div className="flex h-[62px] overflow-hidden rounded-[12px] border border-[#dfe3e9] bg-white transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/[0.06]">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">密码</span>
                  <input
                    value={accountPassword}
                    onChange={(event) => setAccountPassword(event.target.value)}
                    type={showAccountPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="请输入密码"
                    className="h-full w-full bg-transparent px-5 text-[16px] text-ink outline-none placeholder:text-[#999eaa]"
                  />
                </label>
                <button
                  type="button"
                  aria-label={showAccountPassword ? "隐藏密码" : "显示密码"}
                  onClick={() => setShowAccountPassword((value) => !value)}
                  className="flex w-14 items-center justify-center text-[#6f7580] transition-colors hover:text-ink"
                >
                  {showAccountPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 min-h-[24px]" aria-live="polite">
              {notice && (
                <p
                  className={`text-[13px] leading-6 ${
                    notice.tone === "error" ? "text-[#e5484d]" : "text-accent"
                  }`}
                >
                  {notice.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 flex h-[60px] w-full items-center justify-center rounded-[12px] bg-[linear-gradient(180deg,#1e63ff_0%,#0b57f0_100%)] text-[18px] font-semibold text-white shadow-[0_8px_18px_rgba(11,87,240,0.18)] transition-all hover:translate-y-[-1px] hover:shadow-[0_10px_22px_rgba(11,87,240,0.25)] active:translate-y-0"
            >
              登录
            </button>

            <button
              type="button"
              onClick={() =>
                setNotice({
                  tone: "info",
                  message: "找回密码功能将在账号体系接入后开放",
                })
              }
              className="mt-6 text-[14px] text-accent transition-opacity hover:opacity-75"
            >
              忘记密码？
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
