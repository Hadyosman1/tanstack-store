"use client";

import headerBg from "@/../public/header-bg.jpg";
import { cn, getTwBreakpoint } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginButton from "./auth/LoginButton";
import CartButton from "./CartButton";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import WishlistButton from "./WishlistButton";

export default function Header() {
  const [isFlexRow, setIsFlexRow] = useState(true);

  useEffect(() => {
    const handleHeaderHeight = () => {
      const mdBreakpoint = getTwBreakpoint("md");

      if (window.innerWidth < mdBreakpoint) {
        document.documentElement.style.setProperty("--header-height", "120px");
        setIsFlexRow(false);
      } else {
        document.documentElement.style.setProperty("--header-height", "64px");
        setIsFlexRow(true);
      }
    };
    handleHeaderHeight();

    window.addEventListener("resize", handleHeaderHeight);

    return () => {
      window.removeEventListener("resize", handleHeaderHeight);
    };
  }, []);

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
        <nav
          className={cn("flex flex-col flex-wrap gap-x-1.5 gap-y-2", {
            "flex-row items-center justify-end": isFlexRow,
          })}
        >
          <div className="flex items-center gap-1.5 ">
            <Link
              className="grow text-lg font-black -tracking-wider text-[#6ba26e] md:me-auto md:text-xl"
              href="/"
            >
              Tanstack Store
            </Link>
            <div className="flex items-center gap-1.5 md:hidden">
              <CartButton />
              <WishlistButton />
              <UserMenu />
              <LoginButton />
            </div>
          </div>

          <SearchInput className="md:hidden" />

          <div className="flex items-center grow justify-end gap-1.5 max-md:hidden">
            <SearchInput />
            <CartButton />
            <WishlistButton />
            <UserMenu />
            <LoginButton />
          </div>
        </nav>
      </div>
    </header>
  );
}
