import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check admin token
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      // ❌ لا ترجع redirect - أرجع 404 (تخفي الصفحة)
      return new NextResponse('Not Found', { status: 404 });
    }

    try {
      const decoded = JSON.parse(atob(adminToken));
      
      // Check if admin
      if (decoded.role !== 'admin') {
        return new NextResponse('Not Found', { status: 404 });
      }

      // Check expiry (24 hours)
      if (Date.now() > decoded.expiry) {
        return new NextResponse('Not Found', { status: 404 });
      }
    } catch {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};