import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE, FileUploader } from "../index";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
  console.log(post, "Post Form");
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "") // remove non-alphanumeric characters
        .replace(/\s+/g, "-"); // replace one or more spaces with a hyphen
    }
    return "";
  }, []);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [featuredImg, setFeaturedImg] = useState(null);
  const handleFileSelect = (file) => {
    setFeaturedImg(file);
  };
  console.log(featuredImg);
  const submit = async (data) => {
    if (post) {
      const file = featuredImg ? appwriteService.uploadFile(featuredImg) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(featuredImg);
      const fileId = file.$id;
      data.featuredImage = fileId;
      console.log(userData);
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.accountId,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return (
    <>
      <h1 className="text-2.5xl font-semibold text-gray-800 dark:text-white mb-3 ml-2">
        Create Post
      </h1>
      <div className="container w-full   text-xl rounded-lg  border border-gray-200 bg-gray-100 dark:bg-dark-bg p-4 text-black dark:text-white">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex-wrap flex flex-col lg:flex-row"
        >
          <div className=" w-full px-2">
            <div className="">
              <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
              />
              <Input
                label='Add Tags : (separated by commas ",")'
                placeholder="Entertainment, Education, Politics, etc."
                className="mb-4"
                {...register("tags", { required: true })}
              />
              <label class="mb-8 blockfont-semibold ">Featured Image :</label>
              <FileUploader
                onFileSelect={handleFileSelect}
                imgSrc={
                  post
                    ? appwriteService.getFilePreview(post.featuredImage)
                    : null
                }
              />{" "}
            </div>
          </div>

          <div className="w-full px-2 gap-3 flex flex-col mt-3 lg:mt-0">
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="flex w-full justify-between items-center mt-3">
            <div
              className="flex gap-4 ml-3 
            "
            >
              <label class="mb-8 blockfont-semibold ">Post Status :</label>
              <Select
                options={["active", "inactive"]}
                label="Status"
                className=""
                {...register("status", { required: true })}
              />
            </div>
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="border border-gray-400 p-2 rounded-lg text-white bg-blue-500"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostForm;
