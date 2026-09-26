import React from 'react';
import { Sparkles, Coins, ShoppingBag, Volume2, VolumeX, ShieldCheck, Terminal, GraduationCap, Heart, Gamepad2 } from 'lucide-react';
import { AppRole } from '../types/game';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  coins: number;
  onOpenShop: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  equippedHatName?: string;
  activeRole: AppRole;
  onSelectRole: (role: AppRole) => void;
  isMeetingCompleted?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  coins,
  onOpenShop,
  isMuted,
  onToggleMute,
  equippedHatName,
  activeRole,
  onSelectRole,
  isMeetingCompleted,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/85 border-b border-cyan-500/20 px-3 sm:px-6 lg:px-8 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Brand Zone */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative group cursor-pointer flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform hover:scale-105">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                  bits2bytes
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono font-bold tracking-wider text-purple-300 bg-purple-950/80 border border-purple-500/40 rounded">
                  PHASE 3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Trio Synergy: Siswa · Guru · Orang Tua
              </p>
            </div>
          </div>

          {/* Mobile Sound FX Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                onToggleMute();
                soundFx.playClick();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800"
              title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Center: ROLE SWITCHER (Mandatory Phase 3 Feature) */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
          {/* 1. Siswa View */}
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRole('student');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRole === 'student'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>🎮 Siswa View</span>
          </button>

          {/* 2. Guru Dashboard */}
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRole('teacher');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              activeRole === 'teacher'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>👨‍🏫 Guru Dashboard</span>
            {!isMeetingCompleted && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          {/* 3. Portal Orang Tua */}
          <button
            onClick={() => {
              soundFx.playClick();
              onSelectRole('parent');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRole === 'parent'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>📱 Portal Orang Tua</span>
          </button>
        </div>

        {/* Right: Controls, Edu-Coins & Toko Avatar button */}
        <div className="flex items-center gap-3">
          {/* Desktop Audio FX Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundFx.playClick();
            }}
            className="hidden md:flex p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
            aria-label="Audio Toggle"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Edu-Coins Counter */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/15 border border-amber-500/30 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] group cursor-default"
            title="Edu-Coins Budi"
          >
            <Coins className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
            <span className="font-mono font-bold text-xs sm:text-sm tabular-nums tracking-wide text-amber-300">
              {coins}
            </span>
            <span className="text-[10px] font-semibold text-amber-400/80 hidden sm:inline">
              Coins
            </span>
          </div>

          {/* Toko Avatar (Wardrobe Shop) Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenShop();
            }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Toko</span>
            <span>Avatar</span>
            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse hidden lg:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
