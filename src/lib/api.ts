const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function uploadFile(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch(`${SUPABASE_URL}/functions/v1/upload-file`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Upload failed");
  }

  const { url } = await response.json();
  return url;
}

export async function postContent(
  type: "news" | "sports" | "cinema",
  data: Record<string, unknown>
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/post-content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ type, data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to post content");
  }

  return await response.json();
}
