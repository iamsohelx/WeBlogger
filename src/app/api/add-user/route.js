import { NextResponse } from "next/server";
import user from '../../../models/user'
import bcrypt from 'bcrypt'

export async function POST(req) {
    try{
    const extractUserData = await req.json()
    const { username, email, password } = extractUserData;
    
    bcrypt.hash(password,10,async(err, hash)=>{
      await user.create({
            username,
            email,
            password:hash
        })
        
    })
        
        return NextResponse.json({
            success:true,
            message:"User Created"
        })
    


    }catch(err){
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong While creating user"
        })
    }
    
}