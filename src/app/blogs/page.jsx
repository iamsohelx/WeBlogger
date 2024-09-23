import BlogOverview from '@/components/blog-overview'
import React from 'react'

async function FetchBlogData() {
  try{

    const apiResponse = await fetch("http://localhost:3000/api/get-blog",{
      method:"GET",
      cache:"force-cache"
    })

    const result = await apiResponse.json();    
    return result?.data;

  }catch(err){
    console.log(err);
    
  }
}

const page = async () => {

  const BlogLists = await FetchBlogData()
  
  

  return (
    <BlogOverview BlogLists={BlogLists}/>
  )
}

export default page
