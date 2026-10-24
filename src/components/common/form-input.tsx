import React from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          {type === "textarea" ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              autoComplete="off"
              className="resize-none"
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              autoComplete="off"
              type={type}
            />
          )}
          {fieldState.invalid && (
            <FieldError className="text-xs" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
