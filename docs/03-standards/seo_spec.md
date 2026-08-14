# 《古文观止·观不止》SEO、Sitemap 与结构化数据规范 (SEO Specification)

## 一、 规范概述

古文典籍具有极强的**自然搜索长尾效应**。为确保系统在 Google、百度、Bing 等搜索引擎中获得最高权重收录与典雅的富媒体展示，特制定本 SEO 规范。

---

## 二、 动态元数据与多语言 Hreflang 体系

### 1. 标题与描述模板规范 (Title & Description)

```typescript
// 篇目页元数据动态生成规则 (Next.js generateMetadata)
export function generateArticleMetadata(article: ClassicArticle, locale: 'zh-Hans' | 'zh-Hant') {
  const isHans = locale === 'zh-Hans';
  return {
    title: isHans 
      ? `${article.title} 原文·逐句精注·时代背景与心理全景 - ${article.authorName}《古文观止》`
      : `${article.titleHant} 原文·逐句精注·時代背景與心理全景 - ${article.authorNameHant}《古文觀止》`,
    description: isHans
      ? `${article.authorName}《${article.title}》（${article.lunarCalendarDesc}）全文校勘、白话精译、潜台词心理剖析、典故考据与历代名家评点。`
      : `${article.authorNameHant}《${article.titleHant}》（${article.lunarCalendarDescHant}）全文校勘、白話精譯、潛台詞心理剖析、典故考據與歷代名家評點。`,
  };
}
```

### 2. 双语 Hreflang 与规范链接 (Canonical & Hreflang)
```html
<link rel="canonical" href="https://guwen.app/zh-hans/article/chibifu-qian" />
<link rel="alternate" hreflang="zh-Hans" href="https://guwen.app/zh-hans/article/chibifu-qian" />
<link rel="alternate" hreflang="zh-Hant" href="https://guwen.app/zh-hant/article/chibifu-qian" />
<link rel="alternate" hreflang="x-default" href="https://guwen.app/zh-hans/article/chibifu-qian" />
```

---

## 三、 动态 Sitemap 架构 (`sitemap.ts`)

借助 Next.js App Router 动态查询 Cloudflare D1 数据库，实时生成最新 Sitemap：

```typescript
// apps/web/src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://guwen.app';
  const articles = await fetchAllArticleSlugsFromD1();

  const routes: MetadataRoute.Sitemap = [];

  for (const article of articles) {
    for (const locale of ['zh-hans', 'zh-hant']) {
      routes.push({
        url: `${baseUrl}/${locale}/article/${article.slug}`,
        lastModified: new Date(article.updatedAt || '2026-03-01'),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    }
  }

  return routes;
}
```

---

## 四、 结构化数据 (Schema.org JSON-LD)

在每个篇目页注入符合 Schema.org 标准的 JSON-LD（`Article`、`Person`、`Place` 与 `BreadcrumbList`），直通搜索引擎富媒体卡片展示。

---

## 五、 动态水墨社交卡片 (Dynamic OG Image)

基于 `@vercel/og` 毫秒级生成包含篇名、作者画像、名句与朱印的 1200x630 宣纸水墨分享图。
