'use client';

import React from 'react';

interface SagePantheonProps {
  onSelectSage: (sageId: string) => void;
}

export const SagePantheon: React.FC<SagePantheonProps> = ({ onSelectSage }) => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-10 py-12 relative z-10">
      
      {/* 标题 */}
      <div className="text-center space-y-4 mb-12 relative z-10">
        <div className="inline-block seal-box px-4 py-1 text-xs font-brush text-cinnabar bg-black/40">
          文因人立 · 人因事显
        </div>
        <h2 className="text-4xl font-bold font-song tracking-[0.35em] text-[#fbf6ed] drop-shadow-md">
          星汉灿烂 · 先贤剧场
        </h2>
        <p className="text-sm font-archaic text-paper-wash tracking-[0.2em] max-w-xl mx-auto">
          每一篇千古名文，皆是先贤在生命至暗时刻的灵魂绝唱。<br />
          点击先贤真容，启封一段跨越千年的生命短剧。
        </p>
      </div>

      {/* 先贤卡片阵列 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full relative z-10">
        
        {/* 1. 苏轼 (东坡居士) - 双态头像淡入淡出 */}
        <div
          onClick={() => onSelectSage('su-shi')}
          className="group cursor-pointer bg-[#231f1c]/90 hover:bg-[#2c2622] p-6 rounded-2xl border border-paper-wash/30 hover:border-cinnabar transition-all duration-500 shadow-theatre hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 seal-solid px-2 py-0.5 text-[10px] font-brush z-30">
            北宋
          </div>

          {/* 双图层水墨肖像容器 */}
          <div className="w-36 h-36 rounded-full border-2 border-paper-wash/40 group-hover:border-cinnabar overflow-hidden mb-5 transition-all duration-700 group-hover:scale-105 shadow-inner bg-[#332b24] relative flex items-center justify-center">
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
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none z-20" />
            <span className="absolute bottom-2 z-20 text-[11px] font-archaic text-paper-raw/90 tracking-widest transition-all duration-500 group-hover:text-cinnabar">
              <span className="group-hover:hidden">✦ 沉吟展读</span>
              <span className="hidden group-hover:inline">✦ 抬首相望</span>
            </span>
          </div>

          <h3 className="text-2xl font-bold font-song tracking-widest text-[#fbf6ed] group-hover:text-cinnabar transition">
            苏 轼
          </h3>
          <p className="text-xs font-archaic text-cinnabar mt-1">字子瞻 · 眉山人</p>
          <p className="text-xs font-song text-paper-aged mt-3 leading-relaxed">
            乌台死劫，百日严刑。<br />
            黄州赤壁，水月齐物大突围。
          </p>

          <div className="mt-6 px-4 py-1.5 rounded-full border border-cinnabar/40 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-sm">
            <span>启封生命短剧</span>
            <span className="text-xs">➔</span>
          </div>
        </div>

        {/* 2. 诸葛亮 */}
        <div
          onClick={() => onSelectSage('zhuge-liang')}
          className="group cursor-pointer bg-[#231f1c]/90 hover:bg-[#2c2622] p-6 rounded-2xl border border-paper-wash/30 hover:border-cinnabar transition-all duration-500 shadow-theatre hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 seal-solid px-2 py-0.5 text-[10px] font-brush">三国</div>
          <div className="w-36 h-36 rounded-full border-2 border-paper-wash/40 group-hover:border-cinnabar overflow-hidden mb-5 transition-all duration-500 group-hover:scale-105 shadow-inner bg-[#332b24] relative flex items-center justify-center">
            <span className="text-5xl font-brush text-paper-aged group-hover:text-cinnabar transition">亮</span>
          </div>
          <h3 className="text-2xl font-bold font-song tracking-widest text-[#fbf6ed] group-hover:text-cinnabar transition">
            诸葛亮
          </h3>
          <p className="text-xs font-archaic text-cinnabar mt-1">字孔明 · 琅琊人</p>
          <p className="text-xs font-song text-paper-aged mt-3 leading-relaxed">
            白帝托孤，危急存亡。<br />
            五月渡泸，临表涕零不知所言。
          </p>
          <div className="mt-6 px-4 py-1.5 rounded-full border border-cinnabar/40 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-sm">
            <span>启封生命短剧</span>
            <span className="text-xs">➔</span>
          </div>
        </div>

        {/* 3. 韩愈 */}
        <div
          onClick={() => onSelectSage('han-yu')}
          className="group cursor-pointer bg-[#231f1c]/90 hover:bg-[#2c2622] p-6 rounded-2xl border border-paper-wash/30 hover:border-cinnabar transition-all duration-500 shadow-theatre hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 seal-solid px-2 py-0.5 text-[10px] font-brush">中唐</div>
          <div className="w-36 h-36 rounded-full border-2 border-paper-wash/40 group-hover:border-cinnabar overflow-hidden mb-5 transition-all duration-500 group-hover:scale-105 shadow-inner bg-[#332b24] relative flex items-center justify-center">
            <span className="text-5xl font-brush text-paper-aged group-hover:text-cinnabar transition">愈</span>
          </div>
          <h3 className="text-2xl font-bold font-song tracking-widest text-[#fbf6ed] group-hover:text-cinnabar transition">
            韩 愈
          </h3>
          <p className="text-xs font-archaic text-cinnabar mt-1">字退之 · 河阳人</p>
          <p className="text-xs font-song text-paper-aged mt-3 leading-relaxed">
            两世一身，宗族凋零。<br />
            天道难测，祭文千古第一痛切。
          </p>
          <div className="mt-6 px-4 py-1.5 rounded-full border border-cinnabar/40 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-sm">
            <span>启封生命短剧</span>
            <span className="text-xs">➔</span>
          </div>
        </div>

        {/* 4. 左丘明 */}
        <div
          onClick={() => onSelectSage('zuo-qiuming')}
          className="group cursor-pointer bg-[#231f1c]/90 hover:bg-[#2c2622] p-6 rounded-2xl border border-paper-wash/30 hover:border-cinnabar transition-all duration-500 shadow-theatre hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 seal-solid px-2 py-0.5 text-[10px] font-brush">先秦</div>
          <div className="w-36 h-36 rounded-full border-2 border-paper-wash/40 group-hover:border-cinnabar overflow-hidden mb-5 transition-all duration-500 group-hover:scale-105 shadow-inner bg-[#332b24] relative flex items-center justify-center">
            <span className="text-5xl font-brush text-paper-aged group-hover:text-cinnabar transition">明</span>
          </div>
          <h3 className="text-2xl font-bold font-song tracking-widest text-[#fbf6ed] group-hover:text-cinnabar transition">
            左丘明
          </h3>
          <p className="text-xs font-archaic text-cinnabar mt-1">鲁太史 · 盲史</p>
          <p className="text-xs font-song text-paper-aged mt-3 leading-relaxed">
            肉食者鄙，未能远谋。<br />
            一鼓作气，长勺之战算无遗策。
          </p>
          <div className="mt-6 px-4 py-1.5 rounded-full border border-cinnabar/40 group-hover:bg-cinnabar group-hover:text-paper-raw text-xs font-brush text-cinnabar transition-all flex items-center gap-1.5 shadow-sm">
            <span>启封生命短剧</span>
            <span className="text-xs">➔</span>
          </div>
        </div>

      </div>
    </section>
  );
};
