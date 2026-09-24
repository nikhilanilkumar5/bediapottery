'use client'

import { useEffect, useState } from 'react'
import { useGuestCartStore } from '@/store/guestCartStore'

/**
 * Reports whether the persisted guest cart has been restored from
 * localStorage yet.
 *
 * The guest cart is rehydrated on the client after the first render, so a
 * screen that reads `items` immediately sees an empty array and can wrongly
 * conclude the cart is empty. Gate on this before rendering an empty state.
 *
 * Always starts `false` so the server and the first client render agree,
 * then flips once rehydration finishes.
 */
export function useGuestCartHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const persist = useGuestCartStore.persist

    // Rehydration may already have finished before this effect ran.
    if (persist.hasHydrated()) {
      setHydrated(true)
      return
    }

    const unsubscribe = persist.onFinishHydration(() => setHydrated(true))

    return unsubscribe
  }, [])

  return hydrated
}

export default useGuestCartHydrated
