'use client'
import React, { FormEvent, useEffect, useState } from 'react'

import Link from 'next/link'
import { Tag } from './zod_schema';
import { Reorder, useDragControls } from 'framer-motion';
import { ArrowDownUp, Pencil, X } from 'lucide-react';
import { remove, reorder_tags } from './server';

export const Tags_list = ({ tags, mutate }: { tags: Tag[], mutate: () => void }) => {

    const [tags_order, set_tags_order] = useState(tags)

    const [is_it_loading, set_is_it_loading] = useState(true);

    useEffect(() => {
        if (tags) {
            set_is_it_loading(false)
        }
    }, [tags]);

    useEffect(() => {
        set_tags_order(tags)
    }, [tags])

    useEffect(() => {
        set_tags_order(tags_order)
    }, [tags_order])

    const draggable_trigger = useDragControls()


    const reorder_tag_fn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            if (tags_order.length > 0) {
                await reorder_tags(tags_order)
                mutate()
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (is_it_loading) {
        return <div>Loading tag data...</div>;
    }

    return (

        <div>
            {tags_order.length > 0
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
                                values={tags_order}
                                onReorder={set_tags_order}
                                // onReorder={set_dragging_tag}
                                as='tbody'
                                className='gap-4'
                            >
                                {tags_order?.map((tag: Tag) => {
                                    return (
                                        <Reorder.Item
                                            key={tag.id}
                                            value={tag}
                                            as='tr'
                                            // dragListener={false}
                                            // onDragEnd={handleEndDrag}
                                            dragControls={draggable_trigger}
                                            className='bg-slate-400'
                                        >
                                            {/* <tr> */}
                                            <td className='px-2'>{tag.displayOrder}</td>
                                            <td className='px-2'>{tags_order.indexOf(tag) + 1}</td>

                                            <td className='px-2'>
                                                <Link href={`tags/${tag.id}/edit`} >
                                                    <span > {tag.name}</span>
                                                </Link>
                                            </td>
                                            <td className='flex'>
                                                <button
                                                    onClick={
                                                        async () => {
                                                            if (tag.id) await remove(tag.id, tags_order)
                                                            mutate()
                                                        }
                                                    }
                                                    className=''>
                                                    <X className='m-2 text-red-600' />
                                                </button>

                                                <Link href={`tags/${tag.id}/edit`}
                                                    className="">
                                                    <Pencil className='m-2 text-blue-600 ' />
                                                </Link>
                                                <ArrowDownUp className='m-2 text-green-400 reorder-handle' onPointerDown={(e) => draggable_trigger.start(e)} />
                                            </td>
                                            {/* </tr> */}
                                        </Reorder.Item>
                                    )
                                })}
                            </Reorder.Group>

                            {/* </tbody> */}
                        </table>

                        <form onSubmit={reorder_tag_fn}>
                            <button
                                type="submit"
                                className="px-3 py-2 text-white bg-blue-400 rounded-lg"
                            >
                                Update to new order
                            </button>
                        </form>
                    </div >
                )
                : (<p>no tags yet</p>)
            }
        </div>


    )
}
