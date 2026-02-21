'use client';
import { FaYoutube } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-[var(--text-primary)] relative z-20 mt-10">
      
      {/* Playful Top Wave/Block border (Simulated with absolute div) */}
      <div className="absolute top-0 left-10 w-32 h-4 bg-[var(--text-primary)] rounded-b-xl" />
      <div className="absolute top-0 right-20 w-16 h-4 bg-[var(--text-primary)] rounded-b-xl" />

      {/* Main Footer Content */}
      <div className="max-w-[1350px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Socials Block */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-6">
            <div className="inline-block bg-[var(--accent-coral)] text-white px-6 py-3 rounded-2xl border-4 border-[var(--text-primary)] shadow-[6px_6px_0px_var(--text-primary)] transform -rotate-3">
              <h2 className="text-3xl font-black tracking-tighter">Zion Pets ✨</h2>
            </div>
            <p className="font-bold text-[var(--text-primary)] text-lg bg-neutral-100 p-4 rounded-xl border-2 border-[var(--text-primary)]">
              Happiness delivered, one squishy friend at a time! Adopt your new buddy today!
            </p>
            
            <div className="flex space-x-4 pt-4">
              <a href="https://www.facebook.com/share/1AxmDhh1qz/" target="_blank" className="bg-[var(--accent-yellow)] w-14 h-14 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--text-primary)] flex items-center justify-center text-[var(--text-primary)] transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/zion_pets?igsh=MWV6OHV6cTY1ejEyYQ==" target="_blank" className="bg-[var(--accent-teal)] w-14 h-14 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--text-primary)] flex items-center justify-center text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@zionpets6524" target="_blank" className="bg-[var(--accent-coral)] w-14 h-14 rounded-xl border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--text-primary)] flex items-center justify-center text-white transition-all">
                <span className="sr-only">Youtube</span>
                <FaYoutube className="h-7 w-7"/>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h3 className="inline-block px-4 py-2 border-4 border-[var(--text-primary)] bg-[var(--accent-yellow)] rounded-xl text-xl font-black text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform rotate-1">Shop Flocks!</h3>
            <ul className="space-y-3 font-bold text-lg">
              <li><a href="/silkie" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Silkie</a></li>
              <li><a href="/pleasant" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Pleasant</a></li>
              <li><a href="/bramma" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Bramma</a></li>
              <li><a href="/hen" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Fancy Hens</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-6">
            <h3 className="inline-block px-4 py-2 border-4 border-[var(--text-primary)] bg-[var(--accent-mint)] rounded-xl text-xl font-black text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform -rotate-2">Zion Info</h3>
            <ul className="space-y-3 font-bold text-lg">
              <li><a href="/about" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Our Story</a></li>
              <li><a href="/about" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Team</a></li>
              <li><a href="/about" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Careers</a></li>
              <li><a href="/about" className="text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white px-3 py-1 rounded-lg transition-colors border-2 border-transparent hover:border-[var(--text-primary)]">Blog</a></li>
            </ul>
          </div>

          {/* Contact Block */}
          <div className="space-y-6">
            <h3 className="inline-block px-4 py-2 border-4 border-[var(--text-primary)] bg-white rounded-xl text-xl font-black text-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform rotate-2">Hit Us Up 📞</h3>
            <address className="not-italic space-y-4 font-bold text-lg p-6 bg-[var(--accent-mint)] border-4 border-[var(--text-primary)] rounded-[2rem] shadow-[8px_8px_0px_var(--text-primary)]">
              <div className="hover:-translate-y-1 transition-transform inline-block">
                <p className="text-xs uppercase tracking-widest text-[var(--text-primary)]/70">Phone</p>
                <a href="tel:+916381877181" target="_blank" className="text-[var(--text-primary)] hover:underline decoration-4 underline-offset-4">+91 6381877181</a>
              </div>
              <div className="hover:-translate-y-1 transition-transform inline-block">
                <p className="text-xs uppercase tracking-widest text-[var(--text-primary)]/70">Email</p>
                <a href="mailto:aaswin007ips@gmail.com" target="_blank" className="text-[var(--text-primary)] hover:underline decoration-4 underline-offset-4 break-words leading-tight">aaswin007ips@gmail.com</a>
              </div>
            </address>
          </div>

        </div>
      </div>

      {/* Chunky Copyright & Developer Banner */}
      <div className="w-full bg-[var(--accent-teal)] border-t-4 border-[var(--text-primary)] flex flex-col md:flex-row justify-between items-center px-6 py-4 md:px-12">
        <p className="text-[var(--text-primary)] font-black text-sm md:text-base border-2 border-[var(--text-primary)] bg-white px-4 py-1 rounded-full shadow-[2px_2px_0px_var(--text-primary)] mb-4 md:mb-0 transform -rotate-1">
          &copy; {new Date().getFullYear()} Zion Pet Shop
        </p>
        
        <div className="flex justify-end gap-3 items-center bg-[var(--accent-yellow)] px-6 py-2 rounded-full border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] hover:-translate-y-1 transition-transform cursor-pointer">
          <FaArrowRightLong className="w-5 text-[var(--text-primary)]" />
          <h6 className="text-end text-[var(--text-primary)] font-black text-sm">
            <a href="https://portfolio-git-main-berglins-projects.vercel.app/" target="_blank">Dev: Berglin 💻</a> 
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
