"use server"
import axios from '@/lib/axios'
import { Category, category_schema } from './zod_schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export const create = async (data: Category) => {

    const validation = category_schema.safeParse(data)

    if (validation.success) {

        //for updating existing displayOrder
        await axios
            .get('http://localhost:8080/api/categories')
            .then((res: { data: Category[] }) => res.data.forEach(async category => {

                const displayOrder = category.displayOrder ?? 1
                category.displayOrder = displayOrder + 1

                update(category.id, category)

            }))
            .catch((error: unknown) => console.log(`error ${error}`))

        //for inserting the new category
        data.displayOrder = 1
        // const added_category = await axios
        await axios
            .post('http://localhost:8080/api/categories', data)
            .then((res: { data: Category }) => res.data)


        // revalidatePath("/manage/categories")
        // redirect('/manage/categories')
        // return added_category
    }

    if (!validation.success) console.log(`the errors that we get ${validation.error}`)

    revalidatePath("/manage/categories")
    redirect('/manage/categories')
}

export const find_all = async () => {
    const categories = await axios
        .get('http://localhost:8080/api/categories')
        .then((res: { data: Category[] }) => res.data)
        .catch(() => [])
    // .catch((error: unknown) => console.log(`error ${error}`))

    return categories
}

export const find = async (id: number) => {
    const category = await axios
        .get(`http://localhost:8080/api/categories/${id}`)
        .then((res: { data: Category }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))
    return category
}
export const update = async (id: unknown, data: Category) => {
    // const updated_category = await axios
    await axios
        .put(`http://localhost:8080/api/categories/${id}`, data)
        .then((res: { data: Category }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))

}

export const remove = async (id: number, categories: Category[]) => {


    const deleted_category = await axios
        .delete(`http://localhost:8080/api/categories/${id}`)
        .then((res: { data: Category }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))

    if (!deleted_category) return
    const remaining_categories_after_a_delete = categories
        .filter(category => category.id != id)


    remaining_categories_after_a_delete.map(async (category: Category) => {

        const deleted_category_displayOrder = deleted_category?.displayOrder ?? 0
        const category_displayOrder = category?.displayOrder ?? 0
        if (deleted_category_displayOrder < category_displayOrder) {

            category.displayOrder = category_displayOrder - 1

            update(category.id, category)
        }
    })
}

export const reorder_categories = async (categories: Category[]) => {

    try {
        categories.forEach(async (category: Category, index: number) => {

            const order: number = index + 1;
            category.displayOrder = order

            update(category.id, category)
        })
    } catch (error) {
        console.log(`error: ${error}`);
    }

}

