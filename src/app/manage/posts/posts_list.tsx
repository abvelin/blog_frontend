import useSWR from 'swr'

import { find_all } from './server'
import { Post_item } from './post_item'
import { Post } from './zod_schema'

export const Posts_list = () => {

    const { data: posts } = useSWR('http://localhost:8080/api/posts', async () => (await find_all()))

    // if (isLoading) return <div className='text-2xl text-blue-500'>Loading...</div>

    return (
        // <Category_form category={undefined} />
        <div className="flex flex-col flex-1 w-full p-4 bg-green-400">
            <h1 className='flex justify-center'>This is the books page</h1>
            <div className='flex flex-1 flex-col flex-wrap'>
                {posts?.map((post: Post) => (

                    // <div> in the post's item</div>
                    <Post_item key={post?.id} post={post} />
                ))}
            </div>
        </div>
    )
}
