import StreamClientProvider from '@/providers/StreamClientProvider';
import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Zoomie",
  description: "Generated by create next app",
  icons:'/icons/logo.svg'
};


const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>)  => {
  return (
    <main>
       <StreamClientProvider>
         {children}
       </StreamClientProvider>  
    </main>
  )
}

export default RootLayout;