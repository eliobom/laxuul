import React, { useState } from "react";
import ReviewsList from "@/components/ReviewsList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReviews } from "@/contexts/ReviewContext";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewsPage: React.FC = () => {
  const { addReview } = useReviews();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [roomType, setRoomType] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Por favor ingresa tu nombre";
    if (!comment.trim()) newErrors.comment = "Por favor ingresa tu comentario";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    addReview({
      userName: name,
      rating,
      comment,
      roomType: roomType as any || undefined,
    });
    
    // Reset form
    setName("");
    setComment("");
    setRating(5);
    setRoomType("");
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif mb-4">Reseñas de Nuestros Huéspedes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce las experiencias de quienes han disfrutado de su estancia en Hotel Laxuli
            y comparte la tuya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif mb-6">Lo que dicen nuestros huéspedes</h2>
            <ReviewsList />
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-2xl font-serif mb-6">Deja tu reseña</h2>
              
              {showSuccess ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                  <p className="font-medium">¡Gracias por tu reseña!</p>
                  <p>Tu opinión es muy importante para nosotros.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="roomType" className="block text-sm font-medium mb-1">
                      Tipo de habitación (opcional)
                    </label>
                    <select
                      id="roomType"
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Selecciona el tipo de habitación</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Calificación
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= rating
                                ? "fill-accent-gold-500 text-accent-gold-500"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium mb-1">
                      Comentario
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Comparte tu experiencia..."
                      rows={5}
                      className={`w-full rounded-md border ${
                        errors.comment ? "border-red-500" : "border-input"
                      } bg-background px-3 py-2 text-sm resize-none`}
                    />
                    {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Enviar reseña
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReviewsPage;