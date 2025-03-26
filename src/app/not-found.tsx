import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container">
      <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center space-y-8 py-8">
        <h1 className="text-2xl font-bold">404 - Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Button asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </main>
  );
}
