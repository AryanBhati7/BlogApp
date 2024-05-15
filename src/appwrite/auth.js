import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method to create user profile
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite Service Error :: createAccount :: Error", error);
    }
  }

  async login({ email, password }) {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        console.log("User is already logged in");
        return currentUser;
      }

      const login = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return login;
    } catch (error) {
      console.log("Appwrite Service Error :: login :: Error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.getSession("current");
    } catch (error) {
      console.log("Appwrite Service Error :: getCurrentUser :: Error", error);
    }
    return null;
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
        "http://localhost:5173/home", // success (optional)
        "http://localhost:5173/error", // failure (optional)
        [] // scopes (optional)
      );
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
