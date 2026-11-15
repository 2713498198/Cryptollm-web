import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-5 py-28">
      <div className="font-mono text-[11px] text-ink-faint">404</div>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink md:text-[52px]">
        页面不存在
      </h1>
      <p className="mt-3 text-base text-ink-dim">
        你访问的页面不存在或已被移动。
      </p>
      <div className="mt-6">
        <LinkButton href="/">返回首页</LinkButton>
      </div>
    </div>
  );
}
