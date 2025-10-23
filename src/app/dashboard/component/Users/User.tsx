import React from 'react'
import UserForm from './component/UserForm'
import UserTable from './component/userTable'
import UserHeader from './component/UserHeader'

function User() {
  return (
    <div  className='w-[80%] mx-auto'>
        <UserHeader/>
<UserTable/>
    </div>
  )
}

export default User
