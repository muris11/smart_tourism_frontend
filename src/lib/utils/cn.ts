import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function untuk menggabungkan className Tailwind
 * dan menyelesaikan konflik class secara otomatis
 * 
 * @param inputs - Daftar className yang akan digabung
 * @returns String className yang sudah digabung dan di-resolve konfliknya
 * 
 * @example
 * cn('px-2 py-1', 'px-4', { 'bg-red-500': isActive })
 * // Output: "py-1 px-4 bg-red-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}