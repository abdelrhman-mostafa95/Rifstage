import { supabase } from '../lib/supabase';

// export const uploadFile = async (file, folder) => {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${Date.now()}.${fileExt}`;
//     const filePath = `${folder}/${fileName}`;

//     const { error } = await supabase.storage
//         .from('songs')
//         .upload(filePath, file);

//     if (error) throw error;
//     return getPublicUrl(filePath);
// };

// export const getPublicUrl = (path) => {
//     const { data } = supabase.storage.from('songs').getPublicUrl(path);
//     return data.publicUrl;
// };


// lib/supabaseStorage.js

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

export const addVideo = async ({ title, youtube_url, thumbnail_url, description, duration, views, created_text }) => {
    const { data, error } = await supabase
        .from('videos')
        .insert([{
            title,
            youtube_url,
            thumbnail_url: thumbnail_url || null,
            description: description || '',
            duration: duration || '',
            views: views || "0",
            created_text: created_text || '',
        }]);
    console.log(error, data);


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



// ! News CRUD operations


/* ===================================================
   ✅ دالة رفع الصورة (ترجع { url, path })
=================================================== */


/* ===================================================
   ✅ دالة رفع الصورة (ترجع { url, path })
=================================================== *
/* ===================================================
   ✅ رفع صورة عامة للمقال (cover)
=================================================== */
export const uploadFile = async (file, folder = "covers") => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage.from("news").upload(filePath, file);
    if (error) throw error;

    const { data } = supabase.storage.from("news").getPublicUrl(filePath);
    return { url: data.publicUrl, path: filePath };
};

/* ===================================================
   ✅ رفع صورة داخل المقال (multi images)
=================================================== */
export async function uploadNewsImage(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("news-images").upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from("news-images").getPublicUrl(fileName);
    return data.publicUrl;
}

/* ===================================================
   ✅ جلب جميع الأخبار
=================================================== */
export const getNews = async () => {
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
};

/* ===================================================
   ✅ جلب صور المقال
=================================================== */
export const getNewsImages = async (news_id) => {
    const { data, error } = await supabase.from("news_images").select("*").eq("news_id", news_id).order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
};

/* ===================================================
   ✅ إضافة خبر جديد مع cover
=================================================== */
export const addNews = async (newsData, coverFile) => {
    try {
        let coverUrl = null;
        let coverPath = null;

        if (coverFile) {
            const cover = await uploadFile(coverFile, "covers");
            coverUrl = cover.url;
            coverPath = cover.path;
        }

        const { data, error } = await supabase.from("news").insert([{
            title: newsData.title,
            slug: newsData.slug,
            content: newsData.content,
            cover_image_url: coverUrl,
            cover_path: coverPath
        }]).select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error("❌ Error adding news:", error);
        throw error;
    }
};

/* ===================================================
   ✅ تحديث خبر موجود
=================================================== */
export const updateNews = async (id, newsData, coverFile) => {
    try {
        const { data: oldNews, error: fetchError } = await supabase.from("news").select("*").eq("id", id).single();
        if (fetchError) throw fetchError;

        const updateData = {
            title: newsData.title,
            slug: newsData.slug,
            content: newsData.content
        };

        if (coverFile) {
            if (oldNews?.cover_path) {
                const cleanPath = cleanFilePath(oldNews.cover_path);
                const { error: storageError } = await supabase.storage.from("news").remove([cleanPath]);
                if (storageError) console.warn("⚠️ Storage delete warning:", storageError);
            }

            const cover = await uploadFile(coverFile, "covers");
            updateData.cover_image_url = cover.url;
            updateData.cover_path = cover.path;
        }

        const { data, error } = await supabase.from("news").update(updateData).eq("id", id).select();
        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error("❌ Error updating news:", error);
        throw error;
    }
};

/* ===================================================
   ✅ حذف خبر (من الجدول + من الـ bucket)
=================================================== */
export const deleteNews = async (id) => {
    try {
        const { data: news, error: fetchError } = await supabase.from("news").select("*").eq("id", id).single();
        if (fetchError) throw fetchError;

        if (news?.cover_path) {
            const cleanPath = cleanFilePath(news.cover_path);
            const { error: storageError } = await supabase.storage.from("news").remove([cleanPath]);
            if (storageError) console.warn("⚠️ Storage delete warning:", storageError);
        }

        // حذف الصور الداخلية
        const { data: images } = await supabase.from("news_images").select("*").eq("news_id", id);
        if (images?.length) {
            const paths = images.map(img => cleanFilePath(img.image_path));
            const { error: imagesError } = await supabase.storage.from("news-images").remove(paths);
            if (imagesError) console.warn("⚠️ Storage delete images warning:", imagesError);
            await supabase.from("news_images").delete().eq("news_id", id);
        }

        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) throw error;

        return true;
    } catch (error) {
        console.error("❌ Error deleting news:", error);
        throw error;
    }
};

const cleanFilePath = (pathOrUrl) => {
    if (!pathOrUrl) return null;
    try {
        const parts = pathOrUrl.split("news/");
        return parts[1] ?? pathOrUrl;
    } catch {
        return pathOrUrl;
    }
};

