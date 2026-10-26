import React from 'react';
import { Card } from '../../types/game';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Eye, 
  Shuffle, 
  Ban, 
  Users, 
  FastForward, 
  Layers, 
  Lightbulb, 
  HelpCircle 
} from 'lucide-react';

interface CardItemProps {
  card: Card;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  onClick,
  isSelected = false,
  disabled = false,
  size = 'md',
  showDetails = true,
}) => {
  // Get professional Lucide icon by card name or type
  const getCardIcon = () => {
    if (card.type === 'crisis') return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    if (card.name.includes('Backup Plan')) return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    if (card.name.includes('Resilience')) return <ShieldCheck className="w-4 h-4 text-teal-600" />;
    if (card.name.includes('Analytical')) return <Eye className="w-4 h-4 text-sky-600" />;
    if (card.name.includes('Creative')) return <Shuffle className="w-4 h-4 text-purple-600" />;
    if (card.name.includes('Critical') || card.name.includes('NOPE')) return <Ban className="w-4 h-4 text-amber-600" />;
    if (card.name.includes('Stakeholder')) return <Users className="w-4 h-4 text-indigo-600" />;
    if (card.name.includes('Skip')) return <FastForward className="w-4 h-4 text-slate-600" />;
    if (card.name.includes('Double')) return <Layers className="w-4 h-4 text-orange-600" />;
    if (card.name.includes('Brainstorm')) return <Lightbulb className="w-4 h-4 text-cyan-600" />;
    return <HelpCircle className="w-4 h-4 text-slate-500" />;
  };

  // Color schemes for Clean Light Theme
  const getColorScheme = () => {
    switch (card.type) {
      case 'crisis':
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-rose-500 ring-2 ring-rose-200' : 'border-rose-200 hover:border-rose-300',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          iconBg: 'bg-rose-50 border-rose-200',
          topAccent: 'bg-rose-500',
        };
      case 'defense':
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-200 hover:border-emerald-300',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-50 border-emerald-200',
          topAccent: 'bg-emerald-500',
        };
      case 'skill':
      default:
        if (card.category === 'analytical') {
          return {
            bg: 'bg-white',
            border: isSelected ? 'border-sky-500 ring-2 ring-sky-200' : 'border-sky-200 hover:border-sky-300',
            badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
            iconBg: 'bg-sky-50 border-sky-200',
            topAccent: 'bg-sky-500',
          };
        }
        if (card.category === 'creative') {
          return {
            bg: 'bg-white',
            border: isSelected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-purple-200 hover:border-purple-300',
            badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
            iconBg: 'bg-purple-50 border-purple-200',
            topAccent: 'bg-purple-500',
          };
        }
        if (card.category === 'critical') {
          return {
            bg: 'bg-white',
            border: isSelected ? 'border-amber-500 ring-2 ring-amber-200' : 'border-amber-200 hover:border-amber-300',
            badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
            iconBg: 'bg-amber-50 border-amber-200',
            topAccent: 'bg-amber-500',
          };
        }
        if (card.category === 'stakeholder') {
          return {
            bg: 'bg-white',
            border: isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-indigo-200 hover:border-indigo-300',
            badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            iconBg: 'bg-indigo-50 border-indigo-200',
            topAccent: 'bg-indigo-500',
          };
        }
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-slate-500 ring-2 ring-slate-200' : 'border-slate-200 hover:border-slate-300',
          badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
          iconBg: 'bg-slate-100 border-slate-200',
          topAccent: 'bg-slate-500',
        };
    }
  };

  const scheme = getColorScheme();

  // Size styling
  const sizeClasses = {
    sm: 'w-40 h-56 p-3 text-xs',
    md: 'w-52 h-72 p-4 text-sm',
    lg: 'w-64 h-88 p-5 text-base',
  };

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`relative rounded-xl border transition-all duration-200 select-none flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
        scheme.bg
      } ${scheme.border} ${sizeClasses[size]} ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer card-hover-effect'
      } ${isSelected ? '-translate-y-2 shadow-lg border-sky-500' : ''}`}
    >
      {/* Top Accent Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${scheme.topAccent}`} />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${scheme.badgeBg}`}>
            {card.badge}
          </span>
          <div className={`p-1 rounded-lg border ${scheme.iconBg}`}>
            {getCardIcon()}
          </div>
        </div>

        {/* Card Title */}
        <h3 className="font-bold text-slate-900 tracking-tight leading-tight line-clamp-2 mt-1">
          {card.name}
        </h3>
      </div>

      {/* Card Body */}
      {showDetails && (
        <div className="my-auto py-2">
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
            {card.description}
          </p>
        </div>
      )}

      {/* Card Footer: Theory Reference */}
      <div className="pt-2 border-t border-slate-100 mt-auto">
        <p className="text-[10px] font-mono text-slate-500 line-clamp-1 italic">
          📘 {card.theoryRef}
        </p>
      </div>
    </div>
  );
};
