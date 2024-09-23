import ConnDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await ConnDB();
        const extractAllBlogData = await Blog.find({})

        if(extractAllBlogData){
            return NextResponse.json({
                success:true,
                data: extractAllBlogData,
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:"something went wrong"
            })
        }
    }catch(err){
      console.log(err);
      
    }
}