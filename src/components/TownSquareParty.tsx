import React from 'react';
import { Users, Plus, Sparkles, MessageSquare, ChevronRight, Award } from 'lucide-react';
import { StudentCoder } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundFx } from '../utils/audio';

interface TownSquarePartyProps {
  students: StudentCoder[];
  onSelectStudent: (student: StudentCoder) => void;
  onOpenInvite: () => void;
}

export const TownSquareParty: React.FC<TownSquarePartyProps> = ({
  students,
  onSelectStudent,
  onOpenInvite,
}) => {
  // Count online students
  const onlineCount = students.filter((s) => s.status === 'online').length;

  return (
    <div className="relative rounded-3xl bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 p-5 sm:p-6 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col justify-between">
      {/* Subtle cyber background grid & glow */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header of Main Arena */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Ruang Guild: Kelas Python Junior #1
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Micro-group belajar kolaboratif 4 murid · Modul Algoritma &amp; 3D
            </p>
          </div>
        </div>

        {/* Online Indicator status */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="font-semibold text-emerald-400 font-mono tabular-nums">{onlineCount}</span>
          <span className="text-slate-400">Teman Online</span>
        </div>
      </div>

      {/* Main Town Square Grid: Exactly 4 Avatar Pods */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-6">
        {/* Render 3 active students */}
        {students.map((student) => {
          const isUser = student.isUser;

          return (
            <div
              key={student.id}
              onClick={() => {
                soundFx.playClick();
                onSelectStudent(student);
              }}
              className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                isUser
                  ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900/60 to-slate-950/80 border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-1'
                  : student.status === 'online'
                  ? 'bg-gradient-to-b from-indigo-950/30 via-slate-900/60 to-slate-950/80 border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:-translate-y-1'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-700 hover:-translate-y-0.5'
              }`}
            >
              {/* Pod Cyber Ring Lighting on floor */}
              <div 
                className={`absolute bottom-6 w-24 h-6 rounded-full blur-md -z-0 transition-opacity ${
                  isUser 
                    ? 'bg-cyan-500/30 group-hover:bg-cyan-400/40' 
                    : student.status === 'online' 
                    ? 'bg-indigo-500/20' 
                    : 'bg-slate-700/10'
                }`} 
              />

              {/* Top Tag */}
              <div className="w-full flex items-center justify-between mb-3 text-[10px] font-mono">
                <span className="text-slate-500">SLOT {student.id === 'hero' ? '01' : student.id === 'rian' ? '02' : '03'}</span>
                {isUser && (
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                    HERO
                  </span>
                )}
                {!isUser && student.status === 'online' && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    ONLINE
                  </span>
                )}
                {!isUser && student.status === 'offline' && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    AWAY
                  </span>
                )}
              </div>

              {/* Avatar Illustration */}
              <div className="my-2 transform transition-transform group-hover:scale-105">
                <AvatarDisplay
                  coderId={student.id}
                  name={student.name}
                  hatId={student.equippedHatId}
                  size="lg"
                  isOnline={student.status === 'online'}
                />
              </div>

              {/* Student Name & Level */}
              <div className="mt-2 w-full">
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {student.name}
                  </h3>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    Lv.{student.level}
                  </span>
                </div>
                <p className="text-[11px] text-cyan-400/90 font-medium mt-0.5 truncate">
                  {student.role}
                </p>
                
                {/* Micro tech badge */}
                <div className="mt-2 flex items-center justify-center gap-1">
                  {student.favoriteLanguages.slice(0, 2).map((l) => (
                    <span
                      key={l.name}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt to open Coder Card */}
              <div className="mt-3 pt-2 w-full border-t border-slate-800/80 flex items-center justify-center gap-1 text-[10px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span>Buka Coder Card</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}

        {/* Slot 4: Empty Slot with dashed border to invite classmate */}
        <div
          onClick={() => {
            soundFx.playClick();
            onOpenInvite();
          }}
          className="group relative p-4 rounded-2xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-950/40 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1"
        >
          <div className="w-full flex items-center justify-between mb-3 text-[10px] font-mono">
            <span className="text-slate-500">SLOT 04</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              KOSONG
            </span>
          </div>

          {/* Plus icon circle */}
          <div className="w-20 h-20 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center my-3 text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Plus className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="mt-1">
            <h3 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
              Slot Kosong
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 max-w-[130px]">
              Klik untuk undang teman kelas ke guild!
            </p>
          </div>

          <div className="mt-3 pt-2 w-full border-t border-slate-800/80 flex items-center justify-center gap-1 text-[10px] text-cyan-400 font-semibold group-hover:underline">
            <span>Undang Teman</span>
            <Plus className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Arena Footer Info Note */}
      <div className="relative z-10 mt-2 px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            Setiap kamu menyelesaikan quest coding, seluruh anggota guild mendapatkan bonus exp!
          </span>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 hidden md:block">
          Guild Buff: +10% EXP
        </span>
      </div>
    </div>
  );
};
