const CACHE_PREFIX = 'citra:public-cache:'

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value)
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }

  const record = value as Record<string, unknown>
  return `{${Object.keys(record)
    .filter((key) => record[key] !== undefined)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(',')}}`
}

export function makeBrowserCacheKey(namespace: string, params?: unknown) {
  return `${CACHE_PREFIX}${namespace}:${stableStringify(params ?? {})}`
}

function readEntry<T>(key: string): CacheEntry<T> | null {
  if (!canUseStorage()) return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as CacheEntry<T>) : null
  } catch {
    return null
  }
}

function writeEntry<T>(key: string, value: T, ttlMs: number) {
  if (!canUseStorage()) return

  try {
    const entry: CacheEntry<T> = {
      value,
      expiresAt: Date.now() + ttlMs,
    }
    window.localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // Storage can be unavailable or full; data fetching should still work.
  }
}

export async function withBrowserCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = readEntry<T>(key)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value
  }

  try {
    const value = await fetcher()
    writeEntry(key, value, ttlMs)
    return value
  } catch (error) {
    if (cached) return cached.value
    throw error
  }
}
