import { makeAutoObservable } from "mobx"
import IUser from "../models/response/IUser"
import AuthSerivce from "../service/AuthService"
import IAuthResponse from "../models/response/IAuthResponse"
import axios from "axios"

export default class Store {
  user = {} as IUser
  isAuth = false
  constructor() {
    makeAutoObservable(this)
  }

  setAuth(auth: boolean) {
    this.isAuth = auth
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthSerivce.login(email, password)

      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }
  async registartion(email: string, password: string) {
    try {
      const response = await AuthSerivce.registartion(email, password)
      console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      await AuthSerivce.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth() {
    try {
      const BASE_URL = "http://localhost:5000/api/"
      const response = await axios.get<IAuthResponse>(`${BASE_URL}/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }
}
