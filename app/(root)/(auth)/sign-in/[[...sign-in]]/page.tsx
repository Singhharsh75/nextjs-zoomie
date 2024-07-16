import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <section className='flex-center h-screen w-full'>
        <SignIn/>
    </section>
  )
}

export default SignInPage