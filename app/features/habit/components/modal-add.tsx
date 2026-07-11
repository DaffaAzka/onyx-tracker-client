import InputForm from "@/components/custom/input-form";
import LoadingButton from "@/components/custom/loading-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { ColorPicker } from "@/components/ui/color-picker";
import { IconPicker } from "@/components/ui/icon-picker";
import { useCreateHabit } from "@/hooks/habit";
import { getFieldError, toIconName } from "@/utils/global";
import { useState } from "react";

export default function ModalAdd() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    icon: "",
    color: "",
  });

  const createHabit = useCreateHabit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createHabit.mutate(form, {
      onSuccess: () => {
        setOpen(false);
        setForm({
          name: "",
          icon: "",
          color: "",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Habit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {createHabit.error && (
            <Alert variant="destructive" className="bg-red-100">
              <AlertDescription>
                {createHabit.error.message ?? "An unknown error occurred."}
              </AlertDescription>
            </Alert>
          )}

          <InputForm
            name="name"
            text="Name"
            type="text"
            value={form.name}
            handleChange={handleChange}
            error={getFieldError(createHabit.error?.errors, "name")}
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

          <LoadingButton text="Continue" loading={createHabit.isPending} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
