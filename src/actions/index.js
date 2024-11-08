'use server'

import ConnDB from "@/database"
import user from "../models/user"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import Blog from "../models/blog"
import { cookies } from "next/headers";


// Add User

export async function AddNewUser(userData) {
    try{
      await ConnDB()
      const { username, email, password } = userData;
      
      bcrypt.hash(password,10,async(err, hash)=>{
        await user.create({
              username,
              email,
              password:hash
          })
          
      })
          
          return {
              success:true,
              message:"User Created"
          }

    }catch(err){
        return {
            success:false,
            message:"Something went wrong in add user action"
        }
    }
}

// Login User

export async function LoginUser(userData) {
    try{
        await ConnDB()
        const {email, password} = userData
        const userfind = await user.findOne({email:email})
        const bcryptVal = await bcrypt.compare(password,userfind.password)
        console.log(bcryptVal + "bcrypt")
        
        if(bcryptVal){
            
                let token = Jwt.sign({email:userfind.email,userid:userfind._id},"sohel2911")
                let cookieStore = cookies()
                cookieStore.set("token",token)  
                
           return {
            success:true,
            message:"Login Successful"
           }                                 

        }else{
            
            return {
                success:false,
                message:"No User Found or Password is incorrect"
            }
        }

  
        
    }catch(err){
        return {
            success:false,
            message:"Something Went Wrong While Login"
        }
    }
}

// Display Blog Data

export async function GetBlog() {
    try{
        await ConnDB();
        const extractAllBlogData = await Blog.find({})
        

        if(extractAllBlogData){
            return {
                success:true,
                data: extractAllBlogData,
            }
        }
        else{
            return {
                success:false,
                message:"something went wrong"
            }
        }
    }catch(err){
      console.log(err);
      
    }
}

// Delete Blog

export async function DeleteBlog(blogid) {
    try{
        
        await ConnDB();
        const getCurrentBlogID = blogid

        if(!getCurrentBlogID){
           return {
            success:false,
            message:"Blog ID is required"
           }
        }

        const deleteBlogByID = await Blog.findByIdAndDelete(getCurrentBlogID)
        if(deleteBlogByID){
            return {
                success:true,
                message:"Blog deleted successfully..."
            }
        }else{
            return {
                success: false,
                message:"Something went wrong"
              }
        }

    }catch(err)
    {
        return{
            success:true,
            message:"Something went wrong in delete section"
        }
    }
}