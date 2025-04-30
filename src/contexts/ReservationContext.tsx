import React, { createContext, useContext, useState, useEffect } from "react";
import { Reservation } from "@/types";
import { generateReservationId } from "@/lib/utils";

type ReservationContextType = {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, "id" | "createdAt" | "status">) => void;
  updateReservationStatus: (id: string, status: Reservation["status"]) => void;
  getReservation: (id: string) => Reservation | undefined;
  deleteReservation: (id: string) => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

// Initial sample reservations for demo
const initialReservations: Reservation[] = [
  {
    id: "res-001",
    roomId: "room-002",
    checkIn: "2025-04-10",
    checkOut: "2025-04-15",
    guests: {
      adults: 2,
      children: 0,
    },
    customerInfo: {
      name: "Carlos Mendoza",
      email: "carlos@example.com",
      phone: "+52 555 123 4567",
    },
    totalPrice: 17500,
    status: "confirmed",
    createdAt: "2025-03-01T14:30:00Z",
  },
  {
    id: "res-002",
    roomId: "room-001",
    checkIn: "2025-04-05",
    checkOut: "2025-04-08",
    guests: {
      adults: 1,
      children: 1,
    },
    customerInfo: {
      name: "María García",
      email: "maria@example.com",
      phone: "+52 555 987 6543",
    },
    totalPrice: 5400,
    status: "pending",
    createdAt: "2025-03-15T09:15:00Z",
  },
];

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // Load reservations from localStorage or use initial data
    const storedReservations = localStorage.getItem("hotelReservations");
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    } else {
      setReservations(initialReservations);
    }
  }, []);

  // Save reservations to localStorage whenever they change
  useEffect(() => {
    if (reservations.length > 0) {
      localStorage.setItem("hotelReservations", JSON.stringify(reservations));
    }
  }, [reservations]);

  const addReservation = (reservationData: Omit<Reservation, "id" | "createdAt" | "status">) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: generateReservationId(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [...prev, newReservation]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  const getReservation = (id: string) => {
    return reservations.find((reservation) => reservation.id === id);
  };

  const deleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
  };

  const value = {
    reservations,
    addReservation,
    updateReservationStatus,
    getReservation,
    deleteReservation,
  };

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
};

export const useReservations = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservations must be used within a ReservationProvider");
  }
  return context;
};