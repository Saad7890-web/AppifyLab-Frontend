import { create } from "zustand";
import { feedApi } from "../api/feed.api";

export const useFeedStore = create((set, get) => ({
  posts: [],
  cursor: null,
  hasMore: true,
  loading: false,
  error: null,

  resetFeed: () =>
    set({
      posts: [],
      cursor: null,
      hasMore: true,
      loading: false,
      error: null,
    }),

  fetchFeed: async ({ reset = false } = {}) => {
    const { cursor, loading, hasMore } = get();

    if (loading) return;
    if (!reset && !hasMore) return;

    set({ loading: true, error: null });

    try {
      const res = await feedApi.getFeed(reset ? null : cursor, 10);
      const data = res.data?.data;

      set((state) => ({
        posts: reset ? data.posts : [...state.posts, ...data.posts],
        cursor: data.pageInfo?.nextCursor || null,
        hasMore: Boolean(data.pageInfo?.hasMore),
      }));
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch feed",
      });
    } finally {
      set({ loading: false });
    }
  },

  prependPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  updatePost: (postId, updater) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? updater(post) : post
      ),
    })),
}));