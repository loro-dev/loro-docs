import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/cn";
import {
  EditorManagerImportData,
  decodeExport,
} from "@components/TwinEditors/EditorManager";
import { Button } from "@components/ui/button";
import {
  IconFileExport,
  IconFileImport,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { FormEvent, useCallback, useState } from "react";

export type GeneralToolBarProps = {
  className?: string;
  onReset?: () => void;
  onExport?: () => void;
  onImport?: (data: EditorManagerImportData) => void;
};

const RESET_BUTTON_LABEL = "Clear editor contents and reset the timeline.";
const EXPORT_BUTTON_LABEL = "Export the timeline for future preview.";
const IMPORT_BUTTON_LABEL = "Import a timeline from a JSON file.";

export function GeneralToolBar({
  className,
  onReset,
  onExport,
  onImport,
}: GeneralToolBarProps): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);
  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const file = data.get("timeline") as File;
      if (file === undefined) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const json = reader.result;
        if (typeof json === "string") {
          const parsed = JSON.parse(json);
          const decoded = await decodeExport(parsed);
          onImport?.(decoded);
          setShowDialog(false);
        }
      };
      reader.readAsText(file);
    },
    [onImport]
  );
  return (
    <div className={cn("flex flex-row gap-2 text-white/50", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-auto h-auto transition-colors duration-200 ease-in-out hover:text-white/75"
              type="button"
              aria-label={RESET_BUTTON_LABEL}
              onClick={onReset}
            >
              <IconTrashXFilled />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>{RESET_BUTTON_LABEL}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-auto h-auto transition-colors duration-200 ease-in-out hover:text-white/75"
              type="button"
              aria-label={EXPORT_BUTTON_LABEL}
              onClick={onExport}
            >
              <IconFileExport />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>{EXPORT_BUTTON_LABEL}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button
                  className="w-auto h-auto transition-colors duration-200 ease-in-out hover:text-white/75"
                  type="button"
                  aria-label={IMPORT_BUTTON_LABEL}
                >
                  <IconFileImport />
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>
              <p>{IMPORT_BUTTON_LABEL}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent asChild>
          <form onSubmit={onFormSubmit}>
            <DialogHeader>
              <DialogTitle>Import Timeline</DialogTitle>
              <DialogDescription>
                Select a JSON file to import.
              </DialogDescription>
            </DialogHeader>
            <fieldset>
              <input type="file" name="timeline" id="timeline" />
            </fieldset>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
