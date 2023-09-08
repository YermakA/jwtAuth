import { AxiosResponse } from "axios"
import api from "../http"
import IUser from "../models/response/IUser"

export default class AuthSerivce {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("/users")
  }
}
