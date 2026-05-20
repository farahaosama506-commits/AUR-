import { verifyRefreshToken, generateAccessToken, setAuthCookies } from '@/lib/utils/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();
    
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    // إنشاء access token جديد
    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    // تحديث الكوكيز
    setAuthCookies(newAccessToken, refreshToken);

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid refresh token' },
      { status: 401 }
    );
  }
}