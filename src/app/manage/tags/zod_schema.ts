import { z } from 'zod'

export const tag_schema = z.object({
    id: z.number().optional(),
    name: z.string().trim().min(3, { message: "title min character is 3" }),
    displayOrder: z.number().optional(),

    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export type Tag = z.infer<typeof tag_schema>;
