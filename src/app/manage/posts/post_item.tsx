"use client";
import React from "react";
// import { useRouter } from "next/navigation";
// import { Post } from './zod_schema'
import Link from "next/link";
import { Post } from "./zod_schema";
// import { Post } from "./zod_schema";
// import { Post } from "./zod_schema";
// import { Post } from "./zod_schema";

export const Post_item = ({ post }: { post: Post }) => {


    return (
        <div className="flex flex-col flex-1  my-4 text-gray-600">
            <div className="bg-gray-200 flex flex-col">
                <div className="relative bg-red-900 pb-1/1">
                    {/* <Image src={book.photo} width={500} /> */}
                    {/* {/* <img src={book.photo} className="absolute object-contain w-full h-full bg-red-500" /> */}

                </div>
                <div>
                    <Link
                        href={`/manage/posts/${post?.id}`}
                        className="text-2xl text-blue-500"
                    >
                        {post?.title}
                    </Link>

                    <span className="ml-6 bg-blue-300 text-blue-500 px-2 py-1">{post.category.name}</span>
                </div>
                <div className="py-4" />

                <div dangerouslySetInnerHTML={{ __html: post.content }} />

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
        </div>
    );
};