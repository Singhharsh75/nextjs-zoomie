import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { LayoutIcon, LayoutList, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useRouter } from 'next/navigation';


const MeetingRoom = () => {

  type LayoutType='Grid'|'Speaker-right'|'Speaker-left'  
  
  const[layout,setLayout]=useState<LayoutType>('Speaker-left');
  const [showParticipants,setShowParticipants]=useState(false);
  const {useCallCallingState}=useCallStateHooks();
  const callingState=useCallCallingState();
  const router=useRouter();

  if(callingState!==CallingState.JOINED)return <Loader/>
  const CallLayout=()=>{
    switch (layout) {
        case 'Grid':
            return <PaginatedGridLayout/>
        case 'Speaker-left':
            return <SpeakerLayout participantsBarPosition='left'/>
        default:
            return <SpeakerLayout participantsBarPosition="right"/>
    }
  } 
  
  return (
    <section className='relative h-screen w-full overflow-hidden pt-6 text-white'>
        <div className='relative size-full flex-center'>
            <div className='flex size-full item-center max-w-[1000px]'>
                <CallLayout/>
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipants})}>
                <CallParticipantsList onClose={()=>setShowParticipants(false)}/>
            </div>
        </div>
        <div className='fixed bottom-0 w-full flex-wrap flex-center gap-4'>
            <CallControls onLeave={()=>{router.push('/')}}/>
            <DropdownMenu>

                <DropdownMenuTrigger>
                    <div className='cursor-pointer rounded-2xl px-5 py-2 bg-[#19232d] hover:bg-[#4c535b]'><LayoutList/></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col cursor-pointer bg-dark-1 text-white rounded-2xl p-2 border-dark-1'>
                    {['Grid','Speaker-right','Speaker-left'].map((item,index)=>(
                        <div key={index} onClick={()=>setLayout(item as LayoutType)}>
                            <DropdownMenu>
                                {item}
                            </DropdownMenu>
                             <DropdownMenuSeparator className='bg-dark-1' />
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <CallStatsButton/>
            <button className='cursor-pointer rounded-2xl px-5 py-2 bg-[#19232d] hover:bg-[#4c535b]'>
                <User size={24} onClick={()=>setShowParticipants((prev)=>!prev)}/>
            </button>
            <EndCallButton/>
        </div>
    </section>
  )
}

export default MeetingRoom