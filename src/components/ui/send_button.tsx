"use client"
import React from 'react'
import { useFormStatus } from "react-dom";

export function Send_button() {
    const { pending } = useFormStatus()
    return (
        <button className={`bg-blue-500 text-blue-100 px-3 py-2 mt-4 ${pending ? `bg-blue-300` : ``}`}>{pending ? "is Saving" : "Save"}</button>
    )
}
