// app/auth/page.tsx
'use client';

import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';


export default function AuthPage() {
  // State to manage which form is currently active
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isSigningIn ? (
          <>
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue your secret conversations.</p>
            <SignInForm />
            <p className="auth-toggle">
              Don't have an account?{' '}
              <button onClick={() => setIsSigningIn(false)}>Sign Up</button>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-title">Join the Shadows</h2>
            <p className="auth-subtitle">Create an account to start messaging anonymously.</p>
            <SignUpForm />
            <p className="auth-toggle">
              Already have an account?{' '}
              <button onClick={() => setIsSigningIn(true)}>Sign In</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}