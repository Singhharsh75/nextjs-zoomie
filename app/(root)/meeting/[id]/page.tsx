"use client"
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingWaitingRoom from '@/components/MeetingWaitingRoom'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React,{useState} from 'react'

const Meeting = ({params:{id}}:{params:{id:string}}) => {
  const [isMeetingLoading,setIsMeetingLoading]=useState(false)
  const {user,isLoaded}=useUser();
  const {call,callLoading}=useGetCallById(id)

  if(!isLoaded||callLoading) return <Loader/>
  return (
    <main className='text-white'>
      <StreamCall call={call}>
        <StreamTheme>
          {/* Meeting: #{id} */}
         {!isMeetingLoading?(<MeetingWaitingRoom setIsMeetingLoading={setIsMeetingLoading}/>):(<MeetingRoom/>)}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting