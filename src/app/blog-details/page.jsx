"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogDetails } from "@/actions";

const Page = () => {
  const router = useRouter();

  const searchParam = useSearchParams();
  const blogId = searchParam.get("id");
  const [skeleton, setSkeleton] = useState(true);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    setBlogDetail();
  }, []);

  const setBlogDetail = async () => {
    const mainData = await setBlogDetailData();
    const { title, description } = mainData;

    setBlogData({
      title,
      description,
    });
    setSkeleton(false);
  };

  const setBlogDetailData = async () => {
    try {
      console.log("Allah");

      const result = await BlogDetails(blogId);

      return result?.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {skeleton ? (
        <div className="flex flex-col space-y-3 p-7">
          <Skeleton className="h-60 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-11 w-[80vw]" />
            <Skeleton className="h-11 w-[70vw]" />
          </div>
        </div>
      ) : (
        <Card className="mx-5 my-3">
          <CardHeader>
            <CardTitle className="text-4xl">{blogData.title}</CardTitle>
            <CardDescription>Have A Nice Day...</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-gray-700">
            <p>{blogData.description}</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/blog-display")}
              className="w-full bg-blue-600 text-white md:px-5 hover:bg-blue-800"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Page;
