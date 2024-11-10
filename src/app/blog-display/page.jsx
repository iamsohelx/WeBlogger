"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

require("dotenv").config();
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { GetBlog } from "@/actions";

async function FetchBlogData() {
  try {
    const result = await GetBlog();
    console.log(result?.data);

    return result?.data;
  } catch (err) {
    console.log(err);
  }
}

const Page = () => {
  const [BlogLists, setBlogLists] = useState(null);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    toReloadFunc();
  }, []);
  const router = useRouter();
  const toReloadFunc = async () => {
    const Blog = await FetchBlogData();
    setBlogLists(Blog);
    setSkeleton(false);
  };

  return (
    <>
      <div className="h-[calc(100vh-32px)] flex flex-col bg-white p-6">
        <Button
          onClick={() => router.push("/blogs")}
          className=" text-white self-start px-5 py-2 bg-blue-600 rounded"
        >
          Want To Post Blog?
        </Button>
        {skeleton ? (
          <div>
            <div className="flex flex-col space-y-3 p-10">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3 p-10">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {!BlogLists ? (
              <h1>Something went wrong</h1>
            ) : (
              BlogLists.map((item) => (
                <Card key={item._id} className="p-5">
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <p className="mt-2 mb-2">
                    {item.description.toString().slice(0, 100)}...
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className="py-2 px-4 text-blue-600 border hover:bg-blue-600 hover:text-white bg-transparent border-blue-600 rounded"
                      onClick={() =>
                        router.push(`/blog-details?id=${item._id}`)
                      }
                    >
                      Read More
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
