import CheckoutFlow from '@/components/cart/CheckoutFlow';
import { getCartData, CartData } from '@/services/cart.service';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Checkout | Bedia Pottery',
  description: 'Securely complete your purchase.',
};

export default async function CheckoutPage() {
  let data: CartData[] = [];

  try {
    data = await getCartData();
  } catch (err) {
    console.error('Unable to load checkout cart data:', err);
  }

  return (
    <main>
      <CheckoutFlow initialData={data} />
    </main>
  );
}