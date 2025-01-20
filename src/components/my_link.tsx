/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'

function Nav_link({ href, name }: any) {
    return (

        <Link href={href} className='text-blue-400 bg-blue-200 px-2 py-1'>{name}</Link>

    )
}

export default Nav_link