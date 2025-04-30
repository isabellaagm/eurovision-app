// src/components/dashboard/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit }) => {
  return (
    <div className="card !p-5"> {/* Usando a classe .card de globals.css */}
      <h3 className="text-sm font-medium text-gray-500 truncate">{label}</h3>
      <p className="!mt-1 text-3xl font-semibold text-gray-900">
        {unit && <span className="text-xl align-baseline !pr-1">{unit}</span>}
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
