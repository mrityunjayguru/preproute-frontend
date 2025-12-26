import React from 'react'

type Props = {}

const ManageFooter = (props: Props) => {
  return (
    <div className='flex justify-center my-2 items-center'>
        <div className="font-dm-sans">
            <p className='text-sm'>
            A product of 
            <span className='text-[#FF5635] ml-1'>{" "}
             ⓒ Brillovate Pvt. Ltd. {" "}
            </span>
             all rights reserved
            </p>
        </div>
    </div>
  )
}

export default ManageFooter