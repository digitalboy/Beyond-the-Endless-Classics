'use client';

import React, { useState } from 'react';
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
    <main className="min-h-screen flex flex-col relative overflow-x-hidden">
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
      <header className="relative z-40 px-10 py-5 flex items-center justify-between border-b border-paper-wash/20 bg-[#141211]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="seal-solid px-2 py-1 text-xs font-brush rounded-xs shadow-seal">
            文止观不止
          </div>
          <div className="text-xl font-bold font-song tracking-[0.25em] text-paper-raw">
            华夏先贤 · 交互式水墨短剧
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-archaic text-paper-aged">
          <span className="seal-box px-2 py-0.5 font-brush border-cinnabar/60 text-cinnabar">
            剧场模式
          </span>
          <span>从文章到生命 · 沉浸式时空入戏</span>
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
