'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Silkie', path: '/silkie' },
    { name: 'Pleasant', path: '/pleasant' },
    { name: 'Bramma', path: '/bramma' },
    { name: 'Fancy Hen', path: '/hen' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full bg-white border-b-4 border-[var(--text-primary)] sticky top-0 z-50">
      <div className="max-w-[1350px] m-auto flex items-center justify-between py-4 px-6 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group relative cursor-pointer">
          <div className="absolute inset-0 bg-[var(--accent-yellow)] rounded-full -rotate-6 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="relative z-10 p-2 rounded-full border-2 border-transparent group-hover:border-[var(--text-primary)] group-hover:shadow-[4px_4px_0px_var(--text-primary)] bg-white transition-all">
            <Image src="/logo1.png" alt="Logo" width={40} height={40} priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block relative z-10">
          <ul className="flex space-x-2 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className={`block px-5 py-2 rounded-xl text-sm md:text-base font-bold transition-all border-2 border-transparent ${
                      isActive 
                      ? 'bg-[var(--accent-mint)] border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] text-[var(--text-primary)] -translate-y-1' 
                      : 'text-[var(--text-primary)] hover:bg-[var(--accent-yellow)] hover:border-[var(--text-primary)] hover:shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            {/* Auth Buttons */}
            {session ? (
              <li className="pl-2 flex items-center space-x-2">
                <Link 
                  href="/orders" 
                  className="block px-3 py-2 rounded-xl text-sm md:text-base font-bold transition-all border-2 border-transparent text-[var(--text-primary)] hover:bg-[var(--accent-yellow)] hover:border-[var(--text-primary)] hover:shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1"
                >
                  My Orders
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-base font-bold transition-all border-2 border-[var(--text-primary)] bg-[var(--accent-coral)] text-white shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 hover:bg-[#8B0000] active:translate-y-0 active:shadow-none"
                  title="Click to securely logout"
                >
                  <span className="font-medium opacity-90 truncate max-w-[100px] hidden lg:inline">Hi, {session.user.name.split(' ')[0]}</span>
                  <span className="opacity-50 font-normal hidden lg:inline">|</span>
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <li className="pl-4 flex space-x-2">
                <Link 
                  href="/login" 
                  className="block px-5 py-2 rounded-xl text-sm md:text-base font-bold transition-all border-2 border-[var(--text-primary)] bg-[var(--accent-yellow)] shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 hover:bg-[var(--accent-mint)]"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative p-2 rounded-xl border-4 border-[var(--text-primary)] bg-[var(--accent-coral)] text-white shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none transition-all z-20"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden bg-white border-b-4 border-l-4 border-r-4 border-t-4 border-t-transparent border-[var(--text-primary)] absolute w-full left-0 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col p-4 gap-2">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path;
            const colors = ['var(--accent-yellow)', 'var(--accent-mint)', 'var(--accent-coral)', 'var(--accent-teal)'];
            const cycleColor = colors[index % colors.length];
            
            return (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 rounded-2xl text-lg font-black transition-all border-4 text-[var(--text-primary)] ${
                    isActive 
                    ? `bg-[var(--accent-mint)] border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)]` 
                    : `bg-neutral-50 border-transparent hover:border-[var(--text-primary)] hover:shadow-[4px_4px_0px_var(--text-primary)]`
                  }`}
                  style={{ '--hover-color': cycleColor }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = !isActive ? cycleColor : 'var(--accent-mint)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = !isActive ? '#f9fafb' : 'var(--accent-mint)'}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          
          {/* Mobile Auth Buttons */}
          {session ? (
            <li className="mt-4 flex flex-col gap-3">
              <Link 
                href="/orders" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center block px-6 py-4 rounded-2xl text-lg font-black transition-all border-4 border-transparent bg-neutral-100 hover:border-[var(--text-primary)] hover:shadow-[4px_4px_0px_var(--text-primary)] text-[var(--text-primary)]"
              >
                My Orders
              </Link>
              <button 
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full text-center block px-6 py-4 rounded-2xl text-lg font-black transition-all border-4 border-[var(--text-primary)] bg-[var(--accent-coral)] text-white shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="mt-4">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center block px-6 py-4 rounded-2xl text-lg font-black transition-all border-4 border-[var(--text-primary)] bg-[var(--accent-yellow)] text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] active:translate-y-1 active:shadow-none"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
