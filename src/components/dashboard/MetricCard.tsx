// src/components/dashboard/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit }) => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-white/20 via-white/10 to-transparent p-6 text-white shadow-[0_30px_70px_-35px_rgba(37,99,235,0.55)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/60">
      <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-sky-500/40 blur-3xl transition-all duration-300 group-hover:-right-10 group-hover:-top-14" />
      <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />

      <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        {label}
      </h3>
      <p className="mt-6 flex items-baseline gap-2 text-4xl font-semibold">
        {unit && <span className="text-xl font-medium text-white/70">{unit}</span>}
        <span>{value}</span>
      </p>
    </div>
  );
};

export default MetricCard;