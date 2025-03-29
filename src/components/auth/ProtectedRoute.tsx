// src/components/auth/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.email) {
      router.push('/login');
    } else if (role && user?.role !== role) {
      router.push('/unauthorized');
    }
  }, [router, role]);

  return <>{children}</>;
}
