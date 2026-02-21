'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      if (res.error === 'Account pending approval') {
        setError('Your admin account is still pending approval. Please check your email or contact the system owner.');
      } else {
        setError(res.error);
      }
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[8px_8px_0px_#1E1E1E] border-4 border-[#1E1E1E]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#2F5C4F]">Zion Admin</h1>
          <p className="text-gray-500 mt-2 font-medium">Dashboard Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center font-semibold text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2F5C4F] focus:ring-0 transition-colors"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2F5C4F] focus:ring-0 transition-colors"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#2F5C4F] hover:bg-[#1E3E34] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-gray-500">
          Need admin access?{' '}
          <Link href="/admin/register" className="text-[#2F5C4F] hover:underline font-bold">
            Request an account
          </Link>
        </div>
      </div>
    </div>
  );
}
