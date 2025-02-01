"use server"

import axios from '@/lib/axios'
import { Post } from './zod_schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'




export const create = async (data: Post) => {
    await axios
        .post('http://localhost:8080/api/posts', data)
        .then((res: { data: Post }) => res.data)


    revalidatePath("/manage/posts")
    redirect('/manage/posts')
}

export const find_all = async () => {
    const posts = await axios
        .get('http://localhost:8080/api/posts')
        .then((res: { data: Post[] }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))

    return posts
}

export const find = async (id: number) => {
    const post = await axios
        .get(`http://localhost:8080/api/posts/${id}`)
        .then((res: { data: Post }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))
    return post
}

export const update = async (id: unknown, data: Post) => {
    await axios
        .put(`http://localhost:8080/api/posts/${id}`, data)
        .then((res: { data: Post }) => JSON.stringify(res.data))
        .catch((error: unknown) => console.log(`error ${error}`))

    revalidatePath("/manage/posts")
    redirect('/manage/posts')
}

export const deletee = async (id: unknown) => {
    await axios
        .delete(`http://localhost:8080/api/posts/${id}`)
        .then((res: { data: Post }) => JSON.stringify(res.data))
        .catch((error: unknown) => console.log(`error ${error}`))
}


// export const add_book = async (data: unknown) => {

//     const book_validation = book_schema.safeParse(data)

//     if (book_validation.success) {

//         let { title, description, pages, book_copies, is_on_market, display_order, categories, photo } = book_validation.data

//         const categories_array = categories?.map((category: string) => ({ id: category }))

//         const book = await prisma.book?.create({
//             data: {
//                 title,
//                 description,
//                 pages,
//                 book_copies,
//                 is_on_market,
//                 display_order,
//                 photo,
//                 categories: {
//                     connect: categories_array
//                 },
//             },
//             include: { categories: true }
//         })

//         redirect(`/manage/books/${book.id}`)
//     }
//     if (!book_validation.success) console.log(`the errors that we get ${book_validation?.error}`)


// }

// export const update_book = async (data: Book) => {

//     const id = data.id
//     const book_validation = book_schema.safeParse(data)


//     if (!book_validation.success) console.log(`data_validation error ${book_validation.error}`)

//     if (book_validation.success) {

//         const { title, description, categories } = book_validation.data
//         const categories_array = categories?.map((category: string) => ({ id: category }))

//         try {
//             await prisma.book.update({
//                 where: { id },
//                 data: {
//                     title: title,
//                     description: description,
//                     categories: {
//                         set: [],
//                         connect: categories_array
//                     },
//                     updated_at: new Date()
//                 },
//                 include: { categories: true }
//             })
//         } catch (error) {
//             console.log(` the error that I get is ::::: ${error}`)
//         }

//     }


//     revalidatePath("/manage/books")
//     redirect('/manage/books')

// }

// export const reorder_books = async (books: Book[]) => {

//     try {
//         books.forEach(async (book, index) => {
//             const id: string = book.id!;
//             const order: number = index + 1;

//             await prisma.book.update({
//                 where: { id: String(id) },
//                 data: {
//                     display_order: order,
//                 },
//             });
//             console.log(id);
//         });
//         console.log("we succed to update database");
//     } catch (error) {
//         console.log("failure");
//     }

// }

// export const delete_book = async (id: string) => {

//     await prisma.book.delete({
//         where: {
//             id,
//         }
//     })

//     revalidatePath("/manage/books")

// }