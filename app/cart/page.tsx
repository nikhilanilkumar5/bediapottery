// app/cart/page.tsx (or wherever your cart page is located)
import MasterCartFlow from '@/components/cart/MasterCartFlow'; // Adjust this path if needed

export const metadata = {
  title: 'Your Cart | Bedia Pottery',
  description: 'Review your items and checkout securely.',
};

export default function CartPage() {
  return (
    // Removed the background color here because MasterCartFlow handles it
    <main className="min-h-screen"> 
      <MasterCartFlow />
    </main>
  );
}