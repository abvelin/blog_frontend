
import React from 'react';
import Select from 'react-select';
import { useController } from 'react-hook-form'; // For integration with RHF

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Select_field = ({ name, control, options, placeholder, isMulti = false, label, defaultValue }: any) => {
    const {
        field: { onChange, onBlur, value },
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue,
    });

    return (

        <div className="mb-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-1 flex flex-col">
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={options}
                    placeholder={placeholder}
                    isMulti={isMulti}


                />
                {error && <p className="text-red-500">{`${error.message}`}</p>
                }
            </div>
        </div>
    );
};

export { Select_field };