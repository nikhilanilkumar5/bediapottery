
"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "@/components/ui/PrimaryButton";
import { useRouter } from "next/navigation";
import { Content } from "../ui";
import { validateEmail } from "@/utils/validation";
import { forgotPassword } from "@/services/authService";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordError {
  field: string;
  message: string;
}

const initialFormData: ForgotPasswordFormData = {
  email: "",
};

const ForgotPasswordForm = () => {
  const [formData, setFormData] =
    useState<ForgotPasswordFormData>(initialFormData);

  const [errors, setErrors] = useState<ForgotPasswordError[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const router = useRouter();

  // Input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove old error
    setErrors((prev) =>
      prev.filter((err) => err.field !== name)
    );

    // Hide success message when user edits email again
    setSubmitSuccess(false);
  };

  // Submit
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors: ForgotPasswordError[] = [];

    // Email validation
    const emailValidation = validateEmail(
      formData.email
    ) as { message: string } | null;

    if (!formData.email) {
      newErrors.push({
        field: "email",
        message: "Email is required",
      });
    } else if (emailValidation) {
      newErrors.push({
        field: "email",
        message: emailValidation.message,
      });
    }

    // Stop if validation error
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // API call
      await forgotPassword({
        email: formData.email,
      });

      setSubmitSuccess(true);

      // Reset form
      setFormData(initialFormData);
    } catch (error: any) {
      setErrors([
        {
          field: "form",
          message:
            error?.message || "Unable to send reset email",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Success */}
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600 text-sm">
            Password reset link has been sent to your email.
          </p>
        </div>
      )}

      {/* Form error */}
      {errors.find((err) => err.field === "form") && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            {
              errors.find((err) => err.field === "form")
                ?.message
            }
          </p>
        </div>
      )}

      {/* Email */}
      <FormInput
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        placeholder="example@gmail.com"
        onChange={handleChange}
        error={
          errors.find((err) => err.field === "email")
            ?.message
        }
        required
      />

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Continue"}
      </Button>

      {/* Back to login */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-primary text-sm font-semibold hover:underline"
        >
          <Content>Back to Login</Content>
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;