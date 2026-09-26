import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ChevronRight, HelpCircle, 
  Terminal, ShieldCheck, Award, Coins, Flame, ArrowLeft, RefreshCw, Key
} from 'lucide-react';
import { QuestNode } from '../types/game';
import { soundFx } from '../utils/audio';

interface QuestReaderModalProps {
  quest: QuestNode | null;
  isOpen: boolean;
  onClose: () => void;
  onClaimReward: (questId: number) => void;
  equippedHatId?: string | null;
}

export const QuestReaderModal: React.FC<QuestReaderModalProps> = ({
  quest,
  isOpen,
  onClose,
  onClaimReward,
  equippedHatId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Puzzle State for Step 3
  const [puzzle1Selected, setPuzzle1Selected] = useState<string | null>(null);
  const [puzzle1Status, setPuzzle1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [puzzle2Selected, setPuzzle2Selected] = useState<string | null>(null);
  const [puzzle2Status, setPuzzle2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [puzzleStage, setPuzzleStage] = useState<1 | 2>(1);

  if (!isOpen || !quest) return null;

  const handleNextStep = () => {
    soundFx.playClick();
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    soundFx.playClick();
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Check Challenge 1
  const checkPuzzle1 = () => {
    if (puzzle1Selected === 'if') {
      soundFx.playLevelUp();
      setPuzzle1Status('correct');
      setTimeout(() => {
        setPuzzleStage(2);
      }, 900);
    } else {
      soundFx.playClick();
      setPuzzle1Status('wrong');
    }
  };

  // Check Challenge 2
  const checkPuzzle2 = () => {
    if (puzzle2Selected === '==') {
      soundFx.playLevelUp();
      setPuzzle2Status('correct');
      setTimeout(() => {
        setCurrentStep(4);
      }, 1000);
    } else {
      soundFx.playClick();
      setPuzzle2Status('wrong');
    }
  };

  const handleClaim = () => {
    soundFx.playCoin();
    onClaimReward(quest.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Quest Header with 4-Step Progress Bar */}
        <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                BAB {quest.chapter} · QUEST AKTIF
              </span>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-[240px] sm:max-w-md">
                {quest.title}
              </h2>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tutup Quest"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 4-Step Progress Indicator */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((stepNum) => {
              const isPast = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={stepNum} className="flex flex-col gap-1">
                  <div className="h-2 rounded-full overflow-hidden bg-slate-800 border border-slate-700/60">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPast
                          ? 'bg-emerald-400'
                          : isCurrent
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse'
                          : 'bg-transparent'
                      }`}
                      style={{ width: isPast || isCurrent ? '100%' : '0%' }}
                    />
                  </div>
                  <span className={`text-[10px] text-center font-mono font-semibold ${
                    isCurrent ? 'text-cyan-300' : isPast ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    {stepNum === 1 && 'Cerita'}
                    {stepNum === 2 && 'Konsep'}
                    {stepNum === 3 && 'Tantangan'}
                    {stepNum === 4 && 'Hadiah'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Content Slider */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          {/* ============================================================== */}
          {/* STEP 1: STORY HOOK */}
          {/* ============================================================== */}
          {currentStep === 1 && (
            <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-right-4 duration-200">
              {/* Graphic Circuit Gate Simulation */}
              <div className="relative w-full max-w-sm h-40 sm:h-44 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/80 border border-cyan-500/30 flex items-center justify-center p-4 my-2 overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                {/* Circuit lines */}
                <div className="absolute inset-0 cyber-grid-dense opacity-30 pointer-events-none" />

                {/* Laser Security Grid */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-20 border-2 border-dashed border-rose-500/60 rounded-xl flex items-center justify-between px-4 bg-rose-950/20">
                  <div className="text-3xl animate-bounce">🥚</div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl">🔒</span>
                    <span className="text-[10px] font-mono text-rose-400 font-bold tracking-wider mt-1">
                      LOCKED GATE
                    </span>
                  </div>
                  <div className="text-2xl animate-pulse">⚡</div>
                </div>

                {/* Cyber Warning Tag */}
                <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-mono font-bold">
                  SISTEM SIRKUIT TERKUNCI
                </div>
              </div>

              {/* Story Narrative Box */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left max-w-lg">
                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                  <Key className="w-3.5 h-3.5" />
                  Misi Penyelamatan Bit-Mon
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  "Pet <strong>Bit-Mon</strong> kita tidak sengaja terkunci di dalam gerbang sirkuit digital Menara Biner! Pintu besi hanya bisa terbuka <span className="text-cyan-300 font-bold underline decoration-cyan-400">JIKA (if)</span> password kodenya cocok."
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Sebagai Apprentice Coder guild, tugasmu adalah mempelajari mantra percabangan <code>if</code> di Python untuk membuka gerbangnya!
                </p>
              </div>

              <button
                onClick={handleNextStep}
                className="mt-6 w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95 cursor-pointer"
              >
                <span>Pelajari Mantra Kode</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 2: CODE CONCEPT */}
          {/* ============================================================== */}
          {currentStep === 2 && (
            <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  Konsep Dasar: Perintah If di Python
                </span>
                <span className="text-[11px] text-slate-500">Mimo Coding Card</span>
              </div>

              {/* Code Snippet Display */}
              <div className="rounded-2xl bg-slate-950 border border-cyan-500/30 p-4 shadow-inner relative overflow-hidden">
                {/* Syntax highligted code block */}
                <div className="flex items-center gap-1.5 mb-3 border-b border-slate-800 pb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] font-mono text-slate-500 ml-2">gerbang_logika.py</span>
                </div>

                <pre className="font-mono text-xs sm:text-sm text-slate-100 leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-purple-400">nilai</span> = <span className="text-amber-300">80</span>{'\n'}
                    <span className="text-cyan-400 font-bold">if</span> <span className="text-purple-400">nilai</span> &gt;= <span className="text-amber-300">75</span><span className="text-yellow-300 font-bold">:</span>{'\n'}
                    {'    '}<span className="text-emerald-400 font-semibold">print</span>(<span className="text-emerald-300">"Selamat, kamu lulus!"</span>)
                  </code>
                </pre>
              </div>

              {/* Kid-Friendly Concept Explanations */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/30">
                  <div className="text-cyan-300 font-bold text-xs flex items-center gap-1.5 mb-1 font-mono">
                    <span>1. Kata Kunci "if"</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Artinya <em>"JIKA"</em>. Komputer mengecek apakah pernyataan di sebelahnya bernilai <strong>Benar (True)</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-yellow-500/30">
                  <div className="text-yellow-300 font-bold text-xs flex items-center gap-1.5 mb-1 font-mono">
                    <span>2. Titik Dua (:)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tanda kunci wajib di akhir kondisi <code>if</code> sebelum menulis perintah yang akan dieksekusi.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/30">
                  <div className="text-purple-300 font-bold text-xs flex items-center gap-1.5 mb-1 font-mono">
                    <span>3. Indentasi (Tab)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Perintah di bawah <code>if</code> harus menjorok 4 spasi agar Python tahu perintah itu berada di dalam blok gerbang!
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95 cursor-pointer"
                >
                  <span>Mulai Tantangan Mimo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 3: INTERACTIVE MIMO-STYLE CHALLENGE */}
          {/* ============================================================== */}
          {currentStep === 3 && (
            <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-200">
              {puzzleStage === 1 ? (
                /* Sub-challenge 1: Keyword Selection */
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      Tantangan 1 / 2: Pasang Kata Kunci yang Tepat
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                      ISI KOTAK KOSONG
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mb-3">
                    Lengkapi baris kode berikut agar pintu sirkuit terbuka <strong>JIKA</strong> kata kuncinya cocok:
                  </p>

                  {/* Interactive Code puzzle box */}
                  <div className={`p-4 rounded-2xl bg-slate-950 border-2 transition-all my-3 font-mono text-xs sm:text-sm leading-relaxed ${
                    puzzle1Status === 'correct'
                      ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                      : puzzle1Status === 'wrong'
                      ? 'border-rose-500 animate-shake'
                      : 'border-slate-800'
                  }`}>
                    <div className="text-purple-400">password = <span className="text-emerald-300">"CYBER"</span></div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      {/* Blank droppable/clickable slot */}
                      <div 
                        onClick={() => {
                          setPuzzle1Selected(null);
                          setPuzzle1Status('idle');
                        }}
                        className={`min-w-[70px] h-8 px-2 rounded-lg flex items-center justify-center font-bold text-xs border-2 transition-all cursor-pointer ${
                          puzzle1Selected
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                            : 'bg-slate-800/80 border-dashed border-cyan-500/60 text-slate-500'
                        }`}
                      >
                        {puzzle1Selected || '[ PILIH ]'}
                      </div>
                      <span className="text-purple-400">password == <span className="text-emerald-300">"CYBER"</span>:</span>
                    </div>

                    <div className="ml-6 mt-1 text-emerald-400">
                      print(<span className="text-emerald-300">"🔓 Gerbang Terbuka!"</span>)
                    </div>
                  </div>

                  {/* Choice Chips */}
                  <div className="mt-4">
                    <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                      Ketuk kata kunci untuk memasukkan ke dalam kotak kode:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {['if', 'else', 'print', 'while'].map((chip) => {
                        const isSelected = puzzle1Selected === chip;
                        return (
                          <button
                            key={chip}
                            onClick={() => {
                              soundFx.playClick();
                              setPuzzle1Selected(chip);
                              setPuzzle1Status('idle');
                            }}
                            className={`py-2 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                                : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-cyan-400 hover:bg-slate-750'
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hint / Status feedback */}
                  {puzzle1Status === 'wrong' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs text-center animate-in fade-in">
                      💡 Belum tepat! Ingat kata kunci apa yang berarti "JIKA" untuk memulai percabangan kondisi?
                    </div>
                  )}

                  {puzzle1Status === 'correct' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Benar sekali! Perintah 'if' digunakan untuk memeriksa kondisi password!</span>
                    </div>
                  )}

                  {/* Check button */}
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={handlePrevStep}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Kembali ke Konsep
                    </button>

                    <button
                      disabled={!puzzle1Selected || puzzle1Status === 'correct'}
                      onClick={checkPuzzle1}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                        !puzzle1Selected || puzzle1Status === 'correct'
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer'
                      }`}
                    >
                      Cek Jawaban ✨
                    </button>
                  </div>
                </div>
              ) : (
                /* Sub-challenge 2: Comparison Operator Selection */
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
                      Tantangan 2 / 2: Operator Pembanding
                    </span>
                    <span className="px-2 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-500/40 text-[10px] font-mono">
                      OPERATOR SAMA DENGAN
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mb-3">
                    Di Python, simbol apa yang digunakan untuk menguji apakah dua nilai bernilai <strong>SAMA PERSIS</strong>?
                  </p>

                  <div className={`p-4 rounded-2xl bg-slate-950 border-2 transition-all my-3 font-mono text-xs sm:text-sm leading-relaxed ${
                    puzzle2Status === 'correct'
                      ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                      : puzzle2Status === 'wrong'
                      ? 'border-rose-500'
                      : 'border-slate-800'
                  }`}>
                    <div className="text-purple-400">kunci = <span className="text-amber-300">10</span></div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-cyan-400 font-bold">if</span>
                      <span className="text-purple-400">kunci</span>
                      {/* Blank slot */}
                      <div 
                        onClick={() => {
                          setPuzzle2Selected(null);
                          setPuzzle2Status('idle');
                        }}
                        className={`min-w-[60px] h-8 px-2 rounded-lg flex items-center justify-center font-bold text-xs border-2 transition-all cursor-pointer ${
                          puzzle2Selected
                            ? 'bg-yellow-950/80 border-yellow-400 text-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                            : 'bg-slate-800/80 border-dashed border-yellow-500/60 text-slate-500'
                        }`}
                      >
                        {puzzle2Selected || '[ ___ ]'}
                      </div>
                      <span className="text-amber-300">10:</span>
                    </div>

                    <div className="ml-6 mt-1 text-emerald-400">
                      print(<span className="text-emerald-300">"Sirkuit Aktif!"</span>)
                    </div>
                  </div>

                  {/* Choice chips */}
                  <div className="mt-4">
                    <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                      Pilih operator pembanding:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {['==', '!=', '>', '+'].map((chip) => {
                        const isSelected = puzzle2Selected === chip;
                        return (
                          <button
                            key={chip}
                            onClick={() => {
                              soundFx.playClick();
                              setPuzzle2Selected(chip);
                              setPuzzle2Status('idle');
                            }}
                            className={`py-2 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'bg-yellow-400 text-slate-950 border-yellow-200 shadow-[0_0_12px_rgba(250,204,21,0.5)]'
                                : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:border-yellow-400'
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {puzzle2Status === 'wrong' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs text-center animate-in fade-in">
                      💡 Di pemrograman, tanda '==' (dua kali sama dengan) digunakan untuk menguji apakah nilainya sama!
                    </div>
                  )}

                  {puzzle2Status === 'correct' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>HEBAT! Gerbang sirkuit digital berhasil dibuka! Menuju perayaan...</span>
                    </div>
                  )}

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setPuzzleStage(1)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Tantangan Sebelumnya
                    </button>

                    <button
                      disabled={!puzzle2Selected || puzzle2Status === 'correct'}
                      onClick={checkPuzzle2}
                      className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                        !puzzle2Selected || puzzle2Status === 'correct'
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-[0_0_15px_rgba(250,204,21,0.4)] active:scale-95 cursor-pointer'
                      }`}
                    >
                      Buka Gerbang! 🔓
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 4: VICTORY & REWARD CELEBRATION */}
          {/* ============================================================== */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
              {/* Confetti & Victory Mascot */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-cyan-400 p-1 flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.5)] animate-bounce">
                  <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center">
                    <Award className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                  QUEST COMPLETED!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  Gerbang Logika Terbuka!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Kamu telah menguasai mantra <code>if-else</code> di Python! Bit-Mon berhasil diselamatkan dan menyerap fragmen data baru!
                </p>
              </div>

              {/* Rewards Box */}
              <div className="my-5 w-full max-w-md p-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-yellow-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-3">
                  Hadiah Quest Yang Kamu Dapatkan:
                </span>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="font-mono font-bold text-sm text-amber-300 block">+30</span>
                    <span className="text-[10px] text-slate-400">Edu-Coins</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="text-base mb-1">🟩</div>
                    <span className="font-mono font-bold text-sm text-emerald-300 block">+15 Pts</span>
                    <span className="text-[10px] text-slate-400">Logic Data</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <span className="font-mono font-bold text-sm text-purple-300 block">+50 XP</span>
                    <span className="text-[10px] text-slate-400">Guild EXP</span>
                  </div>
                </div>
              </div>

              {/* Claim Action */}
              <button
                onClick={handleClaim}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 hover:from-amber-400 hover:via-yellow-300 hover:to-cyan-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(250,204,21,0.5)] active:scale-95 transition-all cursor-pointer"
              >
                <span>🎁 Klaim Hadiah &amp; Buka Chapter 4</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
