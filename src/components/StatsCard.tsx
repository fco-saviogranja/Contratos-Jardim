import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'default' | 'warning' | 'danger' | 'success';
}

export function StatsCard({ title, value, icon: Icon, variant }: StatsCardProps) {
  const variantStyles = {
    default: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-green-50 text-green-700 border-green-200'
  };

  const iconBgStyles = {
    default: 'bg-blue-100',
    warning: 'bg-yellow-100',
    danger: 'bg-red-100',
    success: 'bg-green-100'
  };

  return (
    <Card className={`p-6 border-2 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm opacity-80 mb-2">{title}</p>
          <p className="text-3xl">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconBgStyles[variant]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
