import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Input_field({ register, type, label, error }: any) {
    return (
        <div className="flex-1">

            <label className="block font-medium leading-6 text-gray-900 text-xl">
                {label}
            </label>
            <div className="mt-1 flex flex-col">
                <input

                    // type={type ? type : "text"}
                    type={type}
                    {...register}
                    placeholder={label}
                    className="px-4 py-2 text-blue-400 rounded flex-1"
                />
                {error && <p className="text-red-500">{`${error}`}</p>}
            </div>
        </div>
    );
}

export { Input_field }
