import BlogOverview from '@/components/blog-overview'
import React from 'react'

async function FetchBlogData() {
  try{
    // https://we-blogger-onuw8gypk-sohel-sheikhs-projects.vercel.app
    const apiResponse = await fetch("https://we-blogger-onuw8gypk-sohel-sheikhs-projects.vercel.app/api/get-blog",{
      method:"GET",
      cache:"no-store"
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
