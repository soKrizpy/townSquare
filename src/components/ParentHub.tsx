import React, { useState } from 'react';
import { 
  Heart, Sparkles, Award, CheckCircle2, Clock, Calendar, 
  MessageCircle, Coins, ShieldCheck, Flame, BookOpen, GraduationCap, ChevronRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PetData } from '../types/game';

interface ParentHubProps {
  isMeetingCompleted: boolean;
  teacherNote: string;
  studentName?: string;
  coins: number;
  pet: PetData;
  onSendParentLove: () => void;
  onSwitchToTeacherView: () => void;
  onSwitchToStudentView: () => void;
}

export const ParentHub: React.FC<ParentHubProps> = ({
  isMeetingCompleted,
  teacherNote,
  studentName = 'Budi (Kamu)',
  coins,
  pet,
  onSendParentLove,
  onSwitchToTeacherView,
  onSwitchToStudentView,
}) => {
  const [loveSent, setLoveSent] = useState(false);
  const [showLoveAnimation, setShowLoveAnimation] = useState(false);

  const handleSendLove = () => {
    soundFx.playCoin();
    setLoveSent(true);
    setShowLoveAnimation(true);
    onSendParentLove();

    setTimeout(() => {
      setShowLoveAnimation(false);
    }, 2500);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Floating Love Animation overlay */}
      {showLoveAnimation && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="flex flex-col items-center animate-in zoom-in-50 fade-in duration-300 bg-slate-950/90 p-6 rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.5)]">
            <span className="text-6xl animate-bounce">💖</span>
            <h2 className="text-xl font-bold text-white mt-2">Bintang Cinta Terkirim!</h2>
            <p className="text-xs text-pink-300 font-semibold mt-1">
              +10 Bonus Edu-Coins langsung ditambahkan ke celengan {studentName}!
            </p>
          </div>
        </div>
      )}

      {/* Top Parent Hub Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-pink-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/40 shadow-inner">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-pink-300 bg-pink-950/90 px-2 py-0.5 rounded border border-pink-500/40">
                PORTAL WALI MURID
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Siswa: Budi (Kelas 5 SD)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Parent Hub: Laporan Belajar {studentName}
            </h1>
            <p className="text-xs text-slate-400">
              Pantau kemajuan koding, rapor guru pertemuan, dan dukung motivasi ananda secara real-time
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onSwitchToStudentView}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Buka Town Square Siswa</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Status conditional rendering */}
      {!isMeetingCompleted ? (
        /* STATE 1: Sesi Belum Selesai (Pending) */
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-amber-500/30 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 mb-2">
            STATUS: DALAM PROSES
          </span>

          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            ⏳ Sesi belajar hari ini sedang berlangsung bersama Guru...
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-2 leading-relaxed">
            Guru kelas sedang mendampingi Budi dan teman-teman guild di modul <strong>Pertemuan 3: If-Else Logic</strong>. Laporan resmi pengajar dan capaian kompetensi akan langsung tampil di sini setelah guru menutup sesi.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onSwitchToTeacherView}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Buka Panel Guru untuk Selesaikan Sesi (Simulasi)</span>
            </button>
          </div>
        </div>
      ) : (
        /* STATE 2: Sesi Selesai (Verified Teacher Report & Parent Action) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Official Teacher Report Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ✅ Sesi 3 Selesai Dilaporkan oleh Guru
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Hari Ini, 20:30 WIB
                  </span>
                </div>

                {/* Competency Mastered */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    CAPAIAN KOMPETENSI RESMI
                  </span>
                  <div className="mt-1.5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/30 flex items-start gap-3">
                    <Award className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        Memahami Logika Percabangan If-Else di Python
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        Budi berhasil menyelesaikan tantangan pembuatan pintu logika digital, menguasai kata kunci <code>if</code>, operator perbandingan <code>==</code>, dan aturan indentasi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teacher's Note Section */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 font-bold flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    CATATAN KHUSUS GURU PEMBIMBING
                  </span>
                  <div className="mt-1.5 p-4 rounded-2xl bg-slate-950/80 border border-yellow-500/30 relative">
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                      "{teacherNote}"
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Pengajar: Kak Fajar (Lead Python Instructor)</span>
                      <span className="text-emerald-400 font-bold">Rekomendasi: Lanjut ke PR Kuis</span>
                    </div>
                  </div>
                </div>

                {/* Attendance & Engagement Score */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">STATUS KEHADIRAN</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">Hadir Tepat Waktu (100%)</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">PARTISIPASI KELAS</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300">Sangat Aktif (Bintang 5)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Parent Interactive Action & Student Motivation Hub */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Interactive Parent Love & Coin Bonus Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-pink-950/40 via-slate-900 to-slate-950 border border-pink-500/40 shadow-[0_0_30px_rgba(244,63,94,0.2)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-pink-400 fill-pink-500" />
                  <h3 className="font-bold text-base text-white">Dukungan Cinta Orang Tua</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Apresiasi kerja keras Budi hari ini! Kirim bintang cinta dari orang tua untuk memberikan <strong>+10 bonus Edu-Coins</strong> yang bisa dipakai Budi membeli headgear di Toko Avatar.
                </p>

                {/* Interactive Heart Button */}
                <button
                  onClick={handleSendLove}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg cursor-pointer ${
                    loveSent
                      ? 'bg-gradient-to-r from-pink-600 to-rose-700 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                      : 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white shadow-[0_0_25px_rgba(236,72,153,0.5)]'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                  <span>
                    {loveSent ? '💖 Bintang Cinta Terkirim (+10 Koin Diterima Budi!)' : '💖 Kirim Bintang Cinta dari Orang Tua'}
                  </span>
                </button>
              </div>

              {/* Status summary of Budi's savings */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Edu-Coins Budi Saat Ini:</span>
                <span className="font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  {coins} Coins
                </span>
              </div>
            </div>

            {/* Pet Care Status for Parents */}
            <div className="p-5 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Status Pet Pendamping: {pet.name}
                </span>
                <span className="text-[10px] font-mono text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-800">
                  {pet.stage}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Pet digital ananda akan menetas ketika PR Kuis diselesaikan!
              </p>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${pet.hatchProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>Inkubasi Data</span>
                <span className="text-cyan-300 font-bold">{pet.hatchProgress} / 100 Pts</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
