'use client'
import React from 'react'
import { sideBarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const Sidebar = () => {
    const pathName=usePathname();
  return (
    <section className='sticky top-0 left-0 flex flex-col h-screen w-fit justify-between bg-dark-1 text-white p-6 pt-28  max-sm:hidden lg:w-[246]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sideBarLinks.map((item)=>{
                const isActive=pathName===item.route||(pathName.startsWith(item.route)&&item.route!=='/');
                return(
                    <Link href={item.route} key={item.label} className={cn('flex gap-4 item-center justify-start p-4 rounded-lg',{'bg-blue-1':isActive})}>
                      <Image src={item.imageURL} alt={item.label} width='24' height='24'/>
                      <p className='text-lg font-semibold max-lg:hidden'>{item.label}</p>
                    </Link>
                )
           })}
        </div>
    </section>
  )
}

export default Sidebar