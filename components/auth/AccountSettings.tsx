"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  ChevronDownIcon,
  CopyIcon,
  EditIcon,
  GaugeIcon,
  GiftIcon,
  IdCardIcon,
  InfoIcon,
  LockIcon,
  UserGroupIcon,
  UserIcon,
} from "./AuthIcons";
import { useAuth } from "./AuthProvider";
import ChangePasswordDialog from "./ChangePasswordDialog";
import {
  copyToClipboard,
  formatRegistrationTime,
  maskPhone,
} from "@/lib/auth-utils";

type SidebarItem = {
  label: string;
  icon: typeof UserIcon;
  active?: boolean;
};

const sidebarGroups: Array<{
  title: string;
  collapsible?: boolean;
  items: SidebarItem[];
}> = [
  {
    title: "设置",
    collapsible: true,
    items: [
      { label: "账号设置", icon: UserIcon, active: true },
      { label: "实名认证", icon: UserGroupIcon },
      { label: "授权管理", icon: IdCardIcon },
    ],
  },
  {
    title: "项目管理",
    collapsible: true,
    items: [{ label: "速率限制", icon: GaugeIcon }],
  },
  {
    title: "用户权益",
    collapsible: true,
    items: [{ label: "用户权益", icon: GiftIcon }],
  },
  {
    title: "安全管理",
    collapsible: true,
    items: [],
  },
  {
    title: "支持",
    collapsible: true,
    items: [],
  },
];

export default function AccountSettings() {
  const router = useRouter();
  const { user, isReady } = useAuth();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, router, user]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const closePasswordDialog = useCallback(() => {
    setPasswordDialogOpen(false);
  }, []);

  if (!isReady || !user) {
    return (
      <div className="flex min-h-[calc(100dvh_-_3.5rem)] items-center justify-center text-sm text-ink-faint">
        {isReady ? "正在前往登录页..." : "正在读取账号信息..."}
      </div>
    );
  }

  const handleCopyAccountId = async () => {
    try {
      await copyToClipboard(user.userId);
      setNotice("账号 ID 已复制");
    } catch {
      setNotice("复制失败，请手动选择账号 ID");
    }
  };

  const showUnavailable = (label: string) => {
    setNotice(`${label}功能将在后端接口接入后开放`);
  };

  return (
    <>
      {notice && (
        <div
          role="status"
          className="fixed left-1/2 top-20 z-[90] -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1d232d] px-4 py-2.5 text-sm text-white shadow-lg"
        >
          {notice}
        </div>
      )}

      <div className="mx-auto flex min-h-[calc(100dvh_-_3.5rem)] w-full max-w-[1680px] bg-white">
        <aside className="hidden w-[232px] shrink-0 border-r border-[#e8ebf0] bg-[#f9fafc] px-5 py-7 md:flex md:flex-col">
          <Link
            href="/"
            className="flex items-center gap-3 px-1 text-[18px] font-medium text-ink transition-opacity hover:opacity-70"
          >
            <ArrowLeftIcon className="h-[21px] w-[21px]" />
            个人中心
          </Link>

          <nav className="mt-8 space-y-5" aria-label="个人中心导航">
            {sidebarGroups.map((group) => (
              <div key={group.title}>
                <div className="flex items-center justify-between px-3 py-1.5 text-[12px] text-[#9aa0aa]">
                  <span>{group.title}</span>
                  {group.collapsible && (
                    <ChevronDownIcon className="h-3.5 w-3.5 rotate-180" />
                  )}
                </div>
                {group.items.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            if (!item.active) showUnavailable(item.label);
                          }}
                          className={`flex h-10 w-full items-center gap-3 rounded-[8px] px-3 text-left text-[14px] transition-colors ${
                            item.active
                              ? "bg-[#eceef3] font-medium text-ink"
                              : "text-[#676d77] hover:bg-[#f0f2f6] hover:text-ink"
                          }`}
                        >
                          <ItemIcon className="h-[18px] w-[18px]" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 bg-white px-5 pb-16 pt-7 sm:px-7 lg:px-10 xl:px-12">
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 text-[16px] font-medium text-ink"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              个人中心
            </Link>
            <span className="text-[#c2c6ce]">/</span>
            <span className="text-sm text-ink-dim">账号设置</span>
          </div>

          <h1 className="text-[28px] font-semibold tracking-tight text-ink">
            账号设置
          </h1>

          <div className="mt-7">
            <h2 className="text-[16px] font-medium text-ink">基本信息</h2>
            <div className="mt-4 rounded-[7px] border border-[#e4e7ec] px-5 py-6 sm:px-6">
              <div className="grid gap-6 md:grid-cols-[88px_minmax(0,1fr)] md:gap-8">
                <div className="flex justify-center md:justify-start">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#eef1ff] text-[#7893ff]">
                    <UserIcon className="h-[44px] w-[44px]" strokeWidth="1.5" />
                  </div>
                </div>

                <div className="grid gap-x-10 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <div className="flex items-center gap-2 text-[13px] text-[#8f959f]">
                      <span>用户名称：</span>
                      <span className="font-medium text-ink">
                        {user.username}
                      </span>
                      <button
                        type="button"
                        aria-label="修改用户名称"
                        onClick={() => showUnavailable("修改用户名称")}
                        className="text-accent transition-opacity hover:opacity-70"
                      >
                        <EditIcon className="h-[16px] w-[16px]" />
                      </button>
                    </div>
                    <div className="mt-5 text-[13px] text-[#8f959f]">
                      账户属性：
                      <span className="text-ink">个人</span>
                    </div>
                    <div className="mt-5 text-[13px] text-[#8f959f]">
                      注册时间：
                      <span className="text-ink">
                        {formatRegistrationTime(user.registeredAt)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex min-w-0 items-center gap-1 text-[13px] text-[#8f959f]">
                      <span className="shrink-0">账号 ID：</span>
                      <span className="truncate text-ink">{user.userId}</span>
                      <button
                        type="button"
                        aria-label="复制账号 ID"
                        onClick={handleCopyAccountId}
                        className="shrink-0 text-[#8f959f] transition-colors hover:text-ink"
                      >
                        <CopyIcon className="h-[16px] w-[16px]" />
                      </button>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-[#8f959f]">
                      <span>联系邮箱：</span>
                      <span className="text-ink">
                        {user.email || "未设置"}
                      </span>
                      <button
                        type="button"
                        onClick={() => showUnavailable("绑定邮箱")}
                        className="font-medium text-accent transition-opacity hover:opacity-70"
                      >
                        绑定邮箱
                      </button>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-[13px] text-[#8f959f]">
                      <span>双重认证：</span>
                      <button
                        type="button"
                        aria-label="双重认证暂未开启"
                        onClick={() => showUnavailable("双重认证")}
                        className="relative h-[20px] w-[38px] rounded-full bg-[#d7dbe2]"
                      >
                        <span className="absolute left-[2px] top-[2px] h-4 w-4 rounded-full bg-white shadow-sm" />
                      </button>
                      <InfoIcon className="h-[18px] w-[18px]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex min-w-0 items-center gap-1 text-[13px] text-[#8f959f]">
                      <span className="shrink-0">手机号码：</span>
                      <span className="truncate text-ink">
                        +86 {maskPhone(user.phone)}
                      </span>
                      <button
                        type="button"
                        aria-label="修改手机号码"
                        onClick={() => showUnavailable("修改手机号码")}
                        className="shrink-0 text-accent transition-opacity hover:opacity-70"
                      >
                        <EditIcon className="h-[16px] w-[16px]" />
                      </button>
                    </div>
                    <div className="mt-5 text-[13px] text-[#8f959f]">
                      可用余额：
                      <span className="text-ink">¥ {user.balance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9">
            <h2 className="text-[16px] font-medium text-ink">安全设置</h2>
            <div className="mt-4 overflow-hidden rounded-[7px] border border-[#e4e7ec] bg-white">
              <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-6">
                <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_14px_rgba(11,87,240,0.18)]">
                  <LockIcon className="h-7 w-7" strokeWidth="1.7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-medium text-ink">
                    登录密码
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-[#8f959f]">
                    安全性高的密码可以使账号更安全，建议您定期更换密码
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPasswordDialogOpen(true)}
                  className="h-[38px] min-w-[76px] self-start rounded-[6px] bg-accent px-5 text-[14px] font-medium text-white transition-all hover:brightness-110 sm:self-auto"
                >
                  修改
                </button>
              </div>

              <div className="mx-5 h-px bg-[#eef0f3] sm:mx-6" />

              <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-6">
                <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#e3e6eb] text-white">
                  <BadgeCheckIcon className="h-8 w-8" strokeWidth="1.8" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[15px] font-medium text-ink">
                    实名认证
                    <span className="text-[13px] font-normal text-[#f47b20]">
                      未认证
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-[#8f959f]">
                    您尚未完成实名认证，认证成功后即可使用API Key等功能
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showUnavailable("实名认证")}
                  className="h-[38px] min-w-[76px] self-start rounded-[6px] bg-accent px-5 text-[14px] font-medium text-white transition-all hover:brightness-110 sm:self-auto"
                >
                  认证
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex flex-col gap-4 rounded-[7px] border border-[#e4e7ec] bg-white px-5 py-6 sm:flex-row sm:items-center sm:px-6">
              <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#e3e6eb] text-white">
                <UserGroupIcon className="h-8 w-8" strokeWidth="1.8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-medium text-ink">注销账号</div>
                <p className="mt-1 text-[13px] leading-6 text-[#8f959f]">
                  如果您不再使用此账号，可以将其注销。账号成功注销后，其下所有服务、数据及隐私信息将会被删除并将无法恢复。
                </p>
              </div>
              <button
                type="button"
                onClick={() => showUnavailable("注销账号")}
                className="h-[38px] min-w-[76px] self-start rounded-[6px] bg-[#f04444] px-5 text-[14px] font-medium text-white transition-all hover:brightness-110 sm:self-auto"
              >
                注销
              </button>
            </div>
          </div>
        </section>
      </div>

      {passwordDialogOpen && (
        <ChangePasswordDialog
          open
          user={user}
          onClose={closePasswordDialog}
          onSuccess={setNotice}
        />
      )}
    </>
  );
}
