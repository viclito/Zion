'use client';

import React, { useState } from "react";
import Head from "next/head";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'General Inquiry'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          subject: 'General Inquiry'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Zion Pets</title>
        <meta name="description" content="Get in touch with our team for any questions or inquiries" />
      </Head>

      <div className="min-h-screen bg-[var(--bg-primary)] py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        
         {/* Decorative Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[var(--accent-teal)] rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-[var(--accent-coral)] rounded-full mix-blend-multiply filter blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 text-[var(--text-primary)]">
            <div className="inline-block bg-[var(--accent-mint)] text-[var(--text-primary)] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-6 border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform -rotate-2">
              Say Hello! 👋
            </div>
            <h1 className="text-5xl md:text-7xl font-black drop-shadow-[4px_4px_0px_white]">
              Contact Us
            </h1>
            <p className="mt-6 text-xl font-medium max-w-2xl mx-auto bg-white/50 p-4 rounded-2xl border-2 border-[var(--text-primary)]">
              Got a question, or just want to tell us how much you love your new pet? We're all ears!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            
            {/* Contact Information - Chunky Style */}
            <div className="bg-[var(--accent-yellow)] rounded-[3rem] p-10 shadow-[12px_12px_0px_var(--text-primary)] border-4 border-[var(--text-primary)] transform rotate-1">
              <h2 className="text-4xl font-black text-[var(--text-primary)] mb-10 drop-shadow-md">Reach Out Anytime!</h2>
              
              <div className="space-y-8">
                
                <div className="flex items-center gap-6 bg-white p-6 rounded-2xl border-4 border-[var(--text-primary)] hover:scale-[1.02] transition-transform">
                  <div className="bg-[var(--accent-mint)] w-16 h-16 rounded-full border-4 border-[var(--text-primary)] flex items-center justify-center text-3xl shrink-0">
                    📧
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Email</h3>
                    <a href="mailto:aaswin007ips@gmail.com" className="text-xl font-bold text-[var(--text-primary)] hover:underline">
                      aaswin007ips@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 bg-white p-6 rounded-2xl border-4 border-[var(--text-primary)] hover:scale-[1.02] transition-transform">
                  <div className="bg-[var(--accent-coral)] w-16 h-16 rounded-full border-4 border-[var(--text-primary)] flex items-center justify-center text-3xl shrink-0 text-white">
                    📞
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Phone</h3>
                    <a href="tel:+916381877181" className="text-xl font-bold text-[var(--text-primary)] hover:underline">
                      +91 6381877181
                    </a>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t-4 border-[var(--text-primary)]/20">
                  <h3 className="text-2xl font-black text-[var(--text-primary)] mb-6">Business Hours</h3>
                  <div className="space-y-4 font-bold text-lg text-[var(--text-primary)]">
                    <div className="flex justify-between bg-white/50 p-4 rounded-xl border-2 border-[var(--text-primary)]">
                      <span>Mon - Fri</span>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between bg-white/50 p-4 rounded-xl border-2 border-[var(--text-primary)]">
                      <span>Saturday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between bg-[var(--accent-coral)] text-white p-4 rounded-xl border-2 border-[var(--text-primary)]">
                      <span>Sunday</span>
                      <span>Closed for Rest 😴</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form - Bouncy Style */}
            <div className="bg-white rounded-[3rem] p-10 shadow-[12px_12px_0px_var(--text-primary)] border-4 border-[var(--text-primary)] transform -rotate-1">
              <h2 className="text-3xl font-black text-[var(--text-primary)] mb-8">Send a Message 🚀</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-2xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] focus:ring-4 focus:ring-[var(--accent-mint)] p-4 transition-all focus:shadow-[2px_2px_0px_var(--text-primary)] focus:translate-y-1 font-bold text-[var(--text-primary)] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-2xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] focus:ring-4 focus:ring-[var(--accent-mint)] p-4 transition-all focus:shadow-[2px_2px_0px_var(--text-primary)] focus:translate-y-1 font-bold text-[var(--text-primary)] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-2xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] focus:ring-4 focus:ring-[var(--accent-mint)] p-4 transition-all focus:shadow-[2px_2px_0px_var(--text-primary)] focus:translate-y-1 font-bold text-[var(--text-primary)] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full rounded-2xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] focus:ring-4 focus:ring-[var(--accent-mint)] p-4 transition-all focus:shadow-[2px_2px_0px_var(--text-primary)] focus:translate-y-1 font-bold text-[var(--text-primary)] outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Support</option>
                    <option>Feedback</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-2xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] focus:ring-4 focus:ring-[var(--accent-mint)] p-4 transition-all focus:shadow-[2px_2px_0px_var(--text-primary)] focus:translate-y-1 font-bold text-[var(--text-primary)] outline-none resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-5 px-6 rounded-2xl bg-[var(--accent-teal)] border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_var(--text-primary)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_var(--text-primary)] active:translate-y-2 active:shadow-none text-white text-xl font-black transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message ✉️'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Fun Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-[var(--text-primary)]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--accent-yellow)] rounded-[3rem] p-10 max-w-md w-full border-4 border-[var(--text-primary)] shadow-[16px_16px_0px_black] transform rotate-2 animate-bounce">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white border-4 border-[var(--text-primary)] mb-6 shadow-[4px_4px_0px_var(--text-primary)] text-5xl">
                  🎉
                </div>
                <h3 className="text-4xl font-black text-[var(--text-primary)] mb-4 leading-tight">Yay! Message Sent!</h3>
                <p className="text-lg text-[var(--text-primary)] font-medium mb-8 bg-white/50 p-4 rounded-xl border-2 border-[var(--text-primary)]">
                  We've received your note and will be in touch super soon. High five! ✋
                </p>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-2xl bg-white border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] hover:translate-y-1 hover:shadow-none py-4 px-6 text-xl font-black text-[var(--text-primary)] transition-all active:bg-gray-100"
                  onClick={closeModal}
                >
                  Awesome!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactPage;
