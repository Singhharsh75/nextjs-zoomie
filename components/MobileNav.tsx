'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sideBarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileNav = () => {
  const pathName=usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image
                  src='/icons/hamburger.svg'
                  alt='hamburger icon'
                  width={36}
                  height={36}
                  className='cursor-pointer sm:hidden'
                />
            </SheetTrigger>
            <SheetContent side='left' className='border-none bg-dark-1'>
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
                    <p className='text-[26px] text-white font-extrabold px-6'>Zoomie</p>
                </Link>
                <div className='flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]'>
                <SheetClose asChild>    
                    <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                        {sideBarLinks.map((item)=>{
                                const isActive=pathName===item.route||(pathName.startsWith(item.route)&&item.route!=='/');
                                return(
                                <SheetClose asChild key={item.route}> 
                                    <Link href={item.route} key={item.label} className={cn('flex gap-4 item-center justify-start p-4 rounded-lg',{'bg-blue-1':isActive})}>
                                        <Image src={item.imageURL} alt={item.label} width='24' height='24'/>
                                        <p className='font-semibold'>{item.label}</p>
                                    </Link>
                                </SheetClose> 
                                )
                        })}
                    </section>
                </SheetClose>
               </div> 
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav