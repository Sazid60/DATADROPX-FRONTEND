"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="min-h-screen bg-muted/40 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-md">
                <Card className="border-destructive/50 bg-destructive/5">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="size-6 text-destructive" />
                            <div>
                                <CardTitle>Oops! Something Went Wrong</CardTitle>
                                <CardDescription>An unexpected error occurred in the application</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {error.message && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Error Details:</p>
                                <p className="rounded-md bg-muted/50 p-3 font-mono text-xs text-destructive">
                                    {error.message}
                                </p>
                            </div>
                        )}

                        {error.digest && (
                            <p className="text-xs text-muted-foreground">
                                Error ID: <code>{error.digest}</code>
                            </p>
                        )}

                        <div className="space-y-2 pt-4">
                            <Button onClick={reset} className="w-full">
                                Try Again
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/")}>
                                Go Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
