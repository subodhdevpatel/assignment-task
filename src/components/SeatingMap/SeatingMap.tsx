import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useBooking } from '../../context/BookingContext';
import Seat from '../Seat/Seat';
import styles from './SeatingMap.module.css';

const SeatingMap: React.FC = () => {
  const {
    venue,
    loading,
    error,
    selectedSeats,
    toggleSeat,
    setHoveredSeat,
    isHeatmapMode,
    priceRange,
  } = useBooking();

  if (loading) return <div>Loading map...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>No venue data</div>;

  const { width, height } = venue.map;

  const getHeatmapColor = (price: number) => {
    if (!priceRange.max || priceRange.max === priceRange.min) return '#2196f3';
    const ratio = (price - priceRange.min) / (priceRange.max - priceRange.min);
    // Simple Green (low) to Red (high) gradient
    const hue = (1 - ratio) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div className={styles.container}>
      <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit>
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className={styles.controls}>
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>Reset</button>
            </div>
            <TransformComponent
              wrapperClass={styles.transformWrapper}
              contentClass={styles.transformContent}
            >
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className={styles.svg}
                style={{ width: '100%', height: '100%' }}
              >
                {venue.sections.map((section) => (
                  <g
                    key={section.id}
                    transform={`translate(${section.transform.x}, ${section.transform.y}) scale(${section.transform.scale})`}
                  >
                    {section.rows.map((row) => (
                      <g key={row.index}>
                        {row.seats.map((seat) => (
                          <Seat
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeats.some((s) => s.id === seat.id)}
                            onToggle={toggleSeat}
                            onHover={setHoveredSeat}
                            isHeatmapMode={isHeatmapMode}
                            heatmapColor={
                              isHeatmapMode ? getHeatmapColor(seat.priceTier) : undefined
                            }
                          />
                        ))}
                      </g>
                    ))}
                  </g>
                ))}
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default SeatingMap;
