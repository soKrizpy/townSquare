import React from 'react';

interface AvatarDisplayProps {
  coderId: string;
  name: string;
  hatId?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  coderId,
  name,
  hatId,
  size = 'md',
  isOnline = true,
  className = '',
}) => {
  // Dimensions
  const sizeMap = {
    sm: { container: 'w-12 h-12', svgSize: 48 },
    md: { container: 'w-20 h-20', svgSize: 80 },
    lg: { container: 'w-28 h-28', svgSize: 112 },
    xl: { container: 'w-36 h-36', svgSize: 144 },
  };

  const { container } = sizeMap[size];

  // Specific skin, hair, and clothing palette per character
  const isHero = coderId === 'hero';
  const isRian = coderId === 'rian';
  const isSiti = coderId === 'siti';

  const skinColor = isHero ? '#FBD38D' : isRian ? '#ECC94B' : '#ED8936';
  const hairColor = isHero ? '#06B6D4' : isRian ? '#3B82F6' : '#EC4899';
  const shirtColor = isHero ? '#1E293B' : isRian ? '#0F172A' : '#312E81';

  return (
    <div className={`relative ${container} flex items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow pod */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          isOnline 
            ? isHero 
              ? 'bg-cyan-500/10 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
              : 'bg-indigo-500/10 border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
            : 'bg-slate-800/40 border border-slate-700/50'
        }`}
      />

      {/* SVG Avatar Sprite */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1 relative z-10 overflow-visible"
        aria-label={`Avatar dari ${name}`}
      >
        <defs>
          {/* Cyberpunk visor gradient */}
          <linearGradient id="cyberVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Wizard hood gradient */}
          <linearGradient id="wizardHoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          {/* Cat headset gradient */}
          <linearGradient id="catHeadsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* --- BODY & CLOTHING --- */}
        <path
          d="M26 88 C26 70, 36 66, 50 66 C64 66, 74 70, 74 88 Z"
          fill={shirtColor}
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        {/* Collar / Tech cyber badge */}
        <polygon
          points="46,67 54,67 50,75"
          fill="#38bdf8"
        />
        {/* Shirt lines */}
        <line x1="38" y1="72" x2="38" y2="88" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2" />
        <line x1="62" y1="72" x2="62" y2="88" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* --- HEAD & NECK --- */}
        <rect x="44" y="58" width="12" height="10" rx="3" fill={skinColor} />
        
        {/* Face */}
        <ellipse cx="50" cy="46" rx="20" ry="18" fill={skinColor} stroke="#0f172a" strokeWidth="2" />
        
        {/* Ears */}
        <circle cx="29" cy="46" r="4.5" fill={skinColor} stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="71" cy="46" r="4.5" fill={skinColor} stroke="#0f172a" strokeWidth="1.5" />

        {/* Eyes (if not covered by Cyber Visor) */}
        {hatId !== 'topi-hacker' && (
          <g>
            {/* Left Eye */}
            <circle cx="43" cy="45" r="3.5" fill="#0f172a" />
            <circle cx="44.2" cy="43.8" r="1.2" fill="#ffffff" />
            {/* Right Eye */}
            <circle cx="57" cy="45" r="3.5" fill="#0f172a" />
            <circle cx="58.2" cy="43.8" r="1.2" fill="#ffffff" />
            {/* Cheeks */}
            <circle cx="39" cy="51" r="2.5" fill="#f43f5e" opacity="0.35" />
            <circle cx="61" cy="51" r="2.5" fill="#f43f5e" opacity="0.35" />
          </g>
        )}

        {/* Smile */}
        <path d="M46 53 Q50 57 54 53" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

        {/* --- DEFAULT BASE HAIR (Rendered if not covered by deep hood) --- */}
        {hatId !== 'tudung-wizard' && (
          <g>
            {/* Hair bangs */}
            <path
              d="M29 42 C29 25, 40 22, 50 22 C62 22, 71 26, 71 42 C67 36, 61 36, 56 38 C51 35, 45 36, 40 40 C36 36, 32 37, 29 42 Z"
              fill={hairColor}
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Anime hair spikes */}
            <polygon points="34,26 38,18 43,24" fill={hairColor} />
            <polygon points="46,23 52,16 57,24" fill={hairColor} />
            <polygon points="58,24 64,19 66,28" fill={hairColor} />
          </g>
        )}

        {/* ========================================================= */}
        {/* --- HEADGEAR OVERLAYS --- */}
        {/* ========================================================= */}

        {/* 1. TOPI HACKER CYBERPUNK (hatId === 'topi-hacker') */}
        {hatId === 'topi-hacker' && (
          <g className="filter drop-shadow-[0_2px_4px_rgba(6,182,212,0.4)]">
            {/* Cap Crown */}
            <path
              d="M30 34 C30 20, 40 16, 50 16 C60 16, 70 20, 70 34 Z"
              fill="#0f172a"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            {/* Cap Brim */}
            <path
              d="M26 34 Q50 30 74 34 Q76 37 72 38 Q50 33 28 38 Z"
              fill="#1e293b"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            {/* Circuit pattern on cap */}
            <path
              d="M40 22 L45 22 L48 26 L56 26"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <circle cx="56" cy="26" r="1.5" fill="#22d3ee" />

            {/* Glowing Cyber Antenna with blinking LED */}
            <line x1="64" y1="20" x2="72" y2="10" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
            <circle cx="73" cy="9" r="2.5" fill="#22d3ee" className="animate-ping" opacity="0.8" />
            <circle cx="73" cy="9" r="2" fill="#67e8f9" />

            {/* Neon Cyber Visor over eyes */}
            <rect
              x="34"
              y="40"
              width="32"
              height="11"
              rx="3"
              fill="url(#cyberVisorGrad)"
              opacity="0.95"
              stroke="#67e8f9"
              strokeWidth="1.5"
            />
            {/* Data line inside visor */}
            <line x1="38" y1="45" x2="62" y2="45" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3,2" />
          </g>
        )}

        {/* 2. TUDUNG CODE WIZARD (hatId === 'tudung-wizard') */}
        {hatId === 'tudung-wizard' && (
          <g className="filter drop-shadow-[0_2px_6px_rgba(168,85,247,0.5)]">
            {/* Hood Base covering head and shoulders */}
            <path
              d="M23 48 C20 30, 32 12, 50 10 C68 12, 80 30, 77 48 C75 56, 73 66, 76 74 C68 71, 60 70, 50 70 C40 70, 32 71, 24 74 C27 66, 25 56, 23 48 Z"
              fill="url(#wizardHoodGrad)"
              stroke="#c084fc"
              strokeWidth="2"
            />
            {/* Hood inner shadow & face opening */}
            <path
              d="M31 36 C31 24, 40 22, 50 22 C60 22, 69 24, 69 36 C69 48, 65 58, 50 58 C35 58, 31 48, 31 36 Z"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            />
            {/* Golden Wizard Gem on forehead */}
            <polygon
              points="50,14 54,20 50,26 46,20"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <circle cx="50" cy="20" r="1.5" fill="#fef08a" />
            {/* Neon binary runes on hood rim */}
            <text x="27" y="58" fill="#e9d5ff" fontSize="5" fontFamily="monospace">01</text>
            <text x="67" y="58" fill="#e9d5ff" fontSize="5" fontFamily="monospace">10</text>
          </g>
        )}

        {/* 3. HEADSET CYBER CAT (hatId === 'headset-cat') */}
        {hatId === 'headset-cat' && (
          <g className="filter drop-shadow-[0_2px_5px_rgba(236,72,153,0.5)]">
            {/* Headset Arc Band */}
            <path
              d="M26 44 C26 22, 74 22, 74 44"
              fill="none"
              stroke="#1e293b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Glowing neon wire on band */}
            <path
              d="M30 42 C30 24, 70 24, 70 42"
              fill="none"
              stroke="#ec4899"
              strokeWidth="1.5"
            />
            
            {/* Left Cat Ear */}
            <polygon
              points="30,24 23,8 39,16"
              fill="url(#catHeadsetGrad)"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />
            <polygon
              points="29,21 25,12 35,17"
              fill="#ffe4e6"
            />

            {/* Right Cat Ear */}
            <polygon
              points="70,24 77,8 61,16"
              fill="url(#catHeadsetGrad)"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />
            <polygon
              points="71,21 75,12 65,17"
              fill="#ffe4e6"
            />

            {/* Left Ear Cushion */}
            <rect x="23" y="38" width="6" height="14" rx="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            {/* Right Ear Cushion */}
            <rect x="71" y="38" width="6" height="14" rx="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />

            {/* Mini Microphone boom */}
            <path d="M72 48 Q68 56 60 56" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="58" cy="56" r="2.5" fill="#22d3ee" />
          </g>
        )}
      </svg>

      {/* Online indicator dot */}
      <div 
        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 z-20 ${
          isOnline ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'
        }`}
        title={isOnline ? 'Online' : 'Offline'}
      />
    </div>
  );
};
