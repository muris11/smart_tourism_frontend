/** Status data (match OpenAPI FastAPI) */
export type Status = 'aktif' | 'nonaktif' | 'draft'

/** Daftar semua status */
export const STATUS_LIST: Status[] = ['aktif', 'nonaktif', 'draft']

/** Label status untuk tampilan */
export const STATUS_LABEL: Record<Status, string> = {
    aktif: 'Aktif',
    nonaktif: 'Nonaktif',
    draft: 'Draft',
}

/** Warna badge untuk setiap status */
export const STATUS_COLOR: Record<Status, string> = {
    aktif: 'bg-green-100 text-green-700',
    nonaktif: 'bg-red-100 text-red-700',
    draft: 'bg-yellow-100 text-yellow-700',
}