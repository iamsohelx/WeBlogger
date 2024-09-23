import ConnDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server";


export async function GET(req) {
    try{
        await ConnDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        
        const extractAllBlogData = await Blog.findOne({_id:getCurrentBlogID})
        // console.log(extractAllBlogData);
        

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