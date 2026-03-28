import { SkeletonTable } from "@/components/blocks/skeletonTable";
import useHabit from "../hooks/useHabit";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DynamicIcon } from "@/components/blocks/dynamicIcon";
import { useState } from "react";
import { Action } from "@/lib/enums";
import ActionModal from "./ActionModal";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { EyeIcon, Pencil, PencilIcon, TrashIcon } from "lucide-react";
import type { Habit } from "@/types/habit";

export default function DataTable() {
  const { data, loading, error, refresh } = useHabit();
  const [actionModal, setActionModal] = useState<{
    action: Action | null;
    habit: Habit | null;
    isOpen: boolean;
  }>({
    action: null,
    habit: null,
    isOpen: false,
  });

  const closeActionModal = () => {
    setActionModal({
      action: null,
      isOpen: false,
      habit: null,
    });
  };

  return (
    <>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-row justify-end">
            <Button
              onClick={() => {
                setActionModal({
                  action: Action.CREATE,
                  isOpen: true,
                  habit: null,
                });
              }}>
              Create Habit
            </Button>
          </div>
          {loading ?
            <SkeletonTable />
          : <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">No</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((e, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <DynamicIcon color={e.color} iconName={e.icon} />
                      </TableCell>
                      <TableCell>{e.name}</TableCell>

                      <TableCell className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <DotsThreeIcon size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="min-w-0 w-28">
                            <DropdownMenuItem>
                              <EyeIcon />
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setActionModal({
                                  action: Action.UPDATE,
                                  isOpen: true,
                                  habit: e,
                                });
                              }}>
                              <PencilIcon /> Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => {
                                setActionModal({
                                  action: Action.DELETE,
                                  isOpen: true,
                                  habit: e,
                                });
                              }}>
                              <TrashIcon />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          }
        </CardContent>
      </Card>
      {actionModal.isOpen && actionModal.action != null && (
        <ActionModal
          action={actionModal.action}
          isOpen={actionModal.isOpen}
          habit={actionModal.habit ?? undefined}
          onClose={closeActionModal}
          onSuccess={() => {
            refresh();
            closeActionModal();
          }}
        />
      )}
    </>
  );
}
