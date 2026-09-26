import React, { useState } from 'react';
import { X, Sparkles, Coins, Check, Shirt, ShieldAlert, Sparkle } from 'lucide-react';
import { AvatarItem } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundFx } from '../utils/audio';

interface AvatarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  inventory: string[]; // item ids owned
  equippedHatId: string | null;
  onBuyItem: (item: AvatarItem) => boolean;
  onEquipItem: (itemId: string | null) => void;
}

export const SHOP_ITEMS: AvatarItem[] = [
  {
    id: 'topi-hacker',
    name: 'Topi Hacker Cyberpunk',
    category: 'hat',
    price: 50,
    description: 'Topi baseball cyber dengan visor HUD neon transparan dan antena pemancar sinyal kode.',
    accentColor: '#06b6d4',
    iconType: 'hacker-cap',
  },
  {
    id: 'tudung-wizard',
    name: 'Tudung Code Wizard',
    category: 'hood',
    price: 75,
    description: 'Tudung tenun mistis dengan rune biner bersinar dan kristal logika penguat fokus syntax.',
    accentColor: '#a855f7',
    iconType: 'wizard-hood',
  },
  {
    id: 'headset-cat',
    name: 'Headset Cyber Cat',
    category: 'headset',
    price: 60,
    description: 'Headset kucing dengan equalizer audio RGB responsif dan mikrofon komando regu guild.',
    accentColor: '#ec4899',
    iconType: 'cyber-cat',
  },
];

export const AvatarShopModal: React.FC<AvatarShopModalProps> = ({
  isOpen,
  onClose,
  coins,
  inventory,
  equippedHatId,
  onBuyItem,
  onEquipItem,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(equippedHatId || SHOP_ITEMS[0].id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleBuy = (item: AvatarItem) => {
    if (coins < item.price) {
      soundFx.playClick();
      showToast('⚠️ Edu-Coins kamu belum cukup! Selesaikan quest untuk dapat koin.');
      return;
    }

    const success = onBuyItem(item);
    if (success) {
      soundFx.playCoin();
      showToast(`🎉 Berhasil membeli ${item.name}! Klik 'Gunakan' untuk memakainya.`);
    }
  };

  const handleEquip = (itemId: string | null) => {
    soundFx.playEquip();
    onEquipItem(itemId);
    if (itemId) {
      const item = SHOP_ITEMS.find((i) => i.id === itemId);
      showToast(`✨ ${item?.name || 'Headgear'} berhasil dipasang ke avatarmu!`);
    } else {
      showToast('✨ Kembali ke gaya rambut bawaan.');
    }
  };

  const previewHat = selectedItemId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Shirt className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Toko Wardrobe Avatar
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Starter Pack
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih dan lengkapi headgear keren untuk karakter coding kamu!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Coins in shop */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-bold text-sm tabular-nums">{coins}</span>
              <span className="text-[10px] text-amber-400/80">Coins</span>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tutup Toko"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto">
          {/* Left Column: Live Avatar Fitting Room Preview */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 relative">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
              Kamar Pas Hologram
            </span>

            {/* Avatar display with live headgear preview */}
            <div className="my-3 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl -z-10" />
              <AvatarDisplay
                coderId="hero"
                name="Kamu"
                hatId={previewHat}
                size="xl"
                isOnline={true}
              />
            </div>

            <p className="text-sm font-bold text-white mt-1">Kamu (Hero)</p>
            <p className="text-xs text-slate-400 mb-4">Apprentice Coder</p>

            {/* Equipped status */}
            <div className="w-full text-center py-2 px-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400">Headgear Aktif: </span>
              <span className="font-semibold text-cyan-300">
                {SHOP_ITEMS.find((i) => i.id === equippedHatId)?.name || 'Tanpa Headgear (Default)'}
              </span>
            </div>

            {equippedHatId && (
              <button
                onClick={() => handleEquip(null)}
                className="mt-3 text-xs text-slate-400 hover:text-rose-400 underline underline-offset-4 transition-colors"
              >
                Lepas Headgear (Gaya Bawaan)
              </button>
            )}
          </div>

          {/* Right Column: Wardrobe Shop Catalog */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Katalog Headgear Eksklusif
              </span>
              <span className="text-xs text-slate-500">
                {inventory.length} dari {SHOP_ITEMS.length} Dimiliki
              </span>
            </div>

            {SHOP_ITEMS.map((item) => {
              const isOwned = inventory.includes(item.id);
              const isEquipped = equippedHatId === item.id;
              const isSelected = selectedItemId === item.id;
              const canAfford = coins >= item.price;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedItemId(item.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {/* Mini visual icon badge */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-2 border shrink-0"
                        style={{
                          backgroundColor: `${item.accentColor}15`,
                          borderColor: `${item.accentColor}40`,
                        }}
                      >
                        {item.iconType === 'hacker-cap' && (
                          <span className="text-2xl" role="img" aria-label="Cap">🧢</span>
                        )}
                        {item.iconType === 'wizard-hood' && (
                          <span className="text-2xl" role="img" aria-label="Hood">🧙</span>
                        )}
                        {item.iconType === 'cyber-cat' && (
                          <span className="text-2xl" role="img" aria-label="Headset">🎧</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-white">{item.name}</h3>
                          {isEquipped && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                              Dipakai
                            </span>
                          )}
                          {isOwned && !isEquipped && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Dimiliki
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Price Tag or Owned label */}
                    <div className="text-right shrink-0">
                      {!isOwned ? (
                        <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-sm">
                          <Coins className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.price}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {isSelected ? '👀 Sedang dipratinjau di cermin' : 'Klik kartu untuk pratinjau'}
                    </span>

                    <div className="flex items-center gap-2">
                      {isOwned ? (
                        isEquipped ? (
                          <button
                            disabled
                            className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 opacity-90 cursor-default"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Sedang Dipakai
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEquip(item.id);
                            }}
                            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
                          >
                            Gunakan
                          </button>
                        )
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(item);
                          }}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          }`}
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>Beli {item.price} Koin</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toast alert banner */}
        {toastMessage && (
          <div className="px-6 py-2.5 bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-t border-cyan-500/40 text-center text-xs font-semibold text-cyan-200 animate-in fade-in slide-in-from-bottom-2">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
