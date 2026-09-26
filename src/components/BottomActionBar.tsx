import React, { useState } from 'react';
import { Sword, Compass, Sparkles, X, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { soundFx } from '../utils/audio';

const QUEST_PORTAL_ASSET = '/src/assets/images/cyber_quest_portal_1790389324330.jpg';

interface BottomActionBarProps {
  onOpenQuestMap: () => void;
  activeChapter?: number;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onOpenQuestMap,
  activeChapter = 3,
}) => {
  const handleQuestClick = () => {
    soundFx.playClick();
    onOpenQuestMap();
  };

  return (
    <>
      <footer className="w-full mt-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Banner Zone */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6 text-cyan-400 animate-spin [animation-duration:20s]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                MISI HARI INI
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Bab {activeChapter} Aktif
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
              Chapter {activeChapter}: Gerbang Logika Pertama (The First Logic Gate)
            </h3>
            <p className="text-xs text-slate-400">
              Selesaikan tantangan percabangan IF-ELSE Python untuk mendapatkan +30 Koin &amp; Fragment Logika.
            </p>
          </div>
        </div>

        {/* Action Button: Buka Peta Quest */}
        <div className="relative w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleQuestClick}
            className="group relative w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 hover:from-cyan-400 hover:via-sky-300 hover:to-purple-500 text-slate-950 font-black text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-base" role="img" aria-label="Sword">⚔️</span>
            <span>Buka Peta Quest</span>
            <Sparkles className="w-4 h-4 text-purple-950 animate-bounce" />
          </button>
        </div>
      </footer>
    </>
  );
};
