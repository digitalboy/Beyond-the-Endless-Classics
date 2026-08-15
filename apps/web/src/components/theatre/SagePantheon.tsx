'use client';

import React, { useEffect, useState } from 'react';
import type { Author } from '@beyond-classics/types';
import { fetchAuthorsFromCloud } from '@/lib/api-client';
import { TraditionalCard } from '@/components/ui/traditional-card';

// ─────────────────────────────────────────────────────────────
// 回纹 (Chinese meander / key pattern) 圆形装饰边框
// NOTE: 模块级预计算 SVG path，避免每次渲染重复运算。
// 原理：在外环半径 oR 与内环半径 iR 之间生成锯齿状环形路径，
// 填充后呈现出传统 回纹 纹饰效果，用于装饰先贤肖像外框。
// ─────────────────────────────────────────────────────────────
const MEANDER_SVG_SIZE = 176;
const MEANDER_CENTER = MEANDER_SVG_SIZE / 2; // 88
const MEANDER_OUTER_R = 84;
const MEANDER_INNER_R = 73;
const MEANDER_TEETH = 24;

function computeMeanderRingPath(): string {
  const cx = MEANDER_CENTER;
  const cy = MEANDER_CENTER;
  const oR = MEANDER_OUTER_R;
  const iR = MEANDER_INNER_R;
  const n = MEANDER_TEETH;
  let d = '';

  for (let i = 0; i < n; i++) {
    const a1 = (2 * Math.PI / n) * i - Math.PI / 2;
    const aMid = (2 * Math.PI / n) * (i + 0.5) - Math.PI / 2;
    const a2 = (2 * Math.PI / n) * (i + 1) - Math.PI / 2;

    const ox1 = cx + oR * Math.cos(a1);
    const oy1 = cy + oR * Math.sin(a1);
    const oxM = cx + oR * Math.cos(aMid);
    const oyM = cy + oR * Math.sin(aMid);
    const ixM = cx + iR * Math.cos(aMid);
    const iyM = cy + iR * Math.sin(aMid);
    const ix2 = cx + iR * Math.cos(a2);
    const iy2 = cy + iR * Math.sin(a2);
    const ox2 = cx + oR * Math.cos(a2);
    const oy2 = cy + oR * Math.sin(a2);

    if (i === 0) d += `M ${ox1.toFixed(1)},${oy1.toFixed(1)} `;
    d += `A ${oR},${oR} 0 0,1 ${oxM.toFixed(1)},${oyM.toFixed(1)} `;
    d += `L ${ixM.toFixed(1)},${iyM.toFixed(1)} `;
    d += `A ${iR},${iR} 0 0,1 ${ix2.toFixed(1)},${iy2.toFixed(1)} `;
    d += `L ${ox2.toFixed(1)},${oy2.toFixed(1)} `;
  }

  d += 'Z';
  return d;
}

const MEANDER_RING_PATH = computeMeanderRingPath();

interface SagePantheonProps {
  onSelectSage: (sageId: string) => void;
}

export const SagePantheon: React.FC<SagePantheonProps> = ({ onSelectSage }) => {
  const [cloudAuthors, setCloudAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchAuthorsFromCloud();
      if (data && data.length > 0) {
        setCloudAuthors(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-10 py-12 relative z-10">
      {/* 标题 */}
      <div className="text-center space-y-4 mb-12 relative z-10">
        <div className="inline-block seal-box px-4 py-1 text-xs font-brush text-cinnabar bg-paper-raw/80 shadow-xs">
          文因人立 · 人因文传
        </div>
        <h2 className="text-4xl font-bold font-song tracking-[0.35em] text-ink-burnt drop-shadow-xs">
          星汉灿烂 · 先贤剧场
        </h2>
        <p className="text-sm font-archaic text-ink-heavy tracking-[0.2em] max-w-xl mx-auto">
          每一篇千古名文，皆是先贤在生命至暗时刻的灵魂绝唱。<br />
          点击先贤真容，启封一段跨越千年的生命短剧。
        </p>
      </div>

      {/* 先贤卡片阵列 (采用古典门券与宝相花纹饰自适应卡片) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full relative z-10">
        {loading && cloudAuthors.length === 0 ? (
          <div className="col-span-full py-16 text-center text-ink-light font-archaic text-sm animate-pulse">
            <span className="seal-box px-3 py-1 text-xs font-brush text-cinnabar">启卷中</span>
            <p className="mt-3">正在启封先贤星汉真容...</p>
          </div>
        ) : (
          cloudAuthors.map((author) => {
            const isSuShi = author.id === 'su-shi';
            return (
              <TraditionalCard
                key={author.id}
                onClick={() => onSelectSage(author.id)}
                className="w-full min-h-[520px]"
                contentClassName="items-center text-center justify-between"
              >
                {/* 上半部：朝代题签与水墨肖像 */}
                <div className="flex flex-col items-center w-full">
                  {/* 朝代内嵌朱文印章 */}
                  <div className="mb-2">
                    <span className="seal-solid px-2.5 py-0.5 text-[11px] font-brush shadow-xs tracking-wider">
                      {author.dynasty}
                    </span>
                  </div>

                  {/* 水墨肖像 + 回纹圆形装饰边框 */}
                  <div className="relative w-44 h-44 flex items-center justify-center mb-3 transition-transform duration-700 group-hover:scale-105">
                    {/* 回纹 (meander) 装饰环 SVG */}
                    <svg
                      viewBox={`0 0 ${MEANDER_SVG_SIZE} ${MEANDER_SVG_SIZE}`}
                      className="absolute inset-0 w-full h-full text-cinnabar/30 group-hover:text-cinnabar/70 transition-colors duration-700"
                      aria-hidden="true"
                    >
                      {/* 外圈纤细点睛线 */}
                      <circle cx={MEANDER_CENTER} cy={MEANDER_CENTER} r={MEANDER_OUTER_R + 2} fill="none" stroke="currentColor" strokeWidth="0.7" />
                      {/* 回纹齿形环带 (核心纹饰) */}
                      <path d={MEANDER_RING_PATH} fill="currentColor" />
                      {/* 内圈纤细点睛线 */}
                      <circle cx={MEANDER_CENTER} cy={MEANDER_CENTER} r={MEANDER_INNER_R - 1} fill="none" stroke="currentColor" strokeWidth="0.7" />
                    </svg>

                    {/* 人物肖像圆形容器 (居中于回纹环内) */}
                    <div className="w-36 h-36 rounded-full border border-paper-wash/30 overflow-hidden bg-paper-cooked relative flex items-center justify-center z-10 shadow-inner">
                      {isSuShi ? (
                        <>
                          {/* 图 1 (默认态)：低头看书 */}
                          <img
                            src="/assets/su_shi_reading.jpg"
                            alt="苏轼展卷沉读"
                            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
                          />
                          {/* 图 2 (悬浮态)：抬头望向读者 */}
                          <img
                            src="/assets/su_shi_looking.jpg"
                            alt="苏轼抬头注视"
                            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
                          <span className="absolute bottom-1.5 z-20 text-[10px] font-archaic text-paper-raw tracking-widest transition-all duration-500 group-hover:text-amber-200">
                            <span className="group-hover:hidden">✦ 沉吟展读</span>
                            <span className="hidden group-hover:inline">✦ 抬首相望</span>
                          </span>
                        </>
                      ) : (
                        <span className="text-5xl sm:text-6xl font-brush text-ink-thick group-hover:text-cinnabar transition">
                          {author.name.slice(-1)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 名讳与字号 */}
                  <h3 className="text-2xl font-bold font-song tracking-widest text-ink-burnt group-hover:text-cinnabar transition mt-1">
                    {author.name}
                  </h3>
                  <p className="text-xs font-archaic text-cinnabar mt-0.5">
                    {author.courtesyName ? `字${author.courtesyName}` : ''} {author.artName ? `· 号${author.artName}` : ''}
                  </p>
                  <p className="text-xs font-song text-ink-light mt-2.5 leading-relaxed line-clamp-2 px-2">
                    {author.biographySummary}
                  </p>
                </div>

                {/* 下半部：启封按钮 */}
                <div className="mt-5 mb-1 px-4 py-1.5 rounded-full border border-cinnabar/60 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-xs">
                  <span>启封生命短剧</span>
                  <span className="text-xs">➔</span>
                </div>
              </TraditionalCard>
            );
          })
        )}
      </div>
    </section>
  );
};
