// import Link from 'next/link';
import React from 'react'
import Nav_link from './my_link';

function Navbar() {
    return (
        <nav className='bg-blue-900 mx-4' >

            <div className='text-pastel px-2 py-1'>&lt;abvelin /&gt;</div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Nav_link href="/" name="Home" />
                    <Nav_link href="/about_us" name="About me" />
                    <Nav_link href="/contact" name="contact" />
                </div>
                <div className='flex'>
                    <Nav_link href="/manage" name="manage" />
                </div>
            </div>

        </nav>
    )
}

export default Navbar;