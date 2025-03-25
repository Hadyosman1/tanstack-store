import bannerImage from "@/../public/banner.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="overflow-hidden rounded-lg bg-neutral-100 shadow">
      <Image src={bannerImage} alt="banner" priority />
    </div>
  );
}
