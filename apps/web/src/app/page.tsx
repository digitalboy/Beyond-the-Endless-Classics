'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SagePantheon } from '@/components/theatre/SagePantheon';
import { DestinyStage } from '@/components/theatre/DestinyStage';

export default function HomePage() {
  const [selectedSage, setSelectedSage] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);

  const handleSelectSage = (sageId: string) => {
    setIsExploding(true);
    setTimeout(() => {
      setSelectedSage(sageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);

    setTimeout(() => {
      setIsExploding(false);
    }, 1200);
  };

  const handleBackToPantheon = () => {
    setSelectedSage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleSlug: string) => {
    // 路由跳转至文章竖排水墨长卷页
    window.location.href = `/article/${articleSlug}`;
  };

  return (
    <main className="min-h-screen flex flex-col relative overflow-x-hidden bg-paper-warm">
      {/* 首页全景宋代水墨山水背景 (古松、绝壁、远山、孤舟经卷) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-bottom sm:bg-center bg-no-repeat opacity-25 mix-blend-multiply"
        style={{ backgroundImage: "url('/assets/home_ink_landscape_bg.png')" }}
      />

      {/* 全屏水墨浓墨破空转场层 */}
      {isExploding && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-md ink-transition-active">
          <svg
            className="w-200 h-200 text-[#0d0c0b]"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path
              d="M100,20 C130,20 180,50 170,100 C160,150 130,180 100,180 C60,180 20,140 30,90 C40,40 70,20 100,20 Z"
              filter="blur(4px)"
            />
          </svg>
        </div>
      )}

      {/* 顶部素雅题签 */}
      <header className="relative z-40 px-8 py-3.5 flex items-center justify-between border-b border-paper-wash/60 bg-paper-raw/90 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-4">
          {/* 横向无背景水墨手书 Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/assets/logo-remove-bg.png"
              alt="古文观不止"
              className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105 select-none"
            />
          </Link>
          <div className="hidden sm:flex items-center border-l border-paper-wash/80 pl-4 py-1">
            <span className="text-xs font-archaic text-ink-light tracking-[0.2em]">
              文止于此，人观不止。
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-archaic text-ink-light hidden md:flex">
          <span className="seal-box px-2 py-0.5 font-brush border-cinnabar text-cinnabar">
            先贤剧场
          </span>
          <span>以先贤为宇宙 · 沉浸式时空入戏</span>
        </div>
      </header>

      {/* 主体切换：第一幕 (群像) <-> 第二幕 (命途与手札) */}
      {!selectedSage ? (
        <SagePantheon onSelectSage={handleSelectSage} />
      ) : (
        <DestinyStage
          sageId={selectedSage}
          onBack={handleBackToPantheon}
          onSelectArticle={handleSelectArticle}
        />
      )}
    </main>
  );
}
