import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

/* =========================
   TYPES
========================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

/* =========================
   LOGIN
========================= */

export const loginUser = async (
  data: LoginPayload
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw {
      message:
        error?.response?.data?.message ||
        "Login failed",
    };
  }
};

/* =========================
   REGISTER
========================= */

export const registerUser = async (
  data: SignupPayload
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw {
      message:
        error?.response?.data?.message ||
        "Signup failed",
    };
  }
};

/* =========================
   FORGOT PASSWORD
========================= */

export const forgotPassword = async (
  data: ForgotPasswordPayload
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/forgot-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Forgot password response:", response.data, data);  
    return response.data;
  } catch (error: any) {
    throw {
      message:
        error?.response?.data?.message ||
        "Unable to send password reset email",
    };
  }
};

/* =========================
   RESET PASSWORD
========================= */

export const resetPassword = async (
  data: ResetPasswordPayload
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/reset-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.log("Reset password response:", error?.response?.data);
    throw {
      message:
        error?.response?.data?.errors[0].msg ||
        "Failed to reset password",
    };
  }
};