/**
 * 应用下载页的数据配置。
 * 新增一个应用时，只需在 apps 数组里追加一项即可。
 */

/** 单条下载链接 */
export interface DownloadLink {
  /** 来源名称，如「GitHub Releases」「Gitee Releases」 */
  label: string
  /** 下载地址 */
  url: string
  /** 备注信息，如提取码、镜像说明等，可选 */
  hint?: string
  /** 来源类型，决定按钮图标 */
  type?: 'github' | 'gitee' | 'cloud' | 'official' | 'mirror'
}

/** 服务器上的应用安装包（直链下载） */
export interface AppPackage {
  /** 平台，如 Android、Android · arm64-v8a */
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
  /** 当前版本号，未知时可省略 */
  version?: string
  /** 最近更新日期，未知时可省略 */
  updatedAt?: string
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
 * 本地直链的安装包放在云服务器 /home/ubuntu/blog-app-installers/ 下，
 * 由 Nginx 的 ^~ /installers/ location 直接对外提供。
 */
export const downloadServer = {
  baseUrl: 'https://murchey.top/installers',
}

/** 拼接安装包下载地址 */
export function resolvePackageUrl(file: string): string {
  if (/^https?:\/\//.test(file)) return file
  return downloadServer.baseUrl.replace(/\/+$/, '') + '/' + file.replace(/^\/+/, '')
}

export const apps: AppItem[] = [
  {
    id: 'warpweft-scheduler',
    name: 'WarpWeft Scheduler',
    icon: '🗓️',
    tagline: '单机与局域网小规模排课系统',
    description:
      '单机 / 局域网小规模排课系统。Electron + React 商务界面、本地 JSON 数据层、独立 Java 21 求解器；可选 Linux 服务端供多人共享。数据留在本机，工作区是可备份的单文件 JSON / ZIP；规则用中文句子式构建器表达，支持影响预览与「模拟放宽」试算。',
    version: 'v0.1.0',
    updatedAt: '2026-11-02',
    size: '约 0.9–95 MB',
    platforms: ['Windows', 'Linux'],
    features: [
      '数据留在本机：不依赖云端，工作区可备份为单文件 JSON / ZIP',
      '规则可解释：中文句子式规则构建器，支持影响预览与「模拟放宽」试算',
      '求解可追溯：固定时间硬保护、锁定课程、局部重排、候选与正式版分离',
      '排课准备：Excel 导入、教师不可用时间、教学计划、连堂与单双周配对',
      '课表查看与调代课：周课表网格、拖动交换、调课对调代课、Excel/CSV 导出',
      '两种形态：Windows 桌面单机，或 Linux 服务端 + 桌面客户端',
      '深色/浅色主题与中英双语界面',
    ],
    tags: ['Electron', 'React', 'Java 21', 'GPLv3'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/WarpWeft-Scheduler/releases',
        type: 'github',
      },
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/WarpWeft-Scheduler/releases/',
        type: 'gitee',
      },
    ],
    packages: [
      {
        platform: 'Windows',
        file: 'WarpWeft/WarpWeft Scheduler Setup 0.1.0.exe',
        version: 'v0.1.0',
        size: '约 95 MB',
        sha256: 'd72416aaae89a99640bf003f75836a78041821e8a95808c68fd67eb4734278f6',
      },
      {
        platform: 'Linux 服务端',
        file: 'WarpWeft/warpweft-linux-server-0.1.0.tar.gz',
        version: 'v0.1.0',
        size: '约 3.2 MB',
        sha256: '012ce54cef8221f586dcbaadfcf30859e9ad872643f64ccfc308143a28539b1e',
      },
      {
        platform: 'Linux Web 版',
        file: 'WarpWeft/warpweft-linux-webapp-0.1.0.tar.gz',
        version: 'v0.1.0',
        size: '约 0.9 MB',
        sha256: '574d4564084173b12b643ddee08b2bee1c822a627a34d84b9fb1139579d9f5fe',
      },
    ],
    repo: 'https://github.com/Murchey/WarpWeft-Scheduler',
  },
  {
    id: 'aichat',
    name: 'AiChat',
    icon: '💬',
    tagline: '微信聊天风格的角色扮演 AI 应用',
    description:
      '一款角色扮演类微信聊天风格的 Flutter Android 应用：内置多个角色，可与角色进行一对一沉浸式聊天，支持发送图片、合并转发、角色包导入导出与自动更新。纯 Cupertino（iOS 风格）UI，仅适配 Android。所有数据均可自行导入导出，用户拥有完全的数据控制权。',
    version: 'v1.7.5',
    updatedAt: '2026-11-02',
    size: '约 26–28 MB',
    platforms: ['Android'],
    features: [
      '沉浸式角色聊天，内置人设与说话风格，支持自定义人设与用户关系',
      '语C模式：短信与括号动作流可切换，支持剧情推进、流式回复与候选行动',
      '多角色群聊：@ 角色必发言、引用回复、群头像与群简介',
      '角色包导入导出与创意工坊，可从 GitHub/Gitee 或对象储存下载角色、游戏与表情包',
      '持久化记忆与跨场景记忆池，聊天与朋友圈互动保持记忆连贯',
      '朋友圈、Markdown 渲染、聊天气泡样式与自定义聊天背景',
    ],
    tags: ['Flutter', 'AI', '角色扮演'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/AiChatApp/releases',
        type: 'github',
      },
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/AiChatApp/releases',
        type: 'gitee',
      },
    ],
    packages: [
      {
        platform: 'Android · arm64-v8a',
        file: 'AiChat/AiChat-V1.7.5-arm64-v8a.apk',
        version: 'v1.7.5',
        size: '约 27 MB',
        sha256: '3f85dac15d8760e07b77cf27a32c8bb588c478ef54ff932a1a9053bb511f0c77',
      },
      {
        platform: 'Android · armeabi-v7a',
        file: 'AiChat/AiChat-V1.7.5-armeabi-v7a.apk',
        version: 'v1.7.5',
        size: '约 26 MB',
        sha256: 'f51744691a5b64608dee4bd85292a494dd881a59803a6c327994c4337d50ae5b',
      },
      {
        platform: 'Android · x86_64',
        file: 'AiChat/AiChat-V1.7.5-x86_64.apk',
        version: 'v1.7.5',
        size: '约 28 MB',
        sha256: '44a82765101e0674cdb9a5598810b5f1298c8bb31d7086d552d933f85cf567c1',
      },
    ],
    repo: 'https://github.com/Murchey/AiChatApp',
  },
  {
    id: 'inkqilin-ledger',
    name: 'InkQilin Ledger',
    icon: '💰',
    tagline: '记账与人情往来的 Android 记账本',
    description:
      '一款基于 Jetpack Compose 与 Material 3 的个人财务 Android 应用，支持深浅色主题、多币种管理、账单记录、分类统计、Excel 导入导出，并内置人情往来的礼金账本。提供纯本地的基础模式与接入 AI 分析的智能模式。',
    version: 'v1.6.8',
    updatedAt: '2026-11-02',
    size: '约 31 MB',
    platforms: ['Android'],
    features: [
      '收支记录：金额键盘支持四则运算与括号，实时预览',
      '多币种管理与月度收支总览，7 日支出趋势图',
      '周/月/年/自定义区间统计，支持按分类下钻与同比对比',
      '资产总览：房产、股票、基金、存款等 8 类资产分类管理',
      '人情账本：婚丧嫁娶、收送礼金、联系人与标签统计',
      'AI 财务分析、账单图片 OCR 批量识别、支付通知自动记账',
      'Excel 导入导出、本地备份与腾讯云 COS 云备份，支持 AES-256-GCM 加密',
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Material 3'],
    links: [
      {
        label: 'GitHub 仓库',
        url: 'https://github.com/Murchey/inkqilin-ledger',
        type: 'github',
      },
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/inkqinlin-ledger/releases',
        type: 'gitee',
      },
    ],
    packages: [
      {
        platform: 'Android',
        file: 'InkQilin-ledger/InkQilin-ledgerV1.6.8.apk',
        version: 'v1.6.8',
        size: '约 31 MB',
        sha256: '610e00c2a787642942e6fde79e26a4cdca25fd91041b3cd0c4a520ee1b199ce9',
      },
    ],
    repo: 'https://github.com/Murchey/inkqilin-ledger',
  },
  {
    id: 'qingluan-attendance',
    name: '青鸾考勤',
    icon: '📅',
    tagline: '离线优先的考勤登记与请假管理客户端',
    description:
      'Android 优先的 Flutter / Cupertino 考勤客户端。支持离线登记、请假管理、考勤分统计与双通道通知；写通同步在保存后自动上传，也可随时手动同步。云端文件同步适配器仍在后续里程碑。',
    version: 'v1.0.3',
    updatedAt: '2026-11-02',
    size: '约 21–27 MB',
    platforms: ['Android'],
    features: [
      '首页 / 记录 / 同步 / 设置四页，支持点击与拖动胶囊导航',
      '单人与批量登记、补录历史、签到签退时间与操作历史',
      '请假记录：按人登记区间与类型，已确认请假当天自动拦截考勤登记',
      '考勤分统计：按区间扣分规则计算，可查看每位成员的扣分明细',
      'Excel 与 CSV 名单导入、Excel 导出，支持字段选择与筛选范围',
      '写通同步与待上传队列，支持腾讯云 COS 等对象存储',
      '管理员通知发布、二维码配置与应用内更新',
    ],
    tags: ['Flutter', '考勤', '云同步'],
    links: [
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/qingluan-attendance/releases',
        type: 'gitee',
      },
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/Qingluan-attendance/releases',
        type: 'github',
      },
    ],
    packages: [
      {
        platform: 'Android · arm64-v8a',
        file: 'Qingluan-attendance/Qingluan-attendanceV1.0.3-arm64-v8a.apk',
        version: 'v1.0.3',
        size: '约 25 MB',
        sha256: '418118a63bf61f24ad575d71e7e777e3fea6b39fc0154c445045fab9a9fd50e3',
      },
      {
        platform: 'Android · armeabi-v7a',
        file: 'Qingluan-attendance/Qingluan-attendanceV1.0.3-armeabi-v7a.apk',
        version: 'v1.0.3',
        size: '约 21 MB',
        sha256: '17185f672b3750cf698e3cc7a03e9ba7fe629dbc2e6a62dba795cd402c3b7c79',
      },
      {
        platform: 'Android · x86_64',
        file: 'Qingluan-attendance/Qingluan-attendanceV1.0.3-x86_64.apk',
        version: 'v1.0.3',
        size: '约 27 MB',
        sha256: '61d7b87c6421f8d3f10f1ad6f11e2d50b4bcea3a22f97c55795e851fedea622d',
      },
    ],
    repo: 'https://github.com/Murchey/Qingluan-attendance',
  },
  {
    id: 'xime-gboardlike',
    name: 'XimeGboard',
    icon: '⌨️',
    tagline: '五笔与拼音输入法的 Gboard 风格个性化分支',
    description:
      '基于 Rime 引擎的 Android 输入法，同时支持五笔与拼音。这是 Xime 的个人分支，围绕 Gboard 与 fcitx5-android 的使用习惯重做了输入体验：更宽敞安静的候选栏、Gboard 风格配色主题、字体个性化与剪贴板保留策略。',
    version: '1.0.9',
    updatedAt: '2026-11-04',
    size: '约 56–59 MB',
    platforms: ['Android'],
    features: [
      '五笔与拼音输入，支持全键盘、T9 拼音、数字与符号面板',
      'Gboard 风格候选栏：更宽单元格、竖分隔、下拉展开更多候选',
      '精选现代主题：微信、QQ、Telegram、GitHub、ChatGPT、Gboard 等，支持明暗双色与 JSON 导入导出',
      '字体选择器：系统默认 / 内置字体 / 导入字体，全局生效',
      '剪贴板保留时长可从 1 小时到 90 天，历史条数可自定义',
      '公开签名密钥与构建脚本，可自行构建签名 APK',
    ],
    tags: ['Rime', '五笔', '拼音', 'GPLv3'],
    links: [
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/Xime-Gboardlike/releases',
        type: 'gitee',
      },
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Murchey/Xime-Gboardlike/releases',
        type: 'github',
      },
    ],
    packages: [
      {
        platform: 'Android · arm64-v8a',
        file: 'XimeGboard/XimeGboard-1.0.9-arm64-v8a.apk',
        version: '1.0.9',
        size: '约 57 MB',
        sha256: '3bfd6acdc9a65a7450764f0c1020dac95ecdfb99bcd9da228cc5b48d19efcd75',
      },
      {
        platform: 'Android · armeabi-v7a',
        file: 'XimeGboard/XimeGboard-1.0.9-armeabi-v7a.apk',
        version: '1.0.9',
        size: '约 56 MB',
        sha256: '6cd4e54da5a317a7721557f599ee313a7dab17f698a0894be87a7e2a1cf459f0',
      },
      {
        platform: 'Android · x86_64',
        file: 'XimeGboard/XimeGboard-1.0.9-x86_64.apk',
        version: '1.0.9',
        size: '约 59 MB',
        sha256: '44a852d1bbc5172ae57bcd49f32ca17ebb2d35143d12ce76d4e1cff5227c976c',
      },
    ],
    repo: 'https://github.com/Murchey/Xime-Gboardlike',
  },
  {
    id: 'vellum',
    name: 'Vellum',
    icon: '📚',
    tagline: '以阅读为核心的本地电子书应用',
    description:
      '一个安静的「数字书房」：以阅读为核心的本地电子书应用，Cupertino-first，数据只存在于本机。支持 EPUB / MOBI / TXT 导入、上下滚动与左右翻页、目录全文搜索、划线笔记与本地 Markdown 写作。',
    version: 'v1.0.15',
    updatedAt: '2026-11-02',
    size: '约 21–24 MB',
    platforms: ['Android'],
    features: [
      '书库：EPUB / MOBI / TXT 导入，三列网格书架，自定义文件夹与自定义封面',
      '阅读：上下滚动 / 左右翻页，翻页动画、进度条、书签与划线笔记',
      '全文搜索：按章节分组，关键词高亮与上下文，逐条跳转并在正文高亮',
      '排版：字号、行距、字重、亮度、护眼、背景色与自定义 TTF 字体',
      '写作：本地文稿、输入自动保存、Markdown 本地预览与小说模式',
      '笔记导入导出、数据备份（可选 AES-256-GCM 加密）与对象存储云备份',
      '阅读统计、继续阅读小组件与应用内更新',
    ],
    tags: ['Flutter', '电子书', '本地优先'],
    links: [
      {
        label: 'GitHub Releases',
        url: 'https://github.com/Niriko-mu/Vellum/releases',
        type: 'github',
      },
      {
        label: 'Gitee Releases',
        url: 'https://gitee.com/Murchey/vellum/releases',
        type: 'gitee',
      },
    ],
    packages: [
      {
        platform: 'Android · arm64-v8a',
        file: 'Vellum/Vellum-V1.0.15-arm64-v8a.apk',
        version: 'v1.0.15',
        size: '约 23 MB',
        sha256: '68c94b43d0035dfdd92219357a0492c5f5487130f28a367c946213c9a89f4b16',
      },
      {
        platform: 'Android · armeabi-v7a',
        file: 'Vellum/Vellum-V1.0.15-armeabi-v7a.apk',
        version: 'v1.0.15',
        size: '约 21 MB',
        sha256: '74647563164a0b1dc523b913c62e972fbabc14e3447d788075064c7b66ff4337',
      },
      {
        platform: 'Android · x86_64',
        file: 'Vellum/Vellum-V1.0.15-x86_64.apk',
        version: 'v1.0.15',
        size: '约 24 MB',
        sha256: 'c367d8874aa80cd8c944e9f4a7aeeae34337a7d6333df51dc98d32fad49d1ba3',
      },
    ],
    repo: 'https://github.com/Niriko-mu/Vellum',
  },
]
