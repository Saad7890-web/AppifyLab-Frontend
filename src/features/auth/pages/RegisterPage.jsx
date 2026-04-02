import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { registerSchema } from "../schemas/auth.schema";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setServerError("");

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      const res = await authApi.register(payload);

      const accessToken = res?.accessToken || res?.data?.accessToken || null;
      const refreshToken = res?.refreshToken || res?.data?.refreshToken || null;
      const user = res?.user || res?.data?.user || null;

      if (accessToken) {
        setAuth({ user, accessToken, refreshToken });
        navigate("/feed", { replace: true });
        return;
      }

      navigate("/login", {
        replace: true,
        state: { message: "Registration successful. Please log in." },
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      setServerError(message);
    }
  };

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
      rightLogoAlt="Image"
    >
      <button
        type="button"
        className="_social_registration_content_btn _mar_b40"
      >
        <img
          src="/assets/images/google.svg"
          alt="Image"
          className="_google_img"
        />
        <span>Register with google</span>
      </button>

      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      <form
        className="_social_registration_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
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
                className={`form-control _social_registration_input ${errors.firstName ? "is-invalid" : ""}`}
                {...register("firstName")}
              />
              {errors.firstName && (
                <small className="text-danger">
                  {errors.firstName.message}
                </small>
              )}
            </div>
          </div>

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
                className={`form-control _social_registration_input ${errors.lastName ? "is-invalid" : ""}`}
                {...register("lastName")}
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName.message}</small>
              )}
            </div>
          </div>

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
                className={`form-control _social_registration_input ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
          </div>

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
                className={`form-control _social_registration_input ${errors.password ? "is-invalid" : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="confirmPassword"
              >
                Repeat Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`form-control _social_registration_input ${errors.confirmPassword ? "is-invalid" : ""}`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <small className="text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
          </div>
        </div>

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

        {serverError ? (
          <div className="mt-3 text-danger">{serverError}</div>
        ) : null}

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </form>

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
