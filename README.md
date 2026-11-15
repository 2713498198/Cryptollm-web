# 玄知 CryptoLLM 官网

玄知大模型（CryptoLLM）官网前台。项目覆盖 A 同学"前台与内容"模块：官网整体设计、落地页、信息架构、4 个版本介绍页与宣传视频板块、课程板块、新闻板块、研究成果板块、客户交流群入口。

## 技术栈

- Next.js（App Router）+ React + TypeScript
- Tailwind CSS
- 静态内容（内容集中在 `content/` 目录）

## 本地运行

```bash
npm install
npm run dev
```

打开 <http://localhost:3000> 查看。

生产构建与启动：

```bash
npm run build
npm run start
```

## 目录说明

- `app/`：页面路由（首页、产品、课程、新闻、研究成果、社区、bench、API）
- `components/`：导航、页脚与共享 UI 组件
- `content/`：版本、课程、新闻、论文等静态内容数据

## 待补充内容

未到位的素材均以"待补充"占位标注，包括：12 个宣传视频、课程视频/课件、实验系统入口、配套教材淘宝链接、论文 PDF、客户交流群二维码、V3/V4 接入链接、API 文档与登录入口。这些由对应团队提供后替换即可。

## 新增公众号新闻

日常更新公众号新闻时，在 `content/news.ts` 的 `news` 数组中新增一条记录即可：

- 轻量更新：填写 `slug`、`title`、`date`、`source`、`category`、`summary`、`externalUrl`，`blocks` 可以为空。站内会生成新闻卡片和详情页，详情页展示摘要并提供公众号原文链接。
- 重点发布：额外填写 `coverImage` 和 `blocks`，可在站内全文展示；图片放在 `public/news/<slug>/`，引用路径以 `/news/<slug>/...` 开头。
- 新闻页和首页会按日期自动排序，最新一条作为主推，不需要手动调整位置。
- 提交并推送后更新生效。当前为静态内容，不依赖公众号自动抓取。
