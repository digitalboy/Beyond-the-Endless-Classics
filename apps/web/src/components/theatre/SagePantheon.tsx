'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Author } from '@beyond-classics/types';
import { fetchAuthorsFromCloud } from '@/lib/api-client';

interface SagePantheonProps {
  onSelectSage: (sageId: string) => void;
}

interface DynastyAnchor {
  id: string;
  name: string;
  period: string;
  sageId: string;
}

const DYNASTY_SLIPS: DynastyAnchor[] = [
  { id: 'xianqin', name: '先秦', period: '春秋·战国', sageId: 'zuo-qiuming' },
  { id: 'sanguo', name: '三国', period: '蜀汉·魏晋', sageId: 'zhuge-liang' },
  { id: 'zhongtang', name: '中唐', period: '盛唐·中唐', sageId: 'han-yu' },
  { id: 'beisong', name: '两宋', period: '北宋·南宋', sageId: 'su-shi' },
];

export const SagePantheon: React.FC<SagePantheonProps> = ({ onSelectSage }) => {
  const [cloudAuthors, setCloudAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDynasty, setActiveDynasty] = useState('xianqin');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // 1. 从云端 D1 数据库获取先贤
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

  // 2. 滚轮上下滚动自动映射为长卷横向平滑展开
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY * 1.3;
    }
  };

  // 3. 鼠标拖拽漫游长卷 (Drag to Pan)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStartRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // 4. 点击朝代竹简，平滑运镜定位
  const scrollToSage = (sageId: string, dynastyId: string) => {
    setActiveDynasty(dynastyId);
    const targetElement = document.getElementById(`sage-figure-${sageId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const filteredAuthors = cloudAuthors.filter(
    (a) =>
      a.name.includes(searchQuery) ||
      a.dynasty.includes(searchQuery) ||
      (a.courtesyName && a.courtesyName.includes(searchQuery)) ||
      (a.artName && a.artName.includes(searchQuery))
  );

  return (
    <section className="flex-1 flex flex-col justify-center relative overflow-hidden select-none py-6 px-4">
      {/* 顶部宣纸横梁与检索 */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-6 pb-3 border-b border-paper-wash/60 mb-3 text-xs font-archaic text-ink-light">
        <div className="flex items-center gap-3">
          <span className="seal-solid px-2 py-0.5 text-[11px] font-brush shadow-xs">开卷有益</span>
          <span>华夏先贤千秋长卷 · 按朝代时空自左向右徐徐展开</span>
        </div>

        {/* 水墨搜索匣 */}
        <div className="flex items-center gap-2 bg-paper-raw/90 border border-paper-wash px-3 py-1 rounded-md shadow-xs">
          <span className="text-cinnabar">✦</span>
          <input
            type="text"
            placeholder="搜寻先贤名讳、字号或朝代..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-ink-burnt focus:outline-hidden placeholder:text-ink-clear w-44"
          />
        </div>
      </div>

      {/* ======================= 【宋代平远水墨手卷主体容器】 ======================= */}
      <div className="relative max-w-7xl w-full mx-auto rounded-2xl overflow-hidden shadow-theatre border-2 border-paper-wash bg-[#ede0ca]">
        {/* 左侧实体木质卷轴杆 */}
        <div className="absolute top-0 bottom-0 left-0 w-7 z-30 pointer-events-none flex flex-col justify-between items-center py-2 shadow-2xl bg-linear-to-r from-[#442817] via-[#7d4e2d] to-[#3a2012] border-r border-[#2d180c]">
          <div className="w-5 h-5 rounded-full bg-linear-to-b from-[#b3824f] to-[#59391e] border border-[#2b170a] shadow-md" />
          <span className="vertical-text-flow text-[10px] font-archaic text-amber-200/60 tracking-widest">
            古文观不止
          </span>
          <div className="w-5 h-5 rounded-full bg-linear-to-t from-[#b3824f] to-[#59391e] border border-[#2b170a] shadow-md" />
        </div>

        {/* 右侧实体木质卷轴杆 */}
        <div className="absolute top-0 bottom-0 right-0 w-7 z-30 pointer-events-none flex flex-col justify-between items-center py-2 shadow-2xl bg-linear-to-r from-[#3a2012] via-[#7d4e2d] to-[#442817] border-l border-[#2d180c]">
          <div className="w-5 h-5 rounded-full bg-linear-to-b from-[#b3824f] to-[#59391e] border border-[#2b170a] shadow-md" />
          <span className="vertical-text-flow text-[10px] font-archaic text-amber-200/60 tracking-widest">
            卷轴展阅
          </span>
          <div className="w-5 h-5 rounded-full bg-linear-to-t from-[#b3824f] to-[#59391e] border border-[#2b170a] shadow-md" />
        </div>

        {/* 长卷横向滚动可视区域 */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="overflow-x-auto scrollbar-none flex items-center min-h-[580px] pl-12 pr-12 cursor-grab active:cursor-grabbing relative scroll-smooth"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 30%, #faf5ea 0%, #f3ead8 60%, #e8dcbf 100%)',
          }}
        >
          {/* ================= 1. 手卷引首段 (Frontispiece) ================= */}
          <div className="shrink-0 flex items-center gap-6 pl-8 pr-12 border-r-2 border-dashed border-paper-wash/80 relative z-20">
            {/* 引首大字题签 */}
            <div className="vertical-mode flex items-center gap-3 py-6 px-4 bg-paper-raw/80 border border-paper-wash shadow-xs rounded-sm">
              <span className="seal-solid px-2 py-1 text-xs font-brush rounded-xs shadow-seal">
                古文观止 · 观不止
              </span>
              <h2 className="text-3xl font-black font-song text-ink-burnt tracking-[0.3em]">
                星汉灿烂
              </h2>
              <span className="text-xs font-archaic text-ink-light tracking-widest">
                文止于此 · 人观不止
              </span>
            </div>

            {/* 朝代编年象牙竹简索引 */}
            <div className="flex flex-col gap-2 bg-paper-cooked/60 p-3 rounded-lg border border-paper-wash/60">
              <span className="text-[10px] font-archaic text-ink-clear text-center block mb-1">
                【时空飞跃】
              </span>
              <div className="flex gap-2">
                {DYNASTY_SLIPS.map((slip) => (
                  <button
                    key={slip.id}
                    onClick={() => scrollToSage(slip.sageId, slip.id)}
                    className={`vertical-mode px-2 py-3.5 rounded-sm transition-all text-xs font-archaic border ${
                      activeDynasty === slip.id
                        ? 'bg-cinnabar text-paper-raw border-cinnabar shadow-sm font-bold scale-105'
                        : 'bg-paper-raw text-ink-heavy border-paper-wash hover:border-cinnabar hover:text-cinnabar'
                    }`}
                  >
                    <span className="font-brush text-[11px] block">{slip.name}</span>
                    <span className="text-[9px] opacity-80 mt-1">{slip.period}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= 2. 先贤行旅长卷主体 (可从 D1 随作者数量无限生长) ================= */}
          <div className="flex items-center gap-16 px-12 relative z-10">
            {loading && cloudAuthors.length === 0 ? (
              <div className="py-20 px-32 text-center text-ink-light font-archaic text-sm animate-pulse">
                <span className="seal-box px-3 py-1 text-xs font-brush text-cinnabar">水墨徐展</span>
                <p className="mt-3">正在从 Cloudflare APAC 边缘 D1 数据库调取先贤行旅画卷...</p>
              </div>
            ) : filteredAuthors.length === 0 ? (
              <div className="py-20 px-32 text-center text-ink-light font-archaic text-sm">
                未寻得符合条件的先贤名讳
              </div>
            ) : (
              filteredAuthors.map((author, index) => {
                const isSuShi = author.id === 'su-shi';
                return (
                  <div
                    key={author.id}
                    id={`sage-figure-${author.id}`}
                    onClick={() => onSelectSage(author.id)}
                    className="group shrink-0 flex items-center gap-8 relative transition-transform duration-500 hover:scale-102 cursor-pointer"
                  >
                    {/* 左侧：先贤水墨行旅立像 */}
                    <div className="relative flex flex-col items-center">
                      {/* 朝代朱砂印章 */}
                      <div className="absolute -top-6 seal-solid px-2 py-0.5 text-[10px] font-brush shadow-xs z-30">
                        {author.dynasty}
                      </div>

                      {/* 先贤水墨立像 / 肖像容器 */}
                      <div className="w-48 h-64 relative flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2">
                        {isSuShi ? (
                          <>
                            {/* 图 1 (默认态)：低头看书 */}
                            <img
                              src="/assets/su_shi_reading.jpg"
                              alt="苏轼展卷沉读"
                              className="absolute inset-0 w-full h-full object-contain filter drop-shadow-md transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                            />
                            {/* 图 2 (悬浮态)：抬头望向读者 */}
                            <img
                              src="/assets/su_shi_looking.jpg"
                              alt="苏轼抬头注视"
                              className="absolute inset-0 w-full h-full object-contain filter drop-shadow-lg transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                            />
                            <span className="absolute -bottom-2 bg-paper-raw/90 border border-paper-wash px-2 py-0.5 rounded-full text-[10px] font-archaic text-cinnabar shadow-xs whitespace-nowrap">
                              <span className="group-hover:hidden">✦ 沉吟展读</span>
                              <span className="hidden group-hover:inline">✦ 抬首相望</span>
                            </span>
                          </>
                        ) : (
                          <div className="w-44 h-56 rounded-xl bg-paper-cooked/60 border border-paper-wash/80 flex flex-col items-center justify-center shadow-inner group-hover:border-cinnabar group-hover:bg-paper-raw transition-all p-4">
                            <span className="text-7xl font-brush text-ink-thick group-hover:text-cinnabar transition-transform duration-500 group-hover:scale-110">
                              {author.name.slice(-1)}
                            </span>
                            <span className="text-[11px] font-archaic text-ink-light mt-3">
                              {author.name} 工笔立像
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 先贤大字名讳 */}
                      <h3 className="text-2xl font-bold font-song tracking-[0.2em] text-ink-burnt group-hover:text-cinnabar transition mt-2">
                        {author.name}
                      </h3>
                      <p className="text-xs font-archaic text-cinnabar">
                        {author.courtesyName ? `字${author.courtesyName}` : ''} {author.artName ? `· 号${author.artName}` : ''}
                      </p>
                    </div>

                    {/* 右侧：纯正竖排朱丝栏小楷题解 */}
                    <div className="vertical-mode flex flex-col justify-between h-72 py-4 px-3 bg-paper-raw/95 border-r border-l border-paper-wash/70 rounded-xs shadow-xs group-hover:border-cinnabar/60 transition-colors">
                      {/* 时代评述 */}
                      <p className="text-xs font-song text-ink-heavy leading-loose tracking-[0.18em] max-h-56 overflow-hidden">
                        {author.biographySummary}
                      </p>

                      {/* 启封生命短剧按钮 (朱文印) */}
                      <div className="mt-2 seal-box px-2 py-1 text-[11px] font-brush text-cinnabar group-hover:bg-cinnabar group-hover:text-paper-raw transition-all shadow-xs text-center flex items-center justify-center">
                        启封生命短剧 ➔
                      </div>
                    </div>

                    {/* 先贤之间的水墨松石隔断线 */}
                    {index < filteredAuthors.length - 1 && (
                      <div className="shrink-0 h-48 w-px bg-linear-to-b from-transparent via-paper-wash to-transparent mx-4" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* ================= 3. 手卷卷尾题跋段 (Colophon) ================= */}
          <div className="shrink-0 flex items-center pl-12 pr-8 border-l-2 border-dashed border-paper-wash/80 relative z-20">
            <div className="vertical-mode py-6 px-4 bg-paper-raw/80 border border-paper-wash rounded-sm text-xs font-archaic text-ink-light space-y-2">
              <span className="seal-box px-1.5 py-0.5 font-brush text-cinnabar">后跋</span>
              <p className="tracking-widest leading-loose">
                历代百家，文心若水。<br />
                千古绝唱，犹在此卷。
              </p>
              <span className="seal-solid px-1.5 py-0.5 font-brush text-[10px] mt-2">
                观不止印
              </span>
            </div>
          </div>
        </div>

        {/* 底部全景微缩时空指引条 */}
        <div className="bg-paper-raw/90 border-t border-paper-wash/60 px-6 py-2 flex items-center justify-between text-[11px] font-archaic text-ink-clear">
          <span>✦ 提示：按住鼠标拖拽或滑动滚轮，徐徐漫游千里长卷</span>
          <div className="flex items-center gap-3">
            <span>先秦 ➔ 汉魏 ➔ 盛唐 ➔ 两宋 ➔ 明清</span>
            <span className="seal-box px-2 py-0.5 text-[9px] font-brush text-cinnabar">
              {filteredAuthors.length} 位先贤在卷
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
