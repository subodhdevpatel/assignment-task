import React from 'react';
import { useBooking } from '../../context/BookingContext';
import styles from './Summary.module.css';

const Summary: React.FC = () => {
  const { selectedSeats, hoveredSeat, isHeatmapMode, toggleHeatmap } = useBooking();

  const total = selectedSeats.reduce((sum, seat) => sum + seat.priceTier, 0); // priceTier is the price for simplicity, or map tier to price.

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Selection</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isHeatmapMode}
            onChange={toggleHeatmap}
            style={{ marginRight: '10px' }}
          />
          Show Price Heatmap
        </label>
      </div>

      {hoveredSeat && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#e3f2fd',
            color: '#333',
            marginBottom: '20px',
            borderRadius: '4px',
          }}
        >
          <strong>Seat Details</strong>
          <br />
          Row {hoveredSeat.id.split('-')[1]}, Seat {hoveredSeat.col}
          <br />
          Price: ${hoveredSeat.priceTier}
          <br />
          Status: {hoveredSeat.status}
        </div>
      )}

      {selectedSeats.length === 0 ? (
        <p className={styles.empty}>No seats selected</p>
      ) : (
        <ul className={styles.list}>
          {selectedSeats.map((seat) => (
            <li key={seat.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <span>
                  Row {seat.id.split('-')[1]}, Seat {seat.col}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>{seat.id}</span>
              </div>
              <span className={styles.itemPrice}>${seat.priceTier}</span>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.total}>
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default Summary;
