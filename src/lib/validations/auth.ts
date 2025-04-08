import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50),
  avatar: z
    .string()
    .min(1, "Avatar is required")
    .url("Something went wrong try to change avatar"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  name: z
  .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long")
    .optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Must be a valid email")
    .optional(),
  avatar: z
    .string()
    .min(1, "Avatar is required")
    .url("Something went wrong try to change avatar")
    .optional(),
});

export type UpdateUserValues = z.infer<typeof updateUserSchema>;
