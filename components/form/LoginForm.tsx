"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "@/components/ui/PrimaryButton";
import { useRouter } from "next/navigation";
import { Content } from "../ui";
import { validateEmail } from "@/utils/validation";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  field: string;
  message: string;
}

/** Client-side service */
const loginService = {
  submit: async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login data:", data);
  },
};

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<LoginError[]>([]);
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
    const newErrors: LoginError[] = [];

    if (!formData.email) {
      newErrors.push({ field: "email", message: "Email is required" });
    } else if (!validateEmail(formData.email)) {
      newErrors.push({ field: "email", message: "Invalid email format" });
    }

    if (!formData.password) {
      newErrors.push({ field: "password", message: "Password is required" });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await loginService.submit(formData);
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setTimeout(() => {
        setSubmitSuccess(false);
        router.push("/");
      }, 1500);
    } catch {
      setErrors([
        { field: "form", message: "Login failed. Please try again." },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 ">
          <p className="text-green-600 text-sm">Login successful 🎉</p>
        </div>
      )}

      <FormInput
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        placeholder="Example@gmail.com"
        onChange={handleChange}
        error={errors.find((err) => err.field === "email")?.message}
        required
      />

      <div className="relative">
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.find((err) => err.field === "password")?.message}
          required
        />
        <button type="button" onClick={() => router.push("/forgot-password")} className="w-full pt-5">
          <Content className="text-right">
            Forget Password ?
          </Content>
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Continue"}
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
