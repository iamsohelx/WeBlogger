import { NextResponse } from "next/server";
import user from "../../../models/user"
import ConnDB from "@/database";
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req, res) {

    try{
        await ConnDB()
        const extractLoginData = await req.json()
        const {email, password} = extractLoginData
        
        const userfind = await user.findOne({email:email})
        const bcryptVal = bcrypt.compare(password,userfind.password)
        if(userfind && bcryptVal){

                let token =  Jwt.sign({email:userfind.email,userid:userfind._id},process.env.JWT_SECRETE_KEY)
                let cookieStore = cookies()
                cookieStore.set("token",token)   
                console.log(token); 
                
                return NextResponse.json({
                    success:true,
                    message:"Login Successful"
                })

        }else{
            return NextResponse.json({
                success:false,
                message:"No User Found or Password is incorrect"
            })
        }
  
        
    }catch(err){
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong While Login"
        })
    }
}




