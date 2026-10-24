import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { updateTable } from "../actions";
import {
  Table,
  TableForm,
  tableFormSchema,
} from "@/validations/table-validation";
import { INITIAL_STATE_TABLE } from "@/constants/table-constant";
import FormTable from "./form-table";

type DialogUpdateTableProps = {
  refetch: () => void;
  open?: boolean;
  currentData?: Table;
  handleChangeAction: (open: boolean) => void;
};

export default function DialogUpdateTable({
  refetch,
  open,
  currentData,
  handleChangeAction,
}: DialogUpdateTableProps) {
  const form = useForm<TableForm>({
    resolver: zodResolver(tableFormSchema),
  });

  const [updateTableState, updateTableAction, isPendingUpdateTable] =
    useActionState(updateTable, INITIAL_STATE_TABLE);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateTableAction(formData);
    });
  });

  useEffect(() => {
    if (updateTableState?.status === "error") {
      toast.error("Update Table Failed", {
        description: updateTableState.errors?._form?.[0],
      });
    }

    if (updateTableState?.status === "success") {
      toast.success("Update Table Success");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateTableState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("description", currentData.description);
      form.setValue("capacity", currentData.capacity.toString());
      form.setValue("status", currentData.status);
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormTable
        form={form}
        isLoading={isPendingUpdateTable}
        onSubmit={onSubmit}
        type="Update"
      />
    </Dialog>
  );
}
