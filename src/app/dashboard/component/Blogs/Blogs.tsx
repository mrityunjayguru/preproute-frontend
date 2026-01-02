"use client";
import React from 'react'
import BlogTable from './omponent/BlogTable';
import { Footer } from '@/Layout/Footer';
import BlogHeader from './omponent/BlogHeader';
function Blogs() {
  return (
    <div className='min-h-screen'>
      <BlogHeader/>
      <BlogTable/>
      {/* <Footer/> */}
    </div>
  )
}

export default Blogs
