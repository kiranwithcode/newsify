'use client';
// app/dashboard/layout
import AuthProvider from '@/components/auth/AuthProvider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/Dashborad/Layout';
import { useAppSelector } from '@/lib/hooks';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        if (!user && pathname !== '/news') {
            router.push('/news');
        }
    }, [user, pathname, router]);

    if (!isMounted) return null;

    if (!user && pathname === '/news') {
        return <main className="p-6">{children}</main>;
    }

    return (
        <div className="min-h-screen">
            <Layout>
                <AuthProvider>
                    <ProtectedRoute>
                        {children}
                    </ProtectedRoute>
                </AuthProvider>
            </Layout>
        </div>
    );
};

export default DashboardLayout;

