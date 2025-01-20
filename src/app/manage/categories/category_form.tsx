"use client";

import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input_field } from '@/components/ui/input_field';
import { Category, category_schema } from "./zod_schema";

import { create, update } from "./server";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const Category_form = ({ category, mutate }: { category: Category | undefined, mutate: () => void }) => {

    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validation_errors, set_validation_errors] = useState<unknown>(null)
    const ref = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Category>({
        defaultValues: category,
        resolver: zodResolver(category_schema),
    });

    const on_submit = async (formValues: FieldValues) => {

        const result = category_schema.safeParse(formValues)

        if (result.success) {

            const data = result.data

            if (category?.id) {
                try {
                    data.id = category?.id
                    await update(data.id, data)

                    router.push('/manage/categories')
                } catch (error) {
                    console.log(`error: ${error}`)
                }

            } else {
                try {
                    await create(data)

                } catch (error) {
                    console.log(`error: ${error}`)
                }


            }
            set_validation_errors(null)
            reset()
            mutate()
            ref.current?.reset()


        }

        if (!result.success) {
            console.log('fail to validate')
        }

    }

    return (
        <div className=" bg-red-600">
            <form
                ref={ref}
                className="flex gap-4 pb-8 mt-8 space-y-3 text-gray-900"
                onSubmit={handleSubmit(on_submit)}
            >
                <div className="flex-grow">
                    <Input_field
                        register={register("name")}
                        type="text"
                        label="name"
                        error={errors?.name?.message}
                    />


                    <div className="flex gap-2">

                        <button
                            type="submit"
                            className="px-3 py-2 mt-8 text-blue-300 bg-blue-500 rounded-lg "
                        >
                            Submit
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};
