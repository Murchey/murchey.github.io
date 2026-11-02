/**
 * 应用下载页的数据配置。
 * 新增一个应用时，只需在 apps 数组里追加一项即可。
 */

/** 单条下载链接 */
export interface DownloadLink {
  /** 来源名称，如「GitHub Releases」「蓝奏云」 */
  label: string
  /** 下载地址 */
  url: string
  /** 备注信息，如提取码、镜像说明等，可选 */
  hint?: string
  /** 来源类型，决定按钮图标 */
  type?: 'github' | 'cloud' | 'official' | 'mirror'
}

/** 服务器上的应用安装包（直链下载） */
export interface AppPackage {
  /** 平台，如 Android、Windows */
  platform: string
  /** 安装包文件名或相对路径（相对于 downloadServer.baseUrl），也可以写完整 URL */
  file: string
  /** 安装包版本，可选，默认使用应用的 version */
  version?: string
  /** 安装包大小，如「约 32 MB」，可选 */
  size?: string
  /** SHA-256 校验和，可选，填写后页面提供一键复制 */
  sha256?: string
}

/** 一个成品应用 */
export interface AppItem {
  /** 唯一标识 */
  id: string
  /** 应用名称 */
  name: string
  /** 应用图标（emoji 或图片路径） */
  icon: string
  /** 一句话简介 */
  tagline: string
  /** 详细介绍 */
  description: string
  /** 当前版本号 */
  version: string
  /** 最近更新日期 */
  updatedAt: string
  /** 安装包大小，可选 */
  size?: string
  /** 支持的平台 */
  platforms: string[]
  /** 核心特性列表 */
  features: string[]
  /** 标签 */
  tags: string[]
  /** 不同来源的下载链接 */
  links: DownloadLink[]
  /** 服务器上的安装包直链，可选 */
  packages?: AppPackage[]
  /** 源码仓库地址，可选 */
  repo?: string
}

/**
 * 安装包托管服务器配置。
 * baseUrl 填你存放安装包的服务器地址（末尾不带 /），
 * AppPackage.file 写相对路径即可自动拼接成完整地址；
 * file 写完整 URL（http/https 开头）时不受 baseUrl 影响。
 */
export const downloadServer = {
  baseUrl: 'https://dl.murchey.example.com/apps',
}

/** 拼接安装包下载地址 */
export function resolvePackageUrl(file: string): string {
  if (/^https?:\/\//.test(file)) return file
  return downloadServer.baseUrl.replace(/\/+$/, '') + '/' + file.replace(/^\/+/, '')
}

export const apps: AppItem[] = [
  {
    id: 'aichat',
    name: 'AiChat',
    icon: '💬',
    tagline: '微信聊天风格的 AI 角色扮演应用',
    description:
      '以熟悉的微信聊天界面承载沉浸式 AI 角色扮演体验，支持一对一私聊与多人群聊，可导入导出角色包，轻松备份和分享你喜爱的角色。',
    version: 'v1.2.0',
    updatedAt: '2025-10-20',
    size: '约 32 MB',
    platforms: ['Android'],
    features: [
      '沉浸式角色聊天，还原微信对话体验',
      '支持群聊，多个角色同台互动',
      '角色包导入导出，一键分享与备份',
    ],
    tags: ['Flutter', 'AI', '角色扮演'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/AiChatApp/releases',
        type: 'github',
      },
      {
        label: '蓝奏云',
        url: 'https://wws.lanzoux.com/',
        hint: '提取码：abcd',
        type: 'cloud',
      },
    ],
    packages: [
      {
        platform: 'Android',
        file: 'aichat/aichat-v1.2.0.apk',
        version: 'v1.2.0',
        size: '约 32 MB',
        sha256: '0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
    repo: 'https://github.com/Murchey/AiChatApp',
  },
  {
    id: 'weasel-skin-studio',
    name: 'Weasel Skin Studio',
    icon: '🎨',
    tagline: '小狼毫输入法可视化皮肤配置工具',
    description:
      '为小狼毫（Rime）输入法打造的皮肤可视化编辑器，实时预览配色与布局效果，支持 YAML 配置的导入导出，让换肤不再需要手写配置文件。',
    version: 'v0.9.1',
    updatedAt: '2025-10-12',
    size: '约 18 MB',
    platforms: ['Windows'],
    features: [
      '实时预览，所见即所得的皮肤编辑',
      '配色与布局自由调整',
      'YAML 配置导入导出，兼容原生方案',
    ],
    tags: ['Tauri 2', 'React 19', 'Windows'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/weasel-skin-studio/releases',
        type: 'github',
      },
    ],
    packages: [
      {
        platform: 'Windows',
        file: 'weasel-skin-studio/weasel-skin-studio-setup-0.9.1.exe',
        version: 'v0.9.1',
        size: '约 18 MB',
      },
    ],
    repo: 'https://github.com/Murchey/weasel-skin-studio',
  },
  {
    id: 'inkqilin-ledger',
    name: '墨麒麟记账',
    icon: '📖',
    tagline: '便捷快速的安卓记账应用',
    description:
      '基于 Jetpack Components 构建的轻量记账应用，专注快速记账与清晰统计，帮你轻松掌握每一笔收支。',
    version: 'v1.0.3',
    updatedAt: '2025-09-28',
    size: '约 12 MB',
    platforms: ['Android'],
    features: [
      '三步完成记账，操作简单快捷',
      '收支统计图表，消费趋势一目了然',
      '本地存储，数据安全可控',
    ],
    tags: ['Kotlin', 'Android', 'Jetpack'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/murchey/inkqilin-ledger/releases',
        type: 'github',
      },
    ],
    packages: [
      {
        platform: 'Android',
        file: 'inkqilin-ledger/inkqilin-ledger-v1.0.3.apk',
        version: 'v1.0.3',
        size: '约 12 MB',
      },
    ],
    repo: 'https://github.com/murchey/inkqilin-ledger',
  },
  {
    id: 'genshin-name-drawer',
    name: '仿原神抽卡姓名抽取器',
    icon: '🌟',
    tagline: '课堂随机点名小工具',
    description:
      '仿原神抽卡动画的随机姓名抽取工具，从姓名文档中随机抽取，契合课堂使用习惯，让点名充满仪式感。',
    version: 'v1.1.0',
    updatedAt: '2025-08-15',
    size: '约 8 MB',
    platforms: ['Windows'],
    features: [
      '还原原神抽卡动画与音效',
      '支持从文档批量导入姓名',
      '抽取记录可查，公平公正',
    ],
    tags: ['C#', 'Windows Forms'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/genshin-name-drawer/releases',
        type: 'github',
      },
    ],
    packages: [
      {
        platform: 'Windows',
        file: 'https://dl.murchey.example.com/apps/genshin-name-drawer/genshin-name-drawer-v1.1.0.zip',
        version: 'v1.1.0',
        size: '约 8 MB',
      },
    ],
    repo: 'https://github.com/Murchey/genshin-name-drawer',
  },
]
