import { Suspense } from 'react';
import ResetPasswordContent from './ResetPasswordContent';

export default function ResetPasswordPage() {
  return (
    <Suspense 
      fallback={
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <p>جاري التحميل...</p>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}