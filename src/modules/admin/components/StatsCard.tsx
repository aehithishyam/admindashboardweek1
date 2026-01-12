import type { StatsVariant } from '../types';

interface StatsCardProps {
  label: string;
  value: number;
  icon: string;
  variant: StatsVariant;
}

function StatsCard({ label, value, icon, variant }: StatsCardProps) {
  return (
    <article className={`stats-card ${variant}`}>
      <div className={`stats-card-icon ${variant}`}>
        {icon}
      </div>
      <div className="stats-card-content">
        <span className="stats-card-label">{label}</span>
        <span className="stats-card-value">{value}</span>
      </div>
    </article>
  );
}

export default StatsCard;
