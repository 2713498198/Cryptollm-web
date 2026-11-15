import type { Metadata } from "next";
import { LinkButton, PlaceholderBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "登录",
  description: "玄知统一账号登录入口。",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh_-_3rem)] max-w-6xl items-center px-5 py-16">
      <div className="max-w-md">
        <div className="text-[13px] text-ink-dim">账号</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          登录
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-ink-dim">
          统一账号登录由接入团队提供，入口待接入。接入后，一个账号即可登录整个玄知系统。
        </p>
        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-accent px-5 py-2 text-[14px] font-medium text-white opacity-40">
            统一登录（待接入）
          </span>
          <PlaceholderBadge />
        </div>
        <div className="mt-8">
          <LinkButton href="/" variant="ghost">
            返回首页
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
