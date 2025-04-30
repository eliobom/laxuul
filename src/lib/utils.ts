import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberTimeFormat('es-ES', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(amount);
}

export function generateReservationId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}