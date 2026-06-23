"use client";

import React, { useState } from "react";
import FormInput from "@/components/form/FormInput";
import { validateEmail } from "@/utils/validation";
import { CheckoutPayload } from "@/types";
import { CheckoutFormData } from "./GiftPageClient";


interface ValidationError {
  field: string;
  message: string;
}

const initialFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",

  recipientName: "",
  giftEmail: "",
  giftPhone: "",
  giftFor: "",
};

export default function GiftCheckoutStep({
  onCheckoutDataChange,
  grandTotal,
}: {
  grandTotal: number;
  onCheckoutDataChange: (data: CheckoutFormData) => void;
}) {
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedAddressDetails, setAcceptedAddressDetails] = useState(true);
  const [acceptedUpdates, setAcceptedUpdates] = useState(true);
  const cartGrandTotal = grandTotal;
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => prev.filter((error) => error.field !== name));

  if (formError) setFormError("");
};

  const validatePhone = (value: string): ValidationError | null => {
    const trimmed = value.trim();
    if (!trimmed) {
      return { field: "phone", message: "Phone number is required" };
    }
    if (!/^[0-9+\s-]{7,15}$/.test(trimmed)) {
      return { field: "phone", message: "Enter a valid phone number" };
    }
    return null;
  };

  const validateForm = () => {
    const validationErrors: ValidationError[] = [];

    if (!formData.firstName.trim()) {
      validationErrors.push({
        field: "firstName",
        message: "First name is required",
      });
    }

    if (!formData.lastName.trim()) {
      validationErrors.push({
        field: "lastName",
        message: "Last name is required",
      });
    }

    if (!formData.address.trim()) {
      validationErrors.push({
        field: "address",
        message: "Address is required",
      });
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
        field: "acceptedAddressDetails",
        message: "You must confirm your address details before checking out.",
      });
    }
    if (!formData.recipientName.trim()) {
      validationErrors.push({
        field: "recipientName",
        message: "Recipient name is required",
      });
    }

    const giftEmailError = validateEmail(formData.giftEmail);
    if (giftEmailError) {
      validationErrors.push({
        field: "giftEmail",
        message: giftEmailError.message,
      });
    }

    const giftPhoneError = validatePhone(formData.giftPhone);
    if (giftPhoneError) {
      validationErrors.push({
        field: "giftPhone",
        message: giftPhoneError.message,
      });
    }

    if (!formData.giftFor.trim()) {
      validationErrors.push({
        field: "giftFor",
        message: "Gift relationship is required",
      });
    }
    setErrors(validationErrors);
    return validationErrors.length === 0;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError("");

      onCheckoutDataChange(formData);
      setIsSubmitting(false);
    
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 pb-24">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="w-full lg:col-span-8 mb-5">
        <h2 className="text-xl font-semibold mb-8 pb-4 border-b  border-gray-300 flex justify-between">
          Billing details{" "}
          <span className="text-gray-500 text-base font-normal">(2)</span>
        </h2>

        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
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
              error={errors.find((err) => err.field === "firstName")?.message}
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.find((err) => err.field === "lastName")?.message}
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
            error={errors.find((err) => err.field === "address")?.message}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.find((err) => err.field === "phone")?.message}
              required
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.find((err) => err.field === "email")?.message}
              required
            />
          </div>
          <h3 className="text-lg font-semibold mt-8 mb-4">
  Gift Recipient Details
</h3>

<FormInput
  label="Recipient Name"
  name="recipientName"
  type="text"
  value={formData.recipientName}
  onChange={handleChange}
  error={errors.find((err) => err.field === "recipientName")?.message}
  required
/>

<div className="grid grid-cols-2 gap-6">
  <FormInput
    label="Gift Email"
    name="giftEmail"
    type="email"
    value={formData.giftEmail}
    onChange={handleChange}
    error={errors.find((err) => err.field === "giftEmail")?.message}
    required
  />

  <FormInput
    label="Gift Phone"
    name="giftPhone"
    type="tel"
    value={formData.giftPhone}
    onChange={handleChange}
    error={errors.find((err) => err.field === "giftPhone")?.message}
    required
  />
</div>

<FormInput
  label="Gift For"
  name="giftFor"
  type="text"
  placeholder="Friend, Brother, Sister..."
  value={formData.giftFor}
  onChange={handleChange}
  error={errors.find((err) => err.field === "giftFor")?.message}
  required
/>
        </form>
      </div>

      {/* Summary Sidebar (Similar to Cart, but with Terms checkboxes) */}
      <div className="w-full lg:col-span-4 bg-[#ece9e2] p-8  sticky top-20 h-fit">
        {/* ... Include the Subtotal & Coupon blocks from CartStep ... */}

        <div className="space-y-4 my-6 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#113224]"
              checked={acceptedAddressDetails}
              onChange={(e) => {
                setAcceptedAddressDetails(e.target.checked);
                setErrors((prev) =>
                  prev.filter(
                    (error) => error.field !== "acceptedAddressDetails",
                  ),
                );
              }}
            />
            <span className="text-gray-700">
              I confirm that the address details entered are correct and will be
              used for delivery and billing purposes.
            </span>
          </label>
          {errors.find((err) => err.field === "acceptedAddressDetails") && (
            <p className="text-red-600 text-sm ml-8">
              You must accept the address confirmation before continuing.
            </p>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#113224]"
              checked={acceptedUpdates}
              onChange={(e) => setAcceptedUpdates(e.target.checked)}
            />
            <span className="text-gray-700">
              Send me updates related to my order and shipping details.
            </span>
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
      </div>
      </div>
    </>
  );
}
