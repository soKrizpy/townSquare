import React, { useState } from 'react';
import { 
  GraduationCap, CheckCircle2, Users, Send, BookOpen, Clock, 
  Sparkles, Check, AlertCircle, FileText, ChevronRight, UserCheck, HeartHandshake, Eye
} from 'lucide-react';
import { StudentCoder } from '../types/game';
import { soundFx } from '../utils/audio';

interface TeacherDashboardProps {
  students: StudentCoder[];
  isMeetingCompleted: boolean;
  onCompleteMeeting: (note: string) => void;
  teacherNote: string;
  onUpdateNote: (note: string) => void;
  onSwitchToParentView: () => void;
  onSwitchToStudentView: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  isMeetingCompleted,
  onCompleteMeeting,
  teacherNote,
  onUpdateNote,
  onSwitchToParentView,
  onSwitchToStudentView,
}) => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({
    hero: true, // Budi
    rian: true,
    siti: true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAttendance = (id: string) => {
    soundFx.playClick();
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFinishSession = () => {
    soundFx.playLevelUp();
    onCompleteMeeting(teacherNote);
    setToastMessage('✅ Laporan terkirim ke Parent Hub! Gembok PR Kuis Siswa resmi dibuka!');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 border border-emerald-400 text-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-between shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToStudentView}
              className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black hover:bg-emerald-400 cursor-pointer"
            >
              Lihat PR Siswa 🎮
            </button>
            <button
              onClick={onSwitchToParentView}
              className="px-3 py-1 rounded-xl bg-pink-500 text-white text-xs font-black hover:bg-pink-400 cursor-pointer"
            >
              Lihat Portal Ortu 📱
            </button>
          </div>
        </div>
      )}

      {/* Top Teacher Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                GURU / PENGAJAR
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isMeetingCompleted 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
              }`}>
                {isMeetingCompleted ? 'SESI DILAPORKAN ✅' : 'SESI BERLANGSUNG ⏳'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Panel Pengajar: Kelas Python Junior #1
            </h1>
            <p className="text-xs text-slate-400">
              Manajemen instruksi pengajaran langsung, absensi mikro-group, dan penerbitan laporan wali murid
            </p>
          </div>
        </div>

        {/* Quick shortcut to parent view */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToParentView}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" />
            <span>Pratinjau Portal Orang Tua</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Session Status & Attendance (Left) + Learning Notes & Action (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sesi Hari Ini & Attendance Check */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Session Status Card */}
          <div className="p-5 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Sesi Hari Ini</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Pertemuan 3 / 12
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                MATERI PEMBELAJARAN
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Pertemuan 3: If-Else Logic Gate &amp; Percabangan Algoritma
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Tujuan kompetensi: Siswa memahami konsep decision-making, kata kunci <code>if</code>, titik dua (<code>:</code>), indentasi 4 spasi, dan operator perbandingan <code>==</code>.
              </p>
            </div>
          </div>

          {/* Attendance Checkbox List */}
          <div className="p-5 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">Presensi Kehadiran Siswa</h3>
                </div>
                <span className="text-xs text-slate-400">
                  {Object.values(attendance).filter(Boolean).length} dari 3 Hadir
                </span>
              </div>

              <div className="space-y-2.5">
                {students.map((student) => {
                  const isPresent = attendance[student.id] ?? true;
                  const isBudi = student.id === 'hero';

                  return (
                    <div
                      key={student.id}
                      onClick={() => toggleAttendance(student.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isPresent
                          ? 'bg-slate-900 border-emerald-500/40 hover:border-emerald-400'
                          : 'bg-slate-950/60 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                          isPresent
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}>
                          {isPresent && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">
                              {student.name} {isBudi ? '(Budi)' : ''}
                            </span>
                            {isBudi && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                                Target Evaluasi
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {student.grade} · {student.role}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isPresent
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isPresent ? 'HADIR' : 'TIDAK HADIR'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 italic">
              💡 Ketuk kartu siswa untuk mengubah status presensi harian.
            </p>
          </div>
        </div>

        {/* Right Column: Teacher Note, Reporting & Trigger Action */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-400" />
                  <h3 className="font-bold text-sm text-white">Catatan Pembelajaran Hari Ini</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Diteruskan ke Portal Orang Tua
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-2">
                Tulis evaluasi dan apresiasi personal guru untuk diteruskan ke orang tua siswa:
              </p>

              <textarea
                value={teacherNote}
                onChange={(e) => onUpdateNote(e.target.value)}
                rows={4}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:outline-none text-xs sm:text-sm text-slate-100 leading-relaxed font-sans placeholder-slate-600 transition-colors shadow-inner"
                placeholder="Tuliskan catatan pengajaran..."
              />

              {/* Verified Checklist of Competencies */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-2">
                  Kompetensi Teruji Hari Ini:
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Mampu menyusun sintaks <code>if kondisi:</code> tanpa error</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Membedakan operator penugasan (<code>=</code>) vs pembanding (<code>==</code>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Menyelesaikan simulasi gerbang sirkuit pembuka Bit-Mon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={handleFinishSession}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95 cursor-pointer ${
                  isMeetingCompleted
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:via-teal-300 hover:to-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {isMeetingCompleted
                    ? '✅ Perbarui &amp; Kirim Ulang Laporan ke Orang Tua'
                    : '✅ Selesaikan Sesi &amp; Kirim Laporan ke Orang Tua'}
                </span>
              </button>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Efek Sinergi:</strong> Menekan tombol ini akan secara otomatis membuka gembok <strong>PR Kuis Siswa</strong> dan mengirimkan rapor ke <strong>Portal Orang Tua</strong>!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
