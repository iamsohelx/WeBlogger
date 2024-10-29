"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginUser } from '@/actions'

const Page = () => {

  const router = useRouter()

  const [loginData, setLoginData] = useState({
       email:"",
       password:""
  });

  const saveLoginData = async ()=>{
        // const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/login-user`,{
        //   method:"POST",
        //   body:JSON.stringify(loginData)
        // })
      const result = await LoginUser(loginData)
      if(result?.success)
        router.push("/blogs")        
        
  }

  const logInWithGuest = async()=>{
    const logInApi = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/guest-login`,{
      method:"GET"
    })

    const guestResult = await logInApi.json()
    if(guestResult?.success)
      router.push("/blogs")
  }
  


  return (
    <div className='py-24 w-screen flex justify-center items-center px-5'>
      <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">Log In</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input className=""
               placeholder="email"
               name="email"
               required
               value={loginData.email}
               onChange={(e)=>setLoginData({
                ...loginData,
                email:e.target.value
               })}
        ></Input>
        <Input placeholder="Password"
               name="password"
               required
               value={loginData.password}
               onChange={(e)=>setLoginData({
                ...loginData,
                password:e.target.value
               })}
        
        ></Input>

        <Button className="w-full bg-blue-600" onClick={saveLoginData}>
           Login
        </Button>

        <span className='text-center text-gray-500'>or</span>
      </CardContent>
      
      <CardFooter>
      <Button onClick={logInWithGuest} className="w-full bg-transparent border border-blue-600 text-blue-600">
           Continue with Guest
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
