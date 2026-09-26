import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Award, HelpCircle, ChevronRight, 
  Terminal, ShieldCheck, ArrowRight, RotateCcw, Flame
} from 'lucide-react';
import { QuizQuestion } from '../types/game';
import { soundFx } from '../utils/audio';

interface HomeworkQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizComplete: () => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Perintah apa yang digunakan untuk membuat percabangan kondisi (decision-making) di Python?',
    options: ['A. if', 'B. def', 'C. print', 'D. while_true'],
    correctIndex: 0,
    explanation: "Tepat! Perintah 'if' (JIKA) adalah perintah standar di Python untuk memeriksa apakah suatu kondisi benar atau salah.",
  },
  {
    id: 2,
    question: 'Simbol apa yang digunakan untuk memeriksa apakah dua nilai bernilai SAMA PERSIS di Python?',
    codeSnippet: 'if kunci_pintu [___] 10:\n    print("Pintu Cyber Terbuka!")',
    options: ['A. = (Satu sama dengan)', 'B. == (Dua sama dengan)', 'C. != (Tanda seru sama dengan)', 'D. => (Panah kanan)'],
    correctIndex: 1,
    explanation: "Benar sekali! Simbol '==' (dua kali tanda sama dengan) adalah operator pembanding untuk kesamaan nilai.",
  },
  {
    id: 3,
    question: 'Jika baris kode berikut dijalankan, apa yang tercetak di terminal?',
    codeSnippet: 'nilai = 90\nif nilai >= 75:\n    print("Lulus Koding")\nelse:\n    print("Coba Lagi")',
    options: ['A. Lulus Koding', 'B. Coba Lagi', 'C. Tidak ada output', 'D. SyntaxError'],
    correctIndex: 0,
    explanation: 'Hebat! Karena nilai 90 lebih besar atau sama dengan 75 (True), maka blok if yang dieksekusi menghasilkan "Lulus Koding"!',
  },
];

export const HomeworkQuizModal: React.FC<HomeworkQuizModalProps> = ({
  isOpen,
  onClose,
  onQuizComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerChecked) return;
    soundFx.playClick();
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQ.correctIndex;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      soundFx.playLevelUp();
    } else {
      soundFx.playClick();
    }
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Quiz complete!
      setIsFinished(true);
    }
  };

  const handleTriggerFinish = () => {
    soundFx.playLevelUp();
    onQuizComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  PR HARI INI
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Pertanyaan {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
                Kuis Uji Logika If-Else &amp; Percabangan
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Body */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + (isAnswerChecked && isCorrect ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Code Snippet Box if available */}
              {currentQ.codeSnippet && (
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 leading-relaxed mb-4 overflow-x-auto shadow-inner">
                  <pre><code>{currentQ.codeSnippet}</code></pre>
                </div>
              )}

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 my-4">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isThisCorrect = idx === currentQ.correctIndex;

                  let optionStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-cyan-400 hover:bg-slate-900';

                  if (isSelected && !isAnswerChecked) {
                    optionStyle = 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]';
                  } else if (isAnswerChecked) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'bg-slate-950/40 border-slate-800/60 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full p-3.5 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerChecked && isThisCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {isAnswerChecked && (
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed my-3 animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                }`}>
                  <p className="font-bold mb-1">
                    {isCorrect ? '🎉 Jawaban Benar!' : '⚠️ Kurang Tepat! Coba pahami konsepnya:'}
                  </p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Hadiah PR: +25 Logic Data untuk Menetaskan Pet!
                </span>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                      selectedOption !== null
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Kirim Jawaban
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Kuis' : 'Lanjut Soal Berikutnya'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsAnswerChecked(false);
                      setSelectedOption(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Coba Lagi Soal Ini</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* QUIZ COMPLETED CELEBRATION! */
            <div className="flex flex-col items-center text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-400 via-emerald-400 to-yellow-400 p-1 flex items-center justify-center shadow-[0_0_35px_rgba(52,211,153,0.5)] animate-bounce mb-3">
                <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
                  <Award className="w-10 h-10 text-emerald-400" />
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                NILAI SEMPURNA 100/100
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Selamat! PR Kuis Berhasil Dikuasai!
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                Kamu telah menuntaskan seluruh tantangan if-else! Energi data ini akan mengalir langsung ke telur pet <strong>Bit-Mon</strong> dan memicu proses penetasan!
              </p>

              <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 w-full max-w-sm flex items-center justify-around text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">FRAGMEN DATA</span>
                  <span className="font-mono font-bold text-sm text-emerald-300">+25 Logic Pts</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">STATUS TELUR</span>
                  <span className="font-mono font-bold text-sm text-cyan-300">100% (SIAP MENETAS!)</span>
                </div>
              </div>

              <button
                onClick={handleTriggerFinish}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 hover:from-emerald-300 hover:to-purple-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(52,211,153,0.5)] active:scale-95 transition-all cursor-pointer animate-pulse"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>🥚 KETUK UNTUK MEMICU PENETASAN PET! ⚡</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
