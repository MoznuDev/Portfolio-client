import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const AuthPage = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const response = await loginUser(data).unwrap();
      const { user, token } = response;

      dispatch(setUser({ user, token }));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error?.data?.message || "Please provide a valid email & password";
      setMessage(errorMsg);
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Go to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="example@mail.com"
                autoComplete="email"
                disabled={isLoading}
                className={`form-input ${
                  errors.email ? "form-input-error" : ""
                } ${isLoading ? "form-input-disabled" : ""}`}
                {...register("email", {
                  required: "Email is requared",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "give must be right email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                className={`form-input form-input-pwd ${
                  errors.password ? "form-input-error" : ""
                } ${isLoading ? "form-input-disabled" : ""}`}
                {...register("password", {
                  required: "must be password",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-pwd-btn"
              >
                {showPassword ? (
                  <i className="ri-eye-off-line text-xl"></i>
                ) : (
                  <i className="ri-eye-line text-xl"></i>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="forgot-pwd-container">
            <Link to="/forgot-password" className="forgot-pwd-link">
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {message && <div className="backend-error">{message}</div>}

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? (
              <>
                <svg className="spinner" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Submit Now"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Don't have an account?
            <Link to="/register" className="register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
