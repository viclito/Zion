'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiHome, FiBox, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiShoppingCart, FiMessageSquare, FiTag, FiSearch, FiBell, FiInbox
} from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Inbox & Inquiries', href: '/admin/inquiries', icon: FiInbox },
    { name: 'Orders & Chats', href: '/admin/orders', icon: FiShoppingCart },
    { name: 'Offers & Promos', href: '/admin/offers', icon: FiTag },
    { name: 'Silkie Inventory', href: '/admin/silkie', icon: FiBox },
    { name: 'Pleasant Inventory', href: '/admin/pleasant', icon: FiBox },
    { name: 'Bramma Inventory', href: '/admin/bramma', icon: FiBox },
    { name: 'Fancy Hen Inventory', href: '/admin/hen', icon: FiBox },
  ];

  return (
    <div className="flex h-screen bg-[#FAF9F6] font-[family-name:var(--font-nunito)]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#1E3A2F] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-8">
          <Link href="/admin" className="text-[22px] font-black flex items-center gap-3">
            <span className="text-2xl">🌱</span> Zion Admin
          </Link>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {adminLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-[14px] transition-colors font-semibold text-sm ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-[22px] h-[22px] ${isActive ? 'text-white' : 'text-white/60'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 mx-6 mb-8 relative overflow-hidden rounded-[20px] bg-[#2A473D] border border-white/5">
          <div className="relative z-10 flex flex-col gap-2">
             <h4 className="font-bold text-sm text-white flex items-center gap-2"><FiLogOut /> Session Control</h4>
             <p className="text-[11px] leading-relaxed text-white/60 mt-1">Disconnect securely from your administrator access.</p>
             <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full py-2.5 mt-3 text-xs font-bold text-white bg-red-500/80 rounded-xl hover:bg-red-500 transition-colors">
               Sign Out Securely
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-[88px] bg-[#FAF9F6] flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-500 rounded-xl bg-white shadow-sm border border-gray-100" onClick={() => setSidebarOpen(true)}>
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-gray-100 w-[400px] shadow-sm">
              <FiSearch className="w-[18px] h-[18px] text-gray-400" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none w-full text-[13px] font-semibold text-gray-700 placeholder:text-gray-400" />
              <span className="text-gray-400 text-[10px] font-bold border border-gray-200 rounded-md px-2 py-0.5">⌘F</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <FiBell className="w-[22px] h-[22px]" />
              <span className="absolute -top-0.5 -right-0.5 w-[9px] h-[9px] bg-emerald-500 border-2 border-[#FAF9F6] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-full bg-[#1E3A2F] text-white flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-white shadow-sm">
                {(session?.user?.name || 'A')[0].toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-[13px] font-bold text-gray-800 leading-tight">
                  {session?.user?.name || 'Admin'}
                </p>
                <p className="text-[11px] font-semibold text-gray-500">
                  {session?.user?.email || 'Super Admin'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 lg:p-10 text-gray-800">
           {children}
        </main>
      </div>
    </div>
  );
}
