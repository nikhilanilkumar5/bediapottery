"use client";

import React, { useState } from "react";
import {
  validateSignupForm,
  getFieldError,
  ValidationError,
} from "@/utils/validation";
import { SignupFormData } from "./signup.types";
import FormInput from "./FormInput";
import Button from "@/components/ui/PrimaryButton";
import { useRouter } from "next/navigation";
import FormPasswordInput from "./FormPasswordInput";

/** Client-side service */
const signupService = {
  submit: async (data: SignupFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup data:", data);
  },
};

const initialFormData: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateSignupForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await signupService.submit(formData);
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch {
      setErrors([{ field: "form", message: "Something went wrong." }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 ">
          <p className="text-green-600 text-sm">
            Account created successfully 🎉
          </p>
        </div>
      )}

      <FormInput
        name="name"
        label="Your name"
        value={formData.name}
        onChange={handleChange}
        error={getFieldError(errors, "name") || undefined}
        required
      />

      <FormInput
        name="email"
        label="Email"
        value={formData.email}
        placeholder="Example@gmail.com"
        onChange={handleChange}
        error={getFieldError(errors, "email") || undefined}
        required
      />

      <FormPasswordInput
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={getFieldError(errors, "password") || undefined}
        required
      />
      <FormPasswordInput
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={getFieldError(errors, "confirmPassword") || undefined}
        required
      />

      <Button type="submit" className="w-full">
        {isSubmitting ? "Creating Account..." : "Register Now"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Already have an account? Log in
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
