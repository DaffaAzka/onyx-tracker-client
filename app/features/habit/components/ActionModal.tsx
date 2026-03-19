import type { Action } from "@/lib/enums";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPicker } from "@/components/ui/icon-picker";

export default function ActionModal({
  action,
  isOpen,
  isClose,
}: {
  action: Action;
  isOpen: boolean;
  isClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <IconPicker />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
