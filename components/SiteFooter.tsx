import Link from "next/link";

const columns = [
  {
    title: "产品",
    links: [
      { href: "/products", label: "全部版本" },
      { href: "/courses", label: "课程中心" },
      { href: "/products/v3", label: "玄知 V3" },
      { href: "/products/v4", label: "玄知 V4" },
      { href: "/bench", label: "Crypto bench" },
      { href: "/api", label: "API 开放平台" },
    ],
  },
  {
    title: "内容",
    links: [
      { href: "/news", label: "新闻动态" },
      { href: "/research", label: "研究成果" },
    ],
  },
  {
    title: "社区",
    links: [
      { href: "/community", label: "客户交流群" },
      { href: "/community", label: "加入社群" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="text-lg font-semibold text-ink">
            玄知 <span className="text-sm font-normal text-ink-dim">CryptoLLM</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink-dim">
            让密码更智能，让世界更安全。面向密码学领域的大语言模型。
          </p>
          <p className="mt-4 text-xs text-ink-faint">
            Powered by XDU NSS
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-sm font-medium text-ink">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
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

      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <span>
            © 2026 玄知 CryptoLLM
          </span>
          <span>ICP 备案号：待补充</span>
        </div>
      </div>
    </footer>
  );
}
