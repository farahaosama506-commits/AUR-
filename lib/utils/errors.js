import { NextResponse } from 'next/server';

// Custom Error Class
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

// Error Handler
export function errorHandler(error) {
  console.error('API Error:', error.message);

  if (error instanceof AppError) {
    return NextResponse.json(
      { success: false, error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: messages },
      { status: 400 }
    );
  }

  // Mongoose duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return NextResponse.json(
      { success: false, error: `${field} already exists` },
      { status: 409 }
    );
  }

  // Default error
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}