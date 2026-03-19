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

export default function DataTable() {
  const { data, loading, error } = useHabit();
  const [actionModal, setActionModal] = useState<{
    action: Action | null;
    isOpen: boolean;
  }>({
    action: null,
    isOpen: false,
  });

  const closeActionModal = () => {
    setActionModal({
      action: null,
      isOpen: false,
    });
  };

  return (
    <>
      <Card>
        <Button
          onClick={() => {
            setActionModal({
              action: Action.CREATE,
              isOpen: true,
            });
          }}>
          Create Habit
        </Button>
        <CardContent>
          {loading ?
            <SkeletonTable />
          : <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-25">No</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Color</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {data.map((e, index) => {
                    return (
                      <>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <DynamicIcon iconName={e.icon} />
                        </TableCell>
                        <TableCell>{e.name}</TableCell>
                        <TableCell>{e.color}</TableCell>
                      </>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          }
        </CardContent>
      </Card>
      {actionModal.isOpen && actionModal.action != null && (
        <ActionModal
          action={actionModal.action}
          isOpen={actionModal.isOpen}
          isClose={closeActionModal}
        />
      )}
    </>
  );
}
