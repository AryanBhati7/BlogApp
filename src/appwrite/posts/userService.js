// UserService.js
import { Client, ID, Databases } from "appwrite";
import conf from "../../conf/conf";

export class UserService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
  }

  async addComment(userId, postId, comment) {
    return await this.databases.createDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCommentsCollectionID,
      ID.unique(),
      {
        user: userId,
        post: postId,
        comment,
      }
    );
  }

  async deleteComment(commentId) {
    await this.databases.deleteDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCommentsCollectionID,
      commentId
    );
  }

  async updateComment(commentId, comment) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseID,
      conf.appwriteCommentsCollectionID,
      commentId,
      {
        comment,
      }
    );
  }

  async likePost(postId, likes) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseID,
      conf.appwritePostsCollectionID,
      postId,
      {
        likes,
      }
    );
  }

  async savePost(userId, saved) {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseID,
      conf.appwriteUsersCollectionID,
      userId,
      {
        saved,
      }
    );
  }

  async unsavePost(saveId) {
    await this.databases.deleteDocument(
      conf.appwriteDatabaseID,
      conf.appwriteSavesCollectionID,
      saveId
    );
  }
}
