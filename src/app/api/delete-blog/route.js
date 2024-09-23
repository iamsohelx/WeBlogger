import ConnDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog"


export async function DELETE(req) {
  
    try{
    
        await ConnDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if(!getCurrentBlogID){
           return NextResponse.json({
            success:false,
            message:"Blog ID is required"
           })
        }

        const deleteBlogByID = await Blog.findByIdAndDelete(getCurrentBlogID)
        if(deleteBlogByID){
            return NextResponse.json({
                success:true,
                message:"Blog deleted successfully..."
            })
        }else{
            return NextResponse.json({
                success: false,
                message:"Something went wrong"
              })
        }

    }catch(err){
        return NextResponse.json({
          success: false,
          message:"Something went wrong"
        })
    }

    
}