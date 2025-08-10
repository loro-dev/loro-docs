"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Loader2 } from "lucide-react";

export default function CopyRawMdxButton() {
    const [isCopying, setIsCopying] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [prefetched, setPrefetched] = React.useState<string | null>(null);
    const [isPrefetching, setIsPrefetching] = React.useState(false);

    // Prefetch the MDX content early so copy can run synchronously on click (iOS Safari requirement)
    const prefetch = React.useCallback(async () => {
        if (prefetched != null || isPrefetching) return;
        try {
            setIsPrefetching(true);
            const res = await fetch("/api/raw-mdx?doc=js_api");
            if (!res.ok) {
                const maybeJson = await res
                    .json()
                    .catch(() => ({ message: `HTTP ${res.status}` }));
                throw new Error(maybeJson.message || `HTTP ${res.status}`);
            }
            const text = await res.text();
            setPrefetched(text);
        } catch (e) {
            // Don't surface prefetch errors loudly; user may still retry
            // We'll show a message if copy is attempted without available content
            console.error("Prefetch raw MDX failed:", e);
        } finally {
            setIsPrefetching(false);
        }
    }, [prefetched, isPrefetching]);

    React.useEffect(() => {
        // Start prefetch when the button mounts
        void prefetch();
    }, [prefetch]);

    const copyWithFallback = React.useCallback(async (text: string) => {
        // Try modern Clipboard API first
        try {
            if (navigator.clipboard && "writeText" in navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (e) {
            // Continue to fallback below
        }
        // Fallback: use a hidden textarea + execCommand within the click handler call stack
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed"; // avoid scroll jump on iOS
            ta.style.top = "-9999px";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            if (!ok) throw new Error("execCommand copy failed");
            return true;
        } catch (e) {
            return false;
        }
    }, []);

    const handleCopy = async () => {
        setErrorMessage(null);
        // Ensure we have content ready before attempting to copy to meet iOS Safari's user-gesture requirement
        if (prefetched == null) {
            // Kick off prefetch (if not already) and ask user to tap again
            void prefetch();
            setErrorMessage("Preparing content… tap again to copy");
            return;
        }
        setIsCopying(true);
        try {
            const ok = await copyWithFallback(prefetched);
            if (!ok) throw new Error("Copy not allowed in this context");
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
            <Button
                onClick={handleCopy}
                onMouseEnter={prefetch}
                onTouchStart={prefetch}
                disabled={isCopying}
                variant="secondary"
                size="sm"
                title="Copy raw Markdown (about 35K tokens)"
            >
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
