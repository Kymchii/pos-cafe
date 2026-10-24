import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import { Dialog } from "@/components/ui/dialog";
import { Menu, MenuForm, menuFormSchema } from "@/validations/menu-validation";
import { INITIAL_STATE_MENU } from "@/constants/menu-constant";
import FormMenu from "./form-menu";
import { updateMenu } from "../actions";

type DialogUpdateMenuProps = {
  refetch: () => void;
  open?: boolean;
  currentData?: Menu;
  handleChangeAction: (open: boolean) => void;
};

export default function DialogUpdateMenu({
  refetch,
  open,
  currentData,
  handleChangeAction,
}: DialogUpdateMenuProps) {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuFormSchema),
  });

  const [updateMenuState, updateMenuAction, isPendingUpdateMenu] =
    useActionState(updateMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    if (currentData?.image_url !== data.image_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "image_url" ? (preview!.file ?? "") : value,
        );
      });
      formData.append("old_image_url", currentData?.image_url ?? "");
    } else {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateMenuAction(formData);
    });
  });

  useEffect(() => {
    if (updateMenuState?.status === "error") {
      toast.error("Update Table Failed", {
        description: updateMenuState.errors?._form?.[0],
      });
    }

    if (updateMenuState?.status === "success") {
      toast.success("Update Table Success");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateMenuState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("description", currentData.description);
      form.setValue("price", currentData.price.toString());
      form.setValue("discount", currentData.discount.toString());
      form.setValue("category", currentData.category);
      form.setValue("is_available", currentData.is_available.toString());
      form.setValue("image_url", currentData.image_url);
      setPreview({
        file: new File([], currentData.image_url as string),
        displayUrl: currentData.image_url as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormMenu
        form={form}
        isLoading={isPendingUpdateMenu}
        onSubmit={onSubmit}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
}
