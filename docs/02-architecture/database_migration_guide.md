# Cloudflare D1 数据库迁移与本地/远程同步指南 (Database Migration Guide)

## 一、 迁移文件体系概览

本项目采用 Cloudflare D1 标准版本化 SQL 迁移架构，统一维护于根目录 `migrations/`：

```
migrations/
├── 0001_initial_schema.sql         # 全维 10 大核心表结构与高性能复合索引定义
└── 0002_seed_initial_classics.sql   # 初始四大朝代标杆篇目全要素种子数据（周/蜀/唐/宋）
```

---

## 二、 基础配置准备 (`wrangler.jsonc`)

在项目根目录中配置 D1 数据库绑定（例如数据库名称命名为 `beyond-classics-db`）：

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "beyond-the-endless-classics",
  "main": "apps/api/src/index.ts",
  "compatibility_date": "2026-03-01",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "beyond-classics-db",
      "database_id": "<YOUR_REMOTE_D1_DATABASE_ID>",
      "migrations_dir": "migrations"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MEDIA_BUCKET",
      "bucket_name": "beyond-classics-media"
    }
  ]
}
```

---

## 三、 常用 Migration 命令清单

### 1. 本地开发数据库同步 (Local Development)

在本地开发调试阶段，Wrangler 会在本地 `.wrangler/state/v3/d1` 中自动模拟 SQLite 实例，无需联网即可秒级测试：

```powershell
# 1. 运行本地所有待执行的迁移（创建表结构 + 写入标杆数据）
npx wrangler d1 migrations apply beyond-classics-db --local

# 2. 查询本地数据库验证数据
npx wrangler d1 execute beyond-classics-db --local --command "SELECT id, title, dynasty, genre, written_iso FROM articles;"

# 3. 验证段落潜台词与情绪分值
npx wrangler d1 execute beyond-classics-db --local --command "SELECT subtitle, emotion_tag, emotion_score FROM article_sections WHERE article_id='chibifu-qian';"
```

### 2. 生产/远程数据库同步 (Remote Production)

当准备部署至 Cloudflare 生产环境时：

```powershell
# 1. 在 Cloudflare 创建远程 D1 数据库（若尚未创建）
npx wrangler d1 create beyond-classics-db

# 2. 将 migrations 目录下所有版本化 SQL 迁移应用到远程生产数据库
npx wrangler d1 migrations apply beyond-classics-db --remote

# 3. 校验远程数据库状态
npx wrangler d1 execute beyond-classics-db --remote --command "SELECT count(*) AS total_articles FROM articles;"
```
