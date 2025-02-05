"use client";

import { useEffect, useMemo, useState } from "react";

import { useForm, Controller, FieldValues } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Image as Image_icon } from "lucide-react";

import { Input_field } from '@/input_field';
import { Post, post_schema } from "./zod_schema";
import { Photo_upload, accepted_files } from "@/photo_upload";
import { Tiptap_wysiwyg } from '@/tiptap_wysiwyg';
import { create, update } from "./server";
import Image from "next/image";
// import { Select_field } from "@/select_field";
import useSWR from "swr";
// import { Category } from "../categories/zod_schema";
import { find_all } from "../categories/server";
import { Select_field } from "@/components/ui/select_field";
// import { Select_field } from "@/components/form/select_field";
// import dynamic from "next/dynamic";

// const Tiptap_wysiwyg = dynamic(() => import('../../../components/ui/tiptap_wysiwyg/tiptap_wysiwyg'), { ssr: false })
// const Tiptap_wysiwyg = dynamic(() => import('@/tiptap_wysiwyg'))
export const Post_form = ({ post }: { post: Post | undefined }) => {

    const { data } = useSWR('http://localhost:8080/api/categories', async () => await find_all())


    if (post) console.log(`post details is here: ${JSON.stringify(post)}`)

    const categories = useMemo(() => {
        return data ? data : [];
    }, [data]);


    const categories_available = categories.map((category) => {
        const obj = {}
        return { ...obj, value: category.id, label: category.name }
    })

    let prev_category: any = {};
    // const selected_categories_ids: any = [];

    const [photo_preview, set_photo_preview] = useState<null | string>(null);

    const photo: null | string = null;

    // post?.category ? prev_category = { value: post.category?.id, label: post.category?.name }: {}

    if (post) {
        prev_category = { value: post.category?.id, label: post.category?.name }
        // book.categories = prev_categories; //🚨 for grabbing ids in formData
    }
    useEffect(() => {
        set_photo_preview(() => photo);
    }, [photo]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },

    } = useForm<Post>({
        defaultValues: post,
        resolver: zodResolver(post_schema),
    });



    const on_submit = async (formValues: FieldValues) => {

        formValues.category.id = formValues.category.value

        // formValues.category_id = formValues.category.id
        // formValues.category.label = formValues.category.label_id
        delete formValues?.category?.value;
        delete formValues?.category?.label;

        console.log(`formValues before we enter in result.succes: ${JSON.stringify(formValues)}`)
        // return
        // if (typeof accepted_files[0] === "undefined" && !formValues.id) return;

        // if (typeof accepted_files[0] === "object") {

        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //     const form_data: any = new FormData();

        //     form_data.append("file", accepted_files[0]);
        //     form_data.append("upload_preset", "delpierro");
        //     form_data.append("api_key", "571593459788758");

        //     const results = await fetch(
        //         "https://api.cloudinary.com/v1_1/abvelin-ke/image/upload",
        //         { method: "POST", body: form_data }
        //     ).then((r) => r.json());

        //     formValues.photo_url = results.secure_url;
        // }


        // typeof formValues?.categories[0] === "object"
        //     ? (formValues.categories = selected_categories_ids)
        //     : formValues.categories;

        const result = post_schema.safeParse(formValues)


        if (result.success) {

            console.log(`formValues id : ${JSON.stringify(formValues.id)}`)
            console.log(`formValues in success: ${JSON.stringify(formValues)}`)
            console.log(`post_id: ${post?.id}`)

            const data = result.data

            console.log(`data: ${JSON.stringify(data)}`)
            let post_id
            if (post?.id) {
                // data.categories = formValues.categories
                data.id = post?.id

                post_id = await update(data.id, data)
            } else {
                post_id = await create(data)
                console.log(`post_id: ${post_id}`)
            }

        }

        if (!result.success) {
            console.log('fail to validate')
        }
    }

    return (
        <div className="w-11/12">
            <h1 className="text-3xl text-center text-gray-900">post form</h1>
            <form
                className="flex gap-4 pb-8 mt-8 space-y-3 text-gray-900"
                onSubmit={handleSubmit(on_submit)}
            >
                <div className="w-8/12">
                    <Input_field
                        register={register("title")}
                        label="title"
                        error={errors?.title?.message}
                    />

                    {/* <div className="">

                        <Controller
                            name="category"
                            // defaultValue={prev_categories}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select_field
                                    label="Categories"
                                    placeholder="Select your categories"
                                    defaultValue={post?.category}
                                    options={categories_available}
                                    selection_values={value}
                                    on_change={onChange}
                                    error={errors?.category?.message} />
                            )}
                        />
                        {errors.category && (
                            <p className="text-red-500">{`${errors.category?.message}`}</p>
                        )}
                        {errors && (
                            <p className="text-red-500">{`${errors}`}</p>
                        )}
                    </div> */}

                    <div className="">
                        <Select_field
                            name="category"
                            label="Category"
                            placeholder="Select your category"
                            control={control}
                            options={categories_available}
                            defaultValue={post?.category}
                            isMulti={false}
                        />
                    </div>

                    <Controller
                        name="content"
                        control={control}
                        defaultValue={post?.content}
                        rules={{ required: true }}

                        render={({ field: { onChange, value, name } }) => (

                            <div className="text-gray-500">
                                <Tiptap_wysiwyg value={value}
                                    label={name}
                                    on_change={onChange}
                                    error={errors?.content?.message} />
                            </div>
                        )}
                    />
                    {/* {errors?.post_copies && <p className="text-red-500">{`${errors?.post_copies?.message}`}</p>} */}
                    <div className="flex gap-2">

                        <button
                            type="submit"
                            className="px-3 py-2 mt-8 text-blue-300 bg-blue-500 rounded-lg "
                        >
                            Submit
                        </button>
                        {errors.category && (
                            <p className="text-red-500">{`${errors.category?.message}`}</p>
                        )}
                        {errors && (
                            <div>
                                <p className="text-red-500">{`${JSON.stringify(errors)}`}</p>
                                {/* <p>{post?.createdAt}</p> */}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-4/12 gap-4">
                    <Photo_upload
                        label="Click or drag to add a photo"
                        set_photo_preview={set_photo_preview}
                    />

                    <div className="flex items-center justify-center w-full">

                        <div className="w-full aspect-[3/4] relative border border-gray-300">
                            {photo_preview && (
                                <Image src={photo_preview} alt="Image for the post" className="absolute object-cover object-center w-full h-full" width={500} height={500} />
                            )}
                            {!photo_preview && (<Image_icon className="absolute object-cover object-center w-full h-full" />)}
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};
