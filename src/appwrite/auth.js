import conf from "../conf/conf";
import {
  Client,
  Account,
  ID,
  OAuthProvider,
  Databases,
  Storage,
  Query,
} from "appwrite";

export class AuthService {
  client = new Client()
    .setEndpoint(conf.appwriteURL)
    .setProject(conf.appwriteProjectID);
  account;
  databases;
  bucke;

  constructor() {
    this.client;

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createAccount({ email, password, name, username, profileImg }) {
    try {
      // Create the account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        console.log("Account creation failed");
        return null;
      }

      // Log in
      const login = await this.login({ email, password });

      if (!login) {
        console.log("Login failed");
        return null;
      }

      // Save the user data to the database
      const newUser = await this.saveUserToDB({
        accountId: userAccount.$id,
        name: userAccount.name,
        username: username,
        email: userAccount.email,
        profileImg: profileImg || "6644de34002d7434f95a",
      });

      if (!newUser) {
        console.log("Failed to save user data to the database");
        return null;
      }
      return newUser;
    } catch (error) {
      console.log("Appwrite Service Error :: createAccount :: Error", error);
    }
  }

  async saveUserToDB({ accountId, name, email, profileImg, username }) {
    try {
      const userDataSaved = await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteUsersCollectionID,
        ID.unique(),
        {
          accountId,
          username,
          name,
          email,
          profileImg,
        }
      );
      console.log(userDataSaved);
    } catch (error) {
      console.log("Appwrite service :: saveUserToDB :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      const login = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log(login);
      console.log("Login Success");
      return login;
    } catch (error) {
      console.log("Appwrite Service Error :: login :: Error", error);
    }
  }

  async getAccount() {
    try {
      const currentAccount = await this.account.get();
      console.log(currentAccount);
      console.log("got current account");
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }
  async getCurrentUser() {
    try {
      const currentAccount = await this.getAccount();

      if (!currentAccount) throw Error;

      const currentUser = await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteUsersCollectionID,
        [Query.equal("accountId", currentAccount.$id)]
      );

      if (!currentUser) throw Error;

      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getUserInfo(userId) {
    try {
      const userInfo = await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteUsersCollectionID,
        [Query.equal("accountId", userId)]
      );
      return userInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
      // await this.account.deleteSession('current') //to delete only current session
    } catch (error) {
      console.log("Appwrite Service Error :: logOut:: Error", error);
    }
    return null;
  }

  googleLogin() {
    try {
      this.account.createOAuth2Session(
        OAuthProvider.Google, // provider
        "http://localhost:5173/", // success (optional)
        "http://localhost:5173/login" // failure (optional)
      );
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }

  //User Profile
  async uploadProfile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteProfileImgBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  getProfilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteProfileImgBucketID, fileId);
  }
}

const authService = new AuthService();

export default authService;
