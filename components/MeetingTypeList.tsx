"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HomeCard from './HomeCard'
import ModalContainer from './ModalContainer'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Description } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"



const MeetingTypeList = () => {

  const [handleListClick,setHandleListClick]=useState<'isNewMeeting'|'isJoiningMeeting'|'isScheduledMeeting'|'isRecording'|undefined>();
  const { toast } = useToast()
  const user=useUser();
  const router=useRouter();
  const client=useStreamVideoClient();
  const [value,setValue]=useState({
    dateTime:new Date(),
    description:'',
    link:''
  })
  const [callDetails,setCallDetails]=useState<Call>();

  
  // useEffect(()=>{console.log(callDetails)},[callDetails])
  const meetingLink=callDetails?.id;
  const copyFunction=()=>{
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_STREAM_URL}/meeting/${callDetails?.id}`);
    toast({
      title:'Link Copied !!'
    })
  }
  const createMeeting=async()=>{
    console.log(user,client);

    try {
      const id=crypto.randomUUID();
      const call= client?.call('default',id);
      console.log(id,call);
      
      const startsAt=value.dateTime.toISOString()||new Date(Date.now()).toISOString();
      const description=value.description||'Instant meeting';
      if(!call) throw new Error('call does not exist');

      await call.getOrCreate({
        data:{
          starts_at:startsAt,
          custom:{
            description
          }
        }
      })

      setCallDetails(call);
      if(!value.description){
        router.push(`/meeting/${call.id}`)
      }
      toast({
          title: "Meeting Created"
        })
    } catch (error) {
      console.log(error);
      toast({
          title: "Failed to Create Meeting"
        })
    }

  }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       <HomeCard
         img='/icons/add-meeting.svg'
         title='New Meeting'
         description='Start an instant meeting'
         className='bg-orange-1'
         handleClick={()=>{setHandleListClick('isNewMeeting')}}
       />
       <HomeCard
         img='/icons/join-meeting.svg'
         title='Join Meeting'
         description='via invitation Link'
         className='bg-blue-1'
         handleClick={()=>{setHandleListClick('isJoiningMeeting')}}
       />
       <HomeCard
         img='/icons/schedule.svg'
         title='Schedule Meeting'
         description='plan a meeting'
         className='bg-purple-1'
         handleClick={()=>{setHandleListClick('isScheduledMeeting')}}
        />
       <HomeCard
         img='/icons/recordings.svg'
         title='View Recording'
         description='Meeting Recordings'
         className='bg-yellow-1'
         handleClick={()=>{router.push('/recording')}}
        />

        <ModalContainer
            isOpen={handleListClick==='isJoiningMeeting'}
            handleClose={()=>setHandleListClick(undefined)}
            title='Type/inset the link here'
            className='flex-center'
            buttonText='Join Meeting'
            handleClick={()=>{router.push(value.link)}}
        >
          <Input
            className='bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded'
            value={value.link}
            onChange={(e)=>{setValue({...value,'link':e.target.value})}}
          />
        </ModalContainer>

        {!callDetails?(
          <ModalContainer
            isOpen={handleListClick==='isScheduledMeeting'}
            handleClose={()=>setHandleListClick(undefined)}
            title='Create a Meeting'
            className='flex-center'
            buttonText='Schedule a meeting'
            handleClick={createMeeting}
           >
            <div className='flex flex-col w-full gap-2.5 text-white'>
              <label>Meeting Description</label>
              <Textarea
               className='bg-dark-3 border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0'
               value={value?.description}
               onChange={(e)=>{setValue({...value,'description':e.target.value})}}
               />
            </div>
            <div className='flex w-full flex-col gap-2.5'>
              <label>Choose Date&Time</label>
              <ReactDatePicker
               selected={value.dateTime}
               onChange={(date)=>{setValue({...value,'dateTime':date!})}}
               showTimeSelect
               timeFormat='HH:mm'
               timeCaption='time'
               dateFormat='MMMM d, yyyy h:mm aa'
               timeIntervals={15}
               className='bg-dark-3 w-full rounded p-2 focus:outline-none'
              />
            </div>


          </ModalContainer>
        ):(
          <ModalContainer
            isOpen={handleListClick==='isJoiningMeeting'}
            handleClose={()=>setHandleListClick(undefined)}
            title='Meeting Created'
            image='/icons/checked.svg'
            className='flex-center'
            buttonImage='/icons/copy.svg'
            buttonText='Copy to Clipboard'
            handleClick={copyFunction}
           />
        )}
        <ModalContainer
          isOpen={handleListClick==='isNewMeeting'}
          handleClose={()=>setHandleListClick(undefined)}
          title='Start an Instant Meeting'
          className='flex-center'
          handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList