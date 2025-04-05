import Link from "next/link";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import LoginButton from "./auth/LoginButton";
import CartButton from "./CartButton";

// TODO: Make The Header Responsive And complete it
export default function Header() {
  return (
    <header className="bg-card sticky top-0 z-20 flex h-(--header-height) w-full items-center shadow">
      <div className="container">
        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link
            className="me-auto text-base font-black -tracking-wider text-[#6ba26e] md:text-xl"
            href="/"
          >
            Tanstack Store
          </Link>
          <SearchInput />
          <CartButton />
          <UserMenu />
          <LoginButton />
        </nav>
      </div>
    </header>
  );
}
