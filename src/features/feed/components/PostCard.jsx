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

  const avatarSrc =
    getMediaUrl(post.author?.avatarUrl) ||
    getMediaUrl(post.author?.avatar) ||
    "/assets/images/Avatar.png";

  const imageSrc = getMediaUrl(post.imageUrl);
  // getMediaUrl(post.image) ||
  // getMediaUrl(post.photo) ||
  // getMediaUrl(post.mediaUrl) ||
  // getMediaUrl(post.media?.url) ||
  // null;

  const handleToggleLike = async () => {
    const prevLiked = post.likedByMe;
    const prevLikeCount = post.likeCount;

    updatePost(post.id, (current) => ({
      ...current,
      likedByMe: !current.likedByMe,
      likeCount: current.likedByMe
        ? Math.max(current.likeCount - 1, 0)
        : current.likeCount + 1,
    }));

    try {
      const res = await feedApi.toggleLike("post", post.id);
      const data = res.data?.data;

      updatePost(post.id, (current) => ({
        ...current,
        likedByMe: data.liked,
        likeCount: data.likeCount,
      }));
    } catch {
      updatePost(post.id, (current) => ({
        ...current,
        likedByMe: prevLiked,
        likeCount: prevLikeCount,
      }));
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="4"
                height="17"
                fill="none"
                viewBox="0 0 4 17"
              >
                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
              </svg>
            </button>
          </div>
        </div>

        {post.content ? (
          <div className="_feed_inner_timeline_post_box_para _post_text">
            {post.content}
          </div>
        ) : null}

        {imageSrc ? (
          <div className="_post_image_wrap">
            <img src={imageSrc} alt="post" className="_post_image" />
          </div>
        ) : null}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_txt d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent"
            onClick={openLikers}
            disabled={likersLoading}
          >
            <span className="_feed_inner_timeline_total_reacts_para">
              {post.likeCount || 0} likes
            </span>
          </button>

          <span className="_feed_inner_timeline_total_reacts_para1">
            {post.commentCount || 0} comments
          </span>
        </div>
      </div>

      <div className="_feed_inner_timeline_reaction _padd_r24 _padd_l24">
        <button
          type="button"
          className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active btn"
          onClick={handleToggleLike}
        >
          {post.likedByMe ? "Unlike" : "Like"}
        </button>

        <button
          type="button"
          className="_feed_inner_timeline_reaction_comment _feed_reaction btn"
          onClick={() => setShowComments((v) => !v)}
        >
          Comment
        </button>
      </div>

      {showComments ? (
        <div className="_feed_inner_timeline_cooment_area _padd_r24 _padd_l24 mt-3">
          <CommentSection postId={post.id} />
        </div>
      ) : null}

      <LikeUsersModal
        open={showLikers}
        title="Liked by"
        users={likers}
        onClose={() => setShowLikers(false)}
      />
    </div>
  );
}
