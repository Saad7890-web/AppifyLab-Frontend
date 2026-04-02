import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";

export default function RegisterPage() {
  const leftContent = (
    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
      <div className="_social_registration_right">
        <div className="_social_registration_right_image">
          <img src="/assets/images/registration.png" alt="Image" />
        </div>
        <div className="_social_registration_right_image_dark">
          <img src="/assets/images/registration1.png" alt="Image" />
        </div>
      </div>
    </div>
  );

  return (
    <AuthShell
      wrapperClassName="_social_registration_wrapper _layout_main_wrapper"
      leftContent={leftContent}
      rightSubtitle="Get Started Now"
      rightTitle="Registration"
      rightLogoSrc="/assets/images/logo.svg"
      rightLogoAlt="Logo"
    >
      {/* Google Register */}
      <button
        type="button"
        className="_social_registration_content_btn _mar_b40"
      >
        <img
          src="/assets/images/google.svg"
          alt="Image"
          className="_google_img"
        />
        <span>Register with Google</span>
      </button>

      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      {/* Registration Form */}
      <form className="_social_registration_form">
        <div className="row">
          {/* First Name */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="form-control _social_registration_input"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="form-control _social_registration_input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="registerEmail"
              >
                Email
              </label>
              <input
                id="registerEmail"
                type="email"
                className="form-control _social_registration_input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="registerPassword"
              >
                Password
              </label>
              <input
                id="registerPassword"
                type="password"
                className="form-control _social_registration_input"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="radio"
                name="termsAgreement"
                id="termsAgreement"
                defaultChecked
              />
              <label
                className="form-check-label _social_registration_form_check_label"
                htmlFor="termsAgreement"
              >
                I agree to terms & conditions
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="button"
                className="_social_registration_form_btn_link _btn1"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Bottom Link */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_bottom_txt">
            <p className="_social_registration_bottom_txt_para">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
