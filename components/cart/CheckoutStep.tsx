'use client';

import React, { useState } from 'react';
import FormInput from '@/components/form/FormInput';
import { validateEmail } from '@/utils/validation';
import { CartData, } from '@/services/cart.service';
import { CheckoutPayload } from '@/types';
import { BookingService, IBookingService } from '@/services/booking.service'
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const initialFormData: CheckoutFormData = {
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  email: '',
};

export default function CheckoutStep({ onNext, onBack, data }: { onNext: () => void; onBack: () => void; data: CartData[] }) {
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formError, setFormError] = useState<string>('');
  const [checkoutPayload, setCheckoutPayload] = useState<CheckoutPayload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedAddressDetails, setAcceptedAddressDetails] = useState(true);
  const [acceptedUpdates, setAcceptedUpdates] = useState(true);
  const cartGrandTotal = data?.[0]?.grandTotal ?? 0;
  const bookingService = new BookingService();

  const hasItems = data?.[0]?.items?.length > 0;
  if (!hasItems) {
    return (
      <div className="w-full text-center py-24 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mb-6">
          There are no items available for checkout. Please add items to your cart and try again.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-[#113224] text-white rounded-sm hover:bg-[#0c251a] transition"
          >
            Back to Cart
          </button>
          <a
            href="/cart"
            className="px-6 py-3 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Open Cart Page
          </a>
        </div>
      </div>
    );
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev.filter((error) => error.field !== name));
    if (formError) setFormError('');
  };

  const validatePhone = (value: string): ValidationError | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return { field: 'phone', message: 'Phone number is required' };
    }
    if (!/^[0-9+\s-]{7,15}$/.test(trimmed)) {
      return { field: 'phone', message: 'Enter a valid phone number' };
    }
    return null;
  };

  const validateForm = () => {
    const validationErrors: ValidationError[] = [];

    if (!formData.firstName.trim()) {
      validationErrors.push({ field: 'firstName', message: 'First name is required' });
    }

    if (!formData.lastName.trim()) {
      validationErrors.push({ field: 'lastName', message: 'Last name is required' });
    }

    if (!formData.address.trim()) {
      validationErrors.push({ field: 'address', message: 'Address is required' });
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      validationErrors.push(emailError);
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      validationErrors.push(phoneError);
    }

    if (!acceptedAddressDetails) {
      validationErrors.push({
        field: 'acceptedAddressDetails',
        message: 'You must confirm your address details before checking out.',
      });
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const buildCheckoutPayload = (): CheckoutPayload => {
    const workshopMap = new Map<string, CheckoutPayload['workshops'][0]>();

    data.forEach((cart) => {
      cart.items.forEach((item) => {
        const key = `${item.workshopId._id}|${item.bookingDate}|${item.slotId}`;
        const existing = workshopMap.get(key);
        const workshopItem = { optionId: item.optionId, people: item.people };

        if (existing) {
          existing.items.push(workshopItem);
        } else {
          workshopMap.set(key, {
            workshopId: item.workshopId._id,
            bookingDate: item.bookingDate,
            slotId: item.slotId,
            bookingType: item.bookingType,
            items: [workshopItem],
          });
        }
      });
    });

    return {
      workshops: Array.from(workshopMap.values()),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      },
    };
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  setFormError("");

  try {
    const payload = buildCheckoutPayload();

 localStorage.setItem('checkoutCartStep',"1");
    console.log("Checkout payload:", payload);

    await bookingService.bookNow(payload);

    onNext();
  } catch (error: any) {
    console.error(error);

    setFormError(
      error?.message ||
        "Unable to continue. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <div className="w-full lg:w-2/3 rounded-sm">
        <h2 className="text-xl font-semibold mb-8 pb-4 border-b border-gray-300 flex justify-between">
          Billing details <span className="text-gray-500 text-base font-normal">(2)</span>
        </h2>

        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">
          {formError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-sm text-red-600">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.find((err) => err.field === 'firstName')?.message}
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.find((err) => err.field === 'lastName')?.message}
              required
            />
          </div>

          <FormInput
            label="Address"
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            error={errors.find((err) => err.field === 'address')?.message}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.find((err) => err.field === 'phone')?.message}
              required
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.find((err) => err.field === 'email')?.message}
              required
            />
          </div>
        </form>
      </div>

      {/* Summary Sidebar (Similar to Cart, but with Terms checkboxes) */}
      <div className="w-full lg:w-1/3 bg-[#ece9e2] p-8 rounded-sm sticky top-8">
        {/* ... Include the Subtotal & Coupon blocks from CartStep ... */}
        
        <div className="space-y-4 my-6 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#113224]"
              checked={acceptedAddressDetails}
              onChange={(e) => {
                setAcceptedAddressDetails(e.target.checked);
                setErrors((prev) => prev.filter((error) => error.field !== 'acceptedAddressDetails'));
              }}
            />
            <span className="text-gray-700">I confirm that the address details entered are correct and will be used for delivery and billing purposes.</span>
          </label>
          {errors.find((err) => err.field === 'acceptedAddressDetails') && (
            <p className="text-red-600 text-sm ml-8">You must accept the address confirmation before continuing.</p>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#113224]"
              checked={acceptedUpdates}
              onChange={(e) => setAcceptedUpdates(e.target.checked)}
            />
            <span className="text-gray-700">Send me updates related to my order and shipping details.</span>
          </label>
        </div>

        <button
          type="submit"
          form="checkout-form"
          disabled={isSubmitting}
          className="w-full bg-[#113224] text-white py-4 font-medium flex justify-center items-center gap-2 hover:bg-[#0c251a] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>Checkout</span>
          <span className="text-gray-400">|</span>
          <span>AED {cartGrandTotal.toFixed(2)}</span>
        </button>
      </div>
    </>
  );
}