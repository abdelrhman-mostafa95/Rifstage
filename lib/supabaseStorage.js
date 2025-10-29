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


// ! News CRUD operations


/* ===================================================
   ✅ دالة رفع الصورة (ترجع { url, path })
=================================================== */


/* ===================================================
   ✅ دالة رفع الصورة (ترجع { url, path })
=================================================== */
export const uploadFile = async (file, folder = "covers") => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from("news") // ✅ اسم البكت الخاص بالأخبار
        .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage.from("news").getPublicUrl(filePath);

    return {
        url: data.publicUrl,
        path: filePath,
    };
};

/* ===================================================
   ✅ جلب جميع الأخبار
=================================================== */
export const getNews = async () => {
    const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
};

/* ===================================================
   ✅ إضافة خبر جديد
=================================================== */
export const addNews = async (newsData, coverFile) => {
    try {
        let coverUrl = null;
        let coverPath = null;

        // ✅ رفع الصورة لو تم اختيارها
        if (coverFile) {
            const cover = await uploadFile(coverFile, "covers");
            coverUrl = cover.url;
            coverPath = cover.path;
        }

        const { data, error } = await supabase
            .from("news")
            .insert([
                {
                    title: newsData.title,
                    slug: newsData.slug,
                    content: newsData.content,
                    cover_image_url: coverUrl,
                    cover_path: coverPath,
                },
            ])
            .select();

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
        // ✅ جلب بيانات الخبر القديم
        const { data: oldNews, error: fetchError } = await supabase
            .from("news")
            .select("*")
            .eq("id", id)
            .single();

        if (fetchError) throw fetchError;

        const updateData = {
            title: newsData.title,
            slug: newsData.slug,
            content: newsData.content,
        };

        // ✅ لو فيه صورة جديدة نرفعها ونحذف القديمة
        if (coverFile) {
            if (oldNews?.cover_path) {
                // تنظيف المسار لو كان فيه URL كامل
                const cleanPath = cleanFilePath(oldNews.cover_path);
                const { error: storageError } = await supabase.storage
                    .from("news")
                    .remove([cleanPath]);
                if (storageError)
                    console.warn("⚠️ Storage delete warning:", storageError);
            }

            const cover = await uploadFile(coverFile, "covers");
            updateData.cover_image_url = cover.url;
            updateData.cover_path = cover.path;
        }

        const { data, error } = await supabase
            .from("news")
            .update(updateData)
            .eq("id", id)
            .select();

        if (error) throw error;
        console.log("✅ تم تحديث الخبر بنجاح");
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
        // ✅ جلب بيانات الخبر
        const { data: news, error: fetchError } = await supabase
            .from("news")
            .select("*")
            .eq("id", id)
            .single();

        if (fetchError) throw fetchError;

        // ✅ حذف الصورة من الـ bucket لو موجودة
        if (news?.cover_path) {
            const cleanPath = cleanFilePath(news.cover_path);
            const { error: storageError } = await supabase.storage
                .from("news")
                .remove([cleanPath]);
            if (storageError)
                console.warn("⚠️ Storage delete warning:", storageError);
        }

        // ✅ حذف الخبر من الجدول
        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) throw error;

        console.log("🗑️ تم حذف الخبر وصورته بنجاح");
        return true;
    } catch (error) {
        console.error("❌ Error deleting news:", error);
        throw error;
    }
};

/* ===================================================
   🧹 دالة تنظيف المسار (URL ➜ internal path)
=================================================== */
const cleanFilePath = (pathOrUrl) => {
    if (!pathOrUrl) return null;
    try {
        // لو المسار كان URL كامل
        const parts = pathOrUrl.split("news/");
        return parts[1] ?? pathOrUrl;
    } catch {
        return pathOrUrl;
    }
};
