const rateLimitMap = new Map();

export function checkRateLimit(key, limit = 5, windowMs = 60000) {
  const now = Date.now();
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  
  const entry = rateLimitMap.get(key);
  
  // Reset if window passed
  if (now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  
  // Check limit
  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Increment
  entry.count++;
  return { allowed: true };
}