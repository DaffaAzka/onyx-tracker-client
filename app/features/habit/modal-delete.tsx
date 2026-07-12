import type { Habit } from "@/types/model";
import LoadingButton from "@/components/custom/loading-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteHabit } from "@/hooks/habit";
import { useEffect, useState, type FormEvent } from "react";

export default function ModalDelete({
  data,
  isOpen,
  onOpenChange,
}: {
  data: Habit | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        name: data.name,
      });
    }
  }, [data]);

  const deleteHabit = useDeleteHabit();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.id) return;

    deleteHabit.mutate(form.id, {
      onSuccess: () => {
        onOpenChange(false);
        setForm({
          id: "",
          name: "",
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Habit</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {deleteHabit.error && (
                <Alert variant="destructive" className="bg-red-100">
                  <AlertDescription>
                    {deleteHabit.error.message ?? "An unknown error occurred."}
                  </AlertDescription>
                </Alert>
              )}
              <p>Are you sure you want to delete {form.name}?</p>
              <LoadingButton text="Confirm" loading={deleteHabit.isPending} />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
