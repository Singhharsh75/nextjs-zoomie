"use client"
import { useUser } from '@clerk/nextjs';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import React,{useState,useEffect} from 'react'
import { tokenProvider } from '@/actions/stream.action';
import Loader from '@/components/Loader';

const api_Key=process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({children}:{children:React.ReactNode}) => {
  const {user,isLoaded}=useUser();
  const [videoClient,setVideoClient]=useState<StreamVideoClient>()

  useEffect(()=>{
    if(!user||!isLoaded)return;
    if(!api_Key)throw new Error('Api key missing')
    const client=new StreamVideoClient({
        apiKey:api_Key,
        user:{
            id:user?.id,
            name:user?.username||user?.id,
            image:user?.imageUrl
        },
        tokenProvider
   });
   setVideoClient(client)
  },[user,isLoaded])

  if(!videoClient)return (
    <div>
        {children}
    </div>
  )
  
  return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  )
}

export default StreamClientProvider