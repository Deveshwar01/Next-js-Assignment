import React from 'react'
import LeftPage from "../Pages/LeftPage"
import RightPage from "../Pages/RightPage"
import Header from '../components/ui/Header'
const page = () => {
  return (
    <>
      <Header />
      <div className='flex items-center justify-center p-20 gap-36'>
        <LeftPage />
        <RightPage />
      </div>
    </>
  )
}

export default page