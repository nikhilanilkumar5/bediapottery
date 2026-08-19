"use client";

import { useCallback, useEffect, useState } from 'react';
import MobileCart from '@/components/cart/MobileCart';
import { CartData, getCartData } from '@/services/cart.service';
import { useAuthStore } from '@/store/authStore';
import { useGuestCartStore } from '@/store/guestCartStore';
import { guestCartToCartData } from '@/utils/guestCart';
import { useRouter } from 'next/navigation';

export default function CartPageClient() {
  const userId = useAuthStore(state => state.user?.userId);
  const guestItems = useGuestCartStore(state => state.items);
  const removeGuestItem = useGuestCartStore(state => state.removeItem);
  const [cartData, setCartData] = useState<CartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isGuest = !userId;

  const loadCart = useCallback(async () => {
    if (!userId) {
      setCartData(guestCartToCartData(guestItems));
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCartData();
      setCartData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load cart.');
      setCartData([]);
    } finally {
      setLoading(false);
    }
  }, [userId, guestItems]);

  useEffect(() => {
    void loadCart();
  }, [loadCart]);

  const onCheckout = () => {
    if (isGuest) {
      router.push('/login?returnUrl=/checkout');
      return;
    }

    localStorage.setItem('checkoutCartStep', '2');
    router.push('/checkout');
  };

  const bannerImage =
    cartData?.[0]?.items?.[0]?.workshopId?.bannerImage ||
    '/images/banner/cart-page.png';

  return (
    <main className="bg-[#fcfbf9] flex lg:flex-row font-sans">
      <div className="hidden lg:block w-1/2 h-[calc(100vh-76.4px)] sticky top-[62px] bg-gray-200 z-0">
        <img
          src={bannerImage}
          alt="Pottery making"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 overflow-y-auto scrollbar-hide relative z-10">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center text-gray-600 px-4 text-center">
            Loading your cart...
          </div>
        ) : error ? (
          <div className="min-h-screen flex items-center justify-center text-center px-4 text-red-600">
            <div>
              <h1 className="text-2xl font-serif mb-3">Unable to load cart</h1>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </div>
        ) : (
          <MobileCart
            data={cartData}
            onCheckout={onCheckout}
            refreshCart={loadCart}
            isGuest={isGuest}
            onRemoveGuestItem={index => {
              removeGuestItem(index);
            }}
          />
        )}
      </div>
    </main>
  );
}
