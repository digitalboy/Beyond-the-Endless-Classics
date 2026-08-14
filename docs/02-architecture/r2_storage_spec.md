# Cloudflare R2 多媒体资产存储与 CDN 分发规范 (R2 Storage Specification)

## 一、 为什么选用 Cloudflare R2？

本项目包含海量的高分辨率历代名画、书法碑拓切片、古琴洞箫场景音频、先贤吟诵与古迹航拍视频。
Cloudflare R2 作为兼容 S3 API 的对象存储，具备以下核心优势：
* **零出站流量费（Zero Egress Fees）**：读者反复缩放高清长卷、流式播放音频视频，均无需承担昂贵的流量出站成本；
* **全球边缘 CDN 毫秒级加速**：与 Cloudflare 全球 300+ 边缘节点无缝打通，提供自动 Brotli 压缩与强缓存；
* **支持大文件分片上传与视频 Range 请求**：支持大体积 4K 名画与音视频媒体的流式缓冲。

---

## 二、 R2 Bucket 目录与资源命名体系

```
r2-bucket: beyond-classics-media/
│
├── images/                          # 高清图像资产 (WebP / AVIF)
│   ├── portraits/                   # 历代先贤传世画像与绣像 (如 su-shi.webp)
│   ├── paintings/                   # 传世名画超高清真迹与展卷切片 (如 wu-yuanzhi-chibitu/full.webp)
│   ├── manuscripts/                 # 先贤手泽书法真迹、名家书丹碑拓 (如 su-shi-chibifu-calligraphy/s1.webp)
│   └── scenes/                      # 工笔意象情境原画与古地志版画 (如 changshao-ancient-map.webp)
│
├── audio/                           # 古典声学资产 (AAC / MP3 / OGG)
│   ├── ambience/                    # 场景氛围声效 (江潮、松涛、夜雨，支持无缝循环)
│   │   └── chibi-night-waves.mp3
│   ├── bgm/                         # 场景古乐 (古琴泛音、洞箫呜咽、琵琶清音)
│   │   └── dongxiao-wuyan.mp3
│   └── recitation/                  # 典籍朗诵与古法声律吟诵
│       ├── mandarin/chibifu-qian.mp3    # 普通话名家朗诵
│       └── chant/chibifu-qian.mp3       # 古法格律吟诵
│
└── video/                           # 历史考据与画卷微动视频 (H.265 / AV1 / WebM)
    ├── aerial-sites/                # 古战场、遗址与名胜古迹高清航拍 (如 huangzhou-chibi-aerial.mp4)
    └── animated-scrolls/            # 传世名画微动动态手卷 (烟云变灭、水波微动)
```

---

## 三、 自定义域名与缓存优化策略 (CDN & Caching)

### 1. 域名绑定与资源 URL 映射
* **生产资产 CDN 域名**：`https://assets.guwen.app`；
* **资源访问示例**：
  * 先贤画像：`https://assets.guwen.app/images/portraits/su-shi.webp`
  * 洞箫音频：`https://assets.guwen.app/audio/bgm/dongxiao-wuyan.mp3`
  * 遗址航拍：`https://assets.guwen.app/video/aerial-sites/huangzhou-chibi-aerial.mp4`

### 2. HTTP 缓存头规范 (Cache-Control)
所有不可变媒体资源（Immutable Media）配置长期强缓存：
```http
Cache-Control: public, max-age=31536000, immutable
Access-Control-Allow-Origin: *
Accept-Ranges: bytes
```
* `Accept-Ranges: bytes`：确保音频与视频在移动端和手卷中支持任意拖拽进度条流式播放（HTTP 206 Partial Content）。
