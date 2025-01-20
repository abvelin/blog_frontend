"use client"
import useSWR from 'swr'
import { Tags_list } from './tags_list'
import { Tag_form } from './tag_form'
import React, { useMemo } from 'react'
import { find_all } from './server'

export default function Tags_page() {
    const { data, mutate } = useSWR('http://localhost:8080/api/tags', async () => await find_all())

    const tags = useMemo(() => {
        return data ? data : [];
    }, [data]);
    return (
        <div className="flex-grow h-min flex justify-center bg-slate-500">
            <div className='flex flex-grow justify-between pt-20  mx-16'>
                <div className='w-1/3'>

                    <h1 className="text-gray-800 text-3xl">Add a category</h1>
                    <Tag_form tag={undefined} mutate={mutate} />
                </div>

                <Tags_list tags={tags} mutate={mutate} />
            </div>
        </div>
    )
}

