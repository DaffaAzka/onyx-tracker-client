import type { Habit } from "@/types/model";
import InputForm from "@/components/custom/input-form";
import LoadingButton from "@/components/custom/loading-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { ColorPicker } from "@/components/ui/color-picker";
import { IconPicker } from "@/components/ui/icon-picker";
import { useUpdateHabit } from "@/hooks/habit";
import { getFieldError, toIconName } from "@/utils/global";
import { useEffect, useState } from "react";

export default function ModalEdit({
  data,
  isOpen,
  onOpenChange,
}: {
  data: Habit | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    icon: "",
    color: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        icon: data.icon,
        color: data.color,
      });
    }
  }, [data]);

  const updateHabit = useUpdateHabit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;

    updateHabit.mutate(
      {
        id: data.id,
        data: form,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setForm({
            name: "",
            icon: "",
            color: "",
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {updateHabit.error && (
            <Alert variant="destructive" className="bg-red-100">
              <AlertDescription>
                {updateHabit.error.message ?? "An unknown error occurred."}
              </AlertDescription>
            </Alert>
          )}

          <InputForm
            name="name"
            text="Name"
            type="text"
            value={form.name}
            handleChange={handleChange}
            error={getFieldError(updateHabit.error?.errors, "name")}
          />

          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="icon">Icon</FieldLabel>
            <IconPicker
              onValueChange={(e) =>
                setForm((v) => ({ ...v, icon: toIconName(e.toString()) }))
              }
            />
          </Field>

          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor="color">Color</FieldLabel>
            <ColorPicker
              value={form.color}
              name="color"
              onChange={(e: string) =>
                setForm((v) => ({ ...v, color: e.toString() }))
              }
            />
          </Field>

          <LoadingButton text="Continue" loading={updateHabit.isPending} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
