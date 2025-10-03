import "./Hero.css";

function Hero() {
  return (
    <section
      className="relative w-full h-screen flex justify-center items-center 
  bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/0"
    >
      <div className="absolute md:block top-[50px] left-[50px] w-72 h-72 bg-yellow-700 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="absolute md:block bottom-0 right-[50px] w-72 h-72 bg-yellow-700 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
      <div
        className="block md:hidden absolute bottom-0 right-1/2 translate-x-1/2 
  w-64 h-64 rounded-full blur-2xl bg-gradient-radial from-black/20 to-transparent"
      ></div>
      <div className="relative z-10 text-center text-white max-w-2xl px-4 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 mt-10">
          Discover the World of Music in{" "}
          <img
            src="rifstage-logo.png"
            alt="Rifstage Logo"
            className="inline h-20 w-50 ml-2"
          />
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Discover the latest music, news, and videos all in one place.
        </p>
        <button
          className="relative bg-yellow-500 text-black px-6 py-3 m-3 rounded-full font-semibold 
          shadow-md transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(234,179,8,0.5)]
          hover:scale-105 animate-glow"
        >
          Start Listening Now
        </button>

        <button
          className="relative border border-yellow-500 text-yellow-500 px-6 py-3 rounded-full font-semibold 
          shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black 
          hover:shadow-[0_0_20px_5px_rgba(234,179,8,0.7)] hover:scale-105 animate-glow"
        >
          Most Popular
        </button>
      </div>
    </section>
  );
}

export default Hero;
