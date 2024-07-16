"use client"

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'



const Cards=({title,description}:{title:string,description:string})=>(
  <div className='flex flex-col gap-4 item-start xl:flex-row'>
    <h1 className='text-base font-medium lg:text-xl xl:min-w-32'>{title}</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl '>{description}</h1>
  </div>
)

const PersonalRoom = () => {
  const {user}=useUser();
  const meetingID=user?.id;
  console.log(user);
  const {call}=useGetCallById(meetingID!);
  const client=useStreamVideoClient();
  const router=useRouter();


  const handleMeeting=async()=>{
    if(!user||!client)return;
    const newCall=client.call('default',meetingID!);
    if(!call){
        await newCall?.getOrCreate({
        data:{
          starts_at:new Date().toISOString()
        }
      })
    }
    router.push(`/meeting/${meetingID!}`);
  }
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Personal Room
        </h1>
        <div className='flex flex-col gap-8 w-full xl:max-w-[900px]'>
          <Cards title='Topic' description={`${user?.firstName}'s Meeting Room`}/>
          <Cards title='Meeting ID:' description={`${meetingID}`}/>
          <Cards title='Meeting Link:' description={`${process.env.NEXT_PUBLIC_STREAM_URL}/meeting/${meetingID}`}/>
        </div>
        <div className='flex gap-4'>
          <Button className='bg-blue-1 rounded ' onClick={handleMeeting}>Start</Button>
          <Button className='bg-dark-3 rounded' onClick={()=>{
            navigator.clipboard.writeText(meetingID!);
            toast({
              title:'Link Copied'
            })
          }}>Copy to Clipboard</Button>
        </div>
    </section>
  )
}

export default PersonalRoom