import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { deleteTable } from "../actions";

type DialogDeleteTableProps = {
  open: boolean;
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
};

export default function DialogDeleteTable({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: DialogDeleteTableProps) {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData?.id as string);
    formData.append("avatar_url", currentData?.avatar_url as string);
    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState.status === "error") {
      toast.error("Delete table failed", {
        description: deleteTableState.errors?._form?.[0],
      });
    }

    if (deleteTableState.status === "success") {
      toast.success("Delete table success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteTableState]);

  return (
    <DialogDelete
      isLoading={isPendingDeleteTable}
      onSubmit={onSubmit}
      onOpenChange={handleChangeAction}
      open={open}
      title="Table"
    />
  );
}
