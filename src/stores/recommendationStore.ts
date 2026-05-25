import { create } from 'zustand'
import type { RecommendationItem, PlanningDay } from '@/types'

/** State untuk rekomendasi dan planning */
interface RecommendationState {
    recommendations: RecommendationItem[]
    itinerary: PlanningDay[]
    isLoading: boolean
    setRecommendations: (items: RecommendationItem[]) => void
    setItinerary: (itinerary: PlanningDay[]) => void
    clearRecommendations: () => void
    clearItinerary: () => void
}

/** Store untuk rekomendasi dan planning */
export const useRecommendationStore = create<RecommendationState>((set) => ({
    recommendations: [],
    itinerary: [],
    isLoading: false,
    setRecommendations: (items) => set({ recommendations: items }),
    setItinerary: (itinerary) => set({ itinerary }),
    clearRecommendations: () => set({ recommendations: [] }),
    clearItinerary: () => set({ itinerary: [] }),
}))