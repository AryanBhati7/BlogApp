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

  async createAccount({
    email,
    password,
    name,
    username,
    profileImg,
    profileId,
  }) {
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
        profileImg: profileImg || "",
        profileId: profileId || "",
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

  async saveUserToDB({
    accountId,
    name,
    email,
    profileImg,
    username,
    bio,
    profileId = "",
  }) {
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
            profileId,
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
        "http://localhost:5173/callback/google", // success (optional)
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
  facebookLogin() {
    try {
      this.account.createOAuth2Session(
        OAuthProvider.Facebook, // provider
        "http://localhost:5173/callback/facebook", // success (optional)
        "http://localhost:5173/login" // failure (optional)
      );
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  }
  async getFacebookAccountInfo() {
    try {
      // Get the current session
      const session = await this.getAccount();
      console.log(session);

      // Get the user's profile information from Facebook
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${session.providerAccessToken}`
      );
      const data = await response.json();

      // Save the user's information to the database
      return await this.saveUserToDB({
        accountId: session.userId,
        name: data.name,
        email: data.email,
        username: data.email.split("@")[0],
        bio: "",
        profileImg: data.picture.data.url,
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
      console.log("Appwrite service :: uploadProfile :: error", error);
      return false;
    }
  }

  createAvatar(name) {
    return this.avatar.getInitials(name);
  }

  getProfilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteProfileImgBucketID, fileId);
  }
  async deleteProfile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteProfileImgBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteProfile :: error", error);
      return false;
    }
  }

  async uploadCoverPhoto(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteCoverPhotoBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadCoverPhoto:: error", error);
      return false;
    }
  }

  getCoverPhotoPreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteCoverPhotoBucketID, fileId);
  }
  async deleteCoverPhoto(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteCoverPhotoBucketID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteCoverPhoto :: error", error);
      return false;
    }
  }

  async updateProfile(
    userId,
    {
      name,
      profileImg,
      username,
      bio,
      coverphoto,
      gender,
      dob,
      location,
      socials,
      profileId,
      coverphotoId,
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteUsersCollectionID,
        userId,
        {
          location,
          name,
          gender,
          dob,
          profileImg,
          username,
          bio,
          coverphoto,
          socials,
          profileId,
          coverphotoId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error);
    }
  }
  async getAllUsers() {
    try {
      const allUsers = await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteUsersCollectionID
      );
      return allUsers.documents;
    } catch (error) {
      console.log("Appwrite Service :: getAllUsers :: errors", error);
    }
  }
}

const authService = new AuthService();

export default authService;
