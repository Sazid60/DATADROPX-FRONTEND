import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <section className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
                <p className="text-sm font-medium tracking-wide text-muted-foreground">ERROR 404</p>
                <h1 className="mt-2 text-3xl font-semibold text-foreground">Page not found</h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    The page you are trying to reach does not exist or may have moved.
                </p>

                <div className="mt-6 flex justify-center">
                    <Button asChild className="gap-2 bg-[#45aaa2] hover:bg-[#3c8f88]">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}