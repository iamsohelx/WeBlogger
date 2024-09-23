import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        cookies().set("token","")
        return NextResponse.json({
            success:true,
            message:"Logout successfull"
        })

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong in logout Rote"
        })
    }
}