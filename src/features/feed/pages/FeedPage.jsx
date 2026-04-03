import { useEffect, useMemo, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useFeedStore } from "../store/feed.store";

const leftExplore = ["Learning", "Insights", "Events", "Groups", "Saved posts"];

const rightPeople = [
  { name: "Radovan SkillArena", role: "Founder & CEO at Trophy" },
  { name: "Steve Jobs", role: "CEO of Apple" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin" },
  { name: "Mark Zuckerberg", role: "Founder of Meta" },
];

export default function FeedPage() {
  const posts = useFeedStore((s) => s.posts);
  const loading = useFeedStore((s) => s.loading);
  const hasMore = useFeedStore((s) => s.hasMore);
  const error = useFeedStore((s) => s.error);
  const fetchFeed = useFeedStore((s) => s.fetchFeed);
  const resetFeed = useFeedStore((s) => s.resetFeed);

  const [search, setSearch] = useState("");

  useEffect(() => {
    resetFeed();
    fetchFeed({ reset: true });
  }, [resetFeed, fetchFeed]);

  const filteredPeople = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rightPeople;
    return rightPeople.filter((p) =>
      `${p.name} ${p.role}`.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_left_sidebar_wrap">
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <h4 className="_left_inner_area_explore_title _title5 _mar_b24">
                        Explore
                      </h4>
                      <ul className="_left_inner_area_explore_list">
                        {leftExplore.map((item) => (
                          <li
                            className="_left_inner_area_explore_item"
                            key={item}
                          >
                            <a
                              href="#0"
                              className="_left_inner_area_explore_link"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <CreatePost />

                    {error ? (
                      <div className="alert alert-danger">{error}</div>
                    ) : null}

                    <div className="_feed_inner_timeline_content">
                      <div className="_feed_inner_timeline_post_title _mar_b16">
                        <h4 className="_title5">Recent posts</h4>
                      </div>

                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}

                      <div className="text-center my-4">
                        {hasMore ? (
                          <button
                            className="_feed_inner_story_btn_link btn"
                            onClick={() => fetchFeed()}
                            disabled={loading}
                          >
                            {loading ? "Loading..." : "Load more"}
                          </button>
                        ) : (
                          <small className="text-muted">No more posts</small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  <div className="_layout_right_sidebar_inner">
                    <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_right_inner_area_info_content _mar_b24">
                        <h4 className="_right_inner_area_info_content_title _title5">
                          You Might Like
                        </h4>
                        <span className="_right_inner_area_info_content_txt">
                          <a
                            className="_right_inner_area_info_content_txt_link"
                            href="#0"
                          >
                            See All
                          </a>
                        </span>
                      </div>
                      <hr className="_underline" />
                      <div className="_right_inner_area_info_ppl">
                        {filteredPeople.map((person) => (
                          <div
                            className="_right_inner_area_info_box"
                            key={person.name}
                          >
                            <div className="_right_inner_area_info_box_image">
                              <img
                                src="/assets/images/Avatar.png"
                                alt={person.name}
                                className="_ppl_img"
                              />
                            </div>
                            <div className="_right_inner_area_info_box_txt">
                              <h4 className="_right_inner_area_info_box_title">
                                {person.name}
                              </h4>
                              <p className="_right_inner_area_info_box_para">
                                {person.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_feed_top_fixed">
                        <div className="_feed_right_inner_area_card_content _mar_b24">
                          <h4 className="_feed_right_inner_area_card_content_title _title5">
                            Your Friends
                          </h4>
                          <span className="_feed_right_inner_area_card_content_txt">
                            <a
                              className="_feed_right_inner_area_card_content_txt_link"
                              href="#0"
                            >
                              See All
                            </a>
                          </span>
                        </div>

                        <form
                          className="_feed_right_inner_area_card_form"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <svg
                            className="_feed_right_inner_area_card_form_svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            fill="none"
                            viewBox="0 0 17 17"
                          >
                            <circle cx="7" cy="7" r="6" stroke="#666" />
                            <path
                              stroke="#666"
                              strokeLinecap="round"
                              d="M16 16l-3-3"
                            />
                          </svg>
                          <input
                            className="form-control me-2 _feed_right_inner_area_card_form_inpt"
                            type="search"
                            placeholder="input search text"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
