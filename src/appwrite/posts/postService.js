// PostService.js
import { Client, ID, Databases } from "appwrite";
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

  async createPost({ title, content, featuredImage, status, userId, tags }) {
    return await this.databases.createDocument(
      conf.appwriteDatabaseID,
      conf.appwritePostsCollectionID,
      ID.unique(),
      {
        title,
        content,
        featuredImage,
        status,
        userId,
        tags,
      }
    );
  }

  async updatePost(postId, { title, content, featuredImage, status }) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseID,
      conf.appwritePostsCollectionID,
      postId,
      {
        title,
        content,
        featuredImage,
        status,
      }
    );
  }

  async deletePost(postId) {
    await this.databases.deleteDocument(
      conf.appwriteDatabaseID,
      conf.appwritePostsCollectionID,
      postId
    );
  }
}
