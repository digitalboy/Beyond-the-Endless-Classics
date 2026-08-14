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

// 获取所有先贤列表
app.get('/api/authors', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT id, name, courtesy_name, pseudonym, dynasty, birth_iso, life_summary FROM authors ORDER BY birth_iso ASC'
    ).all();
    return c.json({ success: true, data: results });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    // 降级模拟数据（在未绑定远程 D1 实例时保障本地调用）
    return c.json({
      success: true,
      data: [
        {
          id: 'su-shi',
          name: '苏轼',
          courtesy_name: '子瞻',
          pseudonym: '东坡居士',
          dynasty: '北宋',
          life_summary: '宋代文学之峰巅，乌台死劫后谪居黄州，完成千古水月齐物突围。',
        },
      ],
      warning: errorMessage,
    });
  }
});

export default app;
