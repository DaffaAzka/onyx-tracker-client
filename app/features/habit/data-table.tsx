import { SkeletonTable } from "@/components/custom/skeleton-table";
import { useHabits } from "@/hooks/habit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/custom/dynamic-icon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeIcon } from "@phosphor-icons/react";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import type { Habit } from "@/types/model";
import ModalAdd from "./modal-add";
import ModalEdit from "./modal-edit";
import ModalDelete from "./modal-delete";

export default function DataTable() {
  const { data: habits = [], isPending: loading } = useHabits();

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    data: Habit | null;
  }>({
    isOpen: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    data: Habit | null;
  }>({
    isOpen: false,
    data: null,
  });

  return (
    <>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-row justify-end">
            <ModalAdd />
          </div>
          {loading ?
            <SkeletonTable />
          : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">No</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {habits.map((e, index) => {
                  return (
                    <TableRow key={e.id}>
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
                              <EyeIcon className="mr-2 h-4 w-4" />
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditModal({
                                  isOpen: true,
                                  data: e,
                                });
                              }}>
                              <PencilIcon className="mr-2 h-4 w-4" /> Update
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  data: e,
                                });
                              }}>
                              <TrashIcon className="mr-2 h-4 w-4" />
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

      <ModalEdit
        isOpen={editModal.isOpen}
        data={editModal.data}
        onOpenChange={(open) =>
          setEditModal((prev) => ({ ...prev, isOpen: open }))
        }
      />

      <ModalDelete
        isOpen={deleteModal.isOpen}
        data={deleteModal.data}
        onOpenChange={(open) =>
          setDeleteModal((prev) => ({ ...prev, isOpen: open }))
        }
      />
    </>
  );
}
