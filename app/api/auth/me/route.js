import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { getTokenFromHeaders, verifyToken } from '@/lib/utils/auth';
import { errorHandler, AppError } from '@/lib/utils/errors';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();

    // Get token
    const token = getTokenFromHeaders(request);
    
    if (!token) {
      throw new AppError('No token provided', 401, 'NO_TOKEN');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
}