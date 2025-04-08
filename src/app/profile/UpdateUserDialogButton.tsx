"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import { useCallback, useState } from "react";
import UpdateUserForm from "./UpdateUserForm";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface UpdateUserDialogButtonProps
  extends VariantProps<typeof buttonVariants> {
  className?: string;
}
export default function UpdateUserDialogButton({
  className,

  ...props
}: UpdateUserDialogButtonProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        {...props}
        className={cn("", className)}
      >
        Edit <EditIcon className="size-4" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="sr-only">
            Update your profile.
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
