import { signUpSchema, SignUpValues } from "@/lib/validations/auth";
import authServices from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PasswordInput from "../ui/password-input";
import AvatarPreview from "./AvatarPreview";
import { useUploadAvatar } from "./hooks";

interface SignUpFormProps {
  onSignedUpSuccessfully: () => void;
}

// TODO: Add check email validity and refactor the code separate which are related to avatar upload

export default function SignUpForm({
  onSignedUpSuccessfully,
}: SignUpFormProps) {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  const {
    avatarImgFile,
    setAvatarImgFile,
    isUploading,
    avatarData,
    deleteAvatar,
  } = useUploadAvatar();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.clearErrors("avatar");
    form.setValue("avatar", avatarData ? avatarData.location : "");
  }, [avatarData, form]);

  // TODO: Wait until the api maintainers fixes the email check because of it always return false
  // const [isCheckingEmailValidity, setIsCheckingEmailValidity] = useState(false);
  // const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  // useEffect(() => {
  //   const controller = new AbortController();

  //   let timerId: ReturnType<typeof setTimeout>;

  //   async function checkEmail() {
  //     if (!form.watch("email").trim()) {
  //       setIsCheckingEmailValidity(false);
  //       return;
  //     }

  //     console.log("Fire 🙄🙄🙄");

  //     setIsCheckingEmailValidity(true);
  //     try {
  //       const { isAvailable } = await authServices.checkEmailValidity(
  //         form.watch("email"),
  //         controller.signal,
  //       );

  //       setIsEmailAvailable(isAvailable);
  //       if (!isAvailable) {
  //         form.setError("email", {
  //           message: "This email address is already in use",
  //         });
  //       } else {
  //         form.clearErrors("email");
  //       }
  //     } catch (error) {
  //       setIsEmailAvailable(false);

  //       form.setError("email", {
  //         message: "Something wrong with this email address",
  //       });
  //     } finally {
  //       setIsCheckingEmailValidity(false);
  //     }
  //   }

  //   timerId = setTimeout(checkEmail, 600);

  //   return () => {
  //     controller.abort();
  //     clearTimeout(timerId);
  //   };
  // }, [form.watch("email")]);

  const onSubmit = async (data: SignUpValues) => {
    // if (!isEmailAvailable) {
    //   form.setError("email", { message: "Email already exists" });
    //   return;
    // }

    try {
      form.setError("root", { message: "" });
      await authServices.signUp(data);
      onSignedUpSuccessfully();
      toast.success("Successfully signed up");
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message: "Failed to sign up, please try again",
      });
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
    <div className="mt-2 space-y-4">
      <h2 className="border-b pb-2 text-2xl font-bold">Sign up</h2>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Your password" {...field} />
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
              avatarImgFile={avatarImgFile}
              uploadImgSrc={form.getValues("avatar")}
              isUploading={isUploading}
              clearAvatar={clearAvatar}
            />
          </div>

          {form.formState.errors.root?.message && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{form.formState.errors.root?.message}</AlertTitle>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full min-w-32"
            disabled={form.formState.isSubmitting || isUploading}
          >
            {form.formState.isSubmitting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}


