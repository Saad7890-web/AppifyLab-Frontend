import { useEffect, useState } from "react";
import { feedApi } from "../api/feed.api";
import LikeUsersModal from "./LikeUsersModal";

function updateTree(items, targetId, updater) {
  return items.map((item) => {
    if (item.id === targetId) return updater(item);

    if (item.replies?.length) {
      return {
        ...item,
        replies: updateTree(item.replies, targetId, updater),
      };
    }

    return item;
  });
}

async function hydrateNode(node) {
  const likeRes = await feedApi.getLikeState("comment", node.id);
  const likeData = likeRes.data?.data || {};

  const replies = node.replies?.length
    ? await Promise.all(node.replies.map(hydrateNode))
    : [];

  return {
    ...node,
    likedByMe: likeData.likedByMe || false,
    likeCount: likeData.likeCount ?? node.likeCount ?? 0,
    replies,
  };
}

function CommentNode({
  comment,
  depth,
  replyingTo,
  setReplyingTo,
  replyBodies,
  setReplyBodies,
  onToggleLike,
  onAddReply,
  onOpenLikers,
}) {
  return (
    <div className="mb-3" style={{ marginLeft: depth ? 22 : 0 }}>
      <div className="_comment_area">
        <div className="_comment_image">
          <img
            src="/assets/images/comment_img.png"
            alt=""
            className="_comment_img"
          />
        </div>

        <div className="_comment_details">
          <div className="_comment_details_top">
            <div>
              <h5 className="_comment_name_title">
                {comment.author?.firstName} {comment.author?.lastName}
              </h5>
              <span className="_comment_status_text">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="_comment_main mt-2">{comment.body}</div>

          <div className="_comment_status mt-2 d-flex gap-3 align-items-center">
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent _comment_reply"
              onClick={() => onToggleLike(comment.id)}
            >
              {comment.likedByMe ? "Unlike" : "Like"} ({comment.likeCount})
            </button>

            <button
              type="button"
              className="btn p-0 border-0 bg-transparent _comment_reply"
              onClick={() =>
                setReplyingTo((current) =>
                  current === comment.id ? null : comment.id,
                )
              }
            >
              Reply
            </button>

            <button
              type="button"
              className="btn p-0 border-0 bg-transparent _comment_reply"
              onClick={() => onOpenLikers(comment.id)}
            >
              View likers
            </button>
          </div>

          {replyingTo === comment.id ? (
            <div className="mt-3">
              <textarea
                className="form-control _comment_textarea"
                rows={2}
                placeholder="Write a reply..."
                value={replyBodies[comment.id] || ""}
                onChange={(e) =>
                  setReplyBodies((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))
                }
              />
              <button
                className="_feed_inner_story_btn_link btn mt-2"
                type="button"
                onClick={() => onAddReply(comment.id)}
              >
                Send reply
              </button>
            </div>
          ) : null}

          {comment.replies?.length ? (
            <div className="_comment_reply_list mt-3">
              {comment.replies.map((reply) => (
                <CommentNode
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyBodies={replyBodies}
                  setReplyBodies={setReplyBodies}
                  onToggleLike={onToggleLike}
                  onAddReply={onAddReply}
                  onOpenLikers={onOpenLikers}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [replyBodies, setReplyBodies] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [likersOpen, setLikersOpen] = useState(false);
  const [likersTitle, setLikersTitle] = useState("");
  const [likers, setLikers] = useState([]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await feedApi.getComments(postId);
      const rawComments = res.data?.data?.comments || [];
      const hydrated = await Promise.all(rawComments.map(hydrateNode));
      setComments(hydrated);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;

    const res = await feedApi.createComment(postId, body.trim());
    const comment = res.data?.data?.comment;
    if (!comment) return;

    const hydrated = await hydrateNode({ ...comment, replies: [] });
    setComments((prev) => [hydrated, ...prev]);
    setBody("");
  };

  const handleAddReply = async (commentId) => {
    const text = replyBodies[commentId]?.trim();
    if (!text) return;

    const res = await feedApi.createReply(commentId, text);
    const reply = res.data?.data?.reply;
    if (!reply) return;

    const hydratedReply = await hydrateNode({ ...reply, replies: [] });

    setComments((prev) =>
      updateTree(prev, commentId, (comment) => ({
        ...comment,
        replies: [...(comment.replies || []), hydratedReply],
        replyCount: (comment.replyCount || 0) + 1,
      })),
    );

    setReplyBodies((prev) => ({ ...prev, [commentId]: "" }));
    setReplyingTo(null);
  };

  const handleToggleLike = async (commentId) => {
    let previous = null;

    setComments((prev) =>
      updateTree(prev, commentId, (comment) => {
        previous = {
          likedByMe: comment.likedByMe,
          likeCount: comment.likeCount,
        };

        return {
          ...comment,
          likedByMe: !comment.likedByMe,
          likeCount: comment.likedByMe
            ? Math.max(comment.likeCount - 1, 0)
            : comment.likeCount + 1,
        };
      }),
    );

    try {
      const res = await feedApi.toggleLike("comment", commentId);
      const data = res.data?.data;

      setComments((prev) =>
        updateTree(prev, commentId, (comment) => ({
          ...comment,
          likedByMe: data.liked,
          likeCount: data.likeCount,
        })),
      );
    } catch {
      if (previous) {
        setComments((prev) =>
          updateTree(prev, commentId, (comment) => ({
            ...comment,
            likedByMe: previous.likedByMe,
            likeCount: previous.likeCount,
          })),
        );
      }
    }
  };

  const openLikers = async (commentId) => {
    setLikersOpen(true);
    setLikersTitle("Liked by");
    const res = await feedApi.getLikers("comment", commentId);
    setLikers(res.data?.data?.users || []);
  };

  return (
    <div>
      <form onSubmit={handleAddComment} className="_comment_area mb-4">
        <div className="_comment_image">
          <img
            src="/assets/images/comment_img.png"
            alt=""
            className="_comment_img"
          />
        </div>
        <div className="_comment_details">
          <textarea
            className="form-control _comment_textarea"
            rows={2}
            placeholder="Add a comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="mt-2">
            <button className="_feed_inner_story_btn_link btn" type="submit">
              Comment
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div>Loading comments...</div>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              depth={0}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyBodies={replyBodies}
              setReplyBodies={setReplyBodies}
              onToggleLike={handleToggleLike}
              onAddReply={handleAddReply}
              onOpenLikers={openLikers}
            />
          ))}
        </div>
      )}

      <LikeUsersModal
        open={likersOpen}
        title={likersTitle}
        users={likers}
        onClose={() => setLikersOpen(false)}
      />
    </div>
  );
}
