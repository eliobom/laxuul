import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const GalleryPage: React.FC = () => {
  // Combine images from all sources
  const hotelImages = [
    "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const roomImages = [
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const amenitiesImages = [
    "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif mb-4">Galería</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora las imágenes de nuestro hotel, habitaciones y amenidades para 
            descubrir la experiencia que te espera en Hotel Laxuli.
          </p>
        </motion.div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-serif mb-6">El Hotel</h2>
            <ImageGallery images={hotelImages} alt="Instalaciones del Hotel Laxuli" />
          </section>

          <section>
            <h2 className="text-3xl font-serif mb-6">Nuestras Habitaciones</h2>
            <ImageGallery images={roomImages} alt="Habitaciones del Hotel Laxuli" />
          </section>

          <section>
            <h2 className="text-3xl font-serif mb-6">Amenidades y Servicios</h2>
            <ImageGallery images={amenitiesImages} alt="Amenidades del Hotel Laxuli" />
          </section>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;