"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {

  const [userData, setUserData] = useState({
    username:'',
    email:'',
    password:''
  })

  const createNewUser = async ()=> {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/add-user`, {
      method:"POST",
      body:JSON.stringify(userData)
    })
  }

  

  return (
    <div className='py-24 w-screen flex justify-center items-center px-5'>
      <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">Create An Account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
      
      <Input placeholder="Email"
       value={userData.email}
       name="email"
       onChange={(e)=>setUserData({
          ...userData,
          email:e.target.value
      })}></Input>

      <Input placeholder="Username"
             name="username"
             value={userData.username}
             onChange={(e)=>setUserData({
              ...userData,
              username:e.target.value
             })}
      ></Input>
      <Input placeholder="Password"
             name="password"
             value={userData.password}
             onChange={(e)=>setUserData({
              ...userData,
              password:e.target.value
             })}
      ></Input>

        <Button onClick={createNewUser} className="w-full bg-blue-600">
           Create
        </Button>

        <span className='text-center text-gray-500'>or</span>
      </CardContent>
      
      <CardFooter>
      <Button className="w-full bg-transparent border border-blue-600 text-blue-600">
           Continue with Guest
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
