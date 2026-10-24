import { Preview } from "@/types/general";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ROLE_LIST } from "@/constants/auth-constant";
import { Loader2 } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import FormImage from "@/components/common/form-image";
import { Button } from "@/components/ui/button";
import { AVAILABILITY, CATEGORY_LIST } from "@/constants/menu-constant";

export default function FormMenu<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{type} Menu</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Add a new menu" : "Make changes menu here"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="max-h-[50vh] px-1 overflow-y-auto">
          <FormInput
            form={form}
            label="Name"
            name={"name" as Path<T>}
            placeholder="Insert name here"
          />
          <FormInput
            form={form}
            label="Description"
            name={"description" as Path<T>}
            placeholder="Insert description here"
            type="textarea"
          />
          <FormInput
            form={form}
            label="Price"
            name={"price" as Path<T>}
            placeholder="Insert price here"
            type="number"
          />
          <FormInput
            form={form}
            label="Discount"
            name={"discount" as Path<T>}
            placeholder="Insert discount here"
            type="number"
          />
          <FormImage
            form={form}
            label="Image"
            name={"image_url" as Path<T>}
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            label="Category"
            name={"category" as Path<T>}
            selectItem={CATEGORY_LIST}
          />
          <FormSelect
            form={form}
            label="Availability"
            name={"is_available" as Path<T>}
            selectItem={AVAILABILITY}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : type}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
