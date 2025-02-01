"use client"
import React, { use, useEffect, useState } from 'react'
import useSWR from 'swr';
import { find } from '../../server';
import { Post_form } from '../../post_form';

function Post_update_page({ params }: any) {
    const resolved_params = use(params)

    const [is_it_loading, set_is_it_loading] = useState(true);
    const { id } = resolved_params

    const { data } = useSWR(`http://localhost:8080/api/posts/${id}`, async () => await find(id))

    const post = data
    // let post: Post



    useEffect(() => {
        if (data) {
            set_is_it_loading(false)
        }
    }, [data]);

    if (is_it_loading) {
        return <div>Loading post data...</div>;
    }

    return (
        <div className='flex flex-1 flex-col bg-blue-300'>
            <Post_form post={post} /> :

        </div>
    )
}

export default Post_update_page