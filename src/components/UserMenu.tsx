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
import UpdateUserDialogButton from "@/app/profile/UpdateUserDialogButton";
import { Button } from "./ui/button";

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
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative aspect-square size-8 rounded-full border p-0 shadow">
        {user ? (
          <>
            <ImageWithErrorFallback
              key={user.avatar}
              src={user.avatar}
              alt={user.name}
              size={48}
              className="h-full w-full rounded-full object-cover"
            />
            <span className="bg-secondary absolute right-0 bottom-0 translate-x-1/5 translate-y-2/5 rounded-full border p-0.25">
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
        <PopoverContent align="end" className="flex w-56 flex-col gap-0.5 p-1">
          <p className="px-2 py-1 text-center capitalize">{user.name}</p>
          <hr />
          <Button variant="ghost" asChild className="justify-start">
            <Link onClick={() => setOpen(false)} href="/profile">
              <User2Icon className="size-4" />
              Profile
            </Link>
          </Button>
          <UpdateUserDialogButton
            className="justify-start [&_svg]:order-[-1]"
            variant="ghost"
          />
          <hr />
          <Button variant="ghost" className="justify-start" onClick={logout}>
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </PopoverContent>
      )}
    </Popover>
  );
}
