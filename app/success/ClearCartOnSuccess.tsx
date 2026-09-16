'use client';

import { useEffect } from 'react';
import { useGuestCartStore } from '@/store/guestCartStore';

export function ClearCartOnSuccess() {
  useEffect(() => {
    useGuestCartStore.getState().clearCart();
  }, []);

  return null;
}