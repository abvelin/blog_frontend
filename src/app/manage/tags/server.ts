"use server"
import axios from '@/lib/axios'
import { Tag, tag_schema } from './zod_schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export const create = async (data: Tag) => {

    const validation = tag_schema.safeParse(data)

    if (validation.success) {

        //for updating existing displayOrder
        await axios
            .get('http://localhost:8080/api/tags')
            .then((res: { data: Tag[] }) => res.data.forEach(async tag => {

                const displayOrder = tag.displayOrder ?? 1
                tag.displayOrder = displayOrder + 1

                update(tag.id, tag)

            }))
            .catch((error: unknown) => console.log(`error ${error}`))

        //for inserting the new Tag
        data.displayOrder = 1
        // const added_Tag = await axios
        await axios
            .post('http://localhost:8080/api/tags', data)
            .then((res: { data: Tag }) => res.data)


    }

    if (!validation.success) console.log(`the errors that we get ${validation.error}`)

    revalidatePath("/manage/tags")
    redirect('/manage/tags')
}

export const find_all = async () => {
    const tags = await axios
        .get('http://localhost:8080/api/tags')
        .then((res: { data: Tag[] }) => res.data)
        .catch(() => [])
    // .catch((error: unknown) => console.log(`error ${error}`))

    return tags
}

export const find = async (id: number) => {
    const tag = await axios
        .get(`http://localhost:8080/api/tags/${id}`)
        .then((res: { data: Tag }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))
    return tag
}
export const update = async (id: unknown, data: Tag) => {
    // const updated_Tag = await axios
    await axios
        .put(`http://localhost:8080/api/tags/${id}`, data)
        .then((res: { data: Tag }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))

}

export const remove = async (id: number, tags: Tag[]) => {


    const deleted_tag = await axios
        .delete(`http://localhost:8080/api/tags/${id}`)
        .then((res: { data: Tag }) => res.data)
        .catch((error: unknown) => console.log(`error ${error}`))

    if (!deleted_tag) return
    const remaining_tags_after_a_delete = tags
        .filter(Tag => Tag.id != id)


    remaining_tags_after_a_delete.map(async (tag: Tag) => {

        const deleted_tag_displayOrder = deleted_tag?.displayOrder ?? 0
        const tag_displayOrder = tag?.displayOrder ?? 0
        if (deleted_tag_displayOrder < tag_displayOrder) {

            tag.displayOrder = tag_displayOrder - 1

            update(tag.id, tag)
        }
    })
}

export const reorder_tags = async (tags: Tag[]) => {

    try {
        tags.forEach(async (tag: Tag, index: number) => {

            const order: number = index + 1;
            tag.displayOrder = order

            update(tag.id, tag)
        })
    } catch (error) {
        console.log(`error: ${error}`);
    }

}

