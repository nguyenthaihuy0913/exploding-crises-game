import React from 'react';
import { Card } from '../../types/game';
import { CardItem } from '../card/CardItem';
import { Eye, X } from 'lucide-react';
import { sound } from '../../utils/sound';

interface ScanModalProps {
  cards: Card[];
  onClose: () => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ cards, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-100">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                Analytical Scan • Tư duy Phân tích
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                3 Lá Bài Đầu Tiên Của Chồng Rút
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {cards.map((card, idx) => (
            <div key={card.id} className="relative flex flex-col items-center">
              <span className="text-[11px] font-mono text-sky-700 font-bold mb-1.5">
                Vị trí #{idx + 1}
              </span>
              <CardItem card={card} size="sm" showDetails={true} />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-700 transition-all cursor-pointer shadow-xs"
          >
            GHI NHỚ & ĐÓNG LẠI
          </button>
        </div>

      </div>
    </div>
  );
};
