import type { Metadata } from "next";
import "./globals.css";
import PageFooter from "@/components/PageFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://cryptollm.net"),
  title: {
    default: "玄知 CryptoLLM — 让密码更智能，让世界更安全",
    template: "%s | 玄知 CryptoLLM",
  },
  description:
    "玄知大模型（CryptoLLM）是面向密码学领域的大语言模型，提供密码算法分析、协议安全验证与工程合规审计能力。",
  openGraph: {
    title: "玄知 CryptoLLM",
    description: "让密码更智能，让世界更安全",
    url: "https://cryptollm.net",
    siteName: "玄知 CryptoLLM",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink focus:shadow-lg"
        >
          跳到主内容
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}
