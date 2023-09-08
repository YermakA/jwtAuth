import { AxiosResponse } from "axios"
import IAuthResponse from "../models/response/IAuthResponse"
import api from "../http"

export default class AuthSerivce {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>("/login", { email, password })
  }

  static async registartion(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return api.post<IAuthResponse>("/registration", { email, password })
  }

  static async logout(): Promise<void> {
    return api.get("/logout")
  }
}
