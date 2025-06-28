'use client';
import React, { useState } from 'react';
import { FiPhone, FiMail, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";
import { MdMail , MdCall } from "react-icons/md";

const SideContact = () => {
  const [open, setOpen] = useState(false);

  const openFunc = () => setOpen(true);
  const closeFunc = () => setOpen(false);

  return (
    <div className="fixed bottom-14 right-5">
      {!open ? (
        <div
          className="rounded-full text-xs h-10 w-10 bg-black text-white flex items-center justify-center cursor-pointer"
          onClick={openFunc}
        >
          Cont
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center bg-white p-2 rounded shadow-lg">
          <a href="tel:6381877181" target="_blank" rel="noopener noreferrer">
            <MdCall className="w-6 h-6 text-blue-950 hover:text-black transition-colors" />
          </a>
          <a href="mailto:aaswin007ips@gmail.com" target="_blank" rel="noopener noreferrer">
            <MdMail className="w-6 h-6 text-red-900 hover:text-black transition-colors" />
          </a>
          <a href="https://wa.me/6381877181?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20fancy%20hens." target="_blank" rel="noopener noreferrer">
            <IoLogoWhatsapp className="w-6 h-6 text-green-600 hover:text-green-800 transition-colors" />
          </a>
          <div
            className="w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={closeFunc}
          >
            <FiX className="w-5 h-5 text-neutral-700 hover:text-black transition-colors" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideContact;
