import { API_BASE_URL } from "@/constants";

export interface UploadFileResponse {
  originalname: string;
  filename: string;
  location: string;
}

const services = {
  upload: async (file: File, signal: AbortSignal) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/files/upload`, {
      method: "POST",
      body: formData,
      signal,
    });

    if (!res.ok) {
      throw new Error(`Failed to upload file, status: ${res.status}`);
    }

    return res.json() as Promise<UploadFileResponse>;
  },
};

export default services;
