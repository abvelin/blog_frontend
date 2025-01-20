"use client"
import useSWR from 'swr'
import { Categories_list } from './categories_list'
import { Category_form } from './category_form'
import React, { useMemo } from 'react'
import { find_all } from './server'

export default function Categories_page() {
    const { data, mutate } = useSWR('http://localhost:8080/api/categories', async () => await find_all())

    const categories = useMemo(() => {
        return data ? data : [];
    }, [data]);
    return (
        <div className="flex-grow h-min flex justify-center bg-slate-500">
            <div className='flex flex-grow justify-between pt-20  mx-16'>
                <div className='w-1/3'>

                    <h1 className="text-gray-800 text-3xl">Add a category</h1>
                    <Category_form category={undefined} mutate={mutate} />
                </div>

                <Categories_list categories={categories} mutate={mutate} />
            </div>
        </div>
    )
}

