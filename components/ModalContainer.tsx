import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'


interface ModalContainerProps{
    isOpen:boolean,
    title:string,
    handleClose:()=>void,
    handleClick:()=>void,
    children?:React.ReactNode,
    image?:string,
    buttonText?:string,
    buttonImage?:string,
    className?:string
}

const ModalContainer = ({isOpen,title,handleClose,handleClick,className,children,image,buttonText,buttonImage}:ModalContainerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='flex w-full max-w-[560px] px-6 py-9 border-none flex-col gap-5 bg-dark-1 text-white'>
            <div className='flex-center flex-col gap-6'>
                    {image&&(
                        <Image
                        src={image}
                        alt='image'
                        width={72}
                        height={72}
                        />
                    )}
                    <h1 className={cn('text-2xl font-bold leading-[42px]',className)}>{title}</h1>
                    {children}
                    <Button className='bg-blue-1 w-full flex gap-2 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={()=>{console.log('hi');handleClick()}}>
                        {buttonImage&&(
                            <Image
                             src={buttonImage}
                             alt='button image'
                             width={13}
                             height={13}
                            />
                        )}
                        {buttonText||'Schedule a Meeting'}
                    </Button>
            </div>
            
        </DialogContent>
    </Dialog>
  )
}

export default ModalContainer