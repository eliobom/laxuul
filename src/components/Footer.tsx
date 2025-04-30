import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif mb-4">Hotel Laxuli</h3>
            <p className="text-gray-400 text-sm">
              Un refugio de lujo frente al mar, donde cada experiencia es inolvidable y cada momento se convierte en un recuerdo eterno.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/habitaciones" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Habitaciones
                </Link>
              </li>
              <li>
                <Link to="/reserva" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Reservas
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/resenas" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Reseñas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Calle Playa Paraíso #123</li>
              <li>Riviera Maya, Quintana Roo</li>
              <li>México</li>
              <li>+52 (984) 123-4567</li>
              <li>
                <a href="mailto:contacto@hotellaxuli.com" className="hover:text-white transition-colors">
                  contacto@hotellaxuli.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2">Suscríbete al boletín</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-gray-700 text-white px-3 py-2 text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-accent-gold-500 w-full"
                />
                <button
                  type="button"
                  className="bg-accent-gold-500 hover:bg-accent-gold-600 px-3 py-2 rounded-r"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hotel Laxuli | Todos los derechos reservados
          </p>
          <div className="flex mt-4 md:mt-0 space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Términos y condiciones
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;