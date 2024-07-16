import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HomeCardProps{
    img:string,
    title:string,
    description:string,
    className:string,
    handleClick:()=>void
}

const HomeCard = ({img,title,description,className,handleClick}:HomeCardProps) => {
  return (
    <div className={cn('bg-orange-1 flex flex-col justify-between px-4 py-6 cursor-pointer w-full min-h-[260px] xl:min-w-[270px] rounded-[14px]',className)} onClick={handleClick}>
        <div className='flex-center glassmorphism size-12 rounded-[10px]'>
            <Image 
                src={img}
                alt='add-meeting'
                width={24}
                height={24}
                />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-lg font-normal'>{description}</p>
        </div>
    </div>
  )
}

export default HomeCard