import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "加入社群",
  description: "加入玄知客户交流群，与大家一起交流。",
};

export default function CommunityPage() {
  return (
    <Section
      eyebrow="客户交流群"
      title="加入社群，一起交流"
      subtitle="客户交流群长期运营，扫码即可加入。"
      headingLevel="h1"
    >
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-surface text-center">
          <span className="text-sm text-ink-dim">群二维码</span>
          <span className="text-xs text-ink-faint">待补充</span>
        </div>
        <div className="max-w-md">
          <h2 className="text-lg font-semibold text-ink">如何加群</h2>
          <p className="mt-3 text-sm leading-6 text-ink-dim">
            群二维码与加群说明待补充。届时这里将提供扫码入口，并同步到全站页脚的“加入社群”。
          </p>
        </div>
      </div>
    </Section>
  );
}
