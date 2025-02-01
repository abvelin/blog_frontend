import React from "react";
import Select from 'react-select'

function Select_field({ options, defaultValue, placeholder, is_multi, label, error, on_change, value }: any) {

    return (
        <div className="mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="flex flex-col mt-1">
                {is_multi
                    ?
                    <Select
                        options={options}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        isMulti
                        onChange={(e: any) => on_change(e?.map((c: any) => c.value))}
                    />
                    :
                    <Select
                        options={options}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        value={value}
                        onChange={() => value}
                    />
                }
                {error && <p className="text-red-500">{`${error}`}</p>}
            </div>
        </div>
    );
}

export { Select_field };

