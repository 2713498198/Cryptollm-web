import type { Metadata } from "next";
import LoginPanel from "@/components/auth/LoginPanel";

export const metadata: Metadata = {
  title: "登录",
  description: "登录或注册玄知 CryptoLLM 账号。",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginPanel />;
}
