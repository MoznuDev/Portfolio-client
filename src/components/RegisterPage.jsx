import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  // সফল রেজিস্টার হওয়ার পর নেভিগেশন
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 700);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success, navigate]);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;

      await registerUser(payload).unwrap();

      setMessage("");
      setSuccess("Registration successful!");
    } catch (error) {
      setSuccess("");
      setMessage(
        error?.data?.message || error?.message || "Registration failed!",
      );
    }
  };

  return (
    <section className="register-section">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">
            নতুন একাউন্ট খুলতে নিচের তথ্যগুলো দিন
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              disabled={isLoading}
              className={`form-input ${errors.username ? "form-input-error" : ""} ${
                isLoading ? "form-input-disabled" : ""
              }`}
              {...register("username", {
                required: "আপনার নাম লিখুন",
                minLength: {
                  value: 3,
                  message: "নাম অন্তত ৩ অক্ষরের হতে হবে",
                },
              })}
            />
            {errors.username && (
              <p className="error-text">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              disabled={isLoading}
              className={`form-input ${errors.email ? "form-input-error" : ""} ${
                isLoading ? "form-input-disabled" : ""
              }`}
              {...register("email", {
                required: "ইমেইল দিতেই হবে",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "সঠিক ইমেইল ঠিকানা দিন",
                },
              })}
            />
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
                autoComplete="new-password"
                placeholder="••••••••"
                disabled={isLoading}
                className={`form-input form-input-pwd ${
                  errors.password ? "form-input-error" : ""
                } ${isLoading ? "form-input-disabled" : ""}`}
                {...register("password", {
                  required: "পাসওয়ার্ড প্রয়োজন",
                  minLength: {
                    value: 8,
                    message: "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং স্পেশাল ক্যারেক্টার থাকতে হবে",
                  },
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

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isLoading}
                className={`form-input form-input-pwd ${
                  errors.confirmPassword ? "form-input-error" : ""
                } ${isLoading ? "form-input-disabled" : ""}`}
                {...register("confirmPassword", {
                  required: "পাসওয়ার্ড আবার লিখুন",
                  validate: (val) =>
                    val === watch("password") || "পাসওয়ার্ড মিলছে না",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-pwd-btn"
              >
                {showConfirmPassword ? (
                  <i className="ri-eye-off-line text-xl"></i>
                ) : (
                  <i className="ri-eye-line text-xl"></i>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Error Message */}
          {message && <div className="backend-error">{message}</div>}

          {/* Success Message */}
          {success && <div className="backend-success">{success}</div>}

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
                Registering...
              </>
            ) : (
              "Register Now"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
