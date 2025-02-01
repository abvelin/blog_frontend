"use client"
import React, { use, useEffect, useState } from 'react'
import useSWR from 'swr'
import { find } from '../server'
import Link from 'next/link'

export default function Post_page({ params }: any) {

    const resolved_params = use(params)

    const [is_it_loading, set_is_it_loading] = useState(true);
    const { id } = resolved_params

    const { data: post } = useSWR(`http://localhost:8080/api/posts/${id}`, async () => await find(id))

    useEffect(() => {
        if (post) {
            set_is_it_loading(false)
        }
    }, [post]);

    if (is_it_loading) {
        return <div>Loading post data...</div>;
    }

    return (
        <div className="flex flex-row flex-1  my-4 text-gray-600 gap-4">
            <div className="bg-gray-200 flex flex-1 flex-col">
                <div className="relative bg-red-900 pb-1/1">
                    {/* <Image src={book.photo} width={500} /> */}
                    {/* {/* <img src={book.photo} className="absolute object-contain w-full h-full bg-red-500" /> */}

                </div>
                <div>
                    <Link
                        href={`/manage/posts/${post?.id}/edit`}
                        className="text-2xl text-blue-500"
                    >
                        {post?.title}
                    </Link>

                    <span className="ml-6 bg-blue-300 text-blue-500 px-2 py-1">{post?.category.name}</span>
                </div>
                <div className="py-4" />

                <div dangerouslySetInnerHTML={{ __html: post?.content }} />

                {/* <div>{post.content}</div> */}
                {/* <div dangerouslySetInnerHTML={{ __html: post.description }} className="text-red-500"></div> */}
                {/* {post.categories && (
                    <div className="gap-3">
                        {post.categories?.map((category: any) => (
                            <span
                                key={category.id}
                                className="px-3 mx-3 text-blue-700 bg-blue-400"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )} */}
            </div>

            <div className='w-1/4 bg-slate-300'>
                <div>
                    <span className='pr-4'>Created:</span>
                    <span>{post?.time_ago_for_created_at}</span>
                </div>
                <div>
                    <span className='pr-4'>Updated:</span>
                    <span >{post?.time_ago_for_updated_at}</span>
                </div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}
