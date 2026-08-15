import React from 'react';
import Link from 'next/link';
import { fetchArticleDetailFromCloud } from '@/lib/api-client';
import { TraditionalCard } from '@/components/ui/traditional-card';

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
      <div className="min-h-screen bg-paper-warm flex flex-col items-center justify-center text-ink-burnt p-8">
        <h2 className="text-2xl font-bold font-song text-cinnabar">篇章信札载入中 / 未寻得此篇</h2>
        <Link href="/" className="mt-6 seal-box px-4 py-1 text-sm font-brush text-ink-burnt hover:text-cinnabar">
          ◀ 返回先贤星汉剧场
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-paper-warm text-ink-burnt flex flex-col relative overflow-x-hidden">
      {/* 顶部控制栏 */}
      <header className="sticky top-0 z-30 bg-paper-raw/90 backdrop-blur border-b border-paper-wash px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/assets/logo.jfif"
              alt="古文观不止"
              className="h-10 w-auto mix-blend-multiply object-contain transition-transform duration-500 group-hover:scale-105 select-none"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-archaic text-ink-heavy hover:text-cinnabar transition px-3 py-1.5 rounded-lg bg-paper-cooked border border-paper-wash"
          >
            <span>◀ 先贤剧场</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="seal-solid px-2 py-0.5 text-xs font-brush">{article.dynasty}</span>
          <h1 className="text-xl font-bold font-song tracking-[0.25em] text-ink-burnt">
            {article.title}
          </h1>
          <span className="text-xs font-archaic text-cinnabar font-bold">· {article.genre}</span>
        </div>

        <div className="text-xs font-archaic text-ink-light hidden sm:block">
          {article.lunarCalendarDesc} · 作于 {article.locationAncient}
        </div>
      </header>

      {/* 心理危机与创作背景导言 (泛黄熟宣折页) */}
      <section className="max-w-5xl mx-auto w-full px-8 pt-8 pb-4">
        <TraditionalCard hoverEffect={false} className="p-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-archaic text-cinnabar font-bold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cinnabar" />
            <span>【命途处境与精神突围】</span>
          </div>
          <p className="text-sm font-song text-ink-thick leading-relaxed">
            {article.historicalContext}
          </p>
          <div className="pt-2 border-t border-paper-wash/60 text-xs font-archaic text-ink-light">
            <span className="text-cinnabar font-bold">核心心理机制：</span>{article.psychologicalBackground}
          </div>
        </TraditionalCard>
      </section>

      {/* 竖排长卷自右向左阅读区域 */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-8 py-6 space-y-8">
        {article.sections && article.sections.length > 0 ? (
          article.sections.map((sec) => (
            <TraditionalCard
              key={sec.id}
              hoverEffect={false}
              className="p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-paper-wash/80 pb-3">
                <span className="text-xs font-archaic text-cinnabar font-bold">
                  第 {sec.sectionIndex} 段 · {sec.subtitle}
                </span>
                <span className="seal-box px-2 py-0.5 text-[10px] font-brush text-cinnabar">
                  心境：{sec.emotionTag} ({sec.emotionScore}分)
                </span>
              </div>

              {/* 原文 (焦墨大字) */}
              <div className="text-xl md:text-2xl font-serif text-ink-burnt leading-loose tracking-widest indent-8">
                {sec.originalText}
              </div>

              {/* 先贤心声独白 (赭石金墨微笺) */}
              {sec.sageMonologue && (
                <div className="p-4 rounded-xl bg-paper-cooked/80 border-l-4 border-cinnabar text-xs font-song text-ink-thick leading-relaxed">
                  <span className="font-bold text-cinnabar block mb-1">【先贤内心独白】</span>
                  <span>{sec.sageMonologue}</span>
                </div>
              )}

              {/* 现代白话今译 (熟宣浅底) */}
              <div className="p-4 rounded-xl bg-paper-warm/80 border border-paper-wash/60 text-sm font-song text-ink-heavy leading-relaxed">
                <span className="font-bold text-ink-burnt block mb-1 text-xs">【白话今译】</span>
                <span>{sec.translation}</span>
              </div>

              {/* 心理潜台词 (朱砂虚线折页) */}
              {sec.subtext && (
                <div className="p-4 rounded-xl bg-paper-cooked/50 text-xs font-archaic text-ink-thick leading-relaxed border border-dashed border-cinnabar/40">
                  <span className="font-bold text-cinnabar block mb-0.5">【文本潜台词 / 精神隐喻】</span>
                  <span>{sec.subtext}</span>
                </div>
              )}
            </TraditionalCard>
          ))
        ) : (
          <div className="p-12 text-center text-ink-light font-archaic">暂无段落数据</div>
        )}

        {/* 历代名家总评 (松花绿与朱批传统底框) */}
        {article.commentaries && article.commentaries.length > 0 && (
          <div className="p-8 rounded-3xl bg-paper-raw border-2 border-paper-wash shadow-sheet space-y-4">
            <h3 className="text-lg font-bold font-song text-ink-burnt tracking-widest flex items-center gap-2">
              <span className="seal-solid px-2 py-0.5 text-xs font-brush">朱批</span>
              <span>历代名家眉批与总评</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {article.commentaries.map((comm) => (
                <div
                  key={comm.id}
                  className="p-4 rounded-xl bg-paper-cooked/70 border border-paper-wash/80 text-xs font-song text-ink-heavy space-y-1.5"
                >
                  <div className="flex items-center justify-between text-cinnabar font-archaic font-bold">
                    <span>{comm.criticName} ({comm.criticDynasty})</span>
                    <span>{comm.sourceBook}</span>
                  </div>
                  <p className="leading-relaxed text-ink-burnt">{comm.commentaryText}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
