import { Action } from "@/lib/enums";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPicker, type IconName } from "@/components/ui/icon-picker";
import { ColorPicker } from "@/components/ui/color-picker";
import React, { useEffect, useState } from "react";
import InputForm from "@/components/blocks/input-form";
import { Field, FieldLabel } from "@/components/ui/field";
import LoadingButton from "@/components/blocks/loadingButton";
import useHabitCreate from "../hooks/useHabitCreate";
import { toIconName } from "@/lib/utils";
import type { Habit } from "@/types/habit";
import useHabitUpdate from "../hooks/useHabitUpdate";
import useHabitDelete from "../hooks/useHabitDelete";

export default function ActionModal({
  action,
  isOpen,
  habit,
  onClose,
  onSuccess,
}: {
  action: Action;
  isOpen: boolean;
  habit?: Habit;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const {
    loading: loadingCreate,
    error: errorCreate,
    create,
  } = useHabitCreate();

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    update,
  } = useHabitUpdate();

  const {
    loading: loadingDelete,
    error: errorDelete,
    destroy,
  } = useHabitDelete();

  const loading =
    action === Action.CREATE ? loadingCreate
    : action === Action.UPDATE ? loadingUpdate
    : loadingDelete;

  const error =
    action === Action.CREATE ? errorCreate
    : action === Action.UPDATE ? errorUpdate
    : errorDelete;

  const [form, setForm] = useState({
    icon: "",
    name: "",
    color: "",
  });

  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === Action.CREATE) {
      const result = await create(form);
      if (result) {
        onSuccess();
      }
    } else if (action === Action.UPDATE && habit) {
      const result = await update(habit.id, form);
      if (result) {
        onSuccess();
      }
    } else if (action === Action.DELETE && habit) {
      const result = await destroy(habit.id);
      if (result) {
        onSuccess();
      }
    }
  };

  useEffect(() => {
    if (habit) {
      setForm({
        icon: habit.icon,
        color: habit.color,
        name: habit.name,
      });
    }
  }, [habit]);

  useEffect(() => {
    switch (action) {
      case Action.CREATE:
        setTitle("Create Habit");
        break;
      case Action.UPDATE:
        setTitle("Update Habit");
        break;
      case Action.DELETE:
        setTitle("Delete Habit");
        break;
      case Action.DETAIL:
        setTitle("Detail Habit");
        break;

      default:
        break;
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {(action === Action.CREATE || action === Action.UPDATE) && (
            <>
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
                  // value={form.icon as IconName}
                />
              </Field>

              <Field className="flex flex-col gap-1.5">
                <FieldLabel htmlFor={"color"}>Color</FieldLabel>
                <ColorPicker
                  value={form.color}
                  name="color"
                  onChange={(e: string) =>
                    setForm((v) => ({ ...v, color: e.toString() }))
                  }
                />
              </Field>
            </>
          )}

          {action === Action.DELETE && (
            <>
              <h3>Are you sure wan't to delete this habit?</h3>
              <LoadingButton loading={loading} text="Confirm" />
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
