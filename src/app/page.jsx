import Link from "next/link";
import React from "react";
import blogImg from "../../public/blogbg.jpg";
import Image from "next/image";
// import './css/main.css'
const page = () => {
  return (
    <>
      <div className="py-24 flex flex-col-reverse items-center  bg-white justify-center md:justify-between md:flex-row md:px-16 ">
        <div className="container items-center gap-4 mx-auto flex flex-col md:items-start">
          <h2 className="text-4xl text-slate-800 font-bold mb-4 text-center md:text-7xl md:text-left">
            Browse Our Blog <br></br>
            <span className="text-blue-600">Collection</span>
          </h2>

          <Link
            href={"/blog-display"}
            className="py-2 px-6 bg-blue-600 text-white rounded md:px-10"
          >
            Explore
          </Link>
        </div>
        <Image src={blogImg} className="w-[100rem] md:w-[80%] " alt="blog" />
      </div>
    </>
  );
};

export default page;
