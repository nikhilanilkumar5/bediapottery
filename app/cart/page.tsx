import CheckoutFlow from '@/components/cart/CheckoutFlow';

export const metadata = {
  title: 'Your Cart | Bedia Pottery',
  description: 'Review your items and checkout securely.',
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      <CheckoutFlow />
    </main>
  );
}