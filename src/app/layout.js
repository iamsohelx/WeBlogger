import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/index"
import { NavBarServer } from "@/components/Navbar-server/navbar-server";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <NavBarServer/>
        {/* <Navbar/> */}
        {children}
        </body>
    </html>
  );
}