'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

 
    useEffect(() => {
        let mounted = true;

        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data?.session;
            if (session && mounted) {
                const currentUser = session.user;
                setUser(currentUser);

             
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', currentUser.id)
                    .single();

                setRole(profile?.role || 'user');
            }
        };

        fetchUser();

     
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        setRole(profile?.role || 'user');
                    });
            } else {
                setUser(null);
                setRole(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const isActive = (href) => pathname === href;
    const linkClass = (href) =>
        `hover:text-yellow-400 ${isActive(href) ? "text-yellow-400" : "text-white"}`;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsOpen(false);
        router.push("/auth");
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/60 text-white">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
               
                <Link href="/" className="font-bold text-yellow-400 text-xl">
                    <img
                        src="/rifstage-logo.png"
                        alt="Rifstage Logo"
                        className="inline h-10 w-30 ml-2"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 text-sm">
                    <Link className={linkClass("/")} href="/">Home</Link>
                    <Link className={linkClass("/music")} href="/music">Music</Link>
                    <Link className={linkClass("/news")} href="/news">News</Link>
                    <Link className={linkClass("/videos")} href="/videos">Videos</Link>
                    <Link className={linkClass("/playlists")} href="/playlists">Playlists</Link>
                    <Link className={linkClass("/about")} href="/about">About</Link>
                    <Link className={linkClass("/contact")} href="/contact">Contact</Link>

                    {role === "admin" && (
                        <Link className="text-yellow-400" href="/dashboard">Dashboard</Link>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:block px-6 py-2 rounded-full 
                            bg-red-600 text-white font-medium shadow-md 
                            hover:bg-red-700 hover:shadow-lg hover:scale-105 
                            transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push("/auth")}
                            className="hidden md:block px-6 py-2 rounded-full 
                            bg-yellow-400 text-white font-medium shadow-md 
                            hover:bg-yellow-600 hover:shadow-lg hover:scale-105 
                            transition duration-300 ease-in-out"
                        >
                            Login
                        </button>
                    )}

                    {/* Sun Icon */}
                    <Sun className="w-6 h-6 text-yellow-500 hover:rotate-45 hover:scale-125 transition duration-300" />

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black/80 text-white flex flex-col items-center space-y-4 px-4 py-6 animate-slideDown">
                    <Link className={linkClass("/")} href="/">Home</Link>
                    <Link className={linkClass("/music")} href="/music">Music</Link>
                    <Link className={linkClass("/news")} href="/news">News</Link>
                    <Link className={linkClass("/videos")} href="/videos">Videos</Link>
                    <Link className={linkClass("/playlists")} href="/playlists">Playlists</Link>
                    <Link className={linkClass("/about")} href="/about">About</Link>
                    <Link className={linkClass("/contact")} href="/contact">Contact</Link>

                    {role === "admin" && (
                        <Link className="text-yellow-400" href="/dashboard">Dashboard</Link>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="text-red-500">Logout</button>
                    ) : (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push("/auth");
                            }}
                            className="text-yellow-400"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}
