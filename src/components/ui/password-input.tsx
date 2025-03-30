"use client";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn("pe-10", className)}
      />
      <Button
        variant="ghost"
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-0 right-0"
      >
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  );
}
