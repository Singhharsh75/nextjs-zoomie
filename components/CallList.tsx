"use client"

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import React,{useState,useEffect} from 'react'
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { toast } from './ui/use-toast';

const CallList = ({type}:{type:'upcoming'|'previous'|'recordings'}) => {
  const {upcomingCalls,previousCalls,recordingCalls,isLoading}=useGetCalls();
  const router=useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls=()=>{
    switch (type) {
        case 'upcoming':
            return upcomingCalls;
        case 'previous':
            return previousCalls;
        case 'recordings':
            return recordings;    
        default:
            return [];
    }
  }

  const getNoCallMessage=()=>{
    switch (type) {
        case 'upcoming':
            return 'No Upcoming Calls';
        case 'previous':
            return 'No Calls previous completed';
        case 'recordings':
            return 'No recordings found';    
        default:
            return 'Nothing to display';
    }
  }
  const calls=getCalls();
  const noCallMessage=getNoCallMessage();

   useEffect(() => {
    const fetchRecordings = async () => {

      try {
        const callData = await Promise.all(
        recordingCalls?.map((meeting) => meeting.queryRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
      } catch (error) {
        toast({title:'Try again later'})
      }  
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, recordingCalls]);

  if(isLoading)  return <Loader/>

  return (
    <section className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls&&calls.length>0?(calls.map((meetings:Call|CallRecording)=>{
            return (
                <MeetingCard
                 key={(meetings as Call).id||(meetings as CallRecording).url}
                 icon={
                    type==='previous'?'/icons/previous.svg':type==='upcoming'?'/icons/upcoming.svg':'/icons/recordings.svg'
                 }
                 title={
                    (meetings as Call).state?.custom?.description?.substring(0,26)||(meetings as CallRecording)?.filename?.substring(0,26)||'Personal Meeting'
                 }
                 date={(meetings as Call).state?.startsAt?.toLocaleString()||(meetings as CallRecording).start_time.toLocaleString()}
                 isPreviousMeeting={type==='previous'}
                 buttonIcon1={type==='recordings'?'/icons/play.svg':undefined}
                 handleClick={type==='recordings'?()=>{router.push(`${(meetings as CallRecording).url}`)}:()=>{router.push(`/meeting/${(meetings as Call).id}`)}}
                 link={type==='recordings'?(`${(meetings as CallRecording).url}`):(`${process.env.NEXT_PUBLIC_STREAM_URL}/meeting/${(meetings as Call).id}`)}
                 buttonText={type==='recordings'?'Play':'Start'}
                />
            )
        })
        ):(
            <h1>{noCallMessage}</h1>
        )}
    </section>
  )
}

export default CallList