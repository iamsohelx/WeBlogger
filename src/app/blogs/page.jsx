import { GetBlog } from '@/actions';
import BlogOverview from '@/components/blog-overview'
import React from 'react'
require("dotenv").config()
async function FetchBlogData() {
  try{
    // const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/get-blog`,{
    //   method:"GET",
    //   cache:"no-store"
    // })
    const getData = await GetBlog()
    console.log(getData)
    // const result = await apiResponse.json();    
    return getData?.data;

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
