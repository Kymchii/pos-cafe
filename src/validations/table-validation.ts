import z, { number, string } from "zod";

export const tableFormSchema = z.object({
    name: string().min(1, 'Name is required'),
    description: string().min(1, 'Description is required'),
    capacity: string().min(1, 'Capacity is required'),
    status: string().min(1, 'Name is required')
})

export const tableSchema = z.object({
    name: string(),
    description: string(),
    capacity: number(),
    status: string()
})

export type TableForm = z.infer<typeof tableFormSchema>
export type Table = z.infer<typeof tableSchema> & { id: string }
export type TableMapType = Table & {
    position_x: number;
    position_y: number;
}