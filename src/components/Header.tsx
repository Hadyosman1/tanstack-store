import Link from "next/link";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import LoginButton from "./auth/LoginButton";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import headerBg from "@/../public/header-bg.jpg";
import Image from "next/image";

// TODO: Make The Header Responsive And complete it
export default function Header() {
  return (
    <header className="bg-card sticky top-0 z-20 flex h-(--header-height) w-full items-center shadow">
      <Image
        src={headerBg}
        alt="header-bg"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
        width={1400}
        height={150}
      />
      <div className="relative container">
        <nav className="flex flex-wrap items-center justify-end gap-1.5">
          <Link
            className="me-auto text-base font-black -tracking-wider text-[#6ba26e] md:text-xl"
            href="/"
          >
            Tanstack Store
          </Link>
          <SearchInput />
          <CartButton />
          <WishlistButton />
          <UserMenu />
          <LoginButton />
        </nav>
      </div>
    </header>
  );
}
