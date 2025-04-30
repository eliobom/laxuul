import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/RoomCard";
import ReviewsList from "@/components/ReviewsList";
import { rooms } from "@/data/rooms";
import { Star, Calendar, MapPin, Compass } from "lucide-react";

const HomePage: React.FC = () => {
  // Get top featured rooms (limit to 3)
  const featuredRooms = rooms.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen bg-hero-pattern bg-cover bg-center relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="container mx-auto px-4 relative z-10 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Descubre el paraíso en Hotel Laxuli
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Una experiencia única frente al mar con lujo, confort y atención excepcional. 
              Escápate a nuestro rincón del paraíso y crea recuerdos inolvidables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reserva">
                <Button variant="gold" size="xl" className="font-medium">
                  Reserva ahora
                </Button>
              </Link>
              <Link to="/habitaciones">
                <Button variant="outline" size="xl" className="text-white border-white hover:bg-white/10">
                  Ver habitaciones
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Una experiencia incomparable
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestro hotel ofrece el equilibrio perfecto entre lujo y naturaleza, con servicios excepcionales y atención personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Ubicación privilegiada</h3>
              <p className="text-gray-600">
                Situado en una playa privada con vistas espectaculares al mar Caribe.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Servicio 5 estrellas</h3>
              <p className="text-gray-600">
                Atención personalizada y servicios exclusivos para una estancia inolvidable.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Experiencias únicas</h3>
              <p className="text-gray-600">
                Actividades exclusivas y tours personalizados para explorar la región.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-md text-center"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Reserva flexible</h3>
              <p className="text-gray-600">
                Políticas de cancelación flexibles y opciones de reserva adaptadas a tus necesidades.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rooms Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Nuestras habitaciones
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestras elegantes habitaciones y suites, diseñadas para ofrecerte el máximo confort y una experiencia inolvidable.
            </p>
          </div>

          <div className="space-y-8">
            {featuredRooms.map((room) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <RoomCard room={room} featured />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/habitaciones">
              <Button variant="outline" size="lg">
                Ver todas las habitaciones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-beach-pattern bg-cover bg-center relative">
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Haz tu reserva hoy mismo
            </h2>
            <p className="text-white/90 mb-8">
              Asegura tu estancia en nuestro exclusivo hotel y disfruta de una experiencia inolvidable en el paraíso.
            </p>
            <Link to="/reserva">
              <Button variant="gold" size="lg">
                Reservar ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Lo que dicen nuestros huéspedes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre las experiencias de quienes han disfrutado de su estancia en Hotel Laxuli.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ReviewsList limit={3} />
          </div>

          <div className="mt-12 text-center">
            <Link to="/resenas">
              <Button variant="outline" size="lg">
                Ver todas las reseñas
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;