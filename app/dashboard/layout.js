'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAccess = async () => {
            try {
                // ✅ 1. نجيب السيشن
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                const session = sessionData?.session;

                // 🚫 لو مفيش سيشن → روح للوجين
                if (!session) {
                    router.replace('/login');
                    return;
                }

                const userId = session.user.id;

                // ✅ 2. نجيب بيانات المستخدم من جدول profiles
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', userId)
                    .single();

                if (profileError) throw profileError;

                // ✅ 3. لو role = admin → اسمح له بالدخول
                if (profile?.role === 'admin') {
                    setAllowed(true);
                } else {
                    // 🚫 غير أدمن → روح للهوم
                    router.replace('/');
                }
            } catch (err) {
                console.error('Auth check error:', err.message);
                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAccess();

        // ✅ نسمع لأي تغيّر في حالة الدخول/الخروج
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.replace('/login');
            } else {
                checkAccess(); // لو اتغير المستخدم نعيد التحقق
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [router]);

    if (loading) {
        return (
            <div className="text-white p-10 text-center text-xl">
                Checking admin access...
            </div>
        );
    }

    if (!allowed) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 mt-15">
            <aside className="col-span-12 md:col-span-3">
                <DashboardSidebar />
            </aside>
            <section className="col-span-12 md:col-span-9 bg-zinc-900 rounded-2xl shadow-md p-6">
                {children}
            </section>
        </div>
    );
}
