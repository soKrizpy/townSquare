import React, { useState } from 'react';
import { X, Users, Copy, Check, Sparkles, UserPlus } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const inviteCode = 'B2B-PYTHON-SD6-88';

  if (!isOpen) return null;

  const handleCopy = () => {
    soundFx.playCoin();
    navigator.clipboard?.writeText(inviteCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Undang Teman Kelas</h3>
              <p className="text-xs text-slate-400">Isi Slot 4 untuk Party Coding 4 Orang</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center mb-4">
          <p className="text-xs text-slate-400 mb-2">Bagikan Kode Guild ini ke teman sekelas:</p>
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-cyan-500/40 font-mono font-bold text-cyan-300 text-lg tracking-wider">
            <span>{inviteCode}</span>
          </div>

          <button
            onClick={handleCopy}
            className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Kode Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Kode Undangan Guild</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 text-center">
          💡 Tips: Saat 4 coder berkumpul, guild kalian akan mendapatkan bonus +20% Data Fragments dari setiap quest!
        </p>
      </div>
    </div>
  );
};
