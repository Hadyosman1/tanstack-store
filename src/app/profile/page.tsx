"use client";

import ImageWithErrorFallback from "@/components/ImageWithErrorFallback";
import { useUserStore } from "@/store/auth/useUserStore";
import { redirect } from "next/navigation";
import UpdateUserDialogButton from "./UpdateUserDialogButton";

export default function UserProfilePage() {
  const user = useUserStore((state) => state.user);

  if (!user) return redirect("/");

  return (
    <main className="container space-y-8 py-8">
      <h2 className="border-b pb-2 text-2xl font-bold">Your Profile</h2>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5 rounded-lg border p-5 shadow-md">
        <UpdateUserDialogButton size="sm" className="self-end text-sm" />
        <div className="aspect-square overflow-hidden rounded-full shadow-md">
          <ImageWithErrorFallback
            src={user.avatar}
            alt={user.name}
            size={200}
            className="aspect-square object-cover"
          />
        </div>
        <div className="space-y-3 text-center">
          <h3 className="font-bold capitalize">{user.name}</h3>
          <h4 className="capitalize">{user.role}</h4>
        </div>
      </div>
    </main>
  );
}
