import ConnDB from "@/database";
import Joi from "joi";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import { cookies } from "next/headers";

const addNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await ConnDB();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    const cookieStore = cookies()
    console.log(cookieStore.get("token"));
    

    const { error } = addNewBlog.validate({
      title,
      description,
    });


    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
