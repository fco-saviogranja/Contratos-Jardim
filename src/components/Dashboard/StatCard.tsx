import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  badge?: string;
  description: string;
  onClick?: () => void;
}

export function StatCard({ title, value, badge, description, onClick }: StatCardProps) {
  return (
    <div 
      className={`bg-white rounded-lg p-4 flex-1 min-w-[280px] ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="mb-3">
        <span className="text-gray-600 text-sm">
          {title}
        </span>
      </div>
      
      <div className="relative mb-3">
        <span className="text-[#102a43] text-3xl font-medium">
          {value}
        </span>
        {badge && (
          <span className="absolute left-8 top-2 bg-[#f0f4f8] rounded-full px-2 py-0.5 text-gray-600 text-xs">
            {badge}
          </span>
        )}
      </div>
      
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}
