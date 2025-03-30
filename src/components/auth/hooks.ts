import { useEffect, useState } from "react";
import filesServices, { UploadFileResponse } from "@/services/files";

export function useUploadAvatar() {
  const [avatarImgFile, setAvatarImgFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarData, setAvatarData] = useState<UploadFileResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (avatarImgFile) {
      (async function () {
        setIsUploading(true);

        try {
          const avatarData = await filesServices.upload(
            avatarImgFile,
            controller.signal,
          );

          setAvatarData(avatarData);
        } catch (error) {
          console.error(error);
          setAvatarImgFile(null);
        } finally {
          setIsUploading(false);
        }
      })();
    }

    return () => {
      controller.abort();
    };
  }, [avatarImgFile]);

  const deleteAvatar = () => {
    setAvatarData(null);
    setAvatarImgFile(null);
  };

  return {
    avatarImgFile,
    setAvatarImgFile,
    isUploading,
    avatarData,
    deleteAvatar,
  };
}
