/**
 * @file domain.ts
 * @description 《古文观止·观不止》全维领域模型与端到端共享类型定义
 * 
 * 规范约束：
 * 1. 时间戳统一使用严格 ISO 8601 格式 (如: 1082-10-15T00:00:00.000Z 或 -0684-03-15T00:00:00.000Z)
 * 2. 静态知识实体采用语义 Slug，动态交互与会话采用 UUIDv7
 */

export type Locale = 'zh-Hans' | 'zh-Hant';

/** 先贤命途节点（用于交互式水墨短剧） */
export interface DestinyNode {
  yearDesc: string; // 如 "1057年 20岁"
  nodeTitle: string; // 如 "嘉祐登科"
  subTitle: string; // 如 "名动京师"
  narrativeTitle: string; // 如 "【第一幕 · 1057年 嘉祐登科】"
  narrativeStory: string; // 电影旁白剧评
  motto: string; // 此时心境箴言
  atmosphereColor: string; // 水墨氛围渐变色
}

/** 先贤作者实体 */
export interface Author {
  id: string; // 如 "su-shi", "zhuge-liang"
  name: string;
  nameHant?: string;
  courtesyName?: string; // 字
  artName?: string; // 号
  dynasty: string; // 朝代
  birthIso?: string; // ISO 8601
  deathIso?: string; // ISO 8601
  originPlace?: string; // 籍贯
  posthumousTitle?: string; // 谥号
  biographySummary: string; // 生平总述
  portraitReadingUrl?: string; // 默认低头看书水墨肖像
  portraitLookingUrl?: string; // 悬浮抬首相望水墨肖像
  destinyNodes?: DestinyNode[]; // 五大生命转折节点
}

/** 经典篇目实体 */
export interface Article {
  id: string; // 如 "chibifu-qian", "chushibiao"
  authorId: string;
  authorName: string;
  title: string;
  titleHant?: string;
  dynasty: string;
  genre: string; // 赋, 表, 记, 论
  writtenIso: string; // ISO 8601 (如: 1082-10-15T00:00:00.000Z)
  lunarCalendarDesc: string; // 如 "宋神宗元丰五年七月既望 (壬戌)"
  locationAncient?: string;
  locationModern?: string;
  longitude?: number;
  latitude?: number;
  historicalContext: string; // 时代大局
  psychologicalBackground: string; // 创作心理契机
  calligraphyGrade?: string; // 神品, 逸品
}

/** 篇章自然段落实体 */
export interface ArticleSection {
  id: string; // 如 "chibifu-qian-1"
  articleId: string;
  sectionIndex: number;
  subtitle: string; // 4-8字意境小题
  originalText: string;
  originalTextHant?: string;
  translation: string;
  subtext: string; // 潜台词与深层心理
  emotionTag: string; // 情绪标签
  emotionScore: number; // -100 到 +100
  sageMonologue?: string; // 先贤随笔手记
}

/** 典故溯源实体 */
export interface Allusion {
  id: string;
  articleId: string;
  sectionId?: string;
  term: string;
  sourceBook: string;
  sourceQuote?: string;
  explanation: string;
}

/** 历代名家评点实体 */
export interface Commentary {
  id: string;
  articleId: string;
  sectionId?: string;
  criticName: string;
  criticDynasty: string;
  commentaryType: '朱批' | '夹注' | '总评';
  commentaryText: string;
  sourceBook?: string;
}

/** 视觉与多媒体资产实体 */
export interface VisualAsset {
  id: string;
  articleId?: string;
  authorId?: string;
  assetType: 'PORTRAIT' | 'MASTERPIECE' | 'MANUSCRIPT' | 'SCENE' | 'AUDIO_BGM';
  title: string;
  creator?: string;
  dynasty?: string;
  r2StoragePath: string; // R2 相对路径
  cdnUrl: string; // CDN 完整链接
  description?: string;
}
