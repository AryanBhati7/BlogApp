import conf from "../conf/conf";
import {
  Client,
  Account,
  ID,
  OAuthProvider,
  Databases,
  Storage,
  Query,
  Avatars,
} from "appwrite";

export class AuthService {
  client = new Client()
    .setEndpoint(conf.appwriteURL)
    .setProject(conf.appwriteProjectID);
  account;
  databases;
  bucket;
  avatar;

  constructor() {
    this.client;

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.avatar = new Avatars(this.client);
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
        bio: "",
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

  async saveUserToDB({ accountId, name, email, profileImg, username, bio }) {
    try {
      // Check if a user with the same accountId already exists
      const users = await this.getUserInfo(accountId);

      if (users) {
        // If the user already exists, return the existing user
        return users;
      } else {
        // If the user doesn't exist, create a new user
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
            bio,
          }
        );
        return userDataSaved;
      }
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
      return login;
    } catch (error) {
      console.log("Appwrite Service Error :: login :: Error", error);
    }
  }

  async getAccount() {
    try {
      const currentAccount = await this.account.getSession("current");
      console.log(currentAccount);
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
        [Query.equal("accountId", currentAccount.userId)]
      );

      if (!currentUser) throw Error;
      console.log(currentUser);
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      throw new Error("No Current Account found");
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
      console.log(userInfo, "getUserInfo");
      return userInfo.documents[0];
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
        "http://localhost:5173/callback", // success (optional)
        "http://localhost:5173/login" // failure (optional)
      );
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }

  async getGoogleAccountInfo() {
    try {
      // Get the current session
      const session = await this.getAccount();
      console.log(session);

      // Get the user's profile information from Google
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${session.providerAccessToken}`
      );
      const data = await response.json();

      // Save the user's information to the database
      return await this.saveUserToDB({
        accountId: session.userId,
        name: data.name,
        email: data.email,
        username: data.email.split("@")[0],
        bio: "",
        profileImg: data.picture,
      });
    } catch (error) {
      console.error("Error during token exchange:", error);
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

  createAvatar(name) {
    return this.avatar.getInitials(name);
  }

  getProfilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteProfileImgBucketID, fileId);
  }
}

const authService = new AuthService();

export default authService;
