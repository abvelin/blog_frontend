import { z } from 'zod'

// export const category_schema = z.object({
//     id: z.string().uuid().optional(),
//     name: z.string().trim().min(3, { message: "category min character is 3" }),

//     display_order: z.number().optional(),

//     created_at: z.date().optional(),
//     updated_at: z.date().optional(),
// });

// export type Category = z.infer<typeof category_schema>; // number

// export const tag_schema = z.object({
//     id: z.string().uuid().optional(),
//     name: z.string().trim().min(3, { message: "tag min character is 3" }),

//     display_order: z.number().optional(),

//     created_at: z.date().optional(),
//     updated_at: z.date().optional(),
// });

// export type Tag = z.infer<typeof tag_schema>; // number

export const post_schema = z.object({
    id: z.number().optional(),
    title: z.string().trim().min(3, { message: "title min character is 3yr" }),
    content: z.string().trim().min(9, { message: "the content must be at least 9 characters" }),

    photo_url: z.any(),

    category: z.any().optional(),
    // pages: z.preprocess(
    //     (val) => Number(val),
    //     z.number().min(1, "add page number of the book"),
    // ),
    // book_copies: z.preprocess(
    //     (val) => Number(val),
    //     z.number().min(1, "add number of copies available"),
    // ),

    // is_on_market: z.boolean().optional(),

    // display_order: z.number().optional(),

    // photo: z.any(),

    // category_id: z.any(),
    // tags: z.any(),

    // createdAt: z.date().optional(),
    createdAt: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "Expected date, received string",
    }),  // Validate string as a valid date
    time_ago_for_created_at: z.string().optional(),
    time_ago_for_updated_at: z.string().optional(),
    // updatedAt: z.date().optional(),
    updatedAt: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "Expected date, received string",
    }),
});

export type Post = z.infer<typeof post_schema>;
