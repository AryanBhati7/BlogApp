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
    userId,
    tags,
  }) {
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
        creator: userId,
      }
    );
    await this.handleTags(tags, post.$id);

    return post;
  }

  async updatePost({
    postId,
    title,
    content,
    featuredImage,
    featuredImageURL,
    status,
    tags,
  }) {
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
      }
    );

    await this.handleTags(tags, postId);

    return post;
  }

  async deletePost(postId) {
    await this.databases.deleteDocument(
      conf.appwriteDatabaseID,
      conf.appwritePostsCollectionID,
      postId
    );
  }
  async handleTags(tags, postId) {
    for (let tag of tags) {
      // Check if a tag document already exists
      const existingTag = await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteTagsCollectionID,
        [Query.equal("tagName", tag)]
      );

      if (existingTag.documents.length > 0) {
        // If the tag document exists, add the post's ID to its posts array
        await this.databases.updateDocument(
          conf.appwriteDatabaseID,
          conf.appwriteTagsCollectionID,
          existingTag.documents[0].$id,
          {
            ...existingTag.documents[0],
            posts: [...existingTag.documents[0].posts, postId],
          }
        );
      } else {
        // If the tag document doesn't exist, create a new one
        await this.databases.createDocument(
          conf.appwriteDatabaseID,
          conf.appwriteTagsCollectionID,
          ID.unique(),
          {
            tagName: tag,
            posts: [postId],
          }
        );
      }
    }
  }
}
