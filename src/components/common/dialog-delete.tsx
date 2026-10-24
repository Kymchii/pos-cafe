import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export type DialogDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  title: string;
  isLoading: boolean;
};

export default function DialogDelete({
  open,
  onOpenChange,
  onSubmit,
  title,
  isLoading,
}: DialogDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Delete {title}</DialogTitle>
            <DialogDescription>
              Are you sure you want delete this{" "}
              <span className="lowercase">{title}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" formAction={onSubmit}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
