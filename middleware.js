import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes - فقط نتحقق من وجود الكوكي
  if (pathname.startsWith('/admin')) {
    // السماح لصفحة login
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // التحقق من admin_token
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      // الرجوع لصفحة login بدل 404
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = JSON.parse(atob(adminToken));
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      if (Date.now() > decoded.expiry) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};