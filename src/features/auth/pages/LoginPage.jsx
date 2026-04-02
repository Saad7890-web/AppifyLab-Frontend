import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";

export default function LoginPage() {
  const leftContent = (
    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
      <div className="_social_login_left">
        <div className="_social_login_left_image">
          <img
            src="/assets/images/login.png"
            alt="Image"
            className="_left_img"
          />
        </div>
      </div>
    </div>
  );

  return (
    <AuthShell
      wrapperClassName="_social_login_wrapper _layout_main_wrapper"
      leftContent={leftContent}
      rightSubtitle="Welcome back"
      rightTitle="Login to your account"
    >
      <button type="button" className="_social_login_content_btn _mar_b40">
        <img
          src="/assets/images/google.svg"
          alt="Image"
          className="_google_img"
        />
        <span>Or sign-in with google</span>
      </button>

      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      <form className="_social_login_form">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label
                className="_social_login_label _mar_b8"
                htmlFor="loginEmail"
              >
                Email
              </label>
              <input
                id="loginEmail"
                type="email"
                className="form-control _social_login_input"
              />
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label
                className="_social_login_label _mar_b8"
                htmlFor="loginPassword"
              >
                Password
              </label>
              <input
                id="loginPassword"
                type="password"
                className="form-control _social_login_input"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="radio"
                name="rememberMe"
                id="rememberMe"
                defaultChecked
              />
              <label
                className="form-check-label _social_login_form_check_label"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
          </div>

          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para">Forgot password?</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="button"
                className="_social_login_form_btn_link _btn1"
              >
                Login now
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Dont have an account?{" "}
              <Link to="/register">Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
