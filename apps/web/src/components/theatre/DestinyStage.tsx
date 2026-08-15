'use client';

import React, { useEffect, useState } from 'react';
import type { Article } from '@beyond-classics/types';
import { fetchArticlesFromCloud } from '@/lib/api-client';

interface DestinyStageProps {
  sageId: string;
  onBack: () => void;
  onSelectArticle: (articleSlug: string) => void;
}

interface StageDramaNode {
  yearDesc: string;
  nodeTitle: string;
  subTitle: string;
  narrativeTitle: string;
  narrativeStory: string;
  motto: string;
  atmosphereBg: string;
}

interface SageDramaProfile {
  id: string;
  name: string;
  title: string;
  officialPost: string;
  avatarType: 'image' | 'text';
  avatarSrc?: string;
  avatarChar?: string;
  defaultNodeIndex: number;
  stageSubtitle: string;
  dramaNodes: StageDramaNode[];
}

/** 四大先贤专属沉浸式生命短剧数据字典 */
const SAGE_DRAMA_PROFILES: Record<string, SageDramaProfile> = {
  'su-shi': {
    id: 'su-shi',
    name: '苏轼',
    title: '东坡居士 · 苏轼',
    officialPost: '北宋神宗朝 · 黄州团练副使',
    avatarType: 'image',
    avatarSrc: '/assets/su_shi_looking.jpg',
    defaultNodeIndex: 3,
    stageSubtitle: '东坡居士 · 乌台死劫与黄州突围',
    dramaNodes: [
      {
        yearDesc: '1057年 20岁',
        nodeTitle: '嘉祐登科',
        subTitle: '名动京师',
        narrativeTitle: '【第一幕 · 1057年 嘉祐登科】',
        narrativeStory: '二十登科，名动京师。欧阳修惊叹：“老夫当避路，放他出一头地也！” 少年意气，风发不可一世。',
        motto: '“奋厉有当世志，指点江山，舍我其谁。”',
        atmosphereBg: 'from-[#3a2f26] via-[#2a241e] to-transparent',
      },
      {
        yearDesc: '1069年 32岁',
        nodeTitle: '熙宁变法',
        subTitle: '党争漩涡',
        narrativeTitle: '【第二幕 · 1069年 熙宁变法】',
        narrativeStory: '新旧党争骤起，王安石行新法。苏轼因直言上书切中弊端，两党皆不容，被迫离京自请外任。',
        motto: '“问汝平生功业，黄州惠州儋州。”',
        atmosphereBg: 'from-[#3d2b24] via-[#241f1c] to-transparent',
      },
      {
        yearDesc: '1079年 42岁',
        nodeTitle: '乌台死劫',
        subTitle: '百日牢狱',
        narrativeTitle: '【第三幕 · 1079年 乌台诗案】',
        narrativeStory: '御史罗织文字狱，逮赴乌台狱百三十日，严刑拷打，濒临死地。与弟绝命诗：“是处青山可埋骨，他时夜雨独伤神。”',
        motto: '“魂飞汤火，命若悬丝，死生一线间。”',
        atmosphereBg: 'from-[#421d1d] via-[#281515] to-transparent',
      },
      {
        yearDesc: '1082年 45岁',
        nodeTitle: '黄州突围 ✦',
        subTitle: '水月齐物',
        narrativeTitle: '【第四幕 · 1082年 黄州赤壁】',
        narrativeStory: '大难不死，贬谪黄州团练副使，不得签书公事。家徒四壁，他在东坡开荒种地，自号“东坡居士”。就在这一无所有的绝境中，他在赤壁之下完成了千古精神大突围！',
        motto: '“自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也。”',
        atmosphereBg: 'from-[#4a2e26] via-[#2b1f1a] to-transparent',
      },
      {
        yearDesc: '1097年 60岁',
        nodeTitle: '天涯儋州',
        subTitle: '九死不悔',
        narrativeTitle: '【第五幕 · 1097年 儋耳绝域】',
        narrativeStory: '晚年再遭重贬，远徙天涯海角海南岛儋州。“食无肉，病无药，居无室，出无友”。但他办学堂、教黎民，自称“九死南荒吾不恨，兹游奇绝冠平生”。',
        motto: '“九死南荒吾不恨，兹游奇绝冠平生。”',
        atmosphereBg: 'from-[#382b2b] via-[#231b1b] to-transparent',
      },
    ],
  },
  'zhuge-liang': {
    id: 'zhuge-liang',
    name: '诸葛亮',
    title: '武乡侯 · 诸葛亮',
    officialPost: '蜀汉建兴五年 · 丞相 领益州牧',
    avatarType: 'text',
    avatarChar: '亮',
    defaultNodeIndex: 3,
    stageSubtitle: '武侯纶巾 · 白帝托孤与五月渡泸',
    dramaNodes: [
      {
        yearDesc: '207年 26岁',
        nodeTitle: '三顾草庐',
        subTitle: '天下三分',
        narrativeTitle: '【第一幕 · 207年 隆中对策】',
        narrativeStory: '隐居南阳，躬耕陇亩，好为《梁父吟》。刘备三顾草庐之中，咨臣以当世之事，三分天下定计于谈笑之间。',
        motto: '“受任于败军之际，奉命于危难之间，尔来二十有一年矣。”',
        atmosphereBg: 'from-[#2b353a] via-[#1c2428] to-transparent',
      },
      {
        yearDesc: '221年 40岁',
        nodeTitle: '受命拜相',
        subTitle: '开基立国',
        narrativeTitle: '【第二幕 · 221年 蜀汉开国】',
        narrativeStory: '刘备称帝成都，拜丞相，录尚书事。然而夷陵大败，蜀汉精锐尽失，国力跌至谷底，危急存亡之秋。',
        motto: '“开张圣听，以光先帝遗德，恢弘志士之气。”',
        atmosphereBg: 'from-[#3a3026] via-[#26201a] to-transparent',
      },
      {
        yearDesc: '223年 42岁',
        nodeTitle: '白帝托孤',
        subTitle: '泪洒永安',
        narrativeTitle: '【第三幕 · 223年 白帝城遗命】',
        narrativeStory: '先帝临终托孤于永安宫：“君才十倍曹丕，必能安国，终定大事。若嗣子可辅，辅之；如其不才，君可自取。” 武侯泣曰：“臣敢竭股肱之力，效忠贞之节，继之以死！”',
        motto: '“臣敢竭股肱之力，效忠贞之节，继之以死！”',
        atmosphereBg: 'from-[#42221d] via-[#2b1815] to-transparent',
      },
      {
        yearDesc: '227年 46岁',
        nodeTitle: '北伐誓师 ✦',
        subTitle: '临表涕零',
        narrativeTitle: '【第四幕 · 227年 出师北伐】',
        narrativeStory: '五月渡泸，平定南中。率诸军北驻汉中，即将提兵北伐中原。深夜军帐烛影之下，写下千古忠义第一奇文《出师表》，临表涕零，不知所言！',
        motto: '“今当远离，临表涕零，不知所言。”',
        atmosphereBg: 'from-[#4a2e26] via-[#2b1f1a] to-transparent',
      },
      {
        yearDesc: '234年 53岁',
        nodeTitle: '秋风五丈原',
        subTitle: '鞠躬尽瘁',
        narrativeTitle: '【第五幕 · 234年 陨落星汉】',
        narrativeStory: '六出祁山，与司马懿相拒于渭南五丈原。夙夜忧叹，政事巨细皆亲揽，终因积劳成疾，星陨中原，万古悲风。',
        motto: '“鞠躬尽瘁，死而后已。”',
        atmosphereBg: 'from-[#2e263a] via-[#1d1825] to-transparent',
      },
    ],
  },
  'han-yu': {
    id: 'han-yu',
    name: '韩愈',
    title: '昌黎先生 · 韩愈',
    officialPost: '中唐贞元朝 · 监察御史',
    avatarType: 'text',
    avatarChar: '愈',
    defaultNodeIndex: 2,
    stageSubtitle: '文起八代 · 宗族凋零与孤魂至痛',
    dramaNodes: [
      {
        yearDesc: '792年 24岁',
        nodeTitle: '贞元登科',
        subTitle: '四举始第',
        narrativeTitle: '【第一幕 · 792年 贞元及第】',
        narrativeStory: '少年孤苦，由兄嫂抚养。四次赴京应举方才及第。倡导古文运动，主张“文以载道，文起八代之衰”。',
        motto: '“师者，所以传道受业解惑也。”',
        atmosphereBg: 'from-[#36322b] via-[#24211d] to-transparent',
      },
      {
        yearDesc: '803年 35岁',
        nodeTitle: '关中大旱',
        subTitle: '贬谪阳山',
        narrativeTitle: '【第二幕 · 803年 极论宫市】',
        narrativeStory: '关中大旱，民不聊生。韩愈上《御史台上论天旱人饥状》，触怒权贵，即日被贬为连州阳山令。',
        motto: '“屯田之弊，极陈民瘼，虽贬无悔。”',
        atmosphereBg: 'from-[#3d2a24] via-[#261b17] to-transparent',
      },
      {
        yearDesc: '803年 35岁',
        nodeTitle: '十二郎讣 ✦',
        subTitle: '千古至痛',
        narrativeTitle: '【第三幕 · 803年 祭十二郎文】',
        narrativeStory: '贬谪途中，惊闻自幼相依为命的至亲侄儿十二郎忽染疾暴卒！两世一身，宗族凋零，天道莫测。哭至声嘶力竭，写下“祭文千古第一痛切”之绝唱！',
        motto: '“呜呼！言有穷而情不可终，汝其知也邪？其不知也邪？呜呼哀哉！尚飨！”',
        atmosphereBg: 'from-[#421d1d] via-[#281515] to-transparent',
      },
      {
        yearDesc: '819年 51岁',
        nodeTitle: '谏迎佛骨',
        subTitle: '贬谪潮州',
        narrativeTitle: '【第四幕 · 819年 佛骨巨浪】',
        narrativeStory: '唐宪宗迎佛骨入宫，韩愈毅然上《谏迎佛骨表》，帝大怒欲斩之，后贬为潮州刺史。路经蓝关雪阻：“一封朝奏九重天，夕贬潮州路八千。”',
        motto: '“欲为圣明除弊事，肯将衰朽惜残年。”',
        atmosphereBg: 'from-[#4a2e26] via-[#2b1f1a] to-transparent',
      },
      {
        yearDesc: '824年 56岁',
        nodeTitle: '昌黎晚岁',
        subTitle: '百代文宗',
        narrativeTitle: '【第五幕 · 824年 德业完具】',
        narrativeStory: '重返朝堂，官至吏部侍郎。平定镇州兵变，勇退逆贼。苏轼赞其：“文起八代之衰，而道济天下之溺。”',
        motto: '“匹夫而为百世师，一言而为天下法。”',
        atmosphereBg: 'from-[#332b38] via-[#201b24] to-transparent',
      },
    ],
  },
  'zuo-qiuming': {
    id: 'zuo-qiuming',
    name: '左丘明',
    title: '盲史 · 左丘明',
    officialPost: '先秦·春秋时期 · 鲁国太史',
    avatarType: 'text',
    avatarChar: '明',
    defaultNodeIndex: 2,
    stageSubtitle: '春秋盲史 · 算无遗策与齐鲁长勺',
    dramaNodes: [
      {
        yearDesc: '前550年 青年',
        nodeTitle: '鲁室秉笔',
        subTitle: '太史直言',
        narrativeTitle: '【第一幕 · 前550年 鲁史世家】',
        narrativeStory: '世为鲁国太史，观周室礼乐典章，通晓列国兴衰治乱。孔子赞曰：“巧言、令色、足恭，左丘明耻之，丘亦耻之。”',
        motto: '“君子以礼动，首先以顺。”',
        atmosphereBg: 'from-[#2f3533] via-[#1e2321] to-transparent',
      },
      {
        yearDesc: '前520年 壮年',
        nodeTitle: '礼崩乐坏',
        subTitle: '列国争霸',
        narrativeTitle: '【第二幕 · 前520年 春秋乱局】',
        narrativeStory: '周王室衰微，诸侯争霸，齐楚争强。左丘明历览长勺之战、泓水之战、城濮之战，洞悉战争与人心向背之天理。',
        motto: '“夫战，勇气也。一鼓作气，再而衰，三而竭。”',
        atmosphereBg: 'from-[#38332b] via-[#23201b] to-transparent',
      },
      {
        yearDesc: '前684年 追述',
        nodeTitle: '长勺之战 ✦',
        subTitle: '算无遗策',
        narrativeTitle: '【第三幕 · 追述长勺 曹刿论战】',
        narrativeStory: '齐鲁长勺之战，鲁庄公将战，曹刿求见：“肉食者鄙，未能远谋。” 察视辙乱旗靡，算无遗策，成就中国战争史上以弱胜强的千古第一论！',
        motto: '“肉食者鄙，未能远谋。夫大国，难测也，惧有伏焉。”',
        atmosphereBg: 'from-[#42221d] via-[#2b1815] to-transparent',
      },
      {
        yearDesc: '前490年 晚年',
        nodeTitle: '盲而著书',
        subTitle: '左氏春秋',
        narrativeTitle: '【第四幕 · 前490年 双目失明】',
        narrativeStory: '晚年双目失明，心志愈坚。依孔子《春秋》编次列国史事，作《左传》三十卷，开纪传、编年叙事文学之极轨。',
        motto: '“左丘失明，厥有《国语》与《左氏春秋》。”',
        atmosphereBg: 'from-[#4a2e26] via-[#2b1f1a] to-transparent',
      },
      {
        yearDesc: '前450年 垂暮',
        nodeTitle: '史家之祖',
        subTitle: '千秋宗匠',
        narrativeTitle: '【第五幕 · 万古史笔】',
        narrativeStory: '笔法严谨，微言大义，叙事详实生动。司马迁撰《史记》深受其浸润，尊其为千古百代叙事文宗。',
        motto: '“善序事理，辩而不华，质而不俚。”',
        atmosphereBg: 'from-[#322838] via-[#201924] to-transparent',
      },
    ],
  },
};

export const DestinyStage: React.FC<DestinyStageProps> = ({
  sageId,
  onBack,
  onSelectArticle,
}) => {
  // 根据传入的 sageId 获取对应先贤 profile (降级保障为苏轼)
  const profile = SAGE_DRAMA_PROFILES[sageId] || SAGE_DRAMA_PROFILES['su-shi'];
  
  const [activeNode, setActiveNode] = useState(profile.defaultNodeIndex);
  const [cloudArticles, setCloudArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // 当切换 sageId 时，重置当前戏剧节点为该先贤的代表节点
  useEffect(() => {
    setActiveNode(profile.defaultNodeIndex);
  }, [sageId, profile.defaultNodeIndex]);

  const currentStory = profile.dramaNodes[activeNode] || profile.dramaNodes[0];

  useEffect(() => {
    async function loadArticles() {
      setLoadingArticles(true);
      const list = await fetchArticlesFromCloud(sageId);
      if (list && list.length > 0) {
        setCloudArticles(list);
      }
      setLoadingArticles(false);
    }
    loadArticles();
  }, [sageId]);

  return (
    <section className="flex-1 flex flex-col px-8 py-6 max-w-6xl w-full mx-auto relative z-20 animate-cinematic text-ink-burnt">
      {/* 顶栏 */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-wash/60 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-archaic text-ink-heavy hover:text-cinnabar transition px-3 py-1.5 rounded-lg bg-paper-raw border border-paper-wash shadow-xs"
        >
          <span>◀ 返回先贤星汉</span>
        </button>
        <div className="text-lg font-bold font-song text-ink-burnt tracking-[0.2em] flex items-center gap-2">
          <span className="seal-box px-2 py-0.5 text-xs font-brush text-cinnabar">第二幕</span>
          <span>{profile.stageSubtitle}</span>
        </div>
        <div className="text-xs font-archaic text-cinnabar">
          沉浸剧场：命途抉择 ➔ 手札破墨
        </div>
      </div>

      {/* 剧场主舞台 (泛黄熟宣折页质感) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-paper-wash shadow-sheet mb-8 bg-paper-cooked">
        <div
          className={`absolute inset-0 bg-linear-to-r ${currentStory.atmosphereBg} opacity-20 transition-all duration-1000`}
        />

        <div className="relative z-10 p-8 flex flex-col lg:flex-row items-center gap-8">
          {/* 左侧头像与心境 */}
          <div className="flex flex-col items-center text-center shrink-0 w-64 border-b lg:border-b-0 lg:border-r border-paper-wash/60 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative mb-3">
              <div className="w-32 h-32 rounded-full border-4 border-cinnabar overflow-hidden shadow-seal bg-paper-aged flex items-center justify-center">
                {profile.avatarType === 'image' && profile.avatarSrc ? (
                  <img
                    src={profile.avatarSrc}
                    alt={`${profile.name}水墨肖像`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="text-6xl font-brush text-ink-burnt">{profile.avatarChar}</span>
                )}
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-cinnabar px-3 py-0.5 rounded-full text-[11px] font-brush text-paper-raw shadow-xs whitespace-nowrap">
                {currentStory.yearDesc}
              </div>
            </div>
            <h3 className="text-2xl font-bold font-song text-ink-burnt tracking-widest mt-2">
              {profile.title}
            </h3>
            <p className="text-xs font-archaic text-cinnabar mt-0.5">
              {profile.officialPost}
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-paper-raw/90 border border-paper-wash/80 text-xs font-song text-ink-heavy text-left leading-relaxed shadow-xs">
              <span className="text-cinnabar font-bold block mb-1">【命途心境】</span>
              <span>{currentStory.motto}</span>
            </div>
          </div>

          {/* 右侧剧评与时间轴 */}
          <div className="flex-1 w-full space-y-5">
            <div className="bg-paper-raw/95 rounded-2xl p-6 border border-paper-wash shadow-xs">
              <div className="flex items-center gap-2 text-xs font-archaic text-cinnabar mb-2 font-bold">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-cinnabar animate-pulse" />
                <span>{currentStory.narrativeTitle}</span>
              </div>
              <p className="text-sm font-song text-ink-thick leading-relaxed">
                {currentStory.narrativeStory}
              </p>
            </div>

            {/* 命途节点 (赭石、黛青传统色) */}
            <div>
              <div className="text-xs font-archaic text-ink-heavy mb-2.5 flex items-center justify-between">
                <span>命途天命之轴（点击节点推进戏剧时空）：</span>
                <span className="text-cinnabar text-[11px] font-bold">✦ 当前节点：{currentStory.nodeTitle}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {profile.dramaNodes.map((node, i) => (
                  <button
                    key={node.nodeTitle}
                    onClick={() => setActiveNode(i)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      activeNode === i
                        ? 'border-2 border-cinnabar bg-paper-raw shadow-md scale-105'
                        : 'border border-paper-wash/80 bg-paper-raw/60 hover:bg-paper-raw hover:border-paper-wash'
                    }`}
                  >
                    <span
                      className={`text-[10px] block ${
                        activeNode === i ? 'text-cinnabar font-bold' : 'text-ink-clear'
                      }`}
                    >
                      {node.yearDesc}
                    </span>
                    <span
                      className={`font-bold text-xs block ${
                        activeNode === i ? 'text-ink-burnt' : 'text-ink-heavy'
                      }`}
                    >
                      {node.nodeTitle}
                    </span>
                    <span className="text-[10px] text-ink-light">{node.subTitle}</span>
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
            <h3 className="text-lg font-bold font-song text-ink-burnt tracking-widest">
              【{profile.name}】当年散落之手泽信札
            </h3>
          </div>
          <span className="text-xs font-archaic text-ink-light">
            点击任意手札 · 运镜展开自右向左水墨长卷
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadingArticles ? (
            <div className="col-span-full py-12 text-center text-ink-light font-archaic text-sm animate-pulse">
              <span className="seal-box px-3 py-1 text-xs font-brush text-cinnabar">展卷中</span>
              <p className="mt-2">正在展开当年传世手札...</p>
            </div>
          ) : cloudArticles.length === 0 ? (
            <div className="col-span-full py-8 text-center text-ink-light font-archaic text-sm">
              暂无该先贤手札收录
            </div>
          ) : (
            cloudArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art.id)}
                className="group cursor-pointer bg-paper-raw hover:bg-[#fffdf9] text-ink-burnt p-7 rounded-2xl border-2 border-paper-wash hover:border-cinnabar shadow-sheet hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-paper-wash/80 pb-3 mb-3">
                    <span className="text-xs font-archaic text-cinnabar font-bold">
                      {art.lunarCalendarDesc || art.dynasty} · {art.genre}
                    </span>
                    <span className="seal-solid px-2 py-0.5 text-[10px] font-brush">
                      {art.genre === '赋' ? '千古神品' : '传世名作'}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold font-song text-ink-burnt group-hover:text-cinnabar transition tracking-[0.2em]">
                    {art.title}
                  </h4>
                  <p className="text-xs font-archaic text-ink-light mt-1">
                    作于 {art.locationAncient || '先秦'} {art.locationModern ? `(${art.locationModern})` : ''}
                  </p>
                  <div className="mt-4 p-3.5 rounded-xl bg-paper-cooked/70 border border-paper-wash/60 text-xs font-song leading-relaxed text-ink-heavy">
                    {art.historicalContext}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-paper-wash/80 flex items-center justify-between text-xs font-archaic text-ink-light">
                  <span className="text-cinnabar font-bold truncate max-w-[200px]">{art.psychologicalBackground}</span>
                  <span className="text-cinnabar font-brush text-sm group-hover:translate-x-1 transition-transform">
                    展卷入戏 ➔
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
