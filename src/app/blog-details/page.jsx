"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const Page = () => {
    
    const router = useRouter()

    const searchParam = useSearchParams()
    const blogId = searchParam.get('id')
    const [blogData, setBlogData] = useState({
      title:"",
      description:""
    })
    useEffect( ()=>{
     setBlogDetail()
     
    },[])

    const setBlogDetail = async()=>{
      const mainData = await setBlogDetailData()
      const { title, description } = mainData

      setBlogData({
        title,
        description,
      })
      
    }

    const setBlogDetailData = async()=>{
      try{

        const apiResponse = await fetch(`http://localhost:3000/api/get-blog-detail?id=${blogId}`,{
          method:"GET",
          cache:"no-store"
        })

        console.log("Allah")
       
        const result = await apiResponse.json();   
         
        return result?.data;
    
      }catch(err){
        console.log(err);
        
      }
         
    }

  return (
    <div>
      <Card className="mx-5 my-3">
      <CardHeader>
        <CardTitle className="text-4xl">{blogData.title}</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 text-gray-700">
         <p>{blogData.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={()=> router.push('/blog-display')} className="w-full bg-blue-600 text-white md:px-5">
          Go Back
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page
