import type { Metadata } from "next";
import { versions } from "@/content/versions";
import { Section, VersionCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "产品中心",
  description: "玄知大模型已发布 4 个版本，每个版本配有 3 个宣传视频。",
};

export default function ProductsPage() {
  return (
    <Section
      eyebrow="产品中心"
      title="4 个版本，每个版本 3 个宣传视频"
      subtitle="选择版本查看能力介绍、宣传视频与使用入口。V3 公开访问，V4 邀请码内测。"
      headingLevel="h1"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {versions.map((version) => (
          <VersionCard key={version.slug} version={version} />
        ))}
      </div>
    </Section>
  );
}
