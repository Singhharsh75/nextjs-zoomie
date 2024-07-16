"use client"
import { DeviceSettings, VideoPreview, useCall} from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
// {setIsMeetingLoading}:{setIsMeetingLoading:(value:boolean)=>void}

const MeetingWaitingRoom = ({setIsMeetingLoading}:{setIsMeetingLoading:(value:boolean)=>void}) => {
  const [isCameraMicEnabled,setIsCameraMicEnabled]=useState(false);
  const call=useCall();

  console.log(call);
  if(!call) throw new Error('No call');
  useEffect(()=>{
    if(isCameraMicEnabled){
        call?.camera.disable();
        call?.microphone.disable();
    }else{
        call?.camera.enable();
        call?.microphone.enable();
    }
  },[isCameraMicEnabled,call?.camera,call?.microphone])  
  return (
    <main className='h-screen w-full flex-center gap-4'>
        <div className='h-full w-full flex-center flex-col gap-6'>
            <p className='text-2xl text-white font-bold'>Waiting Room</p>
            <VideoPreview/>
            <label className='flex-center gap-6'>
                <input
                  type='checkbox'
                  checked={isCameraMicEnabled}
                  onChange={()=>{setIsCameraMicEnabled(!isCameraMicEnabled)}}
                />
                Enable or disable Device services
                <DeviceSettings/>
            </label>
            <Button className='bg-green-500 rounded-md px-4 py-2.5'
              onClick={()=>{ call.join();setIsMeetingLoading(true);}}
             >
                Join Meeting
            </Button>
        </div>
    </main>
  )
}

export default MeetingWaitingRoom