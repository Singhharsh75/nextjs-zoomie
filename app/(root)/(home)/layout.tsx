import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoomie",
  description: "Generated by create next app",
  icons:'/icons/logo.svg'
};
const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main>
        <Navbar/>
        <div className='flex'>
            <Sidebar/>
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:pb-14'>
                <div className='w-full'>
                    {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default RootLayout