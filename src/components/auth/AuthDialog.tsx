"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAuthDialogStore } from "@/store/auth/useAuthDialogStore";

export enum TabsValues {
  LOGIN = "login",
  SIGN_UP = "sign-up",
}

export default function AuthDialog() {
  const isOpen = useAuthDialogStore((state) => state.isOpen);
  const setIsOpen = useAuthDialogStore((state) => state.setIsOpen);

  const dialogDescription = useAuthDialogStore((state) => state.description);
  const setDialogDescription = useAuthDialogStore(
    (state) => state.setDescription,
  );

  const [activeTab, setActiveTab] = useState<TabsValues>(TabsValues.LOGIN);
  const [isRedirectedFromSignUp, setIsRedirectedFromSignUp] = useState(false);

  const onSignedUpSuccessfully = useCallback(() => {
    setActiveTab(TabsValues.LOGIN);
    setIsRedirectedFromSignUp(true);
  }, []);

  const onLoginSuccessfully = useCallback(() => {
    setIsRedirectedFromSignUp(false);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setDialogDescription("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Welcome to our store</DialogTitle>
          <DialogDescription className={dialogDescription ? "" : "sr-only"}>
            {dialogDescription
              ? dialogDescription
              : "This is Authentication Dialog"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} defaultValue={TabsValues.LOGIN}>
          <TabsList className="bg-muted h-11 w-full border">
            <TabsTrigger
              onClick={() => setActiveTab(TabsValues.LOGIN)}
              className="grow"
              value={TabsValues.LOGIN}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab(TabsValues.SIGN_UP)}
              className="grow"
              value={TabsValues.SIGN_UP}
            >
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value={TabsValues.LOGIN}>
            {isRedirectedFromSignUp && (
              <p className="rounded-md border-2 border-green-900 bg-green-700/70 p-2 text-center text-white">
                Successfully signed up, please login
              </p>
            )}
            <LoginForm onLoginSuccessfully={onLoginSuccessfully} />
            <button
              onClick={() => setActiveTab(TabsValues.SIGN_UP)}
              className="text-primary mx-auto mt-3 block text-center text-sm underline"
            >
              Don&apos;t have an account?
            </button>
          </TabsContent>
          <TabsContent value={TabsValues.SIGN_UP}>
            <SignUpForm onSignedUpSuccessfully={onSignedUpSuccessfully} />
            <button
              onClick={() => setActiveTab(TabsValues.LOGIN)}
              className="text-primary mx-auto mt-3 block text-center text-sm underline"
            >
              Already have an account?
            </button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
