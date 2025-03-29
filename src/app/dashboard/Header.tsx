'use client';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useAppSelector } from '@/lib/hooks';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/authSlice';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      {/* Logo Section */}
      <h1 className="text-2xl font-bold text-blue-600">Newsify</h1>
      
      {/* Navigation */}
      <nav className="space-x-6">
        <Link href="/news" className="text-gray-700 hover:text-blue-500">News</Link>
        {user && (
          <>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
            <Link href="/dashboard/payout" className="text-gray-700 hover:text-blue-500">Payout</Link>
          </>
        )}
      </nav>

      {/* Conditional Buttons */}
      {user ? (
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      ) : (
        <Link href="/login" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <FiLogIn size={18} />
          <span>Login</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
