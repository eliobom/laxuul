import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useReservations } from "@/contexts/ReservationContext";
import { useReviews } from "@/contexts/ReviewContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Star, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { reservations, updateReservationStatus, deleteReservation } = useReservations();
  const { reviews, deleteReview } = useReviews();
  const [activeTab, setActiveTab] = useState("reservations");

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  // Filter reservations by status
  const pendingReservations = reservations.filter(r => r.status === "pending");
  const confirmedReservations = reservations.filter(r => r.status === "confirmed");
  const completedReservations = reservations.filter(r => r.status === "completed");
  const cancelledReservations = reservations.filter(r => r.status === "cancelled");

  // Stats
  const totalReservations = reservations.length;
  const totalRevenue = reservations
    .filter(r => r.status !== "cancelled")
    .reduce((sum, r) => sum + r.totalPrice, 0);
  const totalPendingReservations = pendingReservations.length;
  const totalReviews = reviews.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleConfirmReservation = (id: string) => {
    updateReservationStatus(id, "confirmed");
  };

  const handleCancelReservation = (id: string) => {
    updateReservationStatus(id, "cancelled");
  };

  const handleCompleteReservation = (id: string) => {
    updateReservationStatus(id, "completed");
  };

  const handleDeleteReservation = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      deleteReservation(id);
    }
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
      deleteReview(id);
    }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Panel de Administración</h1>
            <p className="text-gray-600">
              Gestiona reservas, reseñas y más desde un solo lugar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Reservas Totales</h3>
            <p className="text-3xl font-bold">{totalReservations}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Ingresos Totales</h3>
            <p className="text-3xl font-bold text-primary-700">{formatCurrency(totalRevenue)}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Reservas Pendientes</h3>
            <p className="text-3xl font-bold text-yellow-600">{totalPendingReservations}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Reseñas Totales</h3>
            <p className="text-3xl font-bold text-accent-teal-600">{totalReviews}</p>
          </div>
        </div>

        <Tabs defaultValue="reservations" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="reservations">Reservas</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reservations" className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-4">Gestión de Reservas</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fechas
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                          <tr key={reservation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {reservation.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>{reservation.customerInfo.name}</div>
                              <div className="text-xs">{reservation.customerInfo.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>{reservation.checkIn} - {reservation.checkOut}</div>
                              <div className="text-xs">
                                {reservation.guests.adults} adultos, {reservation.guests.children} niños
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(reservation.totalPrice)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                {getStatusIcon(reservation.status)}
                                <span className="ml-1">
                                  {reservation.status === "pending" && "Pendiente"}
                                  {reservation.status === "confirmed" && "Confirmada"}
                                  {reservation.status === "cancelled" && "Cancelada"}
                                  {reservation.status === "completed" && "Completada"}
                                </span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                {reservation.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 border-green-600 hover:bg-green-50"
                                      onClick={() => handleConfirmReservation(reservation.id)}
                                    >
                                      Confirmar
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={() => handleCancelReservation(reservation.id)}
                                    >
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                                {reservation.status === "confirmed" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                    onClick={() => handleCompleteReservation(reservation.id)}
                                  >
                                    Completar
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteReservation(reservation.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                            No hay reservas disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-4">Gestión de Reseñas</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Calificación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Habitación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Comentario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <tr key={review.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <div>{review.userName}</div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-accent-gold-500 text-accent-gold-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {review.roomType || "No especificada"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                              {review.comment}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            No hay reseñas disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default DashboardPage;