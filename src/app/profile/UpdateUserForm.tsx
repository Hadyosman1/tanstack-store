"use client";

import AvatarPreview from "@/components/auth/AvatarPreview";
import { useUploadAvatar } from "@/components/auth/hooks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserSchema, UpdateUserValues } from "@/lib/validations/auth";
import services from "@/services/auth";
import { useUserStore } from "@/store/auth/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateUserForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    },
  });

  const {
    avatarData,
    avatarImgFile,
    deleteAvatar,
    isUploading,
    setAvatarImgFile,
  } = useUploadAvatar();

  useEffect(() => {
    form.clearErrors("avatar");
    form.setValue("avatar", avatarData ? avatarData.location : user?.avatar);
  }, [avatarData, form]);

  if (!user) return null;

  const onSubmit = async (values: UpdateUserValues) => {
    try {
      const updatedUser = await services.updateUserById(user.id, values);
      setUser(updatedUser);
      toast.success("User updated successfully");
      closeDialog();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  const clearAvatar = () => {
    form.setValue("avatar", "");
    deleteAvatar();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-4 flex flex-col gap-2">
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setAvatarImgFile(file ? file : null);
            }}
          />
          {form.formState.errors.avatar?.message && (
            <p className="text-destructive text-sm">
              {form.formState.errors.avatar.message}
            </p>
          )}
          <AvatarPreview
            uploadImgSrc={form.getValues("avatar")}
            avatarImgFile={avatarImgFile}
            isUploading={isUploading}
            clearAvatar={clearAvatar}
          />
        </div>
        <Button
          type="submit"
          className="w-full min-w-32"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            "submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
