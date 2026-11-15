import type { Metadata } from "next";
import { versions } from "@/content/versions";
import { Section, VersionCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "模型",
  description: "玄知大模型已发布 4 个版本，每个版本配有 3 个宣传视频。",
};

export default function ProductsPage() {
  return (
    <Section
      title="模型"
      subtitle="从公开访问到邀请制内测，每个版本包含 3 个宣传视频。"
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
