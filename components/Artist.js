"use client";

export default function Artist() {
    const playlists = [
        {
            title: "Faouzia",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuCOK7xo3x86NlTLmu8t9RM5emwkabKXlYA&s",
        },
        {
            title: "Naji",
            img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEis_6IoDBY2670JmnwhpEnnnMyGfCglzwdsJ5T_sph3MVOWJIPUkHvD_90CjfHPk87yxcKxyhrGJXjpKmjHqo1ZJueb2kVFpa2wTLlccLIPIBOMs0ciapQj6K2iUfFX01sNiRcoEfOecUWW/s2048/IMG_5291.jpeg",
        },
        {
            title: "Amr Diab",
            img: "https://i1.sndcdn.com/artworks-000685199479-1lo93n-t500x500.jpg",
        },
        {
            title: "Tamer Hosny",
            img: "https://i1.sndcdn.com/artworks-nIAzetRNoSFg9cHY-atrbNw-t500x500.jpg",
        },
        {
            title: "Hamza Namera",
            img: "https://a.asd.homes/wp-content/uploads/2021/01/30EED9E1-7CAA-4336-B9EE-3B93FAF408C1.jpg",
        },
    ];

    return (
        <section className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-600 tracking-wide">
                A TUNE FOR EVERY VIBE
            </h2>
            <p className="text-gray-500 mb-12 text-lg">
                Explore playlists for any moment of your day
            </p>

            <div className="flex justify-center gap-0 md:gap-2 relative">
                {playlists.map((playlist, i) => {
                    const angle = (i - (playlists.length - 1) / 2) * 8;

                    return (
                        <div
                            key={i}
                            style={{ transform: `rotate(${angle}deg)` }}
                            className="relative w-32 h-40 md:w-44 md:h-56 -mx-6 md:-mx-8 cursor-pointer group 
                        transition-transform duration-500 hover:scale-110 hover:-translate-y-6 hover:rotate-0 hover:z-50"
                        >
                            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
                                <img
                                    src={playlist.img}
                                    alt={playlist.title}
                                    className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500">
                                    <p className="text-white text-lg font-semibold mb-3 drop-shadow-lg">
                                        {playlist.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
