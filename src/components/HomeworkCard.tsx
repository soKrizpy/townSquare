import React from 'react';
import { 
  Lock, BookOpen, Sparkles, CheckCircle2, ChevronRight, 
  Terminal, GraduationCap, Flame, Award
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HomeworkCardProps {
  isMeetingCompleted: boolean;
  isHomeworkDone: boolean;
  onOpenQuiz: () => void;
  onSwitchToTeacher: () => void;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({
  isMeetingCompleted,
  isHomeworkDone,
  onOpenQuiz,
  onSwitchToTeacher,
}) => {
  return (
    <div className="w-full my-4">
      {!isMeetingCompleted ? (
        /* STATE 1: LOCKED (Waiting for Teacher to complete session) */
        <div className="relative p-4 sm:p-5 rounded-3xl bg-slate-950/70 border border-slate-800/80 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-500">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  PR HARI INI
                </span>
                <span className="text-xs text-amber-400/90 font-semibold flex items-center gap-1">
                  🔒 Terkunci
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-300 mt-1">
                Kuis Uji Logika If-Else &amp; Gerbang Sirkuit
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Menunggu Guru menyelesaikan sesi kelas hari ini di Panel Pengajar.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onSwitchToTeacher();
            }}
            className="self-stretch sm:self-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-emerald-500/50 text-xs font-bold text-emerald-400 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Mode Guru (Buka Kunci)</span>
          </button>
        </div>
      ) : isHomeworkDone ? (
        /* STATE 2: HOMEWORK COMPLETED (Graded 100/100) */
        <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 shadow-[0_0_25px_rgba(52,211,153,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                  PR SELESAI
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  Nilai 100/100 (Bintang Emas ⭐⭐⭐)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Kuis Uji Logika If-Else Telah Dituntaskan!
              </h3>
              <p className="text-xs text-slate-300">
                Pakan penuntas telah diserap sempurna dan memicu penetasan <strong>Cyber-Byte Pup</strong>!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold text-center">
              +25 Logic Data Diterima
            </span>
          </div>
        </div>
      ) : (
        /* STATE 3: UNLOCKED & READY TO PLAY */
        <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-purple-950/60 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.3)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center justify-center shrink-0 animate-pulse">
              <Terminal className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-950 bg-cyan-400 px-2 py-0.5 rounded font-black">
                  PR TERBUKA
                </span>
                <span className="text-xs text-cyan-300 font-bold flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gembok Resmi Dibuka oleh Guru!
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                ⚔️ Kuis Uji Logika If-Else (Hadiah: Pakan Penetas Pet!)
              </h3>
              <p className="text-xs text-slate-300">
                Jawab 3 pertanyaan kilat untuk menyuntikkan <strong>+25 Logic Data</strong> dan menetas-kan telur Bit-Mon!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenQuiz();
            }}
            className="self-stretch sm:self-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Kerjakan Kuis Sekarang</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  );
};
