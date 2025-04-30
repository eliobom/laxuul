import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Habitaciones", path: "/habitaciones" },
    { name: "Reserva", path: "/reserva" },
    { name: "Galería", path: "/galeria" },
    { name: "Reseñas", path: "/resenas" },
  ];

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-primary-800 shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-serif">
          Hotel Laxuli
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white hover:text-accent-gold-300 transition-colors ${
                location.pathname === link.path ? "font-medium" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin"
              className="text-accent-gold-300 hover:text-accent-gold-200 transition-colors font-medium"
            >
              Panel Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-2">
                <User className="h-5 w-5" />
              </span>
              <Button
                variant="ghost"
                className="text-white hover:text-accent-gold-300"
                onClick={logout}
              >
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="gold">Iniciar sesión</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-800 absolute w-full left-0 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white hover:text-accent-gold-300 transition-colors ${
                  location.pathname === link.path ? "font-medium" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="text-accent-gold-300 hover:text-accent-gold-200 transition-colors font-medium"
              >
                Panel Admin
              </Link>
            )}

            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-white text-sm flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {user.name}
                </span>
                <Button
                  variant="ghost"
                  className="text-white hover:text-accent-gold-300 justify-start p-0 h-auto"
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="gold" className="w-full">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;