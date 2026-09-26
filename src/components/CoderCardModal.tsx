import React, { useState } from 'react';
import { X, Sparkles, Flame, Rocket, Code2, Award, Zap, Laptop, Heart } from 'lucide-react';
import { StudentCoder } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundFx } from '../utils/audio';

interface CoderCardModalProps {
  coder: StudentCoder | null;
  isOpen: boolean;
  onClose: () => void;
  onSendReaction?: (emoji: string) => void;
}

export const CoderCardModal: React.FC<CoderCardModalProps> = ({
  coder,
  isOpen,
  onClose,
  onSendReaction,
}) => {
  const [reactionSent, setReactionSent] = useState<string | null>(null);

  if (!isOpen || !coder) return null;

  const handleReact = (reactionText: string) => {
    soundFx.playLevelUp();
    setReactionSent(reactionText);
    if (onSendReaction) {
      onSendReaction(reactionText);
    }
    setTimeout(() => {
      setReactionSent(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Header Background with cyber lines */}
        <div className="relative h-28 bg-gradient-to-r from-cyan-900/60 via-purple-900/60 to-slate-900 border-b border-cyan-500/20 px-6 pt-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40">
              CODER PROFILE ID #{coder.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tutup Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar Overlay & Bio */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col gap-4">
          {/* Avatar floating above banner */}
          <div className="flex items-end justify-between -mt-12">
            <div className="relative p-1.5 rounded-3xl bg-slate-900 border-2 border-cyan-400 shadow-lg">
              <AvatarDisplay
                coderId={coder.id}
                name={coder.name}
                hatId={coder.equippedHatId}
                size="lg"
                isOnline={coder.status === 'online'}
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                coder.status === 'online'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full ${coder.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {coder.status === 'online' ? 'Online' : 'Offline'}
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Lv. {coder.level}
              </span>
            </div>
          </div>

          {/* Name & Title */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{coder.name}</h2>
              {coder.isUser && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  Kamu
                </span>
              )}
            </div>
            <p className="text-xs text-cyan-400 font-medium">{coder.role} · {coder.grade}</p>
            <p className="text-xs text-slate-300 mt-2 italic bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
              "{coder.bio}"
            </p>
          </div>

          {/* Languages & Skill tags */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
              Bahasa Favorit &amp; Tool
            </span>
            <div className="flex flex-wrap gap-2">
              {coder.favoriteLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-[10px] text-slate-400">({lang.level})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Project Preview */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-purple-400" />
                Proyek Terkini: {coder.recentProject.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                {coder.recentProject.tech}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              {coder.recentProject.description}
            </p>
            {coder.recentProject.codeSnippet && (
              <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                <code>{coder.recentProject.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* Interactive Reactions */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                Kirim Semangat ke {coder.name}:
              </span>
              {reactionSent && (
                <span className="text-xs font-bold text-yellow-300 animate-bounce">
                  Terkirim: {reactionSent}! ✨
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleReact('🔥 Mantap!')}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-amber-500/50 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Mantap!</span>
              </button>

              <button
                onClick={() => handleReact('✨ GG!')}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>GG!</span>
              </button>

              <button
                onClick={() => handleReact('🚀 Gas Kode!')}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-purple-500/50 text-xs font-bold text-purple-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5 text-purple-400" />
                <span>Gas Kode!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
