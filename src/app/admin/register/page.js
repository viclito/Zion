'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'admin' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4 font-inter">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[8px_8px_0px_#1E1E1E] border-4 border-[#1E1E1E] text-center">
          <h2 className="text-2xl font-black text-[#2F5C4F] mb-4">Request Sent!</h2>
          <p className="text-gray-600 mb-6 font-medium">
            Your admin account request has been successfully submitted. An email has been sent to the system owner for approval. You will not be able to log in until your account is approved.
          </p>
          <Link href="/admin/login" className="inline-block py-3 px-6 bg-[#2F5C4F] text-white font-bold rounded-xl hover:bg-[#1E3E34] transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[8px_8px_0px_#1E1E1E] border-4 border-[#1E1E1E]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-[#2F5C4F]">Admin Registration</h1>
          <p className="text-gray-500 mt-2 font-medium">Request dashboard access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center font-semibold text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2F5C4F] focus:ring-0 transition-colors"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2F5C4F] focus:ring-0 transition-colors"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-gray-500">
          Already have an approved account?{' '}
          <Link href="/admin/login" className="text-[#2F5C4F] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
