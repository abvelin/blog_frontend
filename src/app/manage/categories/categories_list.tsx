'use client'
import React, { FormEvent, useEffect, useState } from 'react'

import Link from 'next/link'
import { Category } from './zod_schema';
import { Reorder, useDragControls } from 'framer-motion';
import { ArrowDownUp, Pencil, X } from 'lucide-react';
import { remove, reorder_categories } from './server';

export const Categories_list = ({ categories, mutate }: { categories: Category[], mutate: () => void }) => {

    const [categories_order, set_categories_order] = useState(categories)

    const [is_it_loading, set_is_it_loading] = useState(true);


    useEffect(() => {
        if (categories) {
            set_is_it_loading(false)
        }
    }, [categories]);

    useEffect(() => {
        set_categories_order(categories)
    }, [categories])

    useEffect(() => {
        set_categories_order(categories_order)
    }, [categories_order])

    const draggable_trigger = useDragControls()


    const reorder_category_fn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (categories_order.length > 0) {
                await reorder_categories(categories_order)
                mutate()
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (is_it_loading) {
        return <div>Loading category data...</div>;
    }

    return (

        <div>
            {categories_order.length > 0
                ? (
                    <div>
                        <table className="table-auto border-separate border-spacing-1">
                            <thead>
                                <tr className='gap-16'>
                                    <th className='bg-green-600 px-2'>Current order</th>
                                    <th className='bg-green-600 px-2'>New order</th>
                                    <th className='bg-green-600 px-2'>name</th>
                                    <th className='bg-green-600 px-2'>actions</th>

                                </tr>
                            </thead>

                            {/* <tbody> */}
                            <Reorder.Group
                                values={categories_order}
                                onReorder={set_categories_order}
                                as='tbody'
                                className='gap-4'
                            >
                                {
                                    categories_order?.map((category: Category) => {
                                        return (
                                            <Reorder.Item
                                                key={category.id}
                                                value={category}
                                                as='tr'
                                                // dragListener={false}
                                                dragControls={draggable_trigger}
                                                className='bg-slate-400'
                                            >
                                                {/* <tr> */}
                                                <td className='px-2'>{category.displayOrder}</td>
                                                <td className='px-2'>{categories_order.indexOf(category) + 1}</td>

                                                <td className='px-2'>
                                                    <Link href={`categories/${category.id}/edit`} >
                                                        <span > {category.name}</span>
                                                    </Link>
                                                </td>
                                                <td className='flex'>
                                                    {/* <button
                                                        onClick={
                                                            async () => {
                                                                if (category.id) await remove(category.id, categories_order)
                                                                mutate()
                                                            }
                                                        }
                                                        className=''>
                                                        <X className='m-2 text-red-600' />
                                                    </button> */}

                                                    <Link href={`categories/${category.id}/edit`}
                                                        className="">
                                                        <Pencil className='m-2 text-blue-600 ' />
                                                    </Link>
                                                    <ArrowDownUp className='m-2 text-green-400 reorder-handle' onPointerDown={(e) => draggable_trigger.start(e)} />
                                                </td>
                                                {/* </tr> */}
                                            </Reorder.Item>
                                        )
                                    })
                                }
                            </Reorder.Group>

                            {/* </tbody> */}
                        </table>

                        <form onSubmit={reorder_category_fn}>
                            <button
                                type="submit"
                                className="px-3 py-2 text-white bg-blue-400 rounded-lg"
                            >
                                Update to new order
                            </button>
                        </form>
                    </div >
                )
                : (<p>no categories yet</p>)
            }
        </div>


    )
}
