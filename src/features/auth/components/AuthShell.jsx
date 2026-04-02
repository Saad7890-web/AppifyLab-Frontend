export default function AuthShell({
  wrapperClassName,
  leftContent,
  rightTitle,
  rightSubtitle,
  //   rightLogoClassName,
  rightLogoSrc = "/assets/images/logo.svg",
  rightLogoAlt = "Logo",
  children,
}) {
  return (
    <section className={wrapperClassName}>
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img
          src="/assets/images/dark_shape.svg"
          alt=""
          className="_dark_shape"
        />
      </div>

      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img
          src="/assets/images/dark_shape1.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img
          src="/assets/images/dark_shape2.svg"
          alt=""
          className="_dark_shape _dark_shape_opacity"
        />
      </div>

      <div
        className={
          wrapperClassName.includes("registration")
            ? "_social_registration_wrap"
            : "_social_login_wrap"
        }
      >
        <div className="container">
          <div className="row align-items-center">
            {leftContent}

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div
                className={
                  wrapperClassName.includes("registration")
                    ? "_social_registration_content"
                    : "_social_login_content"
                }
              >
                <div
                  className={
                    wrapperClassName.includes("registration")
                      ? "_social_registration_right_logo _mar_b28"
                      : "_social_login_left_logo _mar_b28"
                  }
                >
                  <img
                    src={rightLogoSrc}
                    alt={rightLogoAlt}
                    className={
                      wrapperClassName.includes("registration")
                        ? "_right_logo"
                        : "_left_logo"
                    }
                  />
                </div>

                <p
                  className={
                    wrapperClassName.includes("registration")
                      ? "_social_registration_content_para _mar_b8"
                      : "_social_login_content_para _mar_b8"
                  }
                >
                  {rightSubtitle}
                </p>

                <h4
                  className={
                    wrapperClassName.includes("registration")
                      ? "_social_registration_content_title _titl4 _mar_b50"
                      : "_social_login_content_title _titl4 _mar_b50"
                  }
                >
                  {rightTitle}
                </h4>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
