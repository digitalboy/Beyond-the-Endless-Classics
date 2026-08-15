'use client';

import React, { useEffect, useState } from 'react';
import type { Author } from '@beyond-classics/types';
import { fetchAuthorsFromCloud } from '@/lib/api-client';
import { TraditionalCard } from '@/components/ui/traditional-card';

// ─────────────────────────────────────────────────────────────
// 联珠纹 (pearl-chain) 古典圆形装饰边框
// NOTE: 灵感源自唐代丝绸纹样与铜镜联珠纹饰。
// 双环细线之间均匀排列小圆珠，四方位点缀如意卷草结。
// ─────────────────────────────────────────────────────────────
const FRAME_SVG_SIZE = 176;
const FRAME_CENTER = FRAME_SVG_SIZE / 2; // 88
const FRAME_PEARL_R = 80;   // 联珠排列半径
const FRAME_PEARL_COUNT = 36; // 珠数
const FRAME_PEARL_DOT_R = 1.3; // 每颗珠子半径

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

                  {/* 水墨肖像 + 联珠纹古典圆形装饰边框 */}
                  <div className="relative w-44 h-44 flex items-center justify-center mb-3 transition-transform duration-700 group-hover:scale-105">
                    {/* 联珠纹 (pearl-chain) 装饰环 SVG */}
                    <svg
                      viewBox={`0 0 ${FRAME_SVG_SIZE} ${FRAME_SVG_SIZE}`}
                      className="absolute inset-0 w-full h-full text-cinnabar/25 group-hover:text-cinnabar/60 transition-colors duration-700"
                      aria-hidden="true"
                    >
                      {/* 外圈细线 */}
                      <circle cx={FRAME_CENTER} cy={FRAME_CENTER} r={FRAME_PEARL_R + 4} fill="none" stroke="currentColor" strokeWidth="0.6" />
                      {/* 外圈第二道细线 (双线框定) */}
                      <circle cx={FRAME_CENTER} cy={FRAME_CENTER} r={FRAME_PEARL_R + 2.5} fill="none" stroke="currentColor" strokeWidth="0.4" />

                      {/* 联珠纹圆点环 */}
                      {Array.from({ length: FRAME_PEARL_COUNT }).map((_, i) => {
                        const angle = (2 * Math.PI / FRAME_PEARL_COUNT) * i - Math.PI / 2;
                        return (
                          <circle
                            key={i}
                            cx={FRAME_CENTER + FRAME_PEARL_R * Math.cos(angle)}
                            cy={FRAME_CENTER + FRAME_PEARL_R * Math.sin(angle)}
                            r={FRAME_PEARL_DOT_R}
                            fill="currentColor"
                          />
                        );
                      })}

                      {/* 内圈第一道细线 */}
                      <circle cx={FRAME_CENTER} cy={FRAME_CENTER} r={FRAME_PEARL_R - 2.5} fill="none" stroke="currentColor" strokeWidth="0.4" />
                      {/* 内圈细线 */}
                      <circle cx={FRAME_CENTER} cy={FRAME_CENTER} r={FRAME_PEARL_R - 4} fill="none" stroke="currentColor" strokeWidth="0.6" />

                      {/* 四方如意结装饰 (上下左右四个方位) */}
                      {[0, 90, 180, 270].map((deg) => (
                        <g key={deg} transform={`rotate(${deg}, ${FRAME_CENTER}, ${FRAME_CENTER})`}>
                          {/* 顶部如意卷草小花 */}
                          <path
                            d={`M ${FRAME_CENTER},${FRAME_CENTER - FRAME_PEARL_R - 6}
                                c -2.5,0 -4,1.8 -4,3.5 c 0,1.8 2,3 4,1.5
                                c 2,1.5 4,0.3 4,-1.5 c 0,-1.7 -1.5,-3.5 -4,-3.5 z`}
                            fill="currentColor"
                            opacity="0.8"
                          />
                        </g>
                      ))}
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
