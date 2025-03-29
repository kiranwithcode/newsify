'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/lib/features/authSlice';
import { AppDispatch } from '@/store/store';
import { signIn } from 'next-auth/react';

// Dummy Users
export const dummyUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'user', name:'user' },
];

export default function LoginForm() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      router.push(user.role === 'admin' ? '/dashboard' : '/dashboard');
    }
  }, [router]);

  // Handle Email-Password Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      if (!email || !password) throw new Error('Email and password are required');

      const foundUser = dummyUsers.find(user => user.email === email && user.password === password);

      if (!foundUser) throw new Error('Invalid email or password');

      // Save user to localStorage and Redux
      localStorage.setItem('user', JSON.stringify(foundUser));
      dispatch(loginSuccess(foundUser as any));

      // Redirect based on role
      router.push(foundUser.role === 'admin' ? '/dashboard' : '/dashboard');
    } catch (error) {
      dispatch(loginFailure('Something went wrong'));
    }
  };

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Google login failed', error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

        {/* Google Login */}
        {/* <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div> */}

        {/* Email-Password Login */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
