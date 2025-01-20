import React from "react";
import Select from 'react-select'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Select_multi_field({ options, defaultValue, placeholder, label, error, on_change }: any) {

    // console.log('options')
    // console.log(options)
    // console.log('options')
    // console.log('👺defaultValue')
    // console.log(defaultValue)
    // console.log('👺defaultValue')

    return (
        <div className="mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-1 flex flex-col">
                <Select
                    options={options}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    isMulti
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => on_change(e?.map((c: any) => c.value))}
                />
                {error && <p className="text-red-500">{`${error}`}</p>}
            </div>
        </div>
    );
}

export { Select_multi_field };

