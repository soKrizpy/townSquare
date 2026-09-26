import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, Coins, Heart, Check, Flame, 
  Zap, Star, ShieldCheck, ArrowRight, X, Trophy
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const BABY_PET_ASSET = '/src/assets/images/cyber_byte_pup_baby_1790397557869.jpg';

interface PetEvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcknowledgeHatch: () => void;
}

export const PetEvolutionModal: React.FC<PetEvolutionModalProps> = ({
  isOpen,
  onClose,
  onAcknowledgeHatch,
}) => {
  const [animationStage, setAnimationStage] = useState<'cracking' | 'burst' | 'evolved'>('cracking');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setAnimationStage('cracking');
      soundFx.playEggWobble();

      // Trigger crack sequence
      const timer1 = setTimeout(() => {
        soundFx.playLevelUp();
        setAnimationStage('burst');
      }, 1800);

      // Trigger final revealed stage
      const timer2 = setTimeout(() => {
        soundFx.playFeed();
        setAnimationStage('evolved');
      }, 2600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = () => {
    soundFx.playCoin();
    onAcknowledgeHatch();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-cyan-400 shadow-[0_0_80px_rgba(6,182,212,0.6)] overflow-hidden flex flex-col p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background circuit glow */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* STAGE 1 & 2: CRACKING EGG ANIMATION */}
        {animationStage !== 'evolved' && (
          <div className="py-12 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Energy Pulse */}
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400/60 animate-ping opacity-60" />
              <div className="absolute -inset-4 bg-cyan-400/30 rounded-full blur-2xl animate-pulse" />

              {/* Shaking & Cracking Egg */}
              <div className="relative text-7xl sm:text-8xl animate-egg-wobble select-none">
                🥚
                {/* Visual Crack Overlay Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-3xl text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)] animate-ping">
                    ⚡
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/60 animate-pulse">
                DATA OVERLOAD 100% · EVOLVING...
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                Telur Cyber Bergetar Kuat!
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Energi logika if-else dari PR Kuis meretakkan cangkang telur...
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: EVOLVED BABY DIGIMON CLIMAX */}
        {animationStage === 'evolved' && (
          <div className="flex flex-col items-center animate-in zoom-in-90 duration-300">
            {/* Top Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                ✨ EVOLUTION CLIMAX ✨
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-300 to-yellow-300 bg-clip-text text-transparent">
              SELAMAT! TELURMU TELAH MENETAS!
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Pet barumu telah lahir ke dunia digital bits2bytes:
            </p>

            {/* Visual Companion Centerpiece */}
            <div className="relative my-4 group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-emerald-500/40 rounded-full blur-2xl animate-pulse" />
              
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] bg-slate-950 p-1">
                {!imageError ? (
                  <img
                    src={BABY_PET_ASSET}
                    alt="Cyber-Byte Pup"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  /* Fallback SVG */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-950 text-cyan-300">
                    <span className="text-6xl animate-bounce">🐶</span>
                    <span className="text-xs font-mono font-bold mt-1">Cyber-Byte Pup</span>
                  </div>
                )}
              </div>

              {/* Adorable Badge Attached */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950 border border-cyan-400 text-cyan-300 font-mono text-[11px] font-bold shadow-md whitespace-nowrap">
                STAGE: BABY DIGIMON
              </div>
            </div>

            {/* Pet Name & Bio */}
            <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
              <span>"Cyber-Byte Pup"</span>
              <span className="text-base">⚡</span>
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1 leading-relaxed">
              Spesies anak anjing robotik cerdas yang memakan data logika koding! Sangat setia dan siap menemani petualangan quest berikutnya.
            </p>

            {/* Rewards Unlocked Box */}
            <div className="my-4 w-full p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-yellow-500/40 shadow-[0_0_25px_rgba(250,204,21,0.2)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-2.5">
                HADIAH KELAHIRAN PET &amp; PENCAPAIAN SISWA:
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Bonus Coins */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono font-black text-base text-amber-300 block">+100 Coins</span>
                    <span className="text-[10px] text-slate-400">Bonus Kelahiran</span>
                  </div>
                </div>

                {/* 2. Honorary Title */}
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono font-bold text-xs text-purple-300 block">Master of Logic</span>
                    <span className="text-[10px] text-slate-400">Gelar Gelora Baru</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acknowledge Button */}
            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400 hover:from-cyan-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Bawa Cyber-Byte Pup ke Town Square! 🐾</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
