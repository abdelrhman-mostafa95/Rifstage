
export default function AboutPage() {
    return (
        <div className="pt-24  min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-200 mb-4">About  <img
                        src="/rifstage-logo.png"
                        alt="Rifstage Logo"
                        className="inline h-15 w-30 ml-2"
                    /></h1>
                    <p className="text-gray-400 text-lg">
                        RIFSTAGE is a modern platform for music, videos, and news. Our mission is to bring the best entertainment content right to your fingertips.
                    </p>
                </div>

                {/* Mission Card */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-2">Our Mission</h2>
                    <p className="text-gray-400">
                        At RIFSTAGE, our mission is to connect artists with their fans worldwide. We strive to provide a seamless and immersive experience for music lovers, video enthusiasts, and news followers alike.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-2">Our Vision</h2>
                    <p className="text-gray-400">
                        We envision a world where every artist can share their creativity effortlessly, and every user can enjoy high-quality content on-demand. RIFSTAGE is committed to innovation, accessibility, and user satisfaction.
                    </p>
                </div>

                {/* Features Card */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-gray-200 mb-2">Features</h2>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        <li>Stream trending music and videos</li>
                        <li>Stay updated with latest news</li>
                        <li>Create and manage your playlists</li>
                        <li>User-friendly interface and responsive design</li>
                        <li>Dark mode for comfortable viewing</li>
                    </ul>
                </div>

                {/* Footer Note */}
                <div className="bg-black rounded-xl border border-gray-800 shadow-md p-6 text-center">
                    <p className="text-gray-400">
                        RIFSTAGE © 2025. All rights reserved. Built with passion for music and entertainment.
                    </p>
                </div>
            </div>
        </div>
    );
}
