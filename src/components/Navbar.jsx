'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-300">
      <div className="max-w-[1200px] m-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo1.png" alt="Logo" width={40} height={40} priority />
        </div>

        {/* Navigation Links */}
        <div className="overflow-x-auto">
          <ul className="hidden md:flex space-x-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-gray-700">
                Home
              </a>
            </li>
            <li>
              <a href="/silkie" className="hover:text-gray-700">
                Silkie
              </a>
            </li>
            <li>
              <Link href="/pleasant" className="hover:text-gray-700">
                Pleasant
              </Link>
            </li>
            <li>
              <Link href="/bramma" className="hover:text-gray-700">
                Bramma
              </Link>
            </li>
            <li>
              <Link href="/hen" className="hover:text-gray-700">
                Fancy hen
              </Link>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-700">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-700"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-300">
          <ul className="flex flex-col space-y-4 py-4 px-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/silkie" className="hover:text-gray-700">
                Silkie
              </Link>
            </li>
            <li>
              <Link href="/hen" className="hover:text-gray-700">
                Hen
              </Link>
            </li>
            <li>
              <Link href="/cat" className="hover:text-gray-700">
                Cat
              </Link>
            </li>
            <li>
              <Link href="/fish" className="hover:text-gray-700">
                Fish
              </Link>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-700">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-700">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;