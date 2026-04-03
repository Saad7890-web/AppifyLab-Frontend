import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { loginSchema } from "../schemas/auth.schema";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setServerError("");

    try {
      const res = await authApi.login(values);

      console.log("LOGIN RESPONSE:", res);

      const data = res?.data; // ✅ correct for your case

      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken || null;
      const user = data?.user;

      if (!accessToken) {
        throw new Error("Login response did not include access token");
      }

      setAuth({ user, accessToken, refreshToken });
      navigate("/feed", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      setServerError(message);
    }
  };

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

      <form className="_social_login_form" onSubmit={handleSubmit(onSubmit)}>
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
                className={`form-control _social_login_input ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
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
                className={`form-control _social_login_input ${errors.password ? "is-invalid" : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
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

        {serverError ? (
          <div className="mt-3 text-danger">{serverError}</div>
        ) : null}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login now"}
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
