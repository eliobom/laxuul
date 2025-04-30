import React from "react";
import { useParams, Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/ImageGallery";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, Users, CheckCircle2 } from "lucide-react";

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Habitación no encontrada</h2>
          <p className="mb-6 text-gray-600">
            La habitación que estás buscando no está disponible o no existe.
          </p>
          <Link to="/habitaciones">
            <Button>Ver todas las habitaciones</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-28">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/habitaciones" className="flex items-center text-primary-600 mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a habitaciones
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{room.name}</h1>
              
              <div className="flex items-center mb-6">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                  {room.type}
                </span>
                <div className="flex items-center text-gray-600 ml-4 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span>
                    {room.capacity.adults} {room.capacity.adults === 1 ? "adulto" : "adultos"}
                    {room.capacity.children > 0 && 
                      `, ${room.capacity.children} ${room.capacity.children === 1 ? "niño" : "niños"}`}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <ImageGallery images={room.images} alt={room.name} />
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-serif mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-serif mb-4">Amenidades</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-accent-teal-500 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32 border border-gray-100">
                <h3 className="text-2xl font-serif mb-2">Reservar</h3>
                
                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-primary-700">
                    {formatCurrency(room.price)}
                  </span>
                  <span className="text-gray-500 ml-2">/ noche</span>
                </div>

                <p className="text-gray-600 mb-6">
                  Reserva ahora para asegurar tu estancia en esta hermosa habitación. 
                  ¡Plazas limitadas!
                </p>

                <Link to={`/reserva?room=${room.id}`}>
                  <Button className="w-full" size="lg">
                    Reservar ahora
                  </Button>
                </Link>

                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-1">• Cancelación gratuita hasta 7 días antes</p>
                  <p className="mb-1">• Pago en el momento de la reserva</p>
                  <p>• Servicios adicionales disponibles</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default RoomDetailPage;