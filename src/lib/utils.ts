import { clsx, type ClassValue } from "clsx"
import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files![0];
  const displayUrl = URL.createObjectURL(file);
  return { file, displayUrl };
}

export const convertIDR = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}
