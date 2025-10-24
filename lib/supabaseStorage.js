import { supabase } from '../lib/supabase';

export const uploadFile = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from('songs')
        .upload(filePath, file);

    if (error) throw error;

    // ✅ نرجع الـ public URL مباشرة
    return getPublicUrl(filePath);
};

export const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('songs').getPublicUrl(path);
    return data.publicUrl;
};