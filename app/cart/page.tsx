
import MobileCart from '@/components/cart/MobileCart'; // Adjust path as needed
import { getCartData } from '@/services/cart.service';
export default async function CartPage() {
const cartData = await getCartData()

  return (
    <main className="bg-[#fcfbf9] flex lg:flex-row font-sans">
      {/* Left Side: Product Context - Sticky */}
      <div className="hidden lg:block w-1/2 h-[calc(100vh-76.4px)] sticky top-[76.4px] bg-gray-200 z-0">
        <img 
          src={`${cartData[0].items[0]?.workshopId?.bannerImage || '/images/banner/cart-page.png'}`}
          alt="Pottery making" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: The Sidebar Cart - Only Scrollable Area */}
      <div className="w-full lg:w-1/2 overflow-y-auto scrollbar-hide relative z-10">
        <MobileCart  data={cartData} />
      </div>
    </main>
  );
}