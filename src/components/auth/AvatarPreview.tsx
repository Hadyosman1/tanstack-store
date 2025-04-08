import { Loader, XIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface AvatarPreviewProps {
  avatarImgFile: File | null;
  isUploading: boolean;
  uploadImgSrc: string | undefined;
  clearAvatar: () => void;
}

const AvatarPreview = ({
  avatarImgFile,
  uploadImgSrc,
  isUploading,
  clearAvatar,
}: AvatarPreviewProps) => {
  if (!avatarImgFile && !uploadImgSrc) return null;

  return (
    <div className="relative mx-auto mt-3 w-fit shadow">
      <div className="relative overflow-hidden rounded-md">
        <Image
          src={
            (isUploading || !uploadImgSrc) && avatarImgFile
              ? URL.createObjectURL(avatarImgFile)
              : uploadImgSrc
                ? uploadImgSrc
                : ""
          }
          alt="Avatar"
          width={200}
          height={200}
        />
        {isUploading && (
          <div className="bg-foreground/50 text-accent direction-alternate ease absolute inset-0 grid animate-pulse place-content-center duration-700">
            <Loader size={32} className="animate-spin" />
          </div>
        )}
      </div>
      {!isUploading && (
        <Button
          type="button"
          onClick={clearAvatar}
          size="icon"
          className="absolute -top-2 -right-2 size-6 rounded-full"
        >
          <XIcon size={20} />
          <div className="sr-only">Remove avatar</div>
        </Button>
      )}
    </div>
  );
};

export default AvatarPreview;
