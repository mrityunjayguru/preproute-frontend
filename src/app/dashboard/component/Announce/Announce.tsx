"use client"
import React from 'react'
import AnnouncementForm from './Component/AnnouncementForm'
import AnnouncementTable from './Component/AnnouncementTable'


function Announce() {
  return (
    <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8 max-h-screen'>
      <AnnouncementForm/>
      <AnnouncementTable/>
    </div>
  )
}

export default Announce
