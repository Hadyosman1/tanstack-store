import { API_BASE_URL } from "@/constants";
import { LoginValues, SignUpValues } from "@/lib/validations/auth";
import { User, UserTokens } from "@/types/users";

const services = {
  signUp: async (signUpData: SignUpValues) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    if (!res.ok) {
      throw new Error(`Failed to sign up, status: ${res.status}`);
    }

    return res.json() as Promise<User>;
  },
  checkEmailValidity: async (email: string, signal: AbortSignal) => {
    const res = await fetch(`${API_BASE_URL}/users/is-available`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`Failed to check email validity, status: ${res.status}`);
    }

    return res.json() as Promise<{ isAvailable: boolean }>;
  },
  signIn: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(`Failed to sign in, status: ${res.status}`);
    }

    return res.json() as Promise<User>;
  },
  login: async (loginData: LoginValues) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      throw new Error(`Failed to login, status: ${res.status}`);
    }

    return res.json() as Promise<UserTokens>;
  },
  getUserProfile: async (accessToken: UserTokens["access_token"]) => {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get user profile, status: ${res.status}`);
    }

    return res.json() as Promise<User>;
  },
};

export default services;
