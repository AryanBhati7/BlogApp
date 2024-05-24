import conf from "../conf/conf";
import { Client, Storage, Query, Databases } from "appwrite";
import { FileService } from "./posts/fileService.js";
import { UserService } from "./posts/userService.js";
import { PostService } from "./posts/postService.js";

export const userService = new UserService();
export const postService = new PostService();
export const fileService = new FileService();

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(postId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        postId
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "Public")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        queries
        //we can add more queries according to our need
        //[Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
  async getPostsByUser(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite service :: getPostsbyUser :: error", error);
    }
  }
}
const service = new Service();
export default service;
