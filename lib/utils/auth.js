import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const SALT_ROUNDS = 12; // كل ما زاد الرقم، كل ما صار التشفير أقوى

// تشفير كلمة المرور
export async function hashPassword(password) {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  // إضافة pepper (سري إضافي) قبل التشفير
  const pepper = process.env.PEPPER_SECRET || '';
  const pepperedPassword = password + pepper;
  
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(pepperedPassword, salt);
}

// مقارنة كلمة المرور
export async function comparePassword(password, hashedPassword) {
  if (!password || !hashedPassword) {
    throw new Error('Password and hash are required');
  }
  
  const pepper = process.env.PEPPER_SECRET || '';
  const pepperedPassword = password + pepper;
  
  return await bcrypt.compare(pepperedPassword, hashedPassword);
}

// إنشاء Access Token (صلاحية قصيرة)
export function generateAccessToken(payload) {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m', // صلاحية 15 دقيقة فقط
    algorithm: 'HS256',
  });
}

// إنشاء Refresh Token (صلاحية طويلة)
export function generateRefreshToken(payload) {
  if (!JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined');
  
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
}

// التحقق من Access Token
export function verifyAccessToken(token) {
  if (!token) throw new Error('Token is required');
  
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
}

// التحقق من Refresh Token
export function verifyRefreshToken(token) {
  if (!token) throw new Error('Refresh token is required');
  
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET, { algorithms: ['HS256'] });
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
}

// استخراج Bearer Token من headers
export function getTokenFromHeaders(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

// تعيين الكوكيز الآمنة
export function setAuthCookies(accessToken, refreshToken) {
  const cookieStore = cookies();
  
  // Access token cookie
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60, // 15 دقيقة
    path: '/',
  });
  
  // Refresh token cookie
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 أيام
    path: '/api/auth', // مسار محدود
  });
}

// حذف الكوكيز
export function clearAuthCookies() {
  const cookieStore = cookies();
  
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}