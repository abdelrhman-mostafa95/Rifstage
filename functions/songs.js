import { supabase } from '../lib/supabase';

// ✅ دالة رفع الملف
const uploadFile = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from('songs')
        .upload(filePath, file);

    if (error) throw error;

    // الحصول على الـ public URL
    const { data } = supabase.storage.from('songs').getPublicUrl(filePath);
    return data.publicUrl;
};

// ✅ إضافة أغنية جديدة
export const addSong = async (songData, audioFile, coverFile) => {
    try {
        // رفع الملفات والحصول على الـ URLs
        const audioUrl = audioFile ? await uploadFile(audioFile, 'audio') : null;
        const coverUrl = coverFile ? await uploadFile(coverFile, 'covers') : null;

        // حفظ البيانات في قاعدة البيانات
        const { data, error } = await supabase
            .from('songs')
            .insert([
                {
                    title: songData.title,
                    artist: songData.artist,
                    audio_url: audioUrl,
                    cover_url: coverUrl,
                }
            ])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error adding song:', error);
        throw error;
    }
};

// ✅ تحديث أغنية موجودة
export const updateSong = async (id, songData, audioFile, coverFile) => {
    try {
        // البيانات الأساسية للتحديث
        const updateData = {
            title: songData.title,
            artist: songData.artist,
        };

        // رفع ملف صوتي جديد إذا تم اختياره
        if (audioFile) {
            updateData.audio_url = await uploadFile(audioFile, 'audio');
        }

        // رفع صورة غلاف جديدة إذا تم اختيارها
        if (coverFile) {
            updateData.cover_url = await uploadFile(coverFile, 'covers');
        }

        const { data, error } = await supabase
            .from('songs')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error updating song:', error);
        throw error;
    }
};

// ✅ جلب كل الأغاني
export const getSongs = async () => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};

// ✅ جلب أغنية واحدة
export const getSong = async (id) => {
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// ✅ حذف أغنية
export const deleteSong = async (id) => {
    const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', id);

    if (error) throw error;
};