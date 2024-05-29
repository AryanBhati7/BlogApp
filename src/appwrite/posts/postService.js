// PostService.js
import { Client, ID, Databases, Query } from "appwrite";
import conf from "../../conf/conf";

export class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
  }

  async createPost({
    title,
    content,
    featuredImage,
    featuredImageURL,
    status,
    creatorId,
    userId,
    tags,
  }) {
    try {
      const post = await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          featuredImageURL,
          status,
          tags,
          userId,
          creator: creatorId,
        }
      );

      return post;
    } catch (error) {
      console.log("Appwrite Service Error : Create Post :", error);
    }
  }

  async updatePost(
    postId,
    { title, content, featuredImage, featuredImageURL, status, tags }
  ) {
    try {
      const post = await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        postId,
        {
          title,
          content,
          featuredImage,
          featuredImageURL,
          status,
          tags,
        }
      );

      return post;
    } catch (error) {
      console.log("Appwrite Service Error : Update Post :", error);
    }
  }

  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        postId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service Error : Delete Post :", error);
      return false;
    }
  }
}
