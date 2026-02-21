'use client';
import { FiMoreHorizontal } from 'react-icons/fi';
import { usePets } from '@/hooks/usePets';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: pets, isLoading, isError } = usePets('all');

  // Additional Stats States
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loadingOtherStats, setLoadingOtherStats] = useState(true);

  useEffect(() => {
    const fetchOtherStats = async () => {
      try {
        const [ordersRes, offersRes, inquiriesRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/offers'),
          fetch('/api/inquiries')
        ]);

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }
        if (offersRes.ok) {
          const offersData = await offersRes.json();
          setOffers(offersData.offers || []);
        }
        if (inquiriesRes.ok) {
          const inquiriesData = await inquiriesRes.json();
          setInquiries(inquiriesData.inquiries || []);
        }
      } catch (err) {
        console.error('Failed to fetch auxiliary stats', err);
      } finally {
        setLoadingOtherStats(false);
      }
    };
    fetchOtherStats();
  }, []);

  const stats = [
    { title: 'Total Inventory', value: pets?.length || 0, trend: '+4.2%', isPositive: true, subtitle: 'Total listed on Zion', color: 'green', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { title: 'Available Pets', value: pets?.filter(p => p.avail?.toLowerCase() === 'available').length || 0, trend: '+12.5%', isPositive: true, subtitle: 'Ready for adoption', color: 'orange', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Breed Types', value: 4, trend: '0%', isPositive: true, subtitle: 'Active categories listed', color: 'teal', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { title: 'Total Orders', value: orders.length, trend: 'Active', isPositive: true, subtitle: `${orders.filter(o => o.status === 'Pending').length} pending`, color: 'purple', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Live Offers', value: offers.filter(o => o.isActive).length, trend: 'Campaigns', isPositive: true, subtitle: 'Currently running promos', color: 'pink', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { title: 'User Inquiries', value: inquiries.length, trend: 'Messages', isPositive: true, subtitle: `${inquiries.filter(i => i.status === 'New').length} unread`, color: 'blue', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-10">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[24px] p-7 shadow-[0px_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50 flex flex-col justify-between h-[180px]">
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <div className={`p-2.5 rounded-[12px] bg-gray-50 text-[var(--accent-${stat.color})]`}>
                    <svg className="w-[22px] h-[22px] stroke-current" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon}></path></svg>
                 </div>
                 <h3 className="font-bold text-[15px] text-gray-800">{stat.title}</h3>
               </div>
               <button className="text-gray-300 hover:text-gray-600 transition-colors"><FiMoreHorizontal className="w-[22px] h-[22px]"/></button>
             </div>
             
              <div className="mt-4">
               <div className="flex items-end gap-3">
                 <h2 className="text-[38px] leading-none font-black text-gray-900">
                   {isLoading || loadingOtherStats ? '...' : isError ? 'Err' : stat.value}
                 </h2>
                 <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md mb-1.5 ${stat.color === 'green' ? 'bg-emerald-50 text-emerald-600' : stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : stat.color === 'pink' ? 'bg-pink-50 text-pink-600' : stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                   {stat.trend}
                 </span>
               </div>
               <p className="text-[12px] font-semibold text-gray-400 mt-2.5">{stat.subtitle}</p>
             </div>
          </div>
        ))}
      </div>

    </div>
  );
}
