import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pfgvhrlptrhjgcvkofxr.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_UAbqqEaffT71cvIdh51thA_JB1Hnkzq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadMediaFile(file: File, folder = 'uploads'): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from('artesanos-media')
    .upload(fileName, file, { upsert: true });

  if (!error) {
    const { data } = supabase.storage.from('artesanos-media').getPublicUrl(fileName);
    if (data?.publicUrl) return data.publicUrl;
  }

  // Fallback to Data URL if offline or blocked
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

