"use client";

import React, { useState } from "react";
import Button from "@/components/ui/PrimaryButton";
import { useRouter, useSearchParams } from "next/navigation";
import { validatePassword } from "@/utils/validation";
import FormPasswordInput from "./FormPasswordInput";
import { resetPassword } from "@/services/authService"; // Ensure this service method is created

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormError {
  field: string;
  message: string;
}

const initialFormData: ResetPasswordFormData = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState<ResetPasswordFormData>(initialFormData);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove existing error for this field
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormError[] = [];

    // Token check
    if (!token) {
      newErrors.push({
        field: "form",
        message: "Invalid or expired reset token. Please request a new link.",
      });
    }

    // New password validation
    const passwordValidation = validatePassword(formData.newPassword) as {
      message: string;
    } | null;

    if (!formData.newPassword) {
      newErrors.push({
        field: "newPassword",
        message: "New password is required",
      });
    } else if (passwordValidation) {
      newErrors.push({
        field: "newPassword",
        message: passwordValidation.message,
      });
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.push({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.push({
        field: "confirmPassword",
        message: "Passwords do not match",
      });
    }

    // Stop if validation fails
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // API call payload: { token: "...", newPassword: "..." }
      await resetPassword({
        token: token!,
        newPassword: formData.newPassword,
      });

      setSubmitSuccess(true);
      setFormData(initialFormData);

      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setErrors([
        {
          field: "form",
          message:
            error.response?.data?.message ||
            error.message ||
            "Failed to reset password. Please try again.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Success Banner */}
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600 text-sm">
            Password reset successful! Redirecting to login... 🎉
          </p>
        </div>
      )}

      {/* Form Error Banner */}
      {errors.find((err) => err.field === "form") && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            {errors.find((err) => err.field === "form")?.message}
          </p>
        </div>
      )}

      {/* New Password Input */}
      <FormPasswordInput
        name="newPassword"
        label="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        error={errors.find((err) => err.field === "newPassword")?.message}
        required
      />

      {/* Confirm Password Input */}
      <FormPasswordInput
        name="confirmPassword"
        label="Confirm New Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.find((err) => err.field === "confirmPassword")?.message}
        required
      />

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting || submitSuccess}>
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;