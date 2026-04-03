import { getMediaUrl } from "@/utils/media";
import { useState } from "react";
import { feedApi } from "../api/feed.api";
import { useFeedStore } from "../store/feed.store";
import CommentSection from "./CommentSection";
import LikeUsersModal from "./LikeUsersModal";

export default function PostCard({ post }) {
  const updatePost = useFeedStore((s) => s.updatePost);

  const [showComments, setShowComments] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [likersLoading, setLikersLoading] = useState(false);
  const [likers, setLikers] = useState([]);
  const [isLiking, setIsLiking] = useState(false);

  const avatarSrc =
    getMediaUrl(post.author?.avatarUrl) ||
    getMediaUrl(post.author?.avatar) ||
    "/assets/images/Avatar.png";

  const imageSrc = getMediaUrl(post.imageUrl);

  const handleToggleLike = async () => {
    if (isLiking) return;

    const prevLiked = Boolean(post.likedByMe);
    const prevLikeCount = Number(post.likeCount || 0);

    setIsLiking(true);

    // optimistic update
    updatePost(post.id, (current) => {
      const likedByMe = !current.likedByMe;
      const likeCount = likedByMe
        ? Number(current.likeCount || 0) + 1
        : Math.max(Number(current.likeCount || 0) - 1, 0);

      return { ...current, likedByMe, likeCount };
    });

    try {
      const res = await feedApi.toggleLike("post", post.id);
      const data = res.data?.data || {};

      updatePost(post.id, (current) => ({
        ...current,
        likedByMe: Boolean(data.liked),
        likeCount: Number(data.likeCount ?? current.likeCount ?? 0),
      }));
    } catch {
      // rollback
      updatePost(post.id, (current) => ({
        ...current,
        likedByMe: prevLiked,
        likeCount: prevLikeCount,
      }));
    } finally {
      setIsLiking(false);
    }
  };

  const openLikers = async () => {
    setShowLikers(true);
    setLikersLoading(true);
    try {
      const res = await feedApi.getLikers("post", post.id);
      setLikers(res.data?.data?.users || []);
    } finally {
      setLikersLoading(false);
    }
  };

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src={avatarSrc} alt="" className="_post_img" />
            </div>

            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author?.firstName} {post.author?.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {new Date(post.createdAt).toLocaleString()} .{" "}
                <span className="text-capitalize">{post.visibility}</span>
              </p>
            </div>
          </div>

          <div className="_feed_inner_timeline_post_box_dropdown">
            <button type="button" className="_feed_timeline_post_dropdown_link">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17">
                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
              </svg>
            </button>
          </div>
        </div>

        {post.content && (
          <div className="_feed_inner_timeline_post_box_para _post_text">
            {post.content}
          </div>
        )}

        {imageSrc && (
          <div className="_post_image_wrap">
            <img src={imageSrc} alt="post" className="_post_image" />
          </div>
        )}
      </div>

      {/* ✅ TOTAL REACTIONS (LIKE COUNT + COMMENTS) */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent"
            onClick={openLikers}
            disabled={likersLoading}
          >
            <div
              className="_likes_badge"
              aria-label={`${post.likeCount || 0} likes`}
            >
              <span className="_likes_badge_count">
                {post.likeCount > 99 ? "99+" : post.likeCount || 0}
              </span>
            </div>
          </button>

          <span className="_feed_inner_timeline_total_reacts_para1">
            {post.commentCount || 0} comments
          </span>
        </div>
      </div>

      {/* ❤️ LIKE & COMMENT BUTTONS */}
      <div className="_feed_inner_timeline_reaction _padd_r24 _padd_l24">
        <button
          type="button"
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction btn ${
            post.likedByMe ? "_feed_reaction_active" : ""
          }`}
          onClick={handleToggleLike}
          disabled={isLiking}
          aria-pressed={Boolean(post.likedByMe)}
        >
          {isLiking ? "Saving..." : post.likedByMe ? "Unlike" : "Like"}
        </button>

        <button
          type="button"
          className="_feed_inner_timeline_reaction_comment _feed_reaction btn"
          onClick={() => setShowComments((v) => !v)}
        >
          Comment
        </button>
      </div>

      {showComments && (
        <div className="_feed_inner_timeline_cooment_area _padd_r24 _padd_l24 mt-3">
          <CommentSection postId={post.id} />
        </div>
      )}

      <LikeUsersModal
        open={showLikers}
        title="Liked by"
        users={likers}
        onClose={() => setShowLikers(false)}
      />
    </div>
  );
}
