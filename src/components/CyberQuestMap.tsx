import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Lock, Sparkles, Check, ChevronRight, Crown, 
  Compass, Flame, Shield, HelpCircle, Trophy, BookOpen, AlertCircle
} from 'lucide-react';
import { QuestNode } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundFx } from '../utils/audio';

interface CyberQuestMapProps {
  questNodes: QuestNode[];
  onBackToTownSquare: () => void;
  onOpenQuestReader: (quest: QuestNode) => void;
  equippedHatId: string | null;
}

export const CyberQuestMap: React.FC<CyberQuestMapProps> = ({
  questNodes,
  onBackToTownSquare,
  onOpenQuestReader,
  equippedHatId,
}) => {
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<QuestNode | null>(null);

  const completedCount = questNodes.filter((q) => q.status === 'completed').length;
  const progressPercent = Math.round((completedCount / questNodes.length) * 100);

  const handleNodeClick = (node: QuestNode) => {
    soundFx.playClick();
    if (node.status === 'active') {
      onOpenQuestReader(node);
    } else {
      setSelectedNodeInfo(node);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Top Map Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onBackToTownSquare();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/90 hover:bg-slate-750 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-cyan-400 transition-all active:scale-95 cursor-pointer shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Town Square</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                Peta Petualangan Menara Biner
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                12 CHAPTER
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Jelajahi alur pembelajaran coding Python dari dasar hingga boss project!
            </p>
          </div>
        </div>

        {/* Global Adventure Progress */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto px-4 py-2 rounded-2xl bg-slate-950/70 border border-slate-800">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              Progres Menara
            </span>
            <span className="text-xs font-bold text-cyan-300 font-mono">
              {completedCount} / {questNodes.length} Selesai ({progressPercent}%)
            </span>
          </div>

          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* The 12-Topic Interactive Winding Path */}
      <div className="relative rounded-3xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 p-6 sm:p-10 overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.1)]">
        {/* Cyber grid and neon circuitry behind map */}
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Winding Map Grid / Timeline Layout */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
          {questNodes.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isActive = node.status === 'active';
            const isLocked = node.status === 'locked';

            // Alternating serpentine offset layout for winding path aesthetic
            const isEven = index % 2 === 0;

            return (
              <div
                key={node.id}
                className={`relative flex items-center gap-4 sm:gap-6 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Connecting Neon Line between nodes */}
                {index < questNodes.length - 1 && (
                  <div 
                    className={`absolute top-14 sm:top-16 left-6 sm:left-1/2 w-0.5 h-12 -z-0 transition-colors ${
                      isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-800'
                    }`}
                  />
                )}

                {/* Node Milestone Circle Button */}
                <div className="relative shrink-0 z-10">
                  {/* Floating Mini Hero Avatar if this is the active node */}
                  {isActive && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce z-20">
                      <div className="scale-75 origin-bottom">
                        <AvatarDisplay
                          coderId="hero"
                          name="Kamu"
                          hatId={equippedHatId}
                          size="sm"
                          isOnline={true}
                        />
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-lg whitespace-nowrap">
                        Kamu Disini! ⚔️
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => handleNodeClick(node)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 border-2 border-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.6)] scale-110 active:scale-105 animate-pulse'
                        : isCompleted
                        ? 'bg-slate-900 border-2 border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:scale-105'
                        : node.isBoss
                        ? 'bg-slate-950/80 border-2 border-yellow-500/40 text-yellow-500/60 opacity-80 hover:opacity-100 hover:border-yellow-400'
                        : 'bg-slate-950/60 border-2 border-slate-800 text-slate-600 opacity-65 hover:opacity-90 hover:border-slate-700'
                    }`}
                  >
                    {/* Node Icon */}
                    {isCompleted ? (
                      <div className="flex flex-col items-center">
                        <Check className="w-6 h-6 stroke-[3] text-emerald-400" />
                        <span className="text-[9px] font-mono font-bold text-emerald-300">SELESAI</span>
                      </div>
                    ) : isActive ? (
                      <div className="flex flex-col items-center text-slate-950">
                        <span className="text-xl" role="img" aria-label="Sword">⚔️</span>
                        <span className="text-[9px] font-mono font-black tracking-wider">MULAI</span>
                      </div>
                    ) : node.isBoss ? (
                      <Crown className="w-7 h-7 text-yellow-400 animate-pulse" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-500" />
                    )}

                    {/* Chapter Pill Attached to Node */}
                    <span className={`absolute -bottom-2 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-400'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}>
                      #{node.chapter}
                    </span>
                  </button>
                </div>

                {/* Node Info Card */}
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`flex-1 p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:bg-slate-850'
                      : isCompleted
                      ? 'bg-slate-900/50 border-emerald-500/30 hover:border-emerald-400/60'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          BAB {node.chapter}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 animate-pulse">
                            QUEST AKTIF ⚔️
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                            🌟 BINTANG 3
                          </span>
                        )}
                        {node.isBoss && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                            👑 BOSS PROJECT
                          </span>
                        )}
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold mt-1 ${
                        isActive ? 'text-cyan-300' : isCompleted ? 'text-white' : 'text-slate-400'
                      }`}>
                        {node.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {node.subtitle}
                      </p>
                    </div>

                    {/* Rewards Preview */}
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-300">
                        <span>+{node.coinReward}</span>
                        <span>🪙</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 block">
                        +{node.xpReward} XP
                      </span>
                    </div>
                  </div>

                  {/* Interactive Button / Prompt */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {isActive
                        ? '🔥 Siap dikerjakan! Klik untuk membuka tantangan Mimo'
                        : isCompleted
                        ? '✨ Telah dikuasai! Klik untuk meninjau materi'
                        : '🔒 Selesaikan bab sebelumnya untuk membuka kunci'}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold">
                      {isActive && (
                        <span className="text-cyan-400 flex items-center gap-1 group-hover:underline">
                          Buka Quest <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          Tinjau <BookOpen className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-slate-500 flex items-center gap-1">
                          Terkunci <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Dialog for Non-Active Nodes */}
      {selectedNodeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedNodeInfo.icon}</span>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">
                    BAB {selectedNodeInfo.chapter}
                  </span>
                  <h3 className="text-base font-bold text-white">{selectedNodeInfo.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNodeInfo(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {selectedNodeInfo.subtitle}
            </p>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 mb-4 flex items-center justify-around text-center">
              <div>
                <span className="text-xs text-slate-500 block">Hadiah Koin</span>
                <span className="font-mono font-bold text-sm text-amber-300">+{selectedNodeInfo.coinReward} 🪙</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-xs text-slate-500 block">Fragmen Data</span>
                <span className="font-mono font-bold text-sm text-emerald-300">+{selectedNodeInfo.dataFragmentReward.amount} Pts</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-xs text-slate-500 block">Guild EXP</span>
                <span className="font-mono font-bold text-sm text-purple-300">+{selectedNodeInfo.xpReward} XP</span>
              </div>
            </div>

            {selectedNodeInfo.status === 'locked' ? (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Bab ini masih terkunci! Selesaikan Chapter 3 terlebih dahulu.</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Bab ini telah berhasil kamu selesaikan dengan nilai sempurna!</span>
              </div>
            )}

            <button
              onClick={() => setSelectedNodeInfo(null)}
              className="mt-4 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
