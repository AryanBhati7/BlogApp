import conf from "../conf/conf";
import { Client, ID, Storage, Query, Databases } from "appwrite";

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

  async createPost({ title, content, featuredImage, status, userId, tags }) {
    try {
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
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async updatePost(postId, { title, content, featuredImage, status }) {
    try {
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
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
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
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async likePost(postId, likes) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwritePostsCollectionID,
        postId,
        {
          likes,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: likePost :: error", error);
    }
  }
  async savePost(user, post) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteSavesCollectionID,
        ID.unique(),
        {
          user,
          post,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: savePost :: error", error);
    }
  }
  async unsavePost(saveId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteSavesCollectionID,
        saveId
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: unsavePost :: error", error);
      return false;
    }
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

  //File upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritePostImgBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritePostImgBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwritePostImgBucketID, fileId);
  }
}
const service = new Service();
export default service;
