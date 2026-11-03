import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Table } from "@/validations/table-validation";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_ORDER_LIST,
} from "@/constants/order-constant";
import { createOrder } from "../action";
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
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type DialogCreateOrderDineInProps = {
  tables?: Table[] | undefined | null;
  closeDialog: () => void;
  selectedTable?: {
    id: string;
    name: string;
  };
};

export default function DialogCreateOrderDineIn({
  tables,
  closeDialog,
  selectedTable,
}: DialogCreateOrderDineInProps) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  });

  useEffect(() => {
    if (selectedTable) {
      form.setValue("table_id", `${selectedTable.id}`);
    }
  }, [selectedTable]);

  useEffect(() => {
    if (createOrderState?.status === "error") {
      toast.error("Create Order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState?.status === "success") {
      toast.success("Create Order Success");
      form.reset();
      closeDialog();
    }
  }, [createOrderState]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Order Dine In</DialogTitle>
        <DialogDescription>Add a new order</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="max-h-[50vh] px-1 overflow-y-auto">
          <FormInput
            form={form}
            label="Customer Name"
            name="customer_name"
            placeholder="Insert customer here"
          />
          {selectedTable ? (
            <div className="space-y-2">
              <Label>Table</Label>
              <Input name="table_id" value={selectedTable.name} disabled />
            </div>
          ) : (
            <FormSelect
              form={form}
              label="Table"
              name="table_id"
              selectItem={(tables ?? []).map((table: Table) => ({
                value: `${table.id}`,
                label: `${table.name} - ${table.status} (${table.capacity})`,
                disabled: table.status !== "available",
              }))}
            />
          )}
          <FormSelect
            form={form}
            label="Status"
            name="status"
            selectItem={STATUS_ORDER_LIST}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isPendingCreateOrder ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
