import type { Metadata } from "next";
import AccountSettings from "@/components/auth/AccountSettings";

export const metadata: Metadata = {
  title: "账号设置",
  description: "管理玄知 CryptoLLM 账号信息与安全设置。",
  robots: { index: false, follow: false },
};

export default function AccountSettingsPage() {
  return <AccountSettings />;
}
