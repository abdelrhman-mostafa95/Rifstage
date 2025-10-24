export default function ContactPage() {
    return (
        <div className="pt-24  min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-200 mb-4">Contact Us</h1>
                    <p className="text-gray-400 text-lg">
                        We'd love to hear from you! Reach out for support, feedback, or inquiries.
                    </p>
                </div>

                {/* Contact Info Card */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-2">Email</h2>
                    <p className="text-gray-400">contact@rifstage.com</p>
                </div>

                {/* Optional Contact Form Card */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-4">Send us a message</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-500 transition"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-500 transition"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={4}
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-yellow-500 transition"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
