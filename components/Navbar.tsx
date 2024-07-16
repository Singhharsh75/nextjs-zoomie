import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn,UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed w-full bg-dark-1 z-50 px-6 py-4  lg:px-10'>
        <Link
          href='/'
          className='flex items-center gap-1'
        >
          <Image
            src='/icons/logo.svg'
            alt='logo'
            width={32}
            height={32}
            className='max-sm:size-10'
          />
          <p className='text-[26px] text-white font-extrabold px-6 max-sm:hidden'>Zoomie</p>
        </Link>
        <div className='flex justify-between gap-5'>
            <SignedIn>
               <UserButton />
            </SignedIn>

            <MobileNav/>
        </div>
    </nav>
  )
}

export default Navbar