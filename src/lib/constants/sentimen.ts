/** Sentimen (match OpenAPI FastAPI) */
export type Sentimen = 'positif' | 'negatif' | 'netral'

/** Daftar semua sentimen */
export const SENTIMEN_LIST: Sentimen[] = ['positif', 'negatif', 'netral']

/** Label sentimen untuk tampilan */
export const SENTIMEN_LABEL: Record<Sentimen, string> = {
    positif: 'Positif',
    negatif: 'Negatif',
    netral: 'Netral',
}

/** Warna badge untuk setiap sentimen */
export const SENTIMEN_COLOR: Record<Sentimen, string> = {
    positif: 'bg-green-100 text-green-700',
    negatif: 'bg-red-100 text-red-700',
    netral: 'bg-gray-100 text-gray-700',
}

/** Icon untuk setiap sentimen */
export const SENTIMEN_ICON: Record<Sentimen, string> = {
    positif: '😊',
    negatif: '😞',
    netral: '😐',
}