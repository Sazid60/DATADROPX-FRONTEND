

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-muted/40 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-md">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Search className="size-6 text-muted-foreground" />
                            <div>
                                <CardTitle>Page Not Found</CardTitle>
                                <CardDescription>The page you&apos;re looking for doesn&lsquo;t exist</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            The page you are trying to reach does not exist or may have moved.
                        </p>

                        <div className="space-y-2 pt-2">
                            <Button asChild className="w-full gap-2">
                                <Link href="/">
                                    <Home className="size-4" />
                                    Back to Home
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}