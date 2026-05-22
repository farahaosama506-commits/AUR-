// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // المسارات اللي بدها حماية
  const protectedPaths = ['/cart', '/checkout'];

  // إذا المسار محمي، تحقق من الـ auth
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = request.cookies.get('auth-storage')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart/:path*', '/checkout/:path*'],
};