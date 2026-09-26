import React, { useState } from 'react';
import { Sparkles, Zap, Heart, Award, ArrowUpRight, Flame, Database, CheckCircle2, RotateCcw, Edit2, Check } from 'lucide-react';
import { PetData, FeedDataType } from '../types/game';
import { soundFx } from '../utils/audio';

// Path to high-fidelity generated assets
const CYBER_EGG_ASSET = '/src/assets/images/cyber_pet_egg_mascot_1790389296653.jpg';
const BABY_PET_ASSET = '/src/assets/images/cyber_byte_pup_baby_1790397557869.jpg';

interface PetSanctuaryProps {
  pet: PetData;
  onFeedPet: (type: FeedDataType) => void;
  onRenamePet: (newName: string) => void;
}

export const PetSanctuary: React.FC<PetSanctuaryProps> = ({
  pet,
  onFeedPet,
  onRenamePet,
}) => {
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; text: string; x: number }[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(pet.name);
  const [imageError, setImageError] = useState(false);

  const isHatched = pet.stage === 'BABY_DIGIMON';
  const isReadyToHatch = pet.hatchProgress >= 100 && !isHatched;

  const triggerEggWobble = (customText?: string) => {
    if (isHatched) {
      soundFx.playLevelUp();
    } else {
      soundFx.playEggWobble();
    }
    setIsWobbling(true);

    const newSparkle = {
      id: Date.now(),
      text: customText || (isHatched ? '🐾 Woof! +1 Kasih Sayang!' : '❤️ +1 Love!'),
      x: Math.floor(Math.random() * 60) - 30,
    };
    setSparkles((prev) => [...prev, newSparkle]);

    setTimeout(() => {
      setIsWobbling(false);
    }, 600);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1200);
  };

  const handleFeed = (type: FeedDataType) => {
    soundFx.playFeed();
    onFeedPet(type);
    setIsFeedModalOpen(false);

    const labels: Record<FeedDataType, string> = {
      logic: '🟩 +15 Logic Data!',
      creative: '🟨 +15 Creative Data!',
      spatial: '🟦 +15 Spatial Data!',
    };

    triggerEggWobble(labels[type]);

    if (pet.hatchProgress + 15 >= 100 && !isHatched) {
      setTimeout(() => {
        soundFx.playLevelUp();
      }, 500);
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onRenamePet(nameInput.trim());
      setIsEditingName(false);
      soundFx.playCoin();
    }
  };

  return (
    <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-md border border-purple-500/30 p-5 sm:p-6 overflow-hidden shadow-[0_0_35px_rgba(168,85,247,0.15)] flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Cyber-Pet Sanctuary
            </h2>
            <p className="text-[11px] text-slate-400">
              {isHatched ? 'Kompanion Virtual Digimon Aktif' : 'Inkubator Virtual Digimon Pendamping Coding'}
            </p>
          </div>
        </div>

        {/* Stage Badge */}
        <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
          isHatched
            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
            : isReadyToHatch
            ? 'bg-amber-950 text-amber-300 border-amber-500/50 animate-pulse'
            : 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
        }`}>
          STAGE: {isHatched ? 'BABY DIGIMON 🐾' : isReadyToHatch ? 'READY TO HATCH' : pet.stage}
        </span>
      </div>

      {/* Visual Centerpiece: Pulsing Egg or Hatched Baby Digimon */}
      <div className="relative z-10 my-4 flex flex-col items-center">
        {/* Sparkle animations when clicked or fed */}
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            style={{ transform: `translateX(${sp.x}px)` }}
            className="absolute top-8 z-30 pointer-events-none animate-feed-sparkle text-xs font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] bg-slate-900/90 px-2.5 py-1 rounded-full border border-cyan-400"
          >
            {sp.text}
          </div>
        ))}

        {/* Pet Name & Rename */}
        <div className="flex items-center gap-2 mb-2">
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={16}
                className="px-2 py-0.5 rounded-lg bg-slate-800 border border-cyan-400 text-xs font-bold text-white focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 rounded bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <>
              <span className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-1.5">
                "{pet.name}"
              </span>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-slate-500 hover:text-cyan-400 transition-colors p-1"
                title="Ubah Nama Pet"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </>
          )}
        </div>

        {/* Pet Container with Holographic Pedestal */}
        <div
          onClick={() => triggerEggWobble()}
          className={`relative group cursor-pointer w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center select-none ${
            isWobbling ? 'animate-egg-wobble' : 'animate-egg-pulse'
          }`}
          title={isHatched ? 'Ketuk untuk membelai Cyber-Byte Pup!' : 'Klik telur untuk membelai & cek reaksi!'}
        >
          {/* Hologram energy rings around pet */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin opacity-40 [animation-duration:12s]" />
          <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-spin opacity-40 [animation-duration:8s] [animation-direction:reverse]" />
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl -z-10 group-hover:opacity-100 transition-opacity" />

          {/* Center Mascot Illustration */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-300 bg-slate-950">
            {!imageError ? (
              <img
                src={isHatched ? BABY_PET_ASSET : CYBER_EGG_ASSET}
                alt={isHatched ? 'Cyber-Byte Pup' : `Cyber-Egg ${pet.name}`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              /* High-fidelity SVG Fallback */
              <div className="w-full h-full bg-gradient-to-b from-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4">
                <span className="text-5xl">{isHatched ? '🐶' : '🥚'}</span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 mt-1">
                  {isHatched ? 'Cyber-Byte Pup' : 'Bit-Mon Egg'}
                </span>
              </div>
            )}

            {/* Glowing cyber scanline sweep */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent h-1/2 w-full animate-bounce opacity-70 pointer-events-none" />
          </div>

          {/* Floating pet heart on hover */}
          <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-slate-900/90 border border-pink-500/50 text-pink-400 shadow-md group-hover:scale-110 transition-transform">
            <Heart className="w-3.5 h-3.5 fill-pink-500" />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-1 italic">
          {isHatched 
            ? '🐾 Cyber-Byte Pup sangat senang dielus olehmu!' 
            : '💡 Klik atau sentuh telur untuk mengalirkan energi sentuhan!'}
        </p>
      </div>

      {/* Hatch / Bond Progress Bar */}
      <div className="relative z-10 my-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {isHatched ? 'Energi Ikatan (Bond Level)' : 'Kemajuan Menetas (Hatch Progress)'}
          </span>
          <span className="font-mono text-xs font-bold text-cyan-300">
            {pet.hatchProgress} / 100 Pts
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHatched
                ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400'
                : isReadyToHatch
                ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-yellow-400 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
            }`}
            style={{ width: `${Math.min(100, pet.hatchProgress)}%` }}
          />
        </div>

        {/* Ready to hatch alert */}
        {isReadyToHatch && !isHatched && (
          <div className="mt-2.5 p-2 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-400/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>🎉 Telur siap menetas di misi berikutnya!</span>
          </div>
        )}

        {isHatched && (
          <div className="mt-2.5 p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>✨ Kompanion Setia Aktif: Cyber-Byte Pup</span>
          </div>
        )}
      </div>

      {/* Data Feed Breakdown Meters */}
      <div className="relative z-10 grid grid-cols-3 gap-2 my-2">
        {/* Logic Data */}
        <div className="p-2 rounded-xl bg-slate-950/60 border border-emerald-500/30 text-center">
          <span className="text-[10px] font-semibold text-emerald-400 block truncate">
            🟩 Logic Data
          </span>
          <span className="font-mono font-bold text-xs sm:text-sm text-emerald-300">
            {pet.logicData} pts
          </span>
          <span className="text-[9px] text-slate-500 block truncate">Python / C++</span>
        </div>

        {/* Creative Data */}
        <div className="p-2 rounded-xl bg-slate-950/60 border border-yellow-500/30 text-center">
          <span className="text-[10px] font-semibold text-yellow-400 block truncate">
            🟨 Creative
          </span>
          <span className="font-mono font-bold text-xs sm:text-sm text-yellow-300">
            {pet.creativeData} pts
          </span>
          <span className="text-[9px] text-slate-500 block truncate">Scratch / Web</span>
        </div>

        {/* Spatial Data */}
        <div className="p-2 rounded-xl bg-slate-950/60 border border-blue-500/30 text-center">
          <span className="text-[10px] font-semibold text-blue-400 block truncate">
            🟦 Spatial
          </span>
          <span className="font-mono font-bold text-xs sm:text-sm text-blue-300">
            {pet.spatialData} pts
          </span>
          <span className="text-[9px] text-slate-500 block truncate">3D / Blender</span>
        </div>
      </div>

      {/* Interactive Action: Beri Pakan Data Button */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800">
        <button
          onClick={() => {
            soundFx.playClick();
            setIsFeedModalOpen(true);
          }}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-base" role="img" aria-label="Apple">🍎</span>
          <span>{isHatched ? 'Beri Makan Cyber-Byte Pup (+15 Pts)' : 'Beri Pakan Data (+15 Pts)'}</span>
          <Sparkles className="w-4 h-4 text-emerald-950" />
        </button>
      </div>

      {/* Feeding Selector Drawer / Modal */}
      {isFeedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)] p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <span>🍎</span>
                Pilih Fragment Pakan Data
              </h3>
              <button
                onClick={() => setIsFeedModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Pilih tipe data yang ingin disuapkan ke <strong>{pet.name}</strong>:
            </p>

            <div className="space-y-2.5">
              {/* Option 1: Logic Fragment */}
              <button
                onClick={() => handleFeed('logic')}
                className="w-full p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-left flex items-center justify-between transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟩</span>
                    <span className="font-bold text-xs sm:text-sm text-emerald-300">
                      Fragment Logika
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-6">
                    Data algoritma Python &amp; pemecahan masalah (+15 Pts)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                  +15 Logic
                </span>
              </button>

              {/* Option 2: Creative Fragment */}
              <button
                onClick={() => handleFeed('creative')}
                className="w-full p-3 rounded-2xl bg-yellow-950/40 hover:bg-yellow-900/60 border border-yellow-500/40 text-left flex items-center justify-between transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟨</span>
                    <span className="font-bold text-xs sm:text-sm text-yellow-300">
                      Fragment Kreatif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-6">
                    Data animasi Scratch &amp; desain UI visual (+15 Pts)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-yellow-400 shrink-0">
                  +15 Creative
                </span>
              </button>

              {/* Option 3: Spatial Fragment */}
              <button
                onClick={() => handleFeed('spatial')}
                className="w-full p-3 rounded-2xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-left flex items-center justify-between transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟦</span>
                    <span className="font-bold text-xs sm:text-sm text-blue-300">
                      Fragment Spasial
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-6">
                    Data geometri 3D Blender &amp; koordinat sumbu (+15 Pts)
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 shrink-0">
                  +15 Spatial
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
