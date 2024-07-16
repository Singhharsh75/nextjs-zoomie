import CallList from '@/components/CallList'
import React from 'react'

const Recording = () => {
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Recording
        </h1>
        <CallList type='recordings'/>
    </section>
  )
}

export default Recording