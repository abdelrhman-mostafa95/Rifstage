"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data?.session;

            if (session) {
                setUser(session.user);

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", session.user.id)
                    .single();

                setRole(profile?.role || "user");
            }
        };

        fetchUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
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
        setUser(null);
        setRole(null);
        router.push("/auth");
        setIsOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/60 text-white">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="font-bold text-yellow-400 text-xl">
                    <img src="/rifstage-logo.png" className="inline h-10 w-30 ml-2" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 text-sm">
                    <Link className={linkClass("/")} href="/">Home</Link>
                    <Link className={linkClass("/music")} href="/music">Music</Link>
                    <Link className={linkClass("/news")} href="/news">News</Link>
                    <Link className={linkClass("/videos")} href="/videos">Videos</Link>
                    <Link className={linkClass("/about")} href="/about">About</Link>
                    <Link className={linkClass("/contact")} href="/contact">Contact</Link>
                    {mounted && role === "admin" && (
                        <Link className="text-yellow-400" href="/dashboard">Dashboard</Link>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {mounted && user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:block px-6 py-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : mounted ? (
                        <button
                            onClick={() => router.push("/auth")}
                            className="hidden md:block px-6 py-2 rounded-full bg-yellow-400 text-white shadow-md hover:bg-yellow-600"
                        >
                            Login
                        </button>
                    ) : null}

                    <Sun className="w-6 h-6 text-yellow-500" />

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* ✅ Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/90 text-white flex flex-col items-center space-y-4 px-4 py-6 animate-slideDown">
                    <Link className={linkClass("/")} href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link className={linkClass("/music")} href="/music" onClick={() => setIsOpen(false)}>Music</Link>
                    <Link className={linkClass("/news")} href="/news" onClick={() => setIsOpen(false)}>News</Link>
                    <Link className={linkClass("/videos")} href="/videos" onClick={() => setIsOpen(false)}>Videos</Link>
                    <Link className={linkClass("/about")} href="/about" onClick={() => setIsOpen(false)}>About</Link>
                    <Link className={linkClass("/contact")} href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

                    {mounted && role === "admin" && (
                        <Link className="text-yellow-400" href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    )}

                    {mounted && user ? (
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
