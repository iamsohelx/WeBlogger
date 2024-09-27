import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    try{
      cookies().set("token","Guest Login Cookie")
      return NextResponse.json({
        success:true,
        message:"login successful with guest account"
      })
    }catch(err){
       if(isDynamicServerError)
        throw err

       return NextResponse.json({
        success:false,
        message:"Guest login failed"
       })
    }
}