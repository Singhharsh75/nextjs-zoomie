
import MeetingTypeList from '@/components/MeetingTypeList';
import ModalContainer from '@/components/ModalContainer';
import React from 'react'

const Home = () => {
  
  const date=new Date();
  const time=date.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const dateCal=(new Intl.DateTimeFormat('en-US',{dateStyle:'full'})).format(date);  

  return (
    <section className='flex flex-col size-full gap-10 text-white'>
        <div className='h-[300px] rounded-[20px] w-full flex flex-col bg-hero bg-cover'>
           <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11'> 
                <h2 className='glassmorphism max-w-[264px] py-3 rounded text-center text-base'  >
                    Upcoming Meeting at 4pm
                </h2>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-4xl font-extrabold lg:text-7xl'>
                        {time}
                    </h1>
                    <p className='text-lg font-medium text-sky-1 lg:text-3xl'> {dateCal}</p>
                </div>
          </div> 
        </div>
        <MeetingTypeList/>
    </section>
  )
}

export default Home;