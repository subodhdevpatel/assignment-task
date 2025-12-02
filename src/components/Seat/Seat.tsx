import React, { memo } from 'react';
import type { Seat as SeatType } from '../../types/venue';
import styles from './Seat.module.css';

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  onToggle: (seat: SeatType) => void;
  onHover: (seat: SeatType | null) => void;
  isHeatmapMode: boolean;
  heatmapColor?: string;
}

const Seat: React.FC<SeatProps> = memo(
  ({ seat, isSelected, onToggle, onHover, isHeatmapMode, heatmapColor }) => {
    const { id, x, y, status, priceTier, col } = seat;
    const radius = 10;

    const handleClick = () => {
      onToggle(seat);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(seat);
      }
    };

    const getClassName = () => {
      const base = styles.seat;
      const statusClass = styles[status] || '';
      const selectedClass = isSelected ? styles.selected : '';
      return `${base} ${statusClass} ${selectedClass}`;
    };

    const style = isHeatmapMode && heatmapColor ? { fill: heatmapColor, stroke: heatmapColor } : {};

    return (
      <circle
        cx={x}
        cy={y}
        r={radius}
        className={getClassName()}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => onHover(seat)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(seat)}
        onBlur={() => onHover(null)}
        tabIndex={status === 'available' ? 0 : -1}
        role="button"
        aria-label={`Seat ${col}, Price $${priceTier}, Status ${status}`}
        aria-pressed={isSelected}
        data-testid={`seat-${id}`}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.seat.status === nextProps.seat.status &&
      prevProps.isHeatmapMode === nextProps.isHeatmapMode
    );
  }
);

export default Seat;
