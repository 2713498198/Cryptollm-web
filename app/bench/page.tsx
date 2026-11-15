import type { Metadata } from "next";
import { LinkButton, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Crypto bench",
  description: "玄知密码学基准测试平台入口。",
};

export default function BenchPage() {
  return (
    <Section
      eyebrow="Crypto bench"
      title="密码学基准测试平台"
      subtitle="Crypto bench 系统由接入团队提供，系统就绪后入口链接将挂到官网。"
      headingLevel="h1"
    >
      <div className="max-w-2xl border-t border-line pt-5">
        <p className="text-sm leading-7 text-ink-dim">
          当前为前台入口占位。系统上线后，这里将提供可直接跳转的链接与说明。
        </p>
        <div className="mt-5">
          <LinkButton href="#" variant="ghost" disabled>
            进入 Crypto bench（待接入）
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
