# 《古文观止·观不止》（Beyond the Endless Classics）项目官方文档库

> **“文止于此，人观不止。”**  
> 《古文观止》原本的意思是“精彩至极，观止于此”。然而，文字虽有篇幅的终章，但文字背后人的命运、时代的情感、民族的风骨，却永无止境。

---

## 🧭 文档结构导航 (Documentation Hierarchy)

为避免内容重复与分散，全局文档划分为 **4 大清晰层级**：

```
docs/
├── README.md                          # [当前文档] 文档总索引与架构导航
│
├── 01-product/                        # 🎯【产品与愿景】
│   ├── vision.md                      # 项目核心愿景与多维时空认知定位
│   ├── feature_list.md                # 功能特性清单 (MoSCoW 优先级分级矩阵)
│   └── interactive_drama_spec.md      # 先贤星汉群像与交互式水墨短剧设计规范 (四幕式生命剧场)
│
├── 02-architecture/                   # 🏛️【系统与全栈架构】
│   ├── system_design.md               # 六维全景认知模型与 Monorepo 全栈架构 (apps/web + apps/api)
│   ├── database_spec.md               # Cloudflare D1 边缘数据库模型与双轨分层 ID 策略
│   ├── database_migration_guide.md    # D1 数据库版本化迁移与本地/远程同步指南
│   └── r2_storage_spec.md             # Cloudflare R2 海量多媒体资产存储与 CDN 分发规范
│
├── 03-standards/                      # 📐【工程与内容标准】
│   ├── knowledge_spec.md              # 古典文本知识工程标准 (5大维度、潜台词心理、校勘准则)
│   └── seo_spec.md                    # 动态 SEO、Sitemap、Hreflang 与 Schema.org 结构化数据规范
│
└── 04-prototype/                      # 🖌️【UI 原型与美学设计】
    ├── drama_homepage_demo.html       # 先贤星汉群像与交互式水墨短剧首页原型 (点击苏轼体验四幕剧场)
    ├── index.html                     # 郭熙气象与倪瓒逸韵水墨竖排手卷交互原型
    └── prototype_spec.md              # 中国古典长卷版式、装帧与交互美学规范
```

---

## 📚 各模块核心文档直达

### 1. 产品与愿景 (Product & Vision)
* **[01-product/vision.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/01-product/vision.md)** —— 确立“超越文本、重塑时空、复活生命”的项目宗旨。
* **[01-product/feature_list.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/01-product/feature_list.md)** —— 严格按照 Must / Should / Could / Won't 分级的功能特性清单。

### 2. 系统与全栈架构 (Architecture)
* **[02-architecture/system_design.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/02-architecture/system_design.md)** —— `apps/web` (Next.js) + `apps/api` (Hono on Cloudflare Worker) + `packages/` 前后端一体 Monorepo 体系架构。
* **[02-architecture/database_spec.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/02-architecture/database_spec.md)** —— Cloudflare D1 10 大核心表结构设计（作者、篇目、段落、典故、人物、评点、多媒体、Firebase 用户、书签、对话）与高性能复合索引。
* **[02-architecture/database_migration_guide.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/02-architecture/database_migration_guide.md)** —— 版本化迁移（`migrations/`）与开发/生产数据库同步命令。
* **[02-architecture/r2_storage_spec.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/02-architecture/r2_storage_spec.md)** —— Cloudflare R2 存储桶目录规范、零出站流量费、媒体 Range 分片与 CDN 缓存策略。

### 3. 工程与内容规范 (Standards)
* **[03-standards/knowledge_spec.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/03-standards/knowledge_spec.md)** —— 5 大文本结构化维度（版本校勘、段落潜台词、典故溯源、人物图谱、历代名家评点）录入标准与校验规则。
* **[03-standards/seo_spec.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/03-standards/seo_spec.md)** —— 动态 Sitemap 生成、简繁双轨 Hreflang、Schema.org 结构化数据与水墨动态 OG Image 分享卡片规范。

### 4. UI 原型与古典美学 (Prototype & Aesthetics)
* **[04-prototype/index.html](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/04-prototype/index.html)** —— 可直接在浏览器体验的自右向左纯正中国古典竖排手卷原型。
* **[04-prototype/prototype_spec.md](file:///c:/DavidCode/Beyond-the-Endless-Classics/docs/04-prototype/prototype_spec.md)** —— 郭熙《林泉高致》气象 + 倪瓒无界留白逸韵的界面与装帧设计规范。

---

## 🗄️ 数据库迁移与初始标杆种子数据 (Migrations)

全量数据库版本化定义与四大朝代标杆种子数据统一存放于根目录 **`migrations/`** 中：
* **[migrations/0001_initial_schema.sql](file:///c:/DavidCode/Beyond-the-Endless-Classics/migrations/0001_initial_schema.sql)** —— 10 大表结构 DDL 与复合索引
* **[migrations/0002_seed_initial_classics.sql](file:///c:/DavidCode/Beyond-the-Endless-Classics/migrations/0002_seed_initial_classics.sql)** —— 周文《曹刿论战》、蜀文《出师表》、唐文《祭十二郎文》、宋文《前赤壁赋》全要素数据
