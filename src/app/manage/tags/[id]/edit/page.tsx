'use client'
import { Tag_form } from "../../tag_form";
import useSWR from "swr";
import { find } from "../../server";
import { useMemo, use, useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Edit_tag_page({ params }: any) {

    const resolved_params = use(params)

    const [is_it_loading, set_is_it_loading] = useState(true);
    const { id } = resolved_params

    const { data, mutate } = useSWR(`http://localhost:8080/api/tags/${id}`, async () => await find(id))

    const tag = useMemo(() => {
        return data ? data : undefined;
    }, [data]);

    useEffect(() => {
        if (data) {
            set_is_it_loading(false)
        }
    }, [data]);

    if (is_it_loading) {
        return <div>Loading category data...</div>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center  p-24">

            <Tag_form tag={tag} mutate={mutate} />

        </div >

    );
}