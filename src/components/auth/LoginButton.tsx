"use client";
import { useUserStore } from "@/store/auth/useUserStore";
import { Button } from "../ui/button";
import { useAuthDialogStore } from "@/store/auth/useAuthDialogStore";

export default function LoginButton() {
  const setAuthDialogOpen = useAuthDialogStore((state) => state.setIsOpen);
  const user = useUserStore((state) => state.user);
  const isFetchingUser = useUserStore((state) => state.isFetchingUser);

  if (user || isFetchingUser) return null;

  return (
    <Button size="sm" onClick={() => setAuthDialogOpen(true)}>
      Login
    </Button>
  );
}
