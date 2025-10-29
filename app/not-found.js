"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <section className="min-h-screen bg-gray-950 flex flex-col justify-center items-center text-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-black/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-10 max-w-md"
            >
                <h1 className="text-7xl font-extrabold text-yellow-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
                <p className="text-gray-400 mb-6">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-yellow-500 text-black font-medium px-6 py-3 rounded-full hover:bg-yellow-400 transition-all duration-300"
                >
                    Back to Home
                </Link>
            </motion.div>
        </section>
    );
}
