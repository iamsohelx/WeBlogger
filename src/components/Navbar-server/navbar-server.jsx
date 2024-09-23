import Navbar from "../Navbar/index";
import { cookies } from "next/headers";


export async function NavBarServer() {
   
   const cookieValue = cookies().get("token")?.value || ""
   return <Navbar cookieValue={cookieValue}/>
}