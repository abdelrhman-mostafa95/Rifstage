'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState('login'); 
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

   
    const adminEmails = ['abdelrhman.mostafa1095@gmail.com']; 

  
    useEffect(() => {
        let mounted = true;
        (async () => {
            const { data } = await supabase.auth.getSession();
            const session = data?.session;
            if (session && mounted) {
                const user = session.user;
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                const role = profile?.role || 'user';
                router.replace(role === 'admin' ? '/dashboard' : '/');
            }
        })();
        return () => { mounted = false; };
    }, [router]);

    const slideVariants = {
        enterRight: { x: 400, opacity: 0 },
        enterLeft: { x: -400, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exitLeft: { x: -400, opacity: 0 },
        exitRight: { x: 400, opacity: 0 },
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);
        try {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
            }, { data: { full_name: displayName } });

            if (error) throw error;

            if (data?.user) {
              
                const assignedRole = adminEmails.includes(email) ? 'admin' : 'user';

                await supabase.from('profiles').upsert({
                    id: data.user.id,
                    email,
                    full_name: displayName || null,
                    role: assignedRole,
                }, { returning: 'minimal' });
            }

            setMsg('Account created successfully. You can now log in.');
            setMode('login');
            setPassword('');
        } catch (err) {
            setMsg(err?.message || 'Something went wrong during registration');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg(null);
        try {
            const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const user = data?.user;
            if (!user) {
                setMsg('Login failed');
                setLoading(false);
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            const role = profile?.role || 'user';
            router.replace(role === 'admin' ? '/dashboard' : '/');
        } catch (err) {
            setMsg(err?.message || 'Something went wrong during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
            {/* background shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-red-700/20 blur-3xl" />
                <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-yellow-300/10 blur-3xl" />
            </div>

            {/* container */}
            <div className="w-full max-w-3xl mx-auto px-4">
                <div className="backdrop-blur-md bg-white/6 border border-white/10 rounded-2xl shadow-lg overflow-hidden">
                    {/* header */}
                    <div className="flex items-center justify-between gap-4 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <img src="/rifstage-logo.png" alt="Rifstage" className="h-10 w-auto" />
                        </div>

                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => setMode('login')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${mode === 'login' ? 'bg-white text-red-600' : 'bg-white/10 text-white/80'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setMode('register')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${mode === 'register' ? 'bg-white text-red-600' : 'bg-white/10 text-white/80'}`}
                            >
                                Sign up
                            </button>
                        </div>

                        {/* mobile toggles */}
                        <div className="sm:hidden flex gap-2">
                            <button
                                onClick={() => setMode('login')}
                                className={`px-3 py-1 rounded-full text-xs ${mode === 'login' ? 'bg-white text-red-600' : 'bg-white/10 text-white/80'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setMode('register')}
                                className={`px-3 py-1 rounded-full text-xs ${mode === 'register' ? 'bg-white text-red-600' : 'bg-white/10 text-white/80'}`}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>

                    {/* message */}
                    {msg && (
                        <div className="px-6">
                            <div className="text-sm text-yellow-300 bg-white/5 p-3 rounded mb-4">{msg}</div>
                        </div>
                    )}

                    {/* forms area */}
                    <div className="px-6 pb-8">
                        <div className="relative">
                            <AnimatePresence mode="wait" initial={false}>
                                {mode === 'login' && (
                                    <motion.form
                                        key="login"
                                        initial="enterLeft"
                                        animate="center"
                                        exit="exitLeft"
                                        variants={slideVariants}
                                        transition={{ type: 'spring', stiffness: 220, damping: 30 }}
                                        onSubmit={handleLogin}
                                        className="w-full"
                                    >
                                        <div className="grid gap-3">
                                            <label className="text-sm text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                                                placeholder="you@example.com"
                                            />

                                            <label className="text-sm text-gray-300">Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                                                placeholder="••••••••"
                                            />

                                            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full sm:w-auto px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:scale-[1.02] transition"
                                                >
                                                    {loading ? 'Loading...' : 'Login'}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => { setMode('register'); setMsg(null); }}
                                                    className="w-full sm:w-auto px-6 py-2 rounded-full bg-white/6 text-white border border-white/10 hover:brightness-105 transition"
                                                >
                                                    Create account
                                                </button>
                                            </div>
                                        </div>
                                    </motion.form>
                                )}

                                {mode === 'register' && (
                                    <motion.form
                                        key="register"
                                        initial="enterRight"
                                        animate="center"
                                        exit="exitRight"
                                        variants={slideVariants}
                                        transition={{ type: 'spring', stiffness: 220, damping: 30 }}
                                        onSubmit={handleRegister}
                                        className="w-full"
                                    >
                                        <div className="grid gap-3">
                                            <label className="text-sm text-gray-300">Full Name</label>
                                            <input
                                                type="text"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                                                placeholder="Your name"
                                            />

                                            <label className="text-sm text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                                                placeholder="you@example.com"
                                            />

                                            <label className="text-sm text-gray-300">Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none"
                                                placeholder="••••••••"
                                            />

                                            <div className="flex flex-col gap-3 mt-2">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:scale-[1.02] transition"
                                                >
                                                    {loading ? 'Loading...' : 'Create Account'}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => { setMode('login'); setMsg(null); }}
                                                    className="w-full px-6 py-2 rounded-full bg-white/6 text-white border border-white/10 hover:brightness-105 transition"
                                                >
                                                    Back to Login
                                                </button>
                                            </div>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="px-6 pb-6 text-center text-xs text-gray-400">
                        <div>RifStage — All rights reserved</div>
                        <div className="mt-2">Contact us if you face any issue.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
