import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReservations } from "@/contexts/ReservationContext";
import { Room } from "@/types";
import { rooms } from "@/data/rooms";
import { formatCurrency } from "@/lib/utils";
import { Toast, ToastTitle, ToastDescription } from "@/components/ui/toast";

interface ReservationFormProps {
  onSuccess?: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const { addReservation } = useReservations();
  const [roomType, setRoomType] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState<string>("2");
  const [children, setChildren] = useState<string>("0");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableRooms = rooms.filter(room => room.available);
  
  const selectedRoom: Room | undefined = roomType 
    ? availableRooms.find(room => room.id === roomType)
    : undefined;

  const calculateTotalPrice = (): number => {
    if (!selectedRoom || !checkIn || !checkOut) return 0;
    
    const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    return selectedRoom.price * days;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name) newErrors.name = "Por favor ingresa tu nombre";
    if (!email) newErrors.email = "Por favor ingresa tu correo electrónico";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Correo electrónico inválido";
    if (!phone) newErrors.phone = "Por favor ingresa tu teléfono";
    if (!roomType) newErrors.roomType = "Por favor selecciona un tipo de habitación";
    if (!checkIn) newErrors.checkIn = "Por favor selecciona la fecha de entrada";
    if (!checkOut) newErrors.checkOut = "Por favor selecciona la fecha de salida";
    if (checkIn && checkOut && checkIn >= checkOut) newErrors.dates = "La fecha de salida debe ser posterior a la fecha de entrada";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedRoom || !checkIn || !checkOut) return;
    
    const formattedCheckIn = format(checkIn, "yyyy-MM-dd");
    const formattedCheckOut = format(checkOut, "yyyy-MM-dd");
    
    addReservation({
      roomId: selectedRoom.id,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      guests: {
        adults: parseInt(adults),
        children: parseInt(children),
      },
      customerInfo: {
        name,
        email,
        phone,
      },
      totalPrice: calculateTotalPrice(),
    });
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setRoomType("");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setAdults("2");
    setChildren("0");
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
    
    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8 bg-primary-600 text-white">
        <h2 className="text-3xl font-serif mb-2">Haz tu reserva en minutos</h2>
        <p className="text-primary-100">Completa el formulario para reservar tu estancia perfecta</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nombre completo
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Teléfono
              </label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ingresa tu teléfono"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium mb-1">
                Tipo de habitación
              </label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger id="roomType" className={errors.roomType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} - {formatCurrency(room.price)}/noche
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roomType && <p className="text-red-500 text-xs mt-1">{errors.roomType}</p>}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fechas</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    value={checkIn ? format(checkIn, "dd/MM/yyyy") : ""}
                    placeholder="Fecha de entrada"
                    readOnly
                    onClick={() => setIsDatePickerOpen(true)}
                    className={errors.checkIn ? "border-red-500" : ""}
                  />
                  {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                </div>
                <div>
                  <Input
                    value={checkOut ? format(checkOut, "dd/MM/yyyy") : ""}
                    placeholder="Fecha de salida"
                    readOnly
                    onClick={() => setIsDatePickerOpen(true)}
                    className={errors.checkOut ? "border-red-500" : ""}
                  />
                  {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                </div>
              </div>
              {errors.dates && <p className="text-red-500 text-xs mt-1">{errors.dates}</p>}
              
              {isDatePickerOpen && (
                <div className="absolute z-10 bg-white p-2 border rounded-md shadow-lg mt-2">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">Selecciona tus fechas</p>
                    <button 
                      type="button" 
                      onClick={() => setIsDatePickerOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cerrar
                    </button>
                  </div>
                  <Calendar
                    mode="range"
                    selected={{
                      from: checkIn,
                      to: checkOut,
                    }}
                    onSelect={(range) => {
                      setCheckIn(range?.from);
                      setCheckOut(range?.to);
                      if (range?.to) setIsDatePickerOpen(false);
                    }}
                    initialFocus
                    disabled={{ before: new Date() }}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adults" className="block text-sm font-medium mb-1">
                  Número de adultos
                </label>
                <Select value={adults} onValueChange={setAdults}>
                  <SelectTrigger id="adults">
                    <SelectValue placeholder="Adultos" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="children" className="block text-sm font-medium mb-1">
                  Número de niños
                </label>
                <Select value={children} onValueChange={setChildren}>
                  <SelectTrigger id="children">
                    <SelectValue placeholder="Niños" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedRoom && checkIn && checkOut && (
              <div className="bg-primary-50 p-4 rounded-lg mt-4">
                <h3 className="font-medium text-primary-800">Resumen de tu reserva</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Habitación:</span> {selectedRoom.name}</p>
                  <p><span className="font-medium">Precio por noche:</span> {formatCurrency(selectedRoom.price)}</p>
                  <p><span className="font-medium">Check-in:</span> {format(checkIn, "dd/MM/yyyy")}</p>
                  <p><span className="font-medium">Check-out:</span> {format(checkOut, "dd/MM/yyyy")}</p>
                  <p className="text-lg font-medium text-primary-800 mt-2">
                    Total: {formatCurrency(calculateTotalPrice())}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8">
          <Button type="submit" className="w-full md:w-auto" size="lg">
            Confirmar reserva
          </Button>
        </div>
      </form>
      
      {showSuccessMessage && (
        <Toast className="fixed bottom-4 right-4 w-auto max-w-md" variant="success">
          <ToastTitle>¡Reserva completada!</ToastTitle>
          <ToastDescription>
            Tu reserva se ha realizado con éxito. Recibirás un correo con los detalles de tu reserva.
          </ToastDescription>
        </Toast>
      )}
    </div>
  );
};

export default ReservationForm;