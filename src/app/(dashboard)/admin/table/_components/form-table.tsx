import { Preview } from "@/types/general";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { AVAILABILITY, CATEGORY_LIST } from "@/constants/menu-constant";
import { STATUS_TABLE_LIST } from "@/constants/table-constant";

export default function FormTable<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{type} Table</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Add a new table" : "Make changes table here"}
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
            label="Capacity"
            name={"capacity" as Path<T>}
            placeholder="Insert capacity here"
            type="number"
          />
          <FormSelect
            form={form}
            label="Status"
            name={"status" as Path<T>}
            selectItem={STATUS_TABLE_LIST}
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
