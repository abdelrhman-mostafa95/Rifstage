"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <section className="min-h-screen bg-gray-950 flex flex-col justify-center items-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"
            ></motion.div>

            <h2 className="text-yellow-500 text-xl font-semibold mt-6 tracking-wide">
                Loading News...
            </h2>
        </section>
    );
}
