import { User } from "./allorders"

export interface SuccessLoginResponse {
  message: string
  user: User
  token: string
}

export interface UserResponse {
  name: string
  email: string
  role: string
}
export interface FailedLoginResponse {
  statusMsg: string
  message: string
}