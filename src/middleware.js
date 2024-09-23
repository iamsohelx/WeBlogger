import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req){
      const path = req.nextUrl.pathname;
      console.log(path);
      
      const checkPublicPath = path === "/login" || path === "/sign-up"
      console.log(checkPublicPath + "something");
      
      const cookieStore = cookies()
      const token = cookieStore.get("token")?.value || ""

      if(checkPublicPath && token !== "")
        return NextResponse.redirect(new URL("/blogs", req.url))

      if(!checkPublicPath && token === "")
        return NextResponse.redirect(new URL("/login", req.url))
      
}

export const config = {
    matcher:["/blogs", "/login", "/sign-up"],
}