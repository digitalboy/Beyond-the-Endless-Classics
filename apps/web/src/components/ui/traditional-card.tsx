'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TraditionalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'sage' | 'destiny' | 'manuscript' | 'scroll';
  hoverEffect?: boolean;
  className?: string;
}

/** 四角如意卷云纹 SVG 装饰 */
export const RuyiCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; className?: string }> = ({
  position,
  className,
}) => {
  const rotationMap = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-x-[-1] scale-y-[-1]',
  };

  const positionMap = {
    tl: 'top-1.5 left-1.5',
    tr: 'top-1.5 right-1.5',
    bl: 'bottom-1.5 left-1.5',
    br: 'bottom-1.5 right-1.5',
  };

  return (
    <div className={cn('absolute pointer-events-none w-7 h-7 text-paper-wash transition-colors duration-500 group-hover:text-cinnabar/80', positionMap[position], rotationMap[position], className)}>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        {/* 外角直角折角 */}
        <path d="M2,18 L2,2 L18,2" strokeWidth="1.2" />
        {/* 内层如意回勾 */}
        <path d="M5,14 L5,5 L14,5" strokeWidth="0.8" opacity="0.7" />
        {/* 传统卷草云纹 */}
        <path d="M7,7 C10,7 12,9 12,12 C12,15 9,16 7,14 C5,12 7,8 10,8" strokeWidth="0.9" />
        <path d="M2,2 L6,6" strokeWidth="0.8" opacity="0.6" />
        {/* 角落点缀圆珠 */}
        <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
  );
};

/** 顶部/底部对称中式卷草纹徽饰 (Header/Footer Crest) */
export const ChineseCrest: React.FC<{ className?: string; flipped?: boolean }> = ({
  className,
  flipped,
}) => {
  return (
    <div
      className={cn(
        'w-36 h-4 mx-auto text-paper-wash/80 pointer-events-none transition-colors duration-500 group-hover:text-cinnabar/60',
        flipped && 'rotate-180',
        className
      )}
    >
      <svg viewBox="0 0 120 16" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
        {/* 中央菱形吉祥扣 */}
        <polygon points="60,2 64,8 60,14 56,8" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
        <circle cx="60" cy="8" r="1.5" fill="currentColor" />
        {/* 左侧卷草蔓延 */}
        <path d="M54,8 C46,4 40,12 30,7 C24,3 18,8 10,8 L2,8" strokeWidth="0.9" />
        <path d="M48,8 C44,11 38,10 34,6" strokeWidth="0.7" opacity="0.7" />
        {/* 右侧卷草蔓延 */}
        <path d="M66,8 C74,4 80,12 90,7 C96,3 102,8 110,8 L118,8" strokeWidth="0.9" />
        <path d="M72,8 C76,11 82,10 86,6" strokeWidth="0.7" opacity="0.7" />
      </svg>
    </div>
  );
};

/**
 * 东方传统纹饰自适应卡片组件
 * 适用于不同尺寸 (头像卡片、手札、剧场、研读段落)
 */
export const TraditionalCard: React.FC<TraditionalCardProps> = ({
  children,
  variant = 'sage',
  hoverEffect = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative bg-paper-raw/95 backdrop-blur-xs rounded-2xl border-2 border-paper-wash/80 text-ink-burnt p-6 shadow-sheet transition-all duration-500 overflow-hidden flex flex-col',
        hoverEffect && 'hover:bg-[#fffdf9] hover:border-cinnabar hover:-translate-y-1.5 hover:shadow-theatre cursor-pointer',
        variant === 'sage' && 'border-2',
        variant === 'manuscript' && 'p-7 rounded-3xl bg-[#fbf6ed]',
        variant === 'destiny' && 'bg-paper-cooked/90 p-8 rounded-3xl border-2',
        className
      )}
      {...props}
    >
      {/* 1. 四角如意古纹 */}
      <RuyiCorner position="tl" />
      <RuyiCorner position="tr" />
      <RuyiCorner position="bl" />
      <RuyiCorner position="br" />

      {/* 2. 内层双轨细线朱丝栏框 (具有古籍经折装内框质感) */}
      <div className="absolute inset-2.5 rounded-xl border border-dashed border-paper-wash/60 pointer-events-none transition-colors duration-500 group-hover:border-cinnabar/30" />

      {/* 3. 顶部微饰 */}
      <ChineseCrest className="absolute top-1.5 left-1/2 -translate-x-1/2 opacity-70" />

      {/* 4. 卡片核心内容 */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </div>

      {/* 5. 底部微饰 */}
      <ChineseCrest className="absolute bottom-1.5 left-1/2 -translate-x-1/2 opacity-70" flipped />
    </div>
  );
};
