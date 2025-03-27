import bannerImage from "@/../public/banner.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative aspect-[21/7] overflow-hidden rounded-lg bg-neutral-100 shadow">
      <Image
        src={bannerImage}
        alt="banner"
        priority
        fill
        className="object-cover"
      />
    </div>
  );
}
