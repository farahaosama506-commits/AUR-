import { z } from 'zod';

// ============================================
// Register Schema
// ============================================
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z
    .string()
    .email('Please enter a valid email')
    .max(100, 'Email is too long')
    .transform(val => val.toLowerCase().trim()),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// ============================================
// Login Schema
// ============================================
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .transform(val => val.toLowerCase().trim()),
  
  password: z
    .string()
    .min(1, 'Password is required'),
});

// ============================================
// Forgot Password Schema
// ============================================
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .transform(val => val.toLowerCase().trim()),
});

// ============================================
// Reset Password Schema
// ============================================
export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  code: z
    .string()
    .length(6, 'Code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

// ============================================
// Update Password Schema
// ============================================
export const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

// ============================================
// Helper: Format Zod errors
// ============================================
export function formatZodError(error) {
  if (error instanceof z.ZodError) {
    const firstError = error.errors[0];
    return firstError.message;
  }
  return 'Validation failed';
}