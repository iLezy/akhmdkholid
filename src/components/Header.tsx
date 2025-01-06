import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full flex justify-around items-center bg-green-600 py-4 text-slate-100 font-bold'>
        <h2 className="text-xl font-bold">Product Management</h2>
        <nav>
            <ul  className='flex gap-5'>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/users">Users</Link>
                </li>
                <li>
                    <Link href="/products">Products</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
