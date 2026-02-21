'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registration successful! Please log in.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // After successful user login, send to homepage or profile
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] bg-[var(--bg-main)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_var(--text-primary)]">
        <div>
          <h2 className="text-center text-4xl font-black text-[var(--accent-coral)]">Welcome Back!</h2>
          <p className="mt-2 text-center text-sm font-bold text-[var(--text-secondary)]">
            Sign in to your user account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {successMsg && (
            <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 rounded-xl text-center font-bold">
              {successMsg}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl text-center font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border-4 border-[var(--text-primary)] text-xl font-black rounded-xl text-[var(--text-primary)] bg-[var(--accent-yellow)] hover:bg-[var(--accent-mint)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--text-primary)] transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Log In 🔒'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 border-t-2 border-dashed border-gray-300 pt-6">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            New around here?{' '}
            <Link href="/register" className="text-[var(--accent-coral)] hover:underline decoration-4">
              Create an account!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center font-bold text-gray-400">Loading Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
