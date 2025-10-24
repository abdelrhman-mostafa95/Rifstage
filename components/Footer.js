"use client";

import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#080808] text-gray-300 relative overflow-hidden">
            {/* Blurred Background Effects */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-yellow-700 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-20"></div>

            {/* Footer Content */}
            <div className="relative container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 z-10">

                {/* Brand + Text */}
                <div>
                    <img src="/rifstage-logo.png" alt="Logo" className="h-12 mb-4" />
                    <p className="text-sm leading-relaxed text-gray-400">
                        Rifstage – Your hub for Music, News & Videos. Stay connected with
                        the rhythm of life.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition">Music</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition">News</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition">Videos</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-yellow-400 transition"><Facebook className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-yellow-400 transition"><Twitter className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-yellow-400 transition"><Instagram className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-yellow-400 transition"><Youtube className="w-6 h-6" /></a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Newsletter</h3>
                    <p className="text-sm mb-4 text-gray-400">
                        Subscribe to stay updated with our latest music & news.
                    </p>
                    <form className="flex items-center bg-[#111] rounded-full overflow-hidden shadow-md">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-500 transition flex items-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>

            </div>


            <div className="border-t border-gray-700 mt-8"></div>
            <div className="text-center py-6 text-sm text-gray-500 relative z-10">
                © {new Date().getFullYear()} Rifstage. All rights reserved.
            </div>
        </footer>
    );
}
