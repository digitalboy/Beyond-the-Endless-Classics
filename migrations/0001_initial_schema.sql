-- ====================================================================
-- Cloudflare D1 Migration: 0001_initial_schema.sql
-- 《古文观止·观不止》全景多维数据底层架构
-- 包含 10 张核心表及高性能索引定义
-- ====================================================================

-- 1. 先贤作者表
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY,                       -- 语义 Slug (如 'su-shi', 'zhuge-liang')
  name TEXT NOT NULL,                        -- '苏轼'
  courtesy_name TEXT,                        -- 字 '子瞻'
  pseudonym TEXT,                            -- 号 '东坡居士'
  dynasty TEXT NOT NULL,                     -- '北宋'
  birth_iso TEXT,                            -- ISO 8601 (如 '1037-01-08T00:00:00.000Z')
  death_iso TEXT,                            -- ISO 8601 (如 '1101-08-24T00:00:00.000Z')
  portrait_url TEXT,                         -- 历代画像地址 (R2/CDN)
  personality_tags TEXT,                     -- JSON Array: ["旷达", "幽默", "儒道互补"]
  life_summary TEXT,                         -- 生平概要
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 2. 经典篇目表 (全维元数据)
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,                       -- 语义 Slug (如 'chibifu-qian')
  title TEXT NOT NULL,                       -- '前赤壁赋'
  genre TEXT NOT NULL,                       -- 文体: '赋' | '表' | '祭文' | '记' | '论' | '书' | '序'
  author_id TEXT NOT NULL REFERENCES authors(id),
  dynasty TEXT NOT NULL,                     -- '北宋'
  written_iso TEXT NOT NULL,                 -- ISO 8601 (如 '1082-10-15T00:00:00.000Z', 先秦支持负年份)
  lunar_calendar_desc TEXT NOT NULL,         -- '宋神宗元丰五年七月既望 (壬戌)'
  location_ancient TEXT NOT NULL,            -- '黄州赤鼻矶'
  location_modern TEXT NOT NULL,             -- '湖北省黄冈市黄州区东坡赤壁'
  longitude REAL NOT NULL,                   -- 114.87
  latitude REAL NOT NULL,                    -- 30.44
  political_crisis TEXT,                     -- 时代党争与政治处境
  core_psychology TEXT,                      -- 核心心理危机与精神突围机制
  summary TEXT,                              -- 篇章全景介绍
  word_count INTEGER,                        -- 全文字数
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 3. 篇章自然段落表
CREATE TABLE IF NOT EXISTS article_sections (
  id TEXT PRIMARY KEY,                       -- 如 'chibifu-qian-1'
  article_id TEXT NOT NULL REFERENCES articles(id),
  section_index INTEGER NOT NULL,            -- 1, 2, 3...
  subtitle TEXT NOT NULL,                    -- 工笔意境小题 '清风徐来 · 水月初升'
  original_text TEXT NOT NULL,               -- 原文
  translation TEXT NOT NULL,                 -- 白话精译
  subtext TEXT NOT NULL,                     -- 潜台词深层心理剖析
  emotion_tag TEXT NOT NULL,                 -- 情绪标签 '怡然超旷'
  emotion_score INTEGER NOT NULL,            -- 情绪分值 -100 ~ 100
  sage_monologue TEXT NOT NULL,              -- 第一人称先贤随笔心语
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 4. 典故考据与跨时空互文表
CREATE TABLE IF NOT EXISTS allusions (
  id TEXT PRIMARY KEY,                       -- 如 'allusion-wang-meiren'
  article_id TEXT NOT NULL REFERENCES articles(id),
  section_id TEXT REFERENCES article_sections(id),
  term TEXT NOT NULL,                        -- '望美人兮天一方'
  source_book TEXT NOT NULL,                 -- '屈原《楚辞·离骚》'
  source_quote TEXT,                         -- 原文金句
  explanation TEXT NOT NULL,                 -- 隐喻与考释
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 5. 涉及历史人物表
CREATE TABLE IF NOT EXISTS historical_figures (
  id TEXT PRIMARY KEY,                       -- 如 'fig-cao-cao'
  name TEXT NOT NULL,                        -- '曹操'
  era TEXT NOT NULL,                         -- '东汉末年 / 三国'
  identity TEXT NOT NULL,                    -- 历史身份
  relation_to_article TEXT NOT NULL,         -- 与篇章人物关系
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 6. 历代名家评点表
CREATE TABLE IF NOT EXISTS commentaries (
  id TEXT PRIMARY KEY,                       -- 如 'comm-mao-1'
  article_id TEXT NOT NULL REFERENCES articles(id),
  section_id TEXT REFERENCES article_sections(id),
  critic_name TEXT NOT NULL,                 -- 评点家 (如 '吴楚材', '茅坤')
  dynasty TEXT NOT NULL,                     -- 朝代
  source_book TEXT NOT NULL,                 -- 出处 (如 '《古文观止》', '《唐宋八大家文钞》')
  commentary_text TEXT NOT NULL,             -- 评语内容
  commentary_type TEXT NOT NULL,             -- '朱批' | '总评' | '夹注'
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 7. 视觉与名画资产表
CREATE TABLE IF NOT EXISTS visual_assets (
  id TEXT PRIMARY KEY,                       -- 如 'asset-wuyuanzhi-chibi'
  article_id TEXT NOT NULL REFERENCES articles(id),
  asset_type TEXT NOT NULL,                  -- 'MASTERPIECE' | 'PORTRAIT' | 'MANUSCRIPT' | 'SCENE'
  title TEXT NOT NULL,                       -- 作品名称 (如 '金·武元直《赤壁图》')
  artist TEXT,                               -- 创作者
  era TEXT,                                  -- 创作朝代
  holding_institution TEXT,                  -- 收藏机构 (如 '台北故宫博物院藏')
  image_url TEXT NOT NULL,                   -- CDN / R2 地址
  description TEXT NOT NULL,                 -- 艺术赏析
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 8. 用户体系表 (Firebase Google 账号映射)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,                       -- Firebase UID
  email TEXT UNIQUE NOT NULL,                -- Google 邮箱
  display_name TEXT,                         -- 用户昵称
  avatar_url TEXT,                           -- 头像 URL
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  last_login_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 9. 用户篇目收藏与朱批书签表
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id TEXT PRIMARY KEY,                       -- UUIDv7
  user_id TEXT NOT NULL REFERENCES users(id),
  article_id TEXT NOT NULL REFERENCES articles(id),
  section_id TEXT REFERENCES article_sections(id),
  user_note TEXT,                            -- 读者朱砂批注
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 10. 用户与先贤跨时空对话消息表
CREATE TABLE IF NOT EXISTS sage_conversations (
  id TEXT PRIMARY KEY,                       -- UUIDv7
  user_id TEXT NOT NULL REFERENCES users(id),
  article_id TEXT NOT NULL REFERENCES articles(id),
  author_id TEXT NOT NULL REFERENCES authors(id),
  sender_role TEXT NOT NULL,                 -- 'USER' | 'SAGE'
  content TEXT NOT NULL,                     -- 对话内容
  created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- ====================================================================
-- 高性能索引 (Indexes)
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_genre ON articles(genre);
CREATE INDEX IF NOT EXISTS idx_articles_dynasty ON articles(dynasty);
CREATE INDEX IF NOT EXISTS idx_sections_article_idx ON article_sections(article_id, section_index);
CREATE INDEX IF NOT EXISTS idx_allusions_article ON allusions(article_id);
CREATE INDEX IF NOT EXISTS idx_commentaries_article ON commentaries(article_id);
CREATE INDEX IF NOT EXISTS idx_visual_assets_article ON visual_assets(article_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON sage_conversations(user_id, article_id);
