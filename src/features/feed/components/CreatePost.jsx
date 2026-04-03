import { useMemo, useState } from "react";
import { feedApi } from "../api/feed.api";
import { useFeedStore } from "../store/feed.store";

export default function CreatePost() {
  const prependPost = useFeedStore((s) => s.prependPost);

  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim() && !imageFile) {
      setError("Post must include text or an image");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      if (content.trim()) formData.append("content", content.trim());
      formData.append("visibility", visibility);
      if (imageFile) formData.append("image", imageFile);

      const res = await feedApi.createPost(formData);
      const post = res.data?.data?.post;

      if (post) prependPost(post);

      setContent("");
      setVisibility("public");
      setImageFile(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <form onSubmit={handleSubmit}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">
            <img
              src="/assets/images/txt_img.png"
              alt="Image"
              className="_txt_img"
            />
          </div>

          <div className="form-floating _feed_inner_text_area_box_form">
            <textarea
              className="form-control _textarea"
              placeholder="Write something ..."
              id="floatingTextarea"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something ...
            </label>
          </div>
        </div>

        {previewUrl ? (
          <div className="mt-3">
            <img
              src={previewUrl}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: 360, objectFit: "cover" }}
            />
          </div>
        ) : null}

        {error ? <div className="text-danger mt-2">{error}</div> : null}

        <div className="_feed_inner_text_area_bottom mt-3">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <label className="_feed_inner_text_area_bottom_photo_link mb-0">
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#666"
                      d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.2z"
                    />
                  </svg>
                </span>
                Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <select
                className="form-select"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                style={{ minWidth: 120, borderRadius: 30 }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="_feed_inner_text_area_btn">
            <button
              type="submit"
              className="_feed_inner_text_area_btn_link"
              disabled={submitting}
            >
              <span>{submitting ? "Posting..." : "Post"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
