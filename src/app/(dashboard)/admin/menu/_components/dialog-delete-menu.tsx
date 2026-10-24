import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { deleteMenu } from "../actions";

type DialogDeleteMenuProps = {
  open: boolean;
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
};

export default function DialogDeleteMenu({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: DialogDeleteMenuProps) {
  const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] =
    useActionState(deleteMenu, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData?.id as string);
    formData.append("avatar_url", currentData?.avatar_url as string);
    startTransition(() => {
      deleteMenuAction(formData);
    });
  };

  useEffect(() => {
    if (deleteMenuState.status === "error") {
      toast.error("Delete menu failed", {
        description: deleteMenuState.errors?._form?.[0],
      });
    }

    if (deleteMenuState.status === "success") {
      toast.success("Delete menu success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteMenuState]);

  return (
    <DialogDelete
      isLoading={isPendingDeleteMenu}
      onSubmit={onSubmit}
      onOpenChange={handleChangeAction}
      open={open}
      title="Menu"
    />
  );
}
