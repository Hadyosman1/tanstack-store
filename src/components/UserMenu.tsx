"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/store/auth/useUserStore";
import { ChevronDown, ChevronUp, LogOutIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import ImageWithErrorFallback from "./ImageWithErrorFallback";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { useUserTokenStore } from "@/store/auth/useUserTokenStore";

export default function UserMenu() {
  const user = useUserStore((state) => state.user);
  const isFetchingUser = useUserStore((state) => state.isFetchingUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearTokens = useUserTokenStore((state) => state.clearTokens);
  const [open, setOpen] = useState(false);

  if (!user && !isFetchingUser) return null;

  const logout = () => {
    clearTokens();
    clearUser();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative aspect-square size-12 cursor-pointer rounded-full border p-0 shadow">
        {user ? (
          <>
            <ImageWithErrorFallback
              src={user.avatar}
              alt={user.name}
              size={48}
              className="h-full w-full rounded-full object-cover"
            />
            <span className="bg-secondary absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 rounded-full border p-0.5">
              {open ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </span>
          </>
        ) : (
          isFetchingUser && (
            <Skeleton className="aspect-square h-full w-full rounded-full" />
          )
        )}
      </PopoverTrigger>
      {user && (
        <PopoverContent align="end" className="flex w-56 flex-col gap-1 p-1">
          <p className="px-2 py-1 text-center capitalize">{user.name}</p>
          <hr />
          <Link
            href="/profile"
            className="hover:bg-primary/10 flex items-center gap-1 rounded px-2 py-1 transition-colors duration-200"
          >
            <User2Icon className="size-4" />
            Profile
          </Link>
          <hr />
          <button
            onClick={logout}
            className="hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors duration-200"
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </PopoverContent>
      )}
    </Popover>
  );
}
