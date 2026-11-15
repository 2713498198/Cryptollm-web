import type { Version } from "./types";

export const versions: Version[] = [
  {
    slug: "v3",
    name: "玄知 V3",
    tagline: "公开访问",
    description:
      "打开即用，无需申请。以对话方式使用，面向所有人开放。",
    features: ["公开访问", "对话方式", "无需申请"],
    videos: [
      { title: "宣传视频 1", note: "待补充" },
      { title: "宣传视频 2", note: "待补充" },
      { title: "宣传视频 3", note: "待补充" },
    ],
    access: {
      type: "public",
      label: "体验 V3",
      note: "接入系统由接入团队提供，链接待接入后替换。",
    },
  },
  {
    slug: "v4",
    name: "玄知 V4",
    tagline: "邀请码内测",
    description:
      "内测版本，需要申请邀请码后才能体验。",
    features: ["内测版本", "邀请码申请"],
    videos: [
      { title: "宣传视频 1", note: "待补充" },
      { title: "宣传视频 2", note: "待补充" },
      { title: "宣传视频 3", note: "待补充" },
    ],
    access: {
      type: "invite",
      label: "申请邀请码",
      note: "邀请码机制由接入团队提供，链接待接入后替换。",
    },
  },
  {
    slug: "v1",
    name: "玄知 V1",
    tagline: "待补充",
    description:
      "版本介绍待补充。",
    features: ["待补充"],
    videos: [
      { title: "宣传视频 1", note: "待补充" },
      { title: "宣传视频 2", note: "待补充" },
      { title: "宣传视频 3", note: "待补充" },
    ],
    access: {
      type: "none",
      label: "使用入口待定",
      note: "V1 使用入口待补充。",
    },
  },
  {
    slug: "v2",
    name: "玄知 V2",
    tagline: "待补充",
    description:
      "版本介绍待补充。",
    features: ["待补充"],
    videos: [
      { title: "宣传视频 1", note: "待补充" },
      { title: "宣传视频 2", note: "待补充" },
      { title: "宣传视频 3", note: "待补充" },
    ],
    access: {
      type: "none",
      label: "使用入口待定",
      note: "V2 使用入口待补充。",
    },
  },
];
