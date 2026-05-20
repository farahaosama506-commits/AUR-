import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/utils/auth';

// المسارات المحمية
const protectedPaths = [
  '/api/products', // POST, PUT, DELETE
  '/api/orders',
  '/api/admin',
  '/cart',
  '/checkout',
];

// المسارات العامة
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/products', // GET فقط
  '/',
  '/shop',
  '/explore',
  '/brand',
  '/contact',
  '/ethics',
  '/login',
  '/register',
];

export async function middleware(request) {
  const { pathname, method } = request.nextUrl;
  
  // السماح بالمسارات العامة
  if (publicPaths.some(path => pathname.startsWith(path))) {
    // للمنتجات - السماح بـ GET فقط
    if (pathname.startsWith('/api/products') && method !== 'GET') {
      // يحتاج مصادقة
    } else {
      return NextResponse.next();
    }
  }
  
  // التحقق من المسارات المحمية
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = request.cookies.get('access_token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    try {
      const decoded = verifyAccessToken(token);
      
      // إضافة بيانات المستخدم للـ headers عشان API Routes اللاحقة
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-role', decoded.role);
      
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/cart/:path*', '/checkout/:path*'],
};