"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2 } from "lucide-react";

export default function CopyRawMdxButton() {
    const [isCopying, setIsCopying] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleCopy = async () => {
        try {
            setIsCopying(true);
            setErrorMessage(null);
            const response = await fetch("/api/raw-mdx?doc=js_api");
            if (!response.ok) {
                const maybeJson = await response
                    .json()
                    .catch(() => ({ message: `HTTP ${response.status}` }));
                throw new Error(maybeJson.message || `HTTP ${response.status}`);
            }
            const content = await response.text();
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            setErrorMessage((error as Error).message);
        } finally {
            setIsCopying(false);
        }
    };

    return (
        <div className="flex items-center gap-2 mt-6">
            <Button onClick={handleCopy} disabled={isCopying} variant="secondary" size="sm" title="Copy raw Markdown (about 35K tokens)">
                {isCopying ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                    </>
                ) : isCopied ? (
                    <>
                        <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                ) : (
                    <>
                        <Copy className="mr-2 h-4 w-4" /> Copy Markdown
                    </>
                )}
            </Button>
            {errorMessage && (
                <span className="text-xs text-red-600" aria-live="polite">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}
