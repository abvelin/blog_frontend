/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

// let accepted_files: File[];
let accepted_files: readonly FileWithPath[];
export const Photo_upload = ({
    onChange,
    set_photo_preview,
    label,
    error,
}: any) => {
    const onDrop: any = useCallback((acceptedFiles: FileList) => {
        // Do something with the files
        const file = new FileReader();
        file.onload = function () {
            set_photo_preview(file.result);
        };
        file.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            onDrop,
            accept: {
                "image/jpeg": [".jpeg", ".png"],
            },
        });
    accepted_files = acceptedFiles;

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps({ onChange })} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <div className="text-center hover:cursor-pointer text-red-400 h-16 w-full border-2 border-dashed border-gray-900 flex  justify-center items-center">
                        {label}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500">{`${error}`}</p>}
        </>
    );
};

export { accepted_files };
