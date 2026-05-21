'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './reset-password.module.css';

export default function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('request');
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  // Get email from URL
  useEffect(() => {
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setMode('verify');
    }
  }, [searchParams]);

  // Check if user already has session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEmail(session.user.email);
        setMode('password');
      }
    };
    checkSession();
  }, []);

  // Request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;

      setMessage('Code sent! Check your email.');
      setMode('verify');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Code input handlers
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6,8}$/.test(pasted)) {
      const digits = pasted.split('').slice(0, 8);
      setCode([...digits, ...Array(8 - digits.length).fill('')]);
      inputRefs.current[Math.min(digits.length, 7)]?.focus();
    }
  };

  // Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const otpCode = code.join('');
    
    if (otpCode.length < 6) {
      setError('Please enter the complete code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'recovery',
      });

      if (error) throw error;

      setMode('password');
      setMessage('Code verified! Enter your new password.');
    } catch (err) {
      setError('Invalid or expired code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setMessage('Password updated successfully! Redirecting...');
      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Reset Password</h1>

        {message && <div className={styles.success}>{message}</div>}

        {/* Mode 1: Request Code */}
        {mode === 'request' && (
          <form onSubmit={handleRequestCode} className={styles.form}>
            <p className={styles.instruction}>
              Enter your email to receive a reset code.
            </p>
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submit} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        )}

        {/* Mode 2: Verify Code */}
        {mode === 'verify' && (
          <form onSubmit={handleVerifyCode} className={styles.form}>
            <p className={styles.instruction}>
              Enter the code sent to <strong>{email}</strong>
            </p>
            <div className={styles.codeGrid} onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={styles.codeInput}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submit} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
            <button 
              type="button" 
              className={styles.resend}
              onClick={handleRequestCode}
              disabled={isLoading}
            >
              Resend Code
            </button>
          </form>
        )}

        {/* Mode 3: New Password */}
        {mode === 'password' && (
          <form onSubmit={handleUpdatePassword} className={styles.form}>
            <p className={styles.instruction}>
              Enter your new password for <strong>{email}</strong>
            </p>
            <div className={styles.field}>
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                minLength={6}
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submit} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}