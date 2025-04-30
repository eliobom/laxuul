import React from "react";
import { Room } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Users, BedDouble, Wifi, Coffee } from "lucide-react";

interface RoomCardProps {
  room: Room;
  featured?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, featured = false }) => {
  const { name, type, price, capacity, description, amenities, images } = room;

  const topAmenities = amenities.slice(0, 4);

  // Show either a short or long description based on featured status
  const displayDescription = featured
    ? description
    : description.length > 120
    ? description.substring(0, 120) + "..."
    : description;

  return (
    <div 
      className={`room-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
        featured ? "lg:flex" : ""
      }`}
    >
      <div className={`relative ${featured ? "lg:w-1/2" : ""}`}>
        <img
          src={images[0]}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 right-0 bg-accent-gold-500 text-white px-4 py-1 rounded-bl-lg">
          {type}
        </div>
      </div>

      <div className={`p-6 ${featured ? "lg:w-1/2" : ""}`}>
        <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">{name}</h3>
        
        <div className="flex items-center mb-4">
          <span className="text-lg md:text-xl font-bold text-primary-700">
            {formatCurrency(price)}
          </span>
          <span className="text-gray-500 text-sm ml-1">/ noche</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>
            {capacity.adults} {capacity.adults === 1 ? "adulto" : "adultos"}
            {capacity.children > 0 && 
              `, ${capacity.children} ${capacity.children === 1 ? "niño" : "niños"}`}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{displayDescription}</p>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Amenidades destacadas:</h4>
          <div className="grid grid-cols-2 gap-2">
            {topAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                {amenity.toLowerCase().includes("wifi") ? (
                  <Wifi className="h-3 w-3 mr-1" />
                ) : amenity.toLowerCase().includes("cama") ? (
                  <BedDouble className="h-3 w-3 mr-1" />
                ) : amenity.toLowerCase().includes("café") ? (
                  <Coffee className="h-3 w-3 mr-1" />
                ) : (
                  <div className="h-1 w-1 rounded-full bg-accent-teal-500 mr-2"></div>
                )}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={`/habitaciones/${room.id}`}>
            <Button variant="outline" className="flex items-center w-full justify-center sm:w-auto">
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </Button>
          </Link>
          <Link to={`/reserva?room=${room.id}`} className="w-full sm:w-auto">
            <Button className="w-full">Reservar ahora</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;