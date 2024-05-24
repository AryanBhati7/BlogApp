// FileService.js
import { Client, ID, Storage } from "appwrite";
import conf from "../../conf/conf";

export class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwritePostImgBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwritePostImgBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwritePostImgBucketID, fileId);
  }
}
