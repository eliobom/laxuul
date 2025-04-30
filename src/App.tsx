import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages
import HomePage from "@/pages/HomePage";
import RoomsPage from "@/pages/RoomsPage";
import RoomDetailPage from "@/pages/RoomDetailPage";
import ReservationPage from "@/pages/ReservationPage";
import GalleryPage from "@/pages/GalleryPage";
import ReviewsPage from "@/pages/ReviewsPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <ReviewProvider>
          <ToastProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/habitaciones" element={<RoomsPage />} />
                    <Route path="/habitaciones/:id" element={<RoomDetailPage />} />
                    <Route path="/reserva" element={<ReservationPage />} />
                    <Route path="/galeria" element={<GalleryPage />} />
                    <Route path="/resenas" element={<ReviewsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<DashboardPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
            <ToastViewport />
          </ToastProvider>
        </ReviewProvider>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;