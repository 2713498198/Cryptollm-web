import type { Metadata } from "next";
import { papers } from "@/content/papers";
import { PlaceholderBadge, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "研究成果",
  description: "玄知大模型相关论文研究成果，提供 PDF 查看与下载。",
};

export default function ResearchPage() {
  return (
    <Section
      eyebrow="研究成果"
      title="论文与研究成果"
      subtitle="汇总玄知相关的全部论文，按年份与方向整理，提供 PDF 查看与下载。"
      headingLevel="h1"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-ink-dim">论文列表</span>
        <PlaceholderBadge />
      </div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-line bg-surface px-6 py-3 text-xs text-ink-dim md:grid-cols-[2fr_1.2fr_1fr_1fr_auto]">
          <span>标题</span>
          <span className="hidden md:block">作者</span>
          <span className="hidden md:block">来源</span>
          <span className="hidden md:block">年份</span>
          <span>PDF</span>
        </div>
        {papers.map((paper) => (
          <div
            key={paper.title}
            className="grid grid-cols-[1fr_auto] gap-4 border-b border-line-soft px-6 py-4 text-sm last:border-b-0 md:grid-cols-[2fr_1.2fr_1fr_1fr_auto]"
          >
            <div>
              <div className="font-medium text-ink">{paper.title}</div>
              <p className="mt-1 text-xs leading-5 text-ink-dim md:hidden">
                {paper.authors} · {paper.venue}
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink-faint">
                {paper.abstract}
              </p>
            </div>
            <div className="hidden text-ink-dim md:block">{paper.authors}</div>
            <div className="hidden text-ink-dim md:block">{paper.venue}</div>
            <div className="hidden text-ink-dim md:block">{paper.year}</div>
            <div className="text-right">
              {paper.pdfUrl ? (
                <a href={paper.pdfUrl} className="text-accent hover:underline">
                  下载
                </a>
              ) : (
                <span className="text-ink-faint">待补充</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
