import Link from "next/link";

const columns = [
  {
    title: "产品",
    links: [
      { href: "/courses", label: "课程" },
      { href: "/bench", label: "Crypto bench" },
      { href: "/api", label: "API" },
    ],
  },
  {
    title: "动态与研究",
    links: [
      { href: "/news", label: "新闻动态" },
      { href: "/research", label: "研究成果" },
    ],
  },
  {
    title: "社群",
    links: [{ href: "/community", label: "加入社群" }],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="font-display text-lg font-semibold text-ink">
            玄知{" "}
            <span className="font-mono text-[10px] font-normal text-ink-faint">
              CRYPTOLLM
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink-dim">
            面向密码学领域的大语言模型。分析密码算法，验证协议安全，审计工程实现。
          </p>
          <p className="mt-4 font-mono text-[10px] text-ink-faint">
            Powered by XDU NSS
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="border-b border-line pb-2 font-mono text-[10px] text-ink-faint">
              {col.title}
            </div>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-dim transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-mono text-[10px] text-ink-faint md:flex-row md:items-center md:justify-between">
          <span>© 2026 玄知 CryptoLLM</span>
          <span>ICP 备案号：待补充</span>
        </div>
      </div>
    </footer>
  );
}
