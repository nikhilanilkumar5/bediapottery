export default function CheckoutStep({ onNext }) {
  return (
    <>
      <div className="w-full lg:w-2/3 rounded-sm">
        <h2 className="text-xl font-semibold mb-8 pb-4 border-b border-gray-300 flex justify-between">
          Billing details <span className="text-gray-500 text-base font-normal">(2)</span>
        </h2>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">First Name *</label>
              <input type="text" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
            </div>
            <div>
              <label className="block text-sm mb-2">Last Name *</label>
              <input type="text" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div>
              <label className="block text-sm mb-2">Company Name (Optional)</label>
              <input type="text" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
            </div>
            <div>
              <label className="block text-sm mb-2">Country / Region *</label>
              <select className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224] bg-white">
                <option></option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Street Address *</label>
            <input type="text" placeholder="House name and street name" className="w-full border border-gray-200 p-3 rounded-sm mb-3 focus:outline-none focus:border-[#113224]" />
            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-2">Town / City *</label>
              <select className="w-full border border-gray-200 p-3 rounded-sm bg-white"><option>New York</option></select>
            </div>
            <div>
              <label className="block text-sm mb-2">Province *</label>
              <select className="w-full border border-gray-200 p-3 rounded-sm bg-white"><option>New York</option></select>
            </div>
            <div>
              <label className="block text-sm mb-2">Postcode / ZIP *</label>
              <input type="text" defaultValue="734547" className="w-full border border-gray-200 p-3 rounded-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Phone *</label>
              <input type="tel" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
            </div>
            <div>
              <label className="block text-sm mb-2">Email Address *</label>
              <input type="email" className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#113224]" />
            </div>
          </div>
        </form>
      </div>

      {/* Summary Sidebar (Similar to Cart, but with Terms checkboxes) */}
      <div className="w-full lg:w-1/3 bg-[#ece9e2] p-8 rounded-sm sticky top-8">
        {/* ... Include the Subtotal & Coupon blocks from CartStep ... */}
        
        <div className="space-y-4 my-6 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-[#113224]" defaultChecked />
            <span className="text-gray-700">I confirm that the address details entered are correct and will be used for delivery and billing purposes.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 accent-[#113224]" defaultChecked />
            <span className="text-gray-700">Send me updates related to my order and shipping details.</span>
          </label>
        </div>

        <button onClick={onNext} className="w-full bg-[#113224] text-white py-4 font-medium flex justify-center items-center gap-2 hover:bg-[#0c251a]">
          <span>Checkout</span>
          <span className="text-gray-400">|</span>
          <span>AED 2958</span>
        </button>
      </div>
    </>
  );
}