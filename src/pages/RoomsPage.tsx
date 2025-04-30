import React, { useState } from "react";
import RoomCard from "@/components/RoomCard";
import { rooms } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { RoomType } from "@/types";
import { motion } from "framer-motion";

const RoomsPage: React.FC = () => {
  const [filter, setFilter] = useState<RoomType | "all">("all");
  
  const roomTypes: RoomType[] = ["Standard", "Deluxe", "Suite", "Villa"];
  
  const filteredRooms = filter === "all" 
    ? rooms 
    : rooms.filter(room => room.type === filter);

  return (
    <main>
      <section className="pt-32 pb-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Nuestras Habitaciones</h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Descubre nuestras elegantes habitaciones y suites, diseñadas para brindarte 
              el máximo confort durante tu estancia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="min-w-24"
            >
              Todas
            </Button>
            
            {roomTypes.map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                onClick={() => setFilter(type)}
                className="min-w-24"
              >
                {type}
              </Button>
            ))}
          </div>

          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredRooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                No hay habitaciones disponibles con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default RoomsPage;