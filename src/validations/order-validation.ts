import z, { number, string } from "zod";

export const orderSchema = z.object({
    id: number(),
    order_id: string(),
    customer_name: string(),
    status: string(),
    payment_token: string(),
    table_id: number(),
})

export const orderFormSchema = z.object({
    customer_name: string().min(1, 'Customer name is required'),
    status: string().min(1, 'Select a table'),
    table_id: string().min(1, 'Select a table'),
})

export const orderTakeawayFormSchema = z.object({
    customer_name: string().min(1, 'Customer name is required'),
})

export type Order = z.infer<typeof orderSchema>
export type OrderForm = z.infer<typeof orderFormSchema>
export type OrderTakeawayForm = z.infer<typeof orderTakeawayFormSchema>