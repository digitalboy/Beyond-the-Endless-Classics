/**
 * @file index.ts
 * @description Hono on Cloudflare Worker - 古文观止·观不止 后端主入口
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

// 健康检查
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'Beyond the Endless Classics API',
    timestamp: new Date().toISOString(),
  });
});

// 1. 获取所有先贤列表
app.get('/api/authors', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT id, name, courtesy_name, pseudonym, dynasty, birth_iso, death_iso, portrait_url, life_summary FROM authors ORDER BY birth_iso ASC'
    ).all<Record<string, unknown>>();

    const data = results.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      courtesyName: (r.courtesy_name as string) || undefined,
      artName: (r.pseudonym as string) || undefined,
      dynasty: r.dynasty as string,
      birthIso: (r.birth_iso as string) || undefined,
      deathIso: (r.death_iso as string) || undefined,
      biographySummary: (r.life_summary as string) || '',
      portraitReadingUrl: '/assets/su_shi_reading.jpg',
      portraitLookingUrl: '/assets/su_shi_looking.jpg',
    }));

    return c.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

// 2. 获取所有经典篇目列表
app.get('/api/articles', async (c) => {
  const authorId = c.req.query('author_id');
  try {
    let query = 'SELECT id, title, genre, author_id, dynasty, written_iso, lunar_calendar_desc, location_ancient, location_modern, political_crisis, core_psychology, summary, word_count FROM articles';
    let statement = c.env.DB.prepare(query + (authorId ? ' WHERE author_id = ? ORDER BY written_iso ASC' : ' ORDER BY written_iso ASC'));
    if (authorId) {
      statement = statement.bind(authorId);
    }
    const { results } = await statement.all<Record<string, unknown>>();

    const data = results.map((r) => ({
      id: r.id as string,
      title: r.title as string,
      genre: r.genre as string,
      authorId: r.author_id as string,
      authorName: '',
      dynasty: r.dynasty as string,
      writtenIso: r.written_iso as string,
      lunarCalendarDesc: r.lunar_calendar_desc as string,
      locationAncient: (r.location_ancient as string) || undefined,
      locationModern: (r.location_modern as string) || undefined,
      historicalContext: (r.political_crisis as string) || '',
      psychologicalBackground: (r.core_psychology as string) || '',
    }));

    return c.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

// 3. 获取单篇古文全维详情 (含逐段释义、潜台词、典故、名家评点)
app.get('/api/article/:id', async (c) => {
  const articleId = c.req.param('id');
  try {
    const article = await c.env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(articleId).first<Record<string, unknown>>();
    if (!article) {
      return c.json({ success: false, error: 'Article not found' }, 404);
    }

    const { results: rawSections } = await c.env.DB.prepare(
      'SELECT * FROM article_sections WHERE article_id = ? ORDER BY section_index ASC'
    ).bind(articleId).all<Record<string, unknown>>();

    const { results: rawAllusions } = await c.env.DB.prepare(
      'SELECT * FROM allusions WHERE article_id = ?'
    ).bind(articleId).all<Record<string, unknown>>();

    const { results: rawCommentaries } = await c.env.DB.prepare(
      'SELECT * FROM commentaries WHERE article_id = ?'
    ).bind(articleId).all<Record<string, unknown>>();

    const formattedArticle = {
      id: article.id as string,
      title: article.title as string,
      genre: article.genre as string,
      authorId: article.author_id as string,
      authorName: '',
      dynasty: article.dynasty as string,
      writtenIso: article.written_iso as string,
      lunarCalendarDesc: article.lunar_calendar_desc as string,
      locationAncient: (article.location_ancient as string) || undefined,
      locationModern: (article.location_modern as string) || undefined,
      historicalContext: (article.political_crisis as string) || '',
      psychologicalBackground: (article.core_psychology as string) || '',
      sections: rawSections.map((s) => ({
        id: s.id as string,
        articleId: s.article_id as string,
        sectionIndex: s.section_index as number,
        subtitle: s.subtitle as string,
        originalText: s.original_text as string,
        translation: s.translation as string,
        subtext: (s.subtext as string) || '',
        emotionTag: (s.emotion_tag as string) || '',
        emotionScore: (s.emotion_score as number) || 0,
        sageMonologue: (s.sage_monologue as string) || undefined,
      })),
      allusions: rawAllusions.map((a) => ({
        id: a.id as string,
        articleId: a.article_id as string,
        sectionId: (a.section_id as string) || undefined,
        term: a.term as string,
        sourceBook: a.source_book as string,
        sourceQuote: (a.source_quote as string) || undefined,
        explanation: a.explanation as string,
      })),
      commentaries: rawCommentaries.map((m) => ({
        id: m.id as string,
        articleId: m.article_id as string,
        sectionId: (m.section_id as string) || undefined,
        criticName: m.critic_name as string,
        criticDynasty: (m.dynasty as string) || '',
        commentaryType: (m.commentary_type as '朱批' | '夹注' | '总评') || '总评',
        commentaryText: m.commentary_text as string,
        sourceBook: (m.source_book as string) || undefined,
      })),
    };

    return c.json({
      success: true,
      data: formattedArticle,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return c.json({ success: false, error: errorMessage }, 500);
  }
});

export default app;
