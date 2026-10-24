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

export default function FormUser<T extends FieldValues>({
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
        <DialogTitle>{type} User</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Register a new user" : "Make changes user here"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <FieldGroup className="pb-4">
          {type === "Create" && (
            <FormInput
              form={form}
              label="Email"
              name={"email" as Path<T>}
              placeholder="Insert email here"
              type="email"
            />
          )}
          <FormInput
            form={form}
            label="Name"
            name={"name" as Path<T>}
            placeholder="Insert name here"
          />
          <FormSelect
            form={form}
            label="Role"
            name={"role" as Path<T>}
            selectItem={ROLE_LIST}
          />
          {type === "Create" && (
            <FormInput
              form={form}
              label="Password"
              name={"password" as Path<T>}
              placeholder="*****"
              type="password"
            />
          )}
          <FormImage
            form={form}
            label="Avatar"
            name={"avatar_url" as Path<T>}
            preview={preview}
            setPreview={setPreview}
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
