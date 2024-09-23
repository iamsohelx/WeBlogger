"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Navbar = ({cookieValue}) => {
  
  
  const router = useRouter()
  const [hamburger, setHamburger] = useState(false)
  const [logoutBtn, setLogoutBtn] = useState(false)

  const handleLogOut = async ()=>{
    const logoutResponse = await fetch("/api/logout",{
      method:"GET"
    })

    const result = await logoutResponse.json()
    console.log(result?.success);
    setLogoutBtn(false)
    
    router.push("/login")
    
  }

  const forHandleLogin = ()=>{

    router.push('login')
    setLogoutBtn(true)
  }

 
      
  
  return (
    <div className='container px-5 md:px-14 py-4 drop-shadow-md flex justify-between items-center sticky top-0 z-50 bg-white'>
      <Link href={'/'} className=' text-2xl md:text-4xl font-extrabold text-blue-600'>WeBlogger</Link>
     
      {hamburger
        ?
        <span className='text-3xl text-blue-600 right-0 pr-5 absolute md:hidden'><RxCross2 onClick={()=>setHamburger(false)} /></span>
        :
        <span className='text-3xl text-blue-600 md:hidden'><GiHamburgerMenu onClick={()=>setHamburger(true)} /></span>

      }
     <div className={`${hamburger?'':'hidden'} max-sm:items-center max-sm:flex-col max-sm:shadow-md max-sm:absolute max-sm:right-5 max-sm:top-20 flex max-sm:p-5 max-sm:rounded max-sm:bg-white md:items-center md:flex gap-5`}>
        <Link href={'/'}>Home</Link>
        <Link href={'/blog-display'}>Blogs</Link>
        {(logoutBtn && cookieValue!=="")?
        
        <Button onClick={handleLogOut} className="bg-blue-600 hover:bg-blue-800">Logout</Button>
         :
    <>
        <Button onClick={forHandleLogin} className=" hover:bg-blue-800 hover:text-white bg-transparent border text-blue-600 border-blue-600">Log In</Button>
        <Button onClick={()=>router.push('sign-up')} className="bg-blue-600 hover:bg-blue-800">Sign Up</Button>
       
        </> }
        </div>
   
    </div>
  )
}

export default Navbar
