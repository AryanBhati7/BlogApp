import config from "../config/config";
import { Client, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
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
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const login = await this.account.createSession(email, password);
      return login;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
