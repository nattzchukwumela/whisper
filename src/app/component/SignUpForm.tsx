// app/components/SignUpForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Placeholder for your sign-up submission logic
  const onSubmit = async (data: any) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/signup/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Sign Uo Successful:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.log(err.response);
          setApiError(err.response.data?.error || "Invalid data credentials");
        } else if (err.request) {
          setApiError("Server not responding. Please try again later.");
        }
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
    // TODO: Replace with your actual API call to register the user
    // Example: try { await signUp(data); } catch (err) { setApiError('Username or email already exists.'); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
      {/* Display API-related errors */}
      {apiError && <p className="error-message api-error">{apiError}</p>}

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          placeholder="Choose a secret identity"
          className={errors.username ? "input-error" : ""}
        />
        {errors.username && (
          <p className="error-message">{String(errors.username.message)}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          placeholder="your@email.com"
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && (
          <p className="error-message">{String(errors.email.message)}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          placeholder="At least 8 characters"
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <p className="error-message">{String(errors.password.message)}</p>
        )}
      </div>

      <button type="submit" className="submit-button">
        {isLoading ? <BeatLoader size={10} color="#fff" /> : "Create Account"}
      </button>
    </form>
  );
}
