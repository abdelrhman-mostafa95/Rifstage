"use client";
import { supabase } from "../lib/supabase";

/* ============================================
   📦 Upload Helper (رفع الصورة)
============================================ */
async function uploadCover(file) {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from("playlist-files")
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
        .from("playlist-files")
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
}

/* ============================================
   🎵 PLAYLISTS - CRUD FUNCTIONS
============================================ */

/** 🔹 إنشاء Playlist جديدة */
export async function addPlaylist({ name, description, producer_name, release_date }, coverFile) {
    const cover_url = await uploadCover(coverFile);

    const { data, error } = await supabase
        .from("playlists")
        .insert([
            {
                title: name,
                description,
                producer_name, // 🆕 الشركة المنتجة
                release_date, // 🆕 تاريخ النشر
                cover_url,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error("🔴 Supabase insert error:", error);
        throw error;
    }
    return data;
}

/** 🔹 جلب كل الـ Playlists */
export async function getPlaylists() {
    const { data, error } = await supabase
        .from("playlists")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

/** 🔹 جلب Playlist واحدة بكل الأغاني */
export async function getPlaylistWithSongs(playlistId) {
    const { data, error } = await supabase
        .from("playlists")
        .select(`
            *,
            playlist_songs(*)
        `)
        .eq("id", playlistId)
        .single();

    if (error) throw error;
    return data;
}

/** 🔹 تحديث بيانات Playlist */
export async function updatePlaylist(playlistId, updates, coverFile) {
    let cover_url = updates.cover_url || null;

    if (coverFile) {
        cover_url = await uploadCover(coverFile);
    }

    const { data, error } = await supabase
        .from("playlists")
        .update({
            title: updates.name,
            description: updates.description,
            producer_name: updates.producer_name, // 🆕
            release_date: updates.release_date, // 🆕
            cover_url,
        })
        .eq("id", playlistId)
        .select()
        .single();

    if (error) {
        console.error("🔴 Supabase update error:", error);
        throw error;
    }
    return data;
}

/** 🔹 حذف Playlist */
export async function deletePlaylist(playlistId) {
    const { data: playlist, error: fetchError } = await supabase
        .from("playlists")
        .select("cover_url")
        .eq("id", playlistId)
        .single();

    if (fetchError) throw fetchError;

    if (playlist?.cover_url) {
        try {
            const url = playlist.cover_url;
            const path = url.split("/playlist-files/")[1];

            if (path) {
                const { error: deleteFileError } = await supabase.storage
                    .from("playlist-files")
                    .remove([path]);

                if (deleteFileError) console.warn("⚠️ Error deleting file:", deleteFileError);
            }
        } catch (err) {
            console.warn("⚠️ Failed to clean cover file:", err);
        }
    }

    const { error } = await supabase
        .from("playlists")
        .delete()
        .eq("id", playlistId);

    if (error) throw error;

    return true;
}

/* ============================================
   🎶 SONGS INSIDE PLAYLISTS
============================================ */

/** 🔹 إضافة أغنية إلى Playlist */
export async function addSongToPlaylist({ playlist_id, title, artist, audio_file, cover_file }) {
    let audio_url = null;
    let cover_url = null;

    if (audio_file) {
        const audioExt = audio_file.name.split(".").pop();
        const audioName = `${Date.now()}.${audioExt}`;
        const audioPath = `songs/${audioName}`;

        const { error: audioError } = await supabase.storage
            .from("playlist-files")
            .upload(audioPath, audio_file);

        if (audioError) throw audioError;

        const { data: audioPublic } = supabase.storage
            .from("playlist-files")
            .getPublicUrl(audioPath);
        audio_url = audioPublic.publicUrl;
    }

    if (cover_file) {
        const coverExt = cover_file.name.split(".").pop();
        const coverName = `${Date.now()}.${coverExt}`;
        const coverPath = `covers/${coverName}`;

        const { error: coverError } = await supabase.storage
            .from("playlist-files")
            .upload(coverPath, cover_file);

        if (coverError) throw coverError;

        const { data: coverPublic } = supabase.storage
            .from("playlist-files")
            .getPublicUrl(coverPath);
        cover_url = coverPublic.publicUrl;
    }

    const { data, error } = await supabase
        .from("playlist_songs")
        .insert([{ playlist_id, title, artist, audio_url, cover_url }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

/** 🔹 تحديث بيانات أغنية */
export async function updateSong(songId, updates) {
    const { data, error } = await supabase
        .from("playlist_songs")
        .update(updates)
        .eq("id", songId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/** 🔹 حذف أغنية */
export async function deleteSong(songId) {
    const { data: song, error: fetchError } = await supabase
        .from("playlist_songs")
        .select("audio_url, cover_url")
        .eq("id", songId)
        .single();

    if (fetchError) throw fetchError;

    const deleteFromBucket = async (url) => {
        if (!url) return;
        try {
            const path = url.split("/playlist-files/")[1];
            if (path) {
                const { error: deleteError } = await supabase.storage
                    .from("playlist-files")
                    .remove([path]);
                if (deleteError) console.warn("⚠️ Error deleting file:", deleteError);
            }
        } catch (err) {
            console.warn("⚠️ Failed to clean file:", err);
        }
    };

    await deleteFromBucket(song?.audio_url);
    await deleteFromBucket(song?.cover_url);

    const { error } = await supabase
        .from("playlist_songs")
        .delete()
        .eq("id", songId);

    if (error) throw error;
    return true;
}

/** 🔹 جلب أغاني Playlist معينة */
export const getSongsByPlaylist = async (playlistId) => {
    const { data: playlist, error: playlistError } = await supabase
        .from("playlists")
        .select("*")
        .eq("id", playlistId)
        .single();

    if (playlistError) {
        console.error("❌ Playlist fetch error:", playlistError);
        throw playlistError;
    }

    const { data: songs, error: songsError } = await supabase
        .from("playlist_songs")
        .select("*")
        .eq("playlist_id", playlistId)
        .order("created_at", { ascending: false });

    if (songsError) {
        console.error("❌ Songs fetch error:", songsError);
        throw songsError;
    }

    console.log("✅ Songs found:", songs);

    return { playlist, songs: songs || [] };
};
