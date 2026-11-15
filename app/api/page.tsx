import type { Metadata } from "next";
import { LinkButton, PlaceholderBadge, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "API 开放平台",
  description: "玄知开放 API：购买计费、API 管理与接入说明文档。",
};

export default function ApiPage() {
  return (
    <Section
      eyebrow="API"
      title="开放 API"
      subtitle="开放 API 访问，包含购买计费、用量管理与接入文档。"
      headingLevel="h1"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">购买计费</h2>
            <PlaceholderBadge />
          </div>
          <p className="mt-3 flex-1 text-sm leading-6 text-ink-dim">
            API 购买与计费。方案拟参考智谱 GLM 5.3 系列，以接入团队确认为准。
          </p>
        </div>
        <div className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">API 管理</h2>
            <PlaceholderBadge />
          </div>
          <p className="mt-3 flex-1 text-sm leading-6 text-ink-dim">
            API 密钥与用量管理，待接入团队提供。
          </p>
        </div>
        <div className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">接入说明文档</h2>
            <PlaceholderBadge />
          </div>
          <p className="mt-3 flex-1 text-sm leading-6 text-ink-dim">
            访问方式与连接方式说明文档，待接入团队提供。
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[14px] border border-line bg-surface p-6">
        <h2 className="text-base font-semibold text-ink">统一账号登录</h2>
        <p className="mt-2 text-sm leading-6 text-ink-dim">
          统一账号：一个账号登录整个玄知系统。能力由接入团队提供，前台仅保留入口。
        </p>
        <div className="mt-5">
          <LinkButton href="#" variant="ghost" disabled>
            登录 / 注册（待接入）
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
