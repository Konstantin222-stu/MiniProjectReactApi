import { makeAutoObservable, runInAction } from "mobx";
import { $host } from "../http/handlerApi";

export class AuthStore {
  admin = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async checkAuth() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      this.admin = false;
      this.loading = false;
      return;
    }

    try {
      const response = await $host.get<{ token: string }>("user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        runInAction(() => {
          this.admin = true;
        });
      }
    } catch (e) {
      localStorage.removeItem("authToken");
      runInAction(() => {
        this.admin = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  login = async (credentials: { login: string; password: string }) => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      const { data } = await $host.post<{ token: string }>("/user/login", credentials);
      localStorage.setItem("authToken", data.token);
      runInAction(() => {
        this.admin = true;
      });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Ошибка авторизации",
      };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  logout() {
    localStorage.removeItem("authToken");
    this.admin = false;
  }

  get isAdmin() {
    return this.admin;
  }

  get user() {
    return this.admin ? { role: "admin" as const } : null;
  }
}

export const authStore = new AuthStore();
