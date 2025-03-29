'use client';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { FiHome, FiFileText, FiDollarSign, FiLogOut } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/authSlice';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    await signOut({ redirect: false });
    router.push('/news');
  };

  if (!user) {
    router.push('/news');
    return null;
  }

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <FiHome size={24} /> },
    { name: 'News', href: '/dashboard/news', icon: <FiFileText size={24} /> },
    ...(user.role === 'admin'
      ? [{ name: 'Payout', href: '/dashboard/payout', icon: <FiDollarSign size={24} /> }]
      : []),
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300
        ${isExpanded ? 'w-64' : 'w-20'} 
        md:w-64 md:hover:w-64
        flex flex-col`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <span className="text-2xl font-bold text-blue-500">Newsify</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-4 my-2 rounded-lg transition duration-200 ${
              pathname === item.href ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`}
          >
            {item.icon}
            {/* Hide text below md (768px) */}
            <span className={`ml-4 ${isExpanded ? 'block' : 'hidden'} md:block`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
