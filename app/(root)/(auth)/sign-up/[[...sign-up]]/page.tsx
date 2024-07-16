import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <section className='flex-center h-screen w-full'>
        <SignUp/>
    </section>
  )
}

export default SignUpPage