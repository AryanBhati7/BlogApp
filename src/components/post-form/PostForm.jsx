import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE, FileUploader } from "../index";
import { useDispatch } from "react-redux";
import { createPostAction, editPost } from "../../features/postSlice";
import { fileService, postService } from "../../appwrite/config";
import { unwrapResult } from "@reduxjs/toolkit";

function PostForm({ post }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "Public",
        tags: post?.tags ? post.tags.map((tag) => tag).join(", ") : " ",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [featuredImg, setFeaturedImg] = useState(null);
  const handleFileSelect = (file) => {
    setFeaturedImg(file);
  };

  const submit = async (data) => {
    if (post) {
      let file;
      let featuredImageURL;

      if (featuredImg) {
        file = await fileService.uploadFile(featuredImg);
        featuredImageURL = file.$id;
      }
      if (file && post.featuredImage) {
        await fileService.deleteFile(post.featuredImage);
      }

      data.tags = data.tags.split(",").map((tag) => tag.trim());
      const actionResult = await dispatch(
        editPost({
          postId: post.$id,
          post: {
            ...data,
            featuredImage: file ? file.$id : undefined,
            featuredImageURL: featuredImageURL || post.featuredImageURL,
          },
        })
      );
      const newPost = unwrapResult(actionResult);
      console.log("Post Form after dispatched editPost", newPost);
      navigate(`/post/${newPost.$id}`);
    } else {
      const file = await fileService.uploadFile(featuredImg);
      const fileId = file.$id;
      data.featuredImage = fileId;
      const featuredImageURL = fileService.getFilePreview(file.$id);

      data.tags = data.tags.split(",").map((tag) => tag.trim());

      // const dbPost = await postService.createPost({
      //   ...data,
      //   userId: userData.$id,
      //   featuredImageURL,
      // });
      const actionResult = await dispatch(
        createPostAction({
          ...data,
          creatorId: userData.$id,
          userId: userData.accountId,
          featuredImageURL,
        })
      );
      const newPost = unwrapResult(actionResult);
      console.log("Post Form after dispatched", newPost);
      navigate(`/post/${newPost.$id}`);
      // if (dbPost.status === "Public") dispatch(createPost(dbPost));
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
              <label className="mb-8 blockfont-semibold ">
                Featured Image :
              </label>
              <FileUploader
                onFileSelect={handleFileSelect}
                imgSrc={post ? post.featuredImageURL : null}
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
              <label className="mb-8 blockfont-semibold ">Post Status :</label>
              <Select
                options={["Public", "Private"]}
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
