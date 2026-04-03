import { http } from "@/api/http";

export const feedApi = {
  getFeed: (cursor = null, limit = 10) =>
    http.get("/api/feed", {
      params: { cursor: cursor || undefined, limit },
    }),

  createPost: (formData) =>
    http.post("/api/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  toggleLike: (targetType, targetId) =>
    http.post(`/api/likes/${targetType}/${targetId}/toggle`),

  getLikeState: (targetType, targetId) =>
    http.get(`/api/likes/${targetType}/${targetId}`),

  getLikers: (targetType, targetId, limit = 20, offset = 0) =>
    http.get(`/api/likes/${targetType}/${targetId}/users`, {
      params: { limit, offset },
    }),

  getComments: (postId) =>
    http.get(`/api/comments/post/${postId}`),

  createComment: (postId, body) =>
    http.post(`/api/comments/post/${postId}`, { body }),

  createReply: (commentId, body) =>
    http.post(`/api/comments/${commentId}/replies`, { body }),
};