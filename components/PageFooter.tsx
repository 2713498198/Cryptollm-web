"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";

export default function PageFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteFooter />;
}
