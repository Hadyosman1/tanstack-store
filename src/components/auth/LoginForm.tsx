import { loginSchema, LoginValues } from "@/lib/validations/auth";
import services from "@/services/auth";
import { useAuthDialogStore } from "@/store/auth/useAuthDialogStore";
import { useUserTokenStore } from "@/store/auth/useUserTokenStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader } from "lucide-react";
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
import PasswordInput from "../ui/password-input";

export default function LoginForm({
  onLoginSuccessfully,
}: {
  onLoginSuccessfully: () => void;
}) {
  const setIsAuthDialogOpen = useAuthDialogStore((state) => state.setIsOpen);
  const setTokens = useUserTokenStore((state) => state.setTokens);
  const clearTokens = useUserTokenStore((state) => state.clearTokens);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const userTokens = await services.login(values);
      toast.success("Login successful");
      setIsAuthDialogOpen(false);
      setTokens(userTokens);
      form.setError("root", { message: "" });
      onLoginSuccessfully();
    } catch (error) {
      console.error(error);
      clearTokens();
      toast.error("Failed to login");
      form.setError("root", { message: "Email or password is incorrect" });
    }
  };

  return (
    <div className="mt-2 space-y-4">
      <h2 className="border-b pb-2 text-2xl font-bold">Login</h2>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
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

          {form.formState.errors.root?.message && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full min-w-32 cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
