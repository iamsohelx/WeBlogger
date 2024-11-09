"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddNewBlog from "../add-new-blog";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { DeleteBlog, EditBlog } from "@/actions";

const BlogOverview = ({ BlogLists }) => {
  const router = useRouter();
  const [currentEditedBlogId, setcurrentEditedBlogId] = useState(null);
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    router.refresh();
  }, [router]);

  const deleteByBlogId = async (currentId) => {
    try {
      const result = await DeleteBlog(currentId);
      if (result?.success) router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const updateByBlogId = async (currentId) => {
    setOpenBlogDialog(true);
    setcurrentEditedBlogId(currentId._id);
    setBlogFormData({
      title: currentId.title,
      description: currentId.description,
    });

    const blogData = JSON.stringify(currentId);
    const result = await EditBlog(currentEditedBlogId, blogData);
  };

  return (
    <div className="h-[calc(100vh-32px)] flex flex-col gap-10 bg-white p-6">
      <div>
        <Button
          className="text-white bg-blue-600"
          onClick={() => setOpenBlogDialog(true)}
        >
          Add New Blog
        </Button>
      </div>
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        currentEditedBlogId={currentEditedBlogId}
        setcurrentEditedBlogId={setcurrentEditedBlogId}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {!BlogLists ? (
          <div>
            <div className="flex flex-col space-y-3 p-10">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3 p-10">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : (
          BlogLists.map((item) => (
            <Card key={item._id} className="p-5">
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <p className="mt-2 mb-2">
                {item.description.toString().slice(0, 100)}...
              </p>
              <div className="flex gap-3">
                <Button
                  className="text-blue-600 border hover:bg-blue-600 hover:text-white bg-transparent border-blue-600"
                  onClick={() => updateByBlogId(item)}
                >
                  Edit
                </Button>
                <Button
                  className="text-blue-600 border hover:bg-blue-600 hover:text-white bg-transparent border-blue-600"
                  onClick={() => deleteByBlogId(item._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogOverview;
