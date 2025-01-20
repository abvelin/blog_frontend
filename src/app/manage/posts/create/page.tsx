"use client"


// import prisma from '@/prisma'
import { Post_form } from "../post_form";
// import { categories_list } from "../server";
// import useSWR from "swr";


const Add_post_page = () => {
    // const categories = await prisma.category.findMany({ orderBy: { updated_at: "desc" } })
    // const { data: categories } = useSWR('/api/categories', async () => (await list()))
    // const { data: tags } = useSWR('/api/tags', async () => (await list()))
    // const { data: posts, isLoading } = useSWR('/api/posts', async () => (await list()))

    return (
        <div className="flex justify-center flex-1 bg-gray-100">
            <Post_form post={undefined} />
        </div>
    );
}

export default Add_post_page;


