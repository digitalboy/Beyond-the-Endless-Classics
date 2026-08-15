'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TraditionalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'gate' | 'ruyi' | 'manuscript' | 'simple';
  goldColor?: string;
  bgColor?: string;
  hoverEffect?: boolean;
  className?: string;
  contentClassName?: string;
  showOrnaments?: boolean;
}

/**
 * 经典古典门券叠涩（Pointed Ogee Arch with Stepped Shoulders）与宝相花纹饰卡片
 * 基于 ResizeObserver 实时计算矢量路径，严丝合缝自适应任意卡片尺寸
 */
export const TraditionalCard: React.FC<TraditionalCardProps> = ({
  children,
  variant = 'gate',
  goldColor = 'var(--color-paper-wash, #b89255)',
  bgColor = 'var(--color-paper-raw, #faf6ee)',
  hoverEffect = true,
  className,
  contentClassName,
  showOrnaments = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { width: w, height: h } = dimensions;

  // 门券叠涩几何参数计算
  const edgeMargin = 14;
  const stepH = 18;
  const stepV = 14;
  const topPeakY = 10;
  const shoulderY = 42;
  const notchY = shoulderY - stepV;
  const notchX = edgeMargin + stepH;
  const gap = 6;

  // 1. 外层尖券叠涩拱形轮廓 (Outer Path)
  const outerPath = w > 0 && h > 0 ? `
    M ${edgeMargin}, ${shoulderY}
    L ${notchX}, ${shoulderY}
    L ${notchX}, ${notchY}
    C ${notchX + (w / 2 - notchX) * 0.4}, ${notchY - 2}, ${w / 2 - 28}, ${topPeakY + 8}, ${w / 2}, ${topPeakY}
    C ${w / 2 + 28}, ${topPeakY + 8}, ${w - notchX - (w / 2 - notchX) * 0.4}, ${notchY - 2}, ${w - notchX}, ${notchY}
    L ${w - notchX}, ${shoulderY}
    L ${w - edgeMargin}, ${shoulderY}
    L ${w - edgeMargin}, ${h - shoulderY}
    L ${w - notchX}, ${h - shoulderY}
    L ${w - notchX}, ${h - notchY}
    C ${w - notchX - (w / 2 - notchX) * 0.4}, ${h - notchY + 2}, ${w / 2 + 28}, ${h - topPeakY - 8}, ${w / 2}, ${h - topPeakY}
    C ${w / 2 - 28}, ${h - topPeakY - 8}, ${notchX + (w / 2 - notchX) * 0.4}, ${h - notchY + 2}, ${notchX}, ${h - notchY}
    L ${notchX}, ${h - shoulderY}
    L ${edgeMargin}, ${h - shoulderY}
    Z
  ` : '';

  // 2. 内层平行双轨线 (Inner Path)
  const inMargin = edgeMargin + gap;
  const inShoulderY = shoulderY - gap * 0.5;
  const inNotchX = notchX + gap;
  const inNotchY = notchY + gap;
  const inTopPeakY = topPeakY + gap;

  const innerPath = w > 0 && h > 0 ? `
    M ${inMargin}, ${inShoulderY}
    L ${inNotchX}, ${inShoulderY}
    L ${inNotchX}, ${inNotchY}
    C ${inNotchX + (w / 2 - inNotchX) * 0.4}, ${inNotchY - 2}, ${w / 2 - 24}, ${inTopPeakY + 8}, ${w / 2}, ${inTopPeakY}
    C ${w / 2 + 24}, ${inTopPeakY + 8}, ${w - inNotchX - (w / 2 - inNotchX) * 0.4}, ${inNotchY - 2}, ${w - inNotchX}, ${inNotchY}
    L ${w - inNotchX}, ${inShoulderY}
    L ${w - inMargin}, ${inShoulderY}
    L ${w - inMargin}, ${h - inShoulderY}
    L ${w - inNotchX}, ${h - inShoulderY}
    L ${w - inNotchX}, ${h - inNotchY}
    C ${w - inNotchX - (w / 2 - inNotchX) * 0.4}, ${h - inNotchY + 2}, ${w / 2 + 24}, ${h - inTopPeakY - 8}, ${w / 2}, ${h - topPeakY - gap}
    C ${w / 2 - 24}, ${h - inTopPeakY - 8}, ${inNotchX + (w / 2 - inNotchX) * 0.4}, ${h - inNotchY + 2}, ${inNotchX}, ${h - inNotchY}
    L ${inNotchX}, ${h - inShoulderY}
    L ${inMargin}, ${h - inShoulderY}
    Z
  ` : '';

  return (
    <div
      ref={containerRef}
      className={cn(
        'group relative select-none transition-all duration-500 flex flex-col',
        hoverEffect && 'hover:-translate-y-1.5 cursor-pointer',
        className
      )}
      style={{
        filter: hoverEffect
          ? 'drop-shadow(0 10px 24px rgba(184, 146, 85, 0.12))'
          : 'drop-shadow(0 4px 12px rgba(184, 146, 85, 0.08))',
      }}
      {...props}
    >
      {/* 动态计算渲染的 SVG 纹饰与边框背景层 */}
      {w > 0 && h > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-visible"
          viewBox={`0 0 ${w} ${h}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 主外层门券轮廓与宣纸填充 */}
          <path
            d={outerPath}
            stroke="currentColor"
            className="text-paper-wash transition-colors duration-500 group-hover:text-cinnabar"
            strokeWidth="1.8"
            fill={bgColor}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 内层平行等距朱丝细线 */}
          <path
            d={innerPath}
            stroke="currentColor"
            className="text-paper-wash/80 transition-colors duration-500 group-hover:text-cinnabar/60"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 顶部中式宝相花与对称卷草纹 */}
          {showOrnaments && (
            <g
              transform={`translate(${w / 2}, ${inTopPeakY + 22})`}
              className="text-paper-wash transition-colors duration-500 group-hover:text-cinnabar"
            >
              {/* 中央宝相莲蕾 */}
              <path d="M 0,-12 C -2.5,-8 -3.5,-2 0,1 C 3.5,-2 2.5,-8 0,-12 Z" fill="currentColor" />
              <path
                d="M -2.5,-4 C -6,-6.5 -8.5,-3 -7,0 C -5,2.5 -1.5,1 0,1 C 1.5,1 5,2.5 7,0 C 8.5,-3 6,-6.5 2.5,-4"
                fill="currentColor"
                opacity="0.9"
              />

              {/* 左侧 S 型古典卷草 */}
              <path
                d="M -2, 1 C -10, 1 -17,-6 -24,-2.5 C -29, 0 -25, 6 -19, 3.5 C -14, 1.8 -15.5,-1.8 -21,-1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M -13,-3.5 C -17,-8.5 -22,-7 -20,-3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="-24" cy="-2.5" r="1.3" fill="currentColor" />

              {/* 右侧 S 型古典卷草 */}
              <path
                d="M 2, 1 C 10, 1 17,-6 24,-2.5 C 29, 0 25, 6 19, 3.5 C 14, 1.8 15.5,-1.8 21,-1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M 13,-3.5 C 17,-8.5 22,-7 20,-3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="24" cy="-2.5" r="1.3" fill="currentColor" />
            </g>
          )}

          {/* 底部中式宝相花对称镜像 */}
          {showOrnaments && (
            <g
              transform={`translate(${w / 2}, ${h - inTopPeakY - 22}) scale(1, -1)`}
              className="text-paper-wash transition-colors duration-500 group-hover:text-cinnabar"
            >
              {/* 中央宝相莲蕾 */}
              <path d="M 0,-12 C -2.5,-8 -3.5,-2 0,1 C 3.5,-2 2.5,-8 0,-12 Z" fill="currentColor" />
              <path
                d="M -2.5,-4 C -6,-6.5 -8.5,-3 -7,0 C -5,2.5 -1.5,1 0,1 C 1.5,1 5,2.5 7,0 C 8.5,-3 6,-6.5 2.5,-4"
                fill="currentColor"
                opacity="0.9"
              />

              {/* 左侧 S 型古典卷草 */}
              <path
                d="M -2, 1 C -10, 1 -17,-6 -24,-2.5 C -29, 0 -25, 6 -19, 3.5 C -14, 1.8 -15.5,-1.8 -21,-1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="-24" cy="-2.5" r="1.3" fill="currentColor" />

              {/* 右侧 S 型古典卷草 */}
              <path
                d="M 2, 1 C 10, 1 17,-6 24,-2.5 C 29, 0 25, 6 19, 3.5 C 14, 1.8 15.5,-1.8 21,-1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="-2.5" r="1.3" fill="currentColor" />
            </g>
          )}
        </svg>
      )}

      {/* 卡片内部内容插槽 (预留顶底宝相花避让区域) */}
      <div
        className={cn(
          'relative z-10 w-full flex-1 flex flex-col',
          showOrnaments ? 'pt-10 pb-9 px-6' : 'p-6',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
