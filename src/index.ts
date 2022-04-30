import { CommentId, GetAdminListRequest, GetAdminListResponse, GetCountRequest, GetCountResponse, GetListRequest, GetListResponse, GetRecentCommentRequest, GetRecentCommentResponse, GetUserResponse, LoginRequest, PostCommentRequest, PostCommentResponse, RegisterUserRequest, UpdateCommentRequest, UpdateUserRequest, WalineAPIOptions } from "./types";
import { fetchFactory, qs } from "./util";

export default function(options: WalineAPIOptions) {
  const request = fetchFactory(options);
  return {
    comment: {
      getList(params: GetListRequest) {
        return request<GetListResponse>('/comment?' + qs.stringify(params));
      },
      getAdminList(params: GetAdminListRequest) {
        return request<GetAdminListResponse>('/comment?type=list&' + qs.stringify(params));
      },
      getCount(params: GetCountRequest) {
        return request('/comment?type=count&' + qs.stringify(params)) as Promise<GetCountResponse>;
      },
      getRecent(params: GetRecentCommentRequest) {
        return request('/comment?type=recent&' + qs.stringify(params)) as Promise<GetRecentCommentResponse>;
      },
      post(data: PostCommentRequest) {
        return request<PostCommentResponse>('/comment', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data)
        });
      },
      update(data: UpdateCommentRequest) {
        return request('/comment', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data)
        });
      },
      delete(commentId: CommentId) {
        return request('/comment/' + commentId, { method: 'DELETE' });
      }
    },
    user: {
      getInfo() {
        return request<GetUserResponse>('/token');
      },
      register(params: RegisterUserRequest) {
        return request('/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(params)
        });
      },
      update(params: UpdateUserRequest) {
        return request('/user', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(params)
        });
      },
      login(params: LoginRequest) {
        return request('/token', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(params)
        });
      },
      logout() {
        return request('/token', { method: 'DELETE' });
      }
    }
  }
}