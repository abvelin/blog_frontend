import React from "react";

function InputZod({ register, type, label, error }: any) {
    return (
        <div className="mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-1 flex flex-col">
                <input
                    // {...(type ? (type = type) : (type = "text"))}
                    type={type ? type : "text"}
                    {...register}
                    placeholder={label}
                    className="px-4 py-2 text-blue-400 rounded flex-1"
                />
                {error && <p className="text-red-500">{`${error}`}</p>}
            </div>
        </div>
    );
}

export { InputZod };
