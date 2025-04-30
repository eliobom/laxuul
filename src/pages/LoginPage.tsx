import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@hotellaxuli.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin dashboard
  if (user) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif mb-2">Iniciar sesión</h1>
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder al panel de administración
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hotellaxuli.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Para fines de demostración: admin123
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Iniciando sesión..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;