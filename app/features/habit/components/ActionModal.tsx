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
import { ColorPicker } from "@/components/ui/color-picker";
import React, { useState } from "react";
import InputForm from "@/components/blocks/input-form";
import { Field, FieldLabel } from "@/components/ui/field";
import LoadingButton from "@/components/blocks/loadingButton";
import useCreateHabit from "../hooks/useCreateHabit";
import { toIconName } from "@/lib/utils";

export default function ActionModal({
  action,
  isOpen,
  onClose,
  onSuccess,
}: {
  action: Action;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { loading, error, create } = useCreateHabit();

  const [form, setForm] = useState({
    icon: "",
    name: "",
    color: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await create(form);
    if (result) {
      onSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputForm
            name="name"
            handleChange={(e) =>
              setForm((v) => ({ ...v, name: e.target.value }))
            }
            value={form.name}
            text="Name"
            type="text"
          />

          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor={"icon"}>Icon</FieldLabel>
            <IconPicker
              onValueChange={(e) =>
                setForm((v) => ({ ...v, icon: toIconName(e.toString()) }))
              }
            />
          </Field>

          <Field className="flex flex-col gap-1.5">
            <FieldLabel htmlFor={"color"}>Color</FieldLabel>
            <ColorPicker
              value={form.color}
              name="color"
              onChange={(e) => setForm((v) => ({ ...v, color: e.toString() }))}
            />
          </Field>

          <LoadingButton loading={loading} text="Submit" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
