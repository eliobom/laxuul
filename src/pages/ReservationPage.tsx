import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReservationForm from "@/components/ReservationForm";
import { rooms } from "@/data/rooms";
import { motion } from "framer-motion";

const ReservationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const [selectedRoom, setSelectedRoom] = useState(roomId ? rooms.find(r => r.id === roomId) : null);

  useEffect(() => {
    // Update the selected room if the URL parameter changes
    if (roomId) {
      const room = rooms.find(r => r.id === roomId);
      setSelectedRoom(room || null);
    } else {
      setSelectedRoom(null);
    }
  }, [roomId]);

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif mb-4">Reserva tu estancia</h1>
          {selectedRoom ? (
            <p className="text-xl text-gray-600">
              Has seleccionado la habitación: <span className="font-medium">{selectedRoom.name}</span>
            </p>
          ) : (
            <p className="text-xl text-gray-600">
              Completa el formulario para reservar tu estancia perfecta
            </p>
          )}
        </motion.div>

        <ReservationForm />
      </div>
    </main>
  );
};

export default ReservationPage;