import { BasicResponse } from "./basic";
import { UserType } from "./comment";

export interface User {
  avatar: string;
  createdAt: string;
  display_name: string;
  email: string;
  github: string;
  mailMd5: string;
  objectId: string;
  type: UserType;
  url: string;
}

export interface RegisterUserRequest {
  display_name?: string;
  email: string;
  password: string;
  url?: string;
}

export interface UpdateUserRequest {
  display_name?: string;
  url?: string;
  password?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GetUserResponse extends Required<BasicResponse> {
  data: User;
}