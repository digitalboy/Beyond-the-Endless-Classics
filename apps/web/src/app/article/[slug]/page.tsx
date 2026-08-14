import React from 'react';
import Link from 'next/link';
import { fetchArticleDetailFromCloud } from '@/lib/api-client';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'chibifu-qian' },
    { slug: 'caogui-lunzhan' },
    { slug: 'chushibiao-qian' },
    { slug: 'jishierlangwen' },
  ];
}

export default async function ArticleScrollPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleDetailFromCloud(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#181411] flex flex-col items-center justify-center text-paper-raw p-8">
        <h2 className="text-2xl font-bold font-song text-cinnabar">篇章信札载入中 / 未寻得此篇</h2>
        <Link href="/" className="mt-6 seal-box px-4 py-1 text-sm font-brush text-paper-raw hover:text-cinnabar">
          ◀ 返回先贤星汉剧场
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#181411] text-[#fbf6ed] flex flex-col relative overflow-x-hidden">
      {/* 顶部控制栏 */}
      <header className="sticky top-0 z-30 bg-[#1f1b18]/90 backdrop-blur border-b border-paper-wash/30 px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-archaic text-paper-wash hover:text-cinnabar transition px-3 py-1.5 rounded bg-black/40 border border-paper-wash/20"
        >
          <span>◀ 返回先贤短剧舞台</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="seal-solid px-2 py-0.5 text-xs font-brush">{article.dynasty}</span>
          <h1 className="text-xl font-bold font-song tracking-[0.25em] text-[#fbf6ed]">
            {article.title}
          </h1>
          <span className="text-xs font-archaic text-cinnabar">· {article.genre}</span>
        </div>

        <div className="text-xs font-archaic text-paper-aged hidden sm:block">
          {article.lunarCalendarDesc} · 作于 {article.locationAncient}
        </div>
      </header>

      {/* 心理危机与创作背景导言 */}
      <section className="max-w-5xl mx-auto w-full px-8 pt-8 pb-4">
        <div className="p-6 rounded-2xl bg-[#231f1c] border border-paper-wash/40 shadow-theatre space-y-3">
          <div className="flex items-center gap-2 text-xs font-archaic text-cinnabar">
            <span className="inline-block w-2 h-2 rounded-full bg-cinnabar" />
            <span>【命途处境与精神突围】</span>
          </div>
          <p className="text-sm font-song text-paper-raw leading-relaxed">
            {article.historicalContext}
          </p>
          <div className="pt-2 border-t border-paper-wash/30 text-xs font-archaic text-paper-wash">
            <span className="text-cinnabar">核心心理机制：</span>{article.psychologicalBackground}
          </div>
        </div>
      </section>

      {/* 竖排长卷自右向左阅读区域 */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-8 py-6 space-y-8">
        {article.sections && article.sections.length > 0 ? (
          article.sections.map((sec) => (
            <article
              key={sec.id}
              className="p-8 rounded-3xl bg-[#fbf6ed] text-ink-burnt border-2 border-paper-wash shadow-theatre space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-paper-wash/60 pb-3">
                <span className="text-xs font-archaic text-cinnabar font-bold">
                  第 {sec.sectionIndex} 段 · {sec.subtitle}
                </span>
                <span className="seal-box px-2 py-0.5 text-[10px] font-brush text-cinnabar">
                  心境：{sec.emotionTag} ({sec.emotionScore}分)
                </span>
              </div>

              {/* 原文 */}
              <div className="text-xl md:text-2xl font-serif text-ink-thick leading-loose tracking-widest indent-8">
                {sec.originalText}
              </div>

              {/* 先贤心声独白 */}
              {sec.sageMonologue && (
                <div className="p-4 rounded-xl bg-[#ede5d8] border-l-4 border-cinnabar text-xs font-song text-ink-thick leading-relaxed">
                  <span className="font-bold text-cinnabar block mb-1">【先贤内心独白】</span>
                  <span>{sec.sageMonologue}</span>
                </div>
              )}

              {/* 现代白话今译 */}
              <div className="p-4 rounded-xl bg-paper-cooked/60 border border-paper-wash/60 text-sm font-song text-ink-light leading-relaxed">
                <span className="font-bold text-ink-burnt block mb-1 text-xs">【白话今译】</span>
                <span>{sec.translation}</span>
              </div>

              {/* 心理潜台词 */}
              {sec.subtext && (
                <div className="p-4 rounded-xl bg-black/5 text-xs font-archaic text-ink-thick leading-relaxed border border-dashed border-paper-wash">
                  <span className="font-bold text-cinnabar block mb-0.5">【文本潜台词 / 精神隐喻】</span>
                  <span>{sec.subtext}</span>
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="p-12 text-center text-paper-wash font-archaic">暂无段落数据</div>
        )}

        {/* 历代名家总评 */}
        {article.commentaries && article.commentaries.length > 0 && (
          <div className="p-8 rounded-3xl bg-[#231f1c] border border-paper-wash/40 space-y-4">
            <h3 className="text-lg font-bold font-song text-[#fbf6ed] tracking-widest flex items-center gap-2">
              <span className="seal-solid px-2 py-0.5 text-xs font-brush">朱批</span>
              <span>历代名家眉批与总评</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {article.commentaries.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 rounded-xl bg-black/40 border border-paper-wash/30 text-xs font-song text-paper-aged space-y-1.5"
                >
                  <div className="flex items-center justify-between text-cinnabar font-archaic">
                    <span>{comm.criticName} ({comm.criticDynasty})</span>
                    <span>{comm.sourceBook}</span>
                  </div>
                  <p className="leading-relaxed text-paper-raw">{comm.commentaryText}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
