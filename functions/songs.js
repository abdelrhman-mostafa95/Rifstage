import { supabase } from '../lib/supabase';

/* ===================================================
   ✅ دالة رفع الملف (وترجع: { url, path })
=================================================== */
const uploadFile = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`; // audio/... أو covers/...

    const { error: uploadError } = await supabase.storage
        .from('songs') // اسم الـ bucket
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    // ✅ الحصول على الـ public URL
    const { data } = supabase.storage.from('songs').getPublicUrl(filePath);

    return {
        url: data.publicUrl,
        path: filePath, // نحفظ المسار داخل الـ bucket
    };
};

/* ===================================================
   ✅ إضافة أغنية جديدة
=================================================== */
export const addSong = async (songData, audioFile, coverFile) => {
    try {
        let audioUrl = null;
        let audioPath = null;
        let coverUrl = null;
        let coverPath = null;

        // ✅ رفع الملفات إذا وجدت
        if (audioFile) {
            const audio = await uploadFile(audioFile, 'audio');
            audioUrl = audio.url;
            audioPath = audio.path;
        }

        if (coverFile) {
            const cover = await uploadFile(coverFile, 'covers');
            coverUrl = cover.url;
            coverPath = cover.path;
        }

        // ✅ حفظ البيانات في قاعدة البيانات
        const { data, error } = await supabase
            .from('songs')
            .insert([
                {
                    title: songData.title,
                    artist: songData.artist,
                    audio_url: audioUrl,
                    cover_url: coverUrl,
                    storage_path: audioPath,
                    cover_path: coverPath,
                },
            ])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('❌ Error adding song:', error);
        throw error;
    }
};

/* ===================================================
   ✅ تحديث أغنية موجودة (مع حذف الملفات القديمة من فولدراتها الصحيحة)
=================================================== */
export const updateSong = async (id, songData, audioFile, coverFile) => {
    try {
        // جلب بيانات الأغنية القديمة
        const oldSong = await getSong(id);

        const updateData = {
            title: songData.title,
            artist: songData.artist,
        };

        // ✅ لو فيه ملف صوتي جديد نرفعه ونحذف القديم من audio/
        if (audioFile) {
            if (oldSong.storage_path && oldSong.storage_path.startsWith('audio/')) {
                const { error: audioDeleteError } = await supabase.storage
                    .from('songs')
                    .remove([oldSong.storage_path]);
                if (audioDeleteError)
                    console.warn('⚠️ Error deleting old audio:', audioDeleteError);
            }

            const audio = await uploadFile(audioFile, 'audio');
            updateData.audio_url = audio.url;
            updateData.storage_path = audio.path;
        }

        // ✅ لو فيه غلاف جديد نرفعه ونحذف القديم من covers/
        if (coverFile) {
            if (oldSong.cover_path && oldSong.cover_path.startsWith('covers/')) {
                const { error: coverDeleteError } = await supabase.storage
                    .from('songs')
                    .remove([oldSong.cover_path]);
                if (coverDeleteError)
                    console.warn('⚠️ Error deleting old cover:', coverDeleteError);
            }

            const cover = await uploadFile(coverFile, 'covers');
            updateData.cover_url = cover.url;
            updateData.cover_path = cover.path;
        }

        // ✅ تحديث البيانات في الجدول
        const { data, error } = await supabase
            .from('songs')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('❌ Error updating song:', error);
        throw error;
    }
};

/* ===================================================
   ✅ جلب كل الأغاني
=================================================== */
export const getSongs = async () => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

/* ===================================================
   ✅ جلب أغنية واحدة
=================================================== */
export const getSong = async (id) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

/* ===================================================
   ✅ حذف أغنية (من الجدول + من فولدرات audio / covers)
=================================================== */
const cleanPath = (url) => {
    if (!url) return null;
    try {
        // مثال URL: https://xyz.supabase.co/storage/v1/object/public/songs/audio/12345.mp3
        const parts = url.split('/storage/v1/object/public/songs/');
        return parts.length > 1 ? parts[1] : url; // النتيجة: audio/12345.mp3
    } catch {
        return url;
    }
};

// 🗑️ حذف أغنية من القاعدة والـ storage معًا
export const deleteSong = async (id) => {
    try {
        // جلب بيانات الأغنية قبل حذفها
        const { data: song, error: fetchError } = await supabase
            .from('songs')
            .select('audio_url, cover_url, storage_path, cover_path')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        // مسح الملفات من Supabase Storage
        const filesToDelete = [];

        if (song?.audio_url) filesToDelete.push(cleanPath(song.audio_url));
        if (song?.cover_url) filesToDelete.push(cleanPath(song.cover_url));
        if (song?.storage_path) filesToDelete.push(song.storage_path);
        if (song?.cover_path) filesToDelete.push(song.cover_path);

        for (const filePath of filesToDelete) {
            console.log("🧾 trying to delete:", filePath);
            if (filePath) {
                const { error: deleteError } = await supabase.storage
                    .from('songs')
                    .remove([filePath]);

                if (deleteError) console.warn(`⚠️ فشل حذف الملف: ${filePath}`, deleteError);
            }
        }

        // حذف الأغنية من الجدول
        const { error } = await supabase.from('songs').delete().eq('id', id);
        if (error) throw error;

        console.log("✅ تم حذف الأغنية وجميع ملفاتها بنجاح");
    } catch (error) {
        console.error('Error deleting song:', error);
        throw error;
    }
};
