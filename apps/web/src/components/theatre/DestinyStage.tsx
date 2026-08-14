'use client';

import React, { useState } from 'react';

interface DestinyStageProps {
  sageId: string;
  onBack: () => void;
  onSelectArticle: (articleSlug: string) => void;
}

const dramaStories = [
  {
    title: '【第一幕 · 1057年 嘉祐登科】',
    content:
      '弱冠之年，苏轼与弟苏辙名动汴京。主考欧阳修读其《刑赏忠厚之至论》，大赞：“读轼书，不觉汗出，快哉！老夫当避路，放他出一头地！”少年得志，风华绝代。',
    motto: '“天下之患，最不可为者，名为治平无事，而其实有不测之忧。”',
    bg: 'from-[#1a1c12] via-[#2d3a24]/80 to-[#12140e]',
  },
  {
    title: '【第二幕 · 1069年 熙宁党争】',
    content:
      '王安石推行新法，急政骤起。苏轼直言进谏：“求治太急，听言太广”，触怒执政。他不愿在朋党间苟且迎合，自请外放杭州、密州。在民间深知百姓疾苦。',
    motto: '“老夫聊发少年狂，左牵黄，右擎苍。会挽雕弓如满月，西北望，射天狼。”',
    bg: 'from-[#221815] via-[#3d241d]/80 to-[#14100f]',
  },
  {
    title: '【第三幕 · 1079年 乌台死劫】',
    content:
      '元丰二年八月，新党罗织文字狱，苏轼在湖州被悍吏索拿入御史台狱。百三十日严刑拷问，生死悬于一线。他写下诀别诗：“与君世世为兄弟，更结来生未了因。”',
    motto: '“梦绕云山心似鹿，魂飞汤火命如鸡。眼中犀角真吾子，身后牛衣愧老妻。”',
    bg: 'from-[#100f14] via-[#1f1a29]/90 to-[#0c0b10]',
  },
  {
    title: '【第四幕 · 1082年 黄州突围】',
    content:
      '大难不死，贬谪黄州团练副使，不得签书公事。家徒四壁，他在东坡开荒种地，自号“东坡居士”。就在这一无所有的绝境中，他在赤壁之下完成了千古精神突围！',
    motto: '“自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也。”',
    bg: 'from-[#12100e] via-[#1c2a33]/80 to-[#12100e]',
  },
  {
    title: '【第五幕 · 1097年 天涯儋州】',
    content:
      '年逾花甲，再贬岭南惠州，后跨海贬至荒蛮儋州（海南）。他教化黎民，凿井讲学，把贬谪之地变成了文化绿洲。“问汝平生功业，黄州惠州儋州！”',
    motto: '“九死南荒吾不恨，兹游奇绝冠平生。报道先生春睡美，道人轻打五更钟。”',
    bg: 'from-[#141d24] via-[#193240]/80 to-[#0e141a]',
  },
];

export const DestinyStage: React.FC<DestinyStageProps> = ({
  sageId: _sageId,
  onBack,
  onSelectArticle,
}) => {
  const [activeNode, setActiveNode] = useState(3); // 默认黄州突围
  const currentStory = dramaStories[activeNode];

  return (
    <section className="flex-1 flex flex-col px-8 py-6 max-w-6xl w-full mx-auto relative z-20 animate-cinematic">
      {/* 顶栏 */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-wash/30 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-archaic text-paper-wash hover:text-cinnabar transition px-3 py-1.5 rounded bg-black/40 border border-paper-wash/20"
        >
          <span>◀ 返回先贤星汉</span>
        </button>
        <div className="text-lg font-bold font-song text-[#fbf6ed] tracking-[0.2em] flex items-center gap-2">
          <span className="seal-box px-1.5 py-0.5 text-xs font-brush text-cinnabar">第二幕</span>
          <span>东坡居士 · 乌台死劫与黄州突围</span>
        </div>
        <div className="text-xs font-archaic text-cinnabar">
          沉浸剧场：命途抉择 ➔ 手札破墨
        </div>
      </div>

      {/* 剧场主舞台 */}
      <div className="relative rounded-3xl overflow-hidden border border-paper-wash/40 shadow-theatre mb-8 bg-[#1f1b18]">
        <div
          className={`absolute inset-0 bg-linear-to-r ${currentStory.bg} opacity-90 transition-all duration-1000`}
        />

        <div className="relative z-10 p-8 flex flex-col lg:flex-row items-center gap-8">
          {/* 左侧头像与心境 */}
          <div className="flex flex-col items-center text-center shrink-0 w-64 border-b lg:border-b-0 lg:border-r border-paper-wash/30 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative mb-3">
              <div className="w-32 h-32 rounded-full border-4 border-cinnabar overflow-hidden shadow-seal bg-[#332b24]">
                <img
                  src="/assets/su_shi_looking.jpg"
                  alt="苏轼水墨肖像"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-cinnabar px-3 py-0.5 rounded-full text-[11px] font-brush text-paper-raw shadow whitespace-nowrap">
                元丰五年 · 黄州
              </div>
            </div>
            <h3 className="text-2xl font-bold font-song text-[#fbf6ed] tracking-widest mt-2">
              东坡居士 · 苏轼
            </h3>
            <p className="text-xs font-archaic text-cinnabar mt-0.5">
              北宋神宗朝 · 黄州团练副使
            </p>
            <div className="mt-4 p-3 rounded-lg bg-black/50 border border-paper-wash/20 text-xs font-song text-paper-aged text-left leading-relaxed">
              <span className="text-cinnabar font-bold block mb-1">【命途心境】</span>
              <span>{currentStory.motto}</span>
            </div>
          </div>

          {/* 右侧剧评与时间轴 */}
          <div className="flex-1 w-full space-y-5">
            <div className="bg-black/60 rounded-xl p-5 border border-paper-wash/30 shadow-inner">
              <div className="flex items-center gap-2 text-xs font-archaic text-cinnabar mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-cinnabar animate-ping" />
                <span>{currentStory.title}</span>
              </div>
              <p className="text-sm font-song text-paper-raw leading-relaxed">
                {currentStory.content}
              </p>
            </div>

            {/* 命途节点 */}
            <div>
              <div className="text-xs font-archaic text-paper-wash mb-2 flex items-center justify-between">
                <span>命途天命之轴（点击节点推进戏剧时空）：</span>
                <span className="text-cinnabar text-[11px]">✦ 当前节点：黄州突围</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { yr: '1057年 20岁', t: '嘉祐登科', sub: '名动京师' },
                  { yr: '1069年 32岁', t: '熙宁变法', sub: '党争漩涡' },
                  { yr: '1079年 42岁', t: '乌台死劫', sub: '百日牢狱' },
                  { yr: '1082年 45岁', t: '黄州突围 ✦', sub: '水月齐物' },
                  { yr: '1097年 60岁', t: '天涯儋州', sub: '九死不悔' },
                ].map((node, i) => (
                  <button
                    key={node.t}
                    onClick={() => setActiveNode(i)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      activeNode === i
                        ? 'border-2 border-cinnabar bg-[#3d2721] shadow-lg scale-105'
                        : 'border border-paper-wash/30 bg-[#25211e] hover:bg-[#302a26]'
                    }`}
                  >
                    <span
                      className={`text-[10px] block ${
                        activeNode === i ? 'text-cinnabar' : 'text-paper-wash'
                      }`}
                    >
                      {node.yr}
                    </span>
                    <span
                      className={`font-bold text-xs block ${
                        activeNode === i ? 'text-paper-raw' : 'text-[#fbf6ed]'
                      }`}
                    >
                      {node.t}
                    </span>
                    <span className="text-[10px] text-paper-wash">{node.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 第三幕：当年手札破墨飞入 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="seal-solid px-2 py-0.5 text-xs font-brush">第三幕</div>
            <h3 className="text-lg font-bold font-song text-[#fbf6ed] tracking-widest">
              黄州时空 · 当年散落之手泽信札 (3 篇名作)
            </h3>
          </div>
          <span className="text-xs font-archaic text-paper-wash">
            点击任意手札 · 运镜展开自右向左水墨长卷
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 手札 1: 前赤壁赋 */}
          <div
            onClick={() => onSelectArticle('chibifu-qian')}
            className="group cursor-pointer bg-[#fbf6ed] hover:bg-[#fffdfa] text-ink-burnt p-7 rounded-2xl border-2 border-paper-wash hover:border-cinnabar shadow-theatre hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-paper-wash/80 pb-3 mb-3">
                <span className="text-xs font-archaic text-cinnabar">
                  宋神宗元丰五年七月既望 · 赋
                </span>
                <span className="seal-solid px-2 py-0.5 text-[10px] font-brush">
                  千古神品
                </span>
              </div>
              <h4 className="text-2xl font-bold font-song text-ink-burnt group-hover:text-cinnabar transition tracking-[0.2em]">
                前赤壁赋
              </h4>
              <p className="text-xs font-archaic text-ink-light mt-1">
                作于黄州赤鼻矶夜泛舟之时
              </p>
              <div className="mt-4 p-3.5 rounded-lg bg-paper-cooked/60 border border-paper-wash/60 text-xs font-song leading-relaxed text-ink-thick">
                “逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。惟江上之清风，与山间之明月，是造物者之无尽藏也。”
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-wash/80 flex items-center justify-between text-xs font-archaic text-ink-light">
              <span>〔明·茅鹿门评：坡公一生襟抱千古第一〕</span>
              <span className="text-cinnabar font-brush text-sm group-hover:translate-x-1 transition-transform">
                展卷入戏 ➔
              </span>
            </div>
          </div>

          {/* 手札 2: 后赤壁赋 */}
          <div
            onClick={() => onSelectArticle('chibifu-hou')}
            className="group cursor-pointer bg-[#fbf6ed] hover:bg-[#fffdfa] text-ink-burnt p-7 rounded-2xl border-2 border-paper-wash hover:border-cinnabar shadow-theatre hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-paper-wash/80 pb-3 mb-3">
                <span className="text-xs font-archaic text-cinnabar">
                  宋神宗元丰五年十月望日 · 赋
                </span>
                <span className="seal-box px-2 py-0.5 text-[10px] font-brush">
                  续游绝唱
                </span>
              </div>
              <h4 className="text-2xl font-bold font-song text-ink-burnt group-hover:text-cinnabar transition tracking-[0.2em]">
                后赤壁赋
              </h4>
              <p className="text-xs font-archaic text-ink-light mt-1">
                作于冬夜重游黄州断岸之时
              </p>
              <div className="mt-4 p-3.5 rounded-lg bg-paper-cooked/60 border border-paper-wash/60 text-xs font-song leading-relaxed text-ink-thick">
                “江流有声，断岸千尺；山高月小，水落石出。曾日月之几何，而江山不可复识矣。适有孤鹤，横江东来。”
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-wash/80 flex items-center justify-between text-xs font-archaic text-ink-light">
              <span>〔清·吴楚材评：仙气逼人，幽微超脱〕</span>
              <span className="text-cinnabar font-brush text-sm group-hover:translate-x-1 transition-transform">
                展卷入戏 ➔
              </span>
            </div>
          </div>

          {/* 手札 3: 记承天寺夜游 */}
          <div
            onClick={() => onSelectArticle('chengtian-yeyou')}
            className="group cursor-pointer bg-[#fbf6ed] hover:bg-[#fffdfa] text-ink-burnt p-7 rounded-2xl border-2 border-paper-wash hover:border-cinnabar shadow-theatre hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between border-b border-paper-wash/80 pb-3 mb-3">
                <span className="text-xs font-archaic text-cinnabar">
                  宋神宗元丰六年十月十二日 · 记
                </span>
                <span className="seal-box px-2 py-0.5 text-[10px] font-brush">
                  短文神品
                </span>
              </div>
              <h4 className="text-2xl font-bold font-song text-ink-burnt group-hover:text-cinnabar transition tracking-[0.2em]">
                记承天寺夜游
              </h4>
              <p className="text-xs font-archaic text-ink-light mt-1">
                夜访张怀民，步于承天寺中庭
              </p>
              <div className="mt-4 p-3.5 rounded-lg bg-paper-cooked/60 border border-paper-wash/60 text-xs font-song leading-relaxed text-ink-thick">
                “庭下如积水空明，水中藻荇交横，盖竹柏影也。何夜无月？何处无竹柏？但少闲人如吾两人者耳。”
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-paper-wash/80 flex items-center justify-between text-xs font-archaic text-ink-light">
              <span>〔苏轼：世上本少此等闲人〕</span>
              <span className="text-cinnabar font-brush text-sm group-hover:translate-x-1 transition-transform">
                展卷入戏 ➔
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
