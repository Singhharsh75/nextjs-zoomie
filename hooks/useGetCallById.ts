import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect,useState } from "react"

export const useGetCallById=(id:string|string[])=>{
    const client=useStreamVideoClient();
    const [call,setCall]=useState<Call>();
    const [callLoading,setCallLoading]=useState(true);
    useEffect(()=>{
        if(!client)return;
        const loadCall=async()=>{
            const {calls}=await client?.queryCalls({
                filter_conditions:{
                    id
                }
            });
            if(calls.length>0){
                setCallLoading(false);
                setCall(calls[0]);
            }
        }
        loadCall();
    },[id])
    return {call,callLoading};
}