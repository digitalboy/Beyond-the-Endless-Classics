/**
 * @file api-client.ts
 * @description 前端直连 Cloudflare 生产环境 Worker 与 D1 边缘数据库的强类型客户端
 */

import type { Author, Article, ArticleSection, Allusion, Commentary } from '@beyond-classics/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://beyond-the-endless-classics-api.digitalboyzone.workers.dev';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface FullArticleData extends Article {
  sections: ArticleSection[];
  allusions: Allusion[];
  commentaries: Commentary[];
}

/** 1. 获取所有先贤作者 (从云端 D1 实时调取) */
export async function fetchAuthorsFromCloud(): Promise<Author[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/authors`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 }, // 边缘缓存 60 秒
    });
    const json: ApiResponse<Author[]> = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error(json.error || 'Failed to fetch authors');
  } catch (err) {
    console.error('Failed to fetch authors from cloud D1:', err);
    return [];
  }
}

/** 2. 获取先贤名下篇目或全部篇目 */
export async function fetchArticlesFromCloud(authorId?: string): Promise<Article[]> {
  try {
    const url = authorId
      ? `${API_BASE_URL}/api/articles?author_id=${encodeURIComponent(authorId)}`
      : `${API_BASE_URL}/api/articles`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    const json: ApiResponse<Article[]> = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error(json.error || 'Failed to fetch articles');
  } catch (err) {
    console.error('Failed to fetch articles from cloud D1:', err);
    return [];
  }
}

/** 3. 获取单篇古文全维数据 (含逐段释义、潜台词、典故、名家评点) */
export async function fetchArticleDetailFromCloud(articleId: string): Promise<FullArticleData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/article/${encodeURIComponent(articleId)}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    const json: ApiResponse<FullArticleData> = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error(json.error || 'Failed to fetch article detail');
  } catch (err) {
    console.error('Failed to fetch article detail from cloud D1:', err);
    return null;
  }
}
