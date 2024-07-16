import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'

export const useGetCalls=()=>{
    const {user}=useUser();
    const client=useStreamVideoClient();
    const [isLoading,setIsLoading]=useState(false);
    const [calls,setCalls]=useState<Call[]>([]);

    useEffect(()=>{
        if(!user||!client)return;
        const loadCalls=async()=>{
            setIsLoading(true);
            try {
              const {calls}=await client.queryCalls({
                sort:[{field:'starts_at',direction:-1}],
                filter_conditions:{
                    starts_at:{$exists:true},
                    $or:[
                     {created_by_user_id:user.id,},
                     {members:{$in:[user.id]}}
                    ]
                }
            })
            if(calls.length>0){
                setCalls(calls)
            }   
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false);
            }
        };

        loadCalls();
    },[client,user,user?.id])

    const now=new Date();

    const upcomingCalls=calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return(
          startsAt && new Date(startsAt)>now 
        )
    });
    const previousCalls=calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return(
            startsAt && new Date(startsAt)<now ||!!endedAt
        )
    })

    return {upcomingCalls,previousCalls,recordingCalls:calls,isLoading};
}