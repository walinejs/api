import { BasicResponse } from "./basic";

export type CommentId = string | number;
export type CommentStatus = 'approved' | 'waiting' | 'spam';
export type UserType = 'administrator' | 'guest';
export interface Comment {
  nick: string;
  insertedAt: string;
  sticky: boolean;
  status: CommentStatus;
  link: string;
  comment: string;
  objectId: CommentId;
  createdAt: string;
  updatedAt: string;
  browser: string;
  os: string;
  type?: UserType;
  avatar: string;
  children: ChildComment[];
}

export interface ChildComment extends Omit<Comment, 'children' | 'sticky'> {
  pid: string;
  rid: string;
}

export interface RawComment extends Omit<Comment, 'children'> {
  ip: string;
  orig: string;
  url: string;
}

export interface GetListRequest {
  path: string;
  page?: number;
  pagesize?: number;
}

export interface GetListResponse {
  page: number;
  totalPages: number;
  pageSize: number;
  count: number;
  data: Comment[];
}

export interface GetAdminListRequest {
  owner?: 'all' | 'me';
  status?: CommentStatus;
  keyword?: string;
  page?: number;
}

export interface GetAdminListResponse extends Required<BasicResponse> {
  data: AdminList;
}

export interface AdminList {
  page: number;
  pageSize: number;
  spamCount: number;
  totalPages: number;
  waitingCount: number;
  data: RawComment[];
}

export interface GetCountRequest {
  url: string;
}

export type GetCountResponse = number | number[];


export interface GetRecentCommentRequest {
  count: number;
}

export type GetRecentCommentResponse = Comment[];

export interface PostCommentRequest {
  nick?: string;
  mail?: string;
  link?: string;
  comment: string;
  url: string;
  ua?: string;
  pid?: string;
  rid?: string;
  at?: string;
}

export interface PostCommentResponse extends Required<BasicResponse> {
  data: Omit<Comment, 'children'>
}

export interface UpdateCommentRequest {
  nick?: string;
  mail?: string;
  link?: string;
  comment?: string;
  sticky?: boolean;
  status?: CommentStatus;
  url: string;
}