/**
 * Menghitung jarak antara dua titik koordinat (latitude, longitude)
 * menggunakan rumus Haversine
 * 
 * @param lat1 - Latitude titik pertama (dalam derajat)
 * @param lon1 - Longitude titik pertama (dalam derajat)
 * @param lat2 - Latitude titik kedua (dalam derajat)
 * @param lon2 - Longitude titik kedua (dalam derajat)
 * @returns Jarak dalam kilometer (km)
 * 
 * @example
 * haversine(-6.7063, 108.557, -6.3277, 108.3246) // ~50 km
 */
export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = 6371 // Radius bumi dalam kilometer
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}