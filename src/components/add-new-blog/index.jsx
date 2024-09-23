"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AddNewBlog = ({openBlogDialog,setOpenBlogDialog, loading, setLoading, blogFormData, setBlogFormData, currentEditedBlogId, setcurrentEditedBlogId}) => {
  
  const router = useRouter();


  const saveBlogData = async () => {
    try{
         setLoading(true)
         const apiResponse = currentEditedBlogId !== null?
          await fetch(`/api/update-blog?id=${currentEditedBlogId}`,{
          method:"PUT",
          body:JSON.stringify(blogFormData)

         }): await fetch("/api/add-blog",{
          method:"POST",
          body: JSON.stringify(blogFormData),

         })

         const result = await apiResponse.json();
         if(result?.success){
          router.refresh();
          setBlogFormData({
            title:"",
            description:"",
          })
          setOpenBlogDialog(false);
          setLoading(false)
          setcurrentEditedBlogId(null)
         }
    }catch(err){
       console.log(err);
       setLoading(false)
       
    }
  }

  return (
    <>
      
      <Dialog open={openBlogDialog} onOpenChange={()=>{
        setOpenBlogDialog(false)
        // setBlogFormData({
        //   title:"",
        //   description:""
        // })
        setcurrentEditedBlogId(null)
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentEditedBlogId?"Edit Blog":"Add New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Blog Title"
                value={blogFormData.title}
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: e.target.value,
                  })
                }
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                name="description"
                placeholder="Write Here..."
                id="username"
                className="col-span-3 resize-none border p-3"
                value={blogFormData.description}
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-blue-600 text-white" type="submit" onClick={saveBlogData}>{loading?"Saving Changes":"Save changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewBlog;
