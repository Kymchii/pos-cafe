import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { getImageData } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileImage } from "lucide-react";
import { Input } from "../ui/input";
import { Preview } from "@/types/general";

export default function FormImage<T extends FieldValues>({
  form,
  name,
  label,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  preview?: {
    file: File;
    displayUrl: string;
  };
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, ...rest }, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage
                src={preview?.displayUrl}
                alt="preview"
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg">
                <FileImage className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Input
              type="file"
              name={rest.name}
              ref={rest.ref}
              onBlur={rest.onBlur}
              disabled={rest.disabled}
              onChange={async (event) => {
                const { file, displayUrl } = getImageData(event);
                onChange(file);
                if (file) {
                  setPreview?.({ file, displayUrl });
                }
              }}
            />
          </div>
          {fieldState.invalid && (
            <FieldError className="text-xs" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
