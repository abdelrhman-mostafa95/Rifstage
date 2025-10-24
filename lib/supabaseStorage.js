import { supabase } from '../lib/supabase';

export const uploadFile = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from('songs')
        .upload(filePath, file);

    if (error) throw error;
    return getPublicUrl(filePath);
};

export const getPublicUrl = (path) => {
    const { data } = supabase.storage.from('songs').getPublicUrl(path);
    return data.publicUrl;
};


export const getVideos = async () => {
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
    return data;
};


export const addVideo = async ({ title, youtube_url, thumbnail_url }) => {
    const { data, error } = await supabase
        .from('videos')
        .insert([{ title, youtube_url, thumbnail_url }]);

    if (error) {
        console.error('Error adding video:', error);
        return null;
    }
    return data;
};


export const deleteVideo = async (id) => {
    const { data, error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting video:', error);
        return null;
    }
    return data;
};



export const getNews = async () => {
    const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
};

export const addNews = async ({ title, slug, content, cover_image_url }) => {
    const { data, error } = await supabase
        .from("news")
        .insert([{ title, slug, content, cover_image_url }])
        .select();

    if (error) throw error;
    return data[0];
};

export const updateNews = async (id, { title, slug, content, cover_image_url }) => {
    const { data, error } = await supabase
        .from("news")
        .update({ title, slug, content, cover_image_url })
        .eq("id", id)
        .select();

    if (error) throw error;
    return data[0];
};

export const deleteNews = async (id) => {
    const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

    if (error) throw error;
    return true;
};
