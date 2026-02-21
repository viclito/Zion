'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    details: '',
  });
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

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' }), // Force user role
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Automatically redirect to login page after successful registration
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] border-4 border-[var(--text-primary)] shadow-[12px_12px_0px_var(--text-primary)]">
        <div>
          <h2 className="text-center text-4xl font-black text-[var(--accent-teal)]">Join the Flock!</h2>
          <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
            Create an account to manage your requests and details.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                id="address"
                name="address"
                rows="2"
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Full Address (Optional)"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <textarea
                id="details"
                name="details"
                rows="3"
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border-2 border-[var(--text-primary)] placeholder-gray-400 text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] focus:border-transparent transition-all"
                placeholder="Any specific details or requirements? (Optional)"
                value={formData.details}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border-4 border-[var(--text-primary)] text-xl font-black rounded-xl text-[var(--text-primary)] bg-[var(--accent-mint)] hover:bg-[var(--accent-yellow)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--text-primary)] transition-all disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Create Account 🐣'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 border-t-2 border-dashed border-gray-300 pt-6">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Already have an account?{' '}
            <Link href="/login" className="text-[var(--accent-teal)] hover:underline decoration-4">
              Log in here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
