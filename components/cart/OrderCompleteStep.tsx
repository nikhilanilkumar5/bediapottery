import { OrderDetails } from '@/services/order.service';

interface OrderCompleteStepProps {
  orderData: OrderDetails | null;
}

export default function OrderCompleteStep({ orderData }: OrderCompleteStepProps) {
  const currency = orderData?.currency || 'AED';

  const orderRows = orderData?.items?.flatMap((item) => {
    const bookingItems = item.bookingId?.items ?? [];

    if (bookingItems.length > 0) {
      return bookingItems.map((bookingItem) => ({
        title: item.bookingId?.workshopId?.title || 'Workshop',
        quantity: Number(bookingItem.people || 0),
        unitPrice: Number(bookingItem.price || 0),
        subtotal: Number(bookingItem.subtotal || 0),
      }));
    }

    return [{
      title: item.bookingId?.workshopId?.title || 'Workshop',
      quantity: Number(item.bookingId?.totalPeople || 1),
      unitPrice: Number(item.totalAmount || 0),
      subtotal: Number(item.totalAmount || 0),
    }];
  }) ?? [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-black">Your Order</h2>
        <span className="bg-[#0D463D] text-white px-4 py-1 text-xs font-semibold tracking-wider rounded">Paid</span>
      </div>

      <div className="space-y-6 text-sm">
        {orderRows.length > 0 ? (
          orderRows.map((row, index) => (
            <div key={`${row.title}-${index}`} className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-medium text-black">{row.title}</h3>
                <p className="text-gray-500 mt-1">
                  | {row.quantity}x {currency} {row.unitPrice.toFixed(2)}
                </p>
              </div>
              <p className="font-medium text-black">{currency} {row.subtotal.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 py-2">No order items found.</div>
        )}

        <div className="flex justify-between items-center py-4 border-t border-gray-200 mt-8">
          <span className="bg-[#E8F5F0] text-[#0D463D] px-4 py-1 text-xs font-semibold tracking-wider rounded">Paid</span>
          <span className="font-medium text-lg text-black">{currency} {Number(orderData?.grandTotal || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}