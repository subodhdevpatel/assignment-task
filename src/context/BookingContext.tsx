import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Venue, Seat } from '../types/venue';

interface BookingContextType {
  venue: Venue | null;
  loading: boolean;
  error: string | null;
  selectedSeats: Seat[];
  toggleSeat: (seat: Seat) => void;
  hoveredSeat: Seat | null;
  setHoveredSeat: (seat: Seat | null) => void;
  isHeatmapMode: boolean;
  toggleHeatmap: () => void;
  priceRange: { min: number; max: number };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const MAX_SEATS = 8;
const STORAGE_KEY = 'booking_selection';

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [isHeatmapMode, setIsHeatmapMode] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await fetch('/venue.json');
        if (!response.ok) throw new Error('Failed to load venue data');
        const data = await response.json();
        setVenue(data);

        // Calculate price range
        let min = Infinity;
        let max = -Infinity;
        data.sections.forEach((section: any) => {
          section.rows.forEach((row: any) => {
            row.seats.forEach((seat: any) => {
              if (seat.priceTier < min) min = seat.priceTier;
              if (seat.priceTier > max) max = seat.priceTier;
            });
          });
        });
        setPriceRange({ min, max });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status !== 'available') return;

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length >= MAX_SEATS) {
          alert(`You can only select up to ${MAX_SEATS} seats.`);
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const toggleHeatmap = () => setIsHeatmapMode((prev) => !prev);

  return (
    <BookingContext.Provider
      value={{
        venue,
        loading,
        error,
        selectedSeats,
        toggleSeat,
        hoveredSeat,
        setHoveredSeat,
        isHeatmapMode,
        toggleHeatmap,
        priceRange,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
