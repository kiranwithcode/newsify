'use client';
import { FiLogIn, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/authSlice';
import { signOut } from 'next-auth/react';

const Header = () => {
  const { user }: any = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(user, 'user');

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    await signOut({ redirect: false });
    router.push('/news');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white w-full shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* If No User */}
      {!user ? (
        <Link href="/login" className="flex items-center space-x-2 text-blue-600">
          <FiLogIn />
          <span>Login</span>
        </Link>
      ) : (
        // User Dropdown
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>{user.name}</span>
            <FiChevronDown />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
              <p className="px-4 py-2 text-gray-700 border-b">{user.name}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <FiLogOut />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
