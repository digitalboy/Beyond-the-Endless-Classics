'use client';

import React, { useEffect, useState } from 'react';
import type { Author } from '@beyond-classics/types';
import { fetchAuthorsFromCloud } from '@/lib/api-client';
import { TraditionalCard } from '@/components/ui/traditional-card';

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

      {/* 先贤卡片阵列 (采用中式如意卷云纹饰卡片) */}
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
                className="w-full"
                contentClassName="items-center text-center pt-9 pb-8 px-5"
              >
                <div className="absolute top-6 right-5 seal-solid px-2 py-0.5 text-[10px] font-brush z-30 shadow-xs">
                  {author.dynasty}
                </div>

                {/* 水墨肖像容器 (苏轼为双态淡入淡出，其他先贤为水墨印章) */}
                <div className="w-32 h-32 rounded-full border-2 border-paper-wash group-hover:border-cinnabar overflow-hidden mb-4 transition-all duration-700 group-hover:scale-105 shadow-inner bg-paper-cooked relative flex items-center justify-center">
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
                      <span className="absolute bottom-2 z-20 text-[11px] font-archaic text-paper-raw tracking-widest transition-all duration-500 group-hover:text-amber-200">
                        <span className="group-hover:hidden">✦ 沉吟展读</span>
                        <span className="hidden group-hover:inline">✦ 抬首相望</span>
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-brush text-ink-thick group-hover:text-cinnabar transition">
                      {author.name.slice(-1)}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-song tracking-widest text-ink-burnt group-hover:text-cinnabar transition">
                  {author.name}
                </h3>
                <p className="text-xs font-archaic text-cinnabar mt-1">
                  {author.courtesyName ? `字${author.courtesyName}` : ''} {author.artName ? `· 号${author.artName}` : ''}
                </p>
                <p className="text-xs font-song text-ink-light mt-2.5 leading-relaxed line-clamp-2 px-1">
                  {author.biographySummary}
                </p>

                <div className="mt-5 px-4 py-1.5 rounded-full border border-cinnabar/60 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-xs">
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
