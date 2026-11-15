import type { NewsItem } from "./types";

export const news: NewsItem[] = [
  {
    slug: "v4-release",
    title: "时隔一年，再赴西部之约｜玄知大模型V4正式发布",
    date: "2026-08-31",
    source: "NSSLab-Xidian",
    category: "产品发布",
    summary:
      "2026年8月29日，玄知大模型V4在西部网络安全大会上正式发布，升级为基于 CryptoHarness 的可验证密码智能科研系统。",
    coverImage: "/news/v4-release/cover.jpg",
    externalUrl: "https://mp.weixin.qq.com/s/7EdlRw63AJi0gw7ENZYc-g",
    blocks: [
      {
        type: "paragraph",
        text: "2026年8月29日，在西部网络安全大会上，西安电子科技大学计算机科学与技术学院沈玉龙教授团队正式发布玄知大模型V4。",
      },
      {
        type: "paragraph",
        text: "一年前，团队在这里发布首个面向密码学领域的大语言模型；一年后，玄知从“能够理解和回答密码问题”，进一步走向“能够持续推进复杂密码任务”，全面升级为基于 CryptoHarness 的可验证密码智能科研系统。",
      },
      {
        type: "image",
        src: "/news/v4-release/event-release.jpg",
        alt: "玄知大模型V4在西部网络安全大会上正式发布",
        width: 1080,
        height: 720,
        caption:
          "2026年8月29日，玄知大模型V4在西部网络安全大会上正式发布。",
      },
      { type: "heading", text: "从 V1 到 V4：四代持续演进" },
      {
        type: "paragraph",
        text: "密码学科研任务通常具有长链条、多工具、强约束的特点。一个安全结论，不仅需要模型理解和推理，还需要代码、工具、标准与专家共同验证。",
      },
      {
        type: "paragraph",
        text: "V1：密码大模型基座。让密码知识进入大模型。",
      },
      {
        type: "paragraph",
        text: "V2：子领域专项突破。让知识转化为专业任务能力。",
      },
      {
        type: "paragraph",
        text: "V3：多智能体协同。让不同密码能力协同完成任务。",
      },
      {
        type: "paragraph",
        text: "V4：可验证智能科研系统。让复杂任务持续运行、受控执行，并形成可复核成果。",
      },
      {
        type: "paragraph",
        text: "V3 解决了“有哪些专业能力、这些能力如何协同”；V4 进一步解决“复杂任务如何持续推进、如何接受验证、如何完成交付”。",
      },
      { type: "heading", text: "为什么需要 CryptoHarness？" },
      {
        type: "paragraph",
        text: "通用 Harness 主要解决模型如何连接工具、组织流程；密码科研还必须回答更多问题：任务依据什么安全目标和攻击者模型开展？工具调用是否受到权限约束？结论是否有代码、测试或形式化证据支持？任务中断后能否从正确状态继续？",
      },
      {
        type: "paragraph",
        text: "为此，玄知 V4 构建了面向密码科研的 CryptoHarness。",
      },
      {
        type: "quote",
        text: "玄知 V4 = CryptoLLM + CryptoHarness + CryptoVerifier",
      },
      {
        type: "paragraph",
        text: "CryptoLLM 负责理解任务、分析问题、制定计划与生成方案。",
      },
      {
        type: "paragraph",
        text: "CryptoHarness 负责组织智能体与技能（Skill），管理状态、工具、权限、执行与恢复。",
      },
      {
        type: "paragraph",
        text: "CryptoVerifier 通过代码、测试向量、形式化工具、标准规则和专家审核提供校验依据。",
      },
      {
        type: "image",
        src: "/news/v4-release/architecture.jpg",
        alt: "玄知V4的CryptoLLM、CryptoHarness与CryptoVerifier架构",
        width: 1080,
        height: 620,
        caption:
          "模型负责理解与推理，CryptoHarness 负责组织与执行，CryptoVerifier 负责检验与判定。",
      },
      { type: "heading", text: "三者协同，带来三项核心升级" },
      {
        type: "paragraph",
        text: "执行升级：通过任务契约和持久状态，让复杂任务可以暂停、恢复、分叉和重放。",
      },
      {
        type: "paragraph",
        text: "可信升级：工具在权限、沙箱和审计约束下运行，任务结果由预设条件、机器证据与专家复核共同判定。",
      },
      {
        type: "paragraph",
        text: "进化升级：记录失败轨迹与上下文，用于重新规划、回归评测和系统优化。",
      },
      {
        type: "paragraph",
        text: "V4 最终交付的不再只是一段回答，而是包含分析报告、运行代码、形式化规约、攻击轨迹、工具结果和验证记录的任务级成果包。",
      },
      { type: "heading", text: "现场实测：让系统能力接受专家检验" },
      {
        type: "paragraph",
        text: "此次发布不仅展示了 V4 的技术架构与研究案例，还设置了实物系统现场测试环节。孔志印院士及多位专家现场体验了玄知 V4，从任务输入开始，观察系统如何理解需求、制定计划、调用知识与工具，并形成分析与验证结果。",
      },
      {
        type: "paragraph",
        text: "测试过程中，专家重点关注了玄知 V4 的密码专业能力、复杂任务执行过程、工具协同方式和结果可追溯性，并结合真实科研与工程需求进行了深入交流。",
      },
      {
        type: "paragraph",
        text: "现场测试反馈良好。专家对 V4 从“生成答案”走向“推进任务”、从“模型判断”走向“证据校验”的升级给予积极评价，也对系统后续在密码算法分析、协议验证和工程实现等场景中的应用提出了意见与建议。",
      },
      {
        type: "paragraph",
        text: "这次面对面的测试，让玄知 V4 的能力不再停留在架构图和案例材料中，而是通过可操作、可观察的现场演示，进一步展现了其服务密码科研与工程实践的潜力。",
      },
      { type: "heading", text: "从系统能力走向典型任务" },
      {
        type: "paragraph",
        text: "发布现场展示了玄知 V4 在后量子密码、密码工程、安全多方计算、同态加密、差分隐私和区块链等方向的 11 项研究与工程探索。",
      },
      {
        type: "paragraph",
        text: "在后量子算法设计中，团队借助玄知分析 HQC 密文压缩、错误重量与解密失败率之间的耦合关系，形成 NSS-HQC 候选方案。初步评估显示，该方案在给定参数与安全假设下有望降低密文传输开销，相关结论仍需进一步验证。团队还围绕多变量签名的结构暴露问题形成 Origami 候选方案。",
      },
      {
        type: "paragraph",
        text: "在密码工程审计中，团队借助玄知分析 openHiTLS PQCP 中的 PolarLAC 解封装代码，发现普通 memcmp 可能带来的时序侧信道风险，并提出恒定时间比较函数替换建议。该修复面向单点比较操作，全链路时序行为仍需继续检查。",
      },
      {
        type: "paragraph",
        text: "在协议分析中，团队以安全多方计算中的概率截断协议为例，引入白盒分析与形式化证明，对已有安全结论进行复核，形成“协议解析—白盒分析—安全证明—漏洞判定”的审计框架。",
      },
      {
        type: "paragraph",
        text: "此外，V4 还围绕 BIKE 动态阈值优化、CKKS 自举协同优化、双边 ABE 密钥泄露检测、真实 CPU 环境下的时序侧信道风险，以及区块链交易排序与扩展机制等任务开展探索。部分探索已形成论文稿件、算法征集材料、问题报告或修复建议，分别处于继续研究、评估或社区沟通阶段。",
      },
      { type: "heading", text: "从模型能力走向科研生态" },
      {
        type: "paragraph",
        text: "V4 以“数学机理 + 高质量数据集”双轮驱动，持续建设来源可追溯、结构规范、能够验证和迭代的密码专业数据资源。面向保密与合规场景，系统支持本地化部署与一体机形态，并持续完善 API、SDK 和插件开放能力。",
      },
      {
        type: "paragraph",
        text: "过去一年，玄知相关工作获得 openHiTLS 社区特别贡献奖和第十四届中国电子信息博览会金奖。团队还在将科研项目转化为教材、实验指导书和配套课程，推动密码学、人工智能与工程实践深度融合。",
      },
      {
        type: "quote",
        text: "让复杂任务有序推进，让科研结论有据可查。",
      },
      {
        type: "paragraph",
        text: "密码智能的未来，不止于模型能力提升，更在于专家知识、工程工具与验证机制的协同。玄知大模型 V4 愿成为密码研究者和开发者可信赖的 AI 科研执行伙伴。",
      },
      {
        type: "paragraph",
        text: "公众号：NSSLab-Xidian；官网：cryptollm.net；联系邮箱：nss@xidian.edu.cn。",
      },
    ],
  },
  {
    slug: "cryptollm-release",
    title: "密码学大模型——玄知大模型，重磅发布",
    date: "2025-08-15",
    source: "官方发布",
    category: "产品发布",
    summary:
      "2025年8月15日，西安电子科技大学NSS团队在第四届西部网络安全大会上发布全球首个面向密码学领域的大语言模型——玄知大模型（CryptoLLM）。",
    blocks: [
      {
        type: "paragraph",
        text: "2025年8月15日，在第四届西部网络安全大会上，西安电子科技大学NSS团队正式发布全球首个面向密码学领域的大语言模型——玄知大模型（CryptoLLM）。",
      },
      {
        type: "paragraph",
        text: "该模型的发布标志着密码学进入智能化发展新阶段，为密码算法分析、协议设计与工程实现提供了全流程的智能支持，开启密码学AI应用新纪元。",
      },
    ],
  },
];
