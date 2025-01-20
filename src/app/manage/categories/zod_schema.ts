import { z } from 'zod'

export const category_schema = z.object({
    id: z.number().optional(),
    name: z.string().trim().min(3, { message: "title min character is 3" }),
    displayOrder: z.number().optional(),

    category: z.any(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export type Category = z.infer<typeof category_schema>;
