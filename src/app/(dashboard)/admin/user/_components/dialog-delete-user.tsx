import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { deleteUser } from "../actions";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";

type DialogDeleteUserProps = {
  open: boolean;
  refetch: () => void;
  currentData?: Profile;
  handleChangeAction: (open: boolean) => void;
};

export default function DialogDeleteUser({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: DialogDeleteUserProps) {
  const [deleteUserState, deleteUserAction, isPendingDeleteUser] =
    useActionState(deleteUser, INITIAL_STATE_ACTION);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData?.id as string);
    formData.append("avatar_url", currentData?.avatar_url as string);
    startTransition(() => {
      deleteUserAction(formData);
    });
  };

  useEffect(() => {
    if (deleteUserState.status === "error") {
      toast.error("Delete user failed", {
        description: deleteUserState.errors?._form?.[0],
      });
    }

    if (deleteUserState.status === "success") {
      toast.success("Delete user success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteUserState]);

  return (
    <DialogDelete
      isLoading={isPendingDeleteUser}
      onSubmit={onSubmit}
      onOpenChange={handleChangeAction}
      open={open}
      title="User"
    />
  );
}
