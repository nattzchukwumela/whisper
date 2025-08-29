// app/components/SignInForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Placeholder for your form submission logic
  const onSubmit = async (data: any) => {
    setApiError(null); // reset any old errors
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/signin/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login success:", res.data);

      // TODO: handle redirect, store session, etc.
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        // API responded but with error (e.g., 401 Unauthorized)
        if (err.response) {
          console.log(err.response);
          setApiError(err.response.data?.error || "Invalid credentials");
        } else if (err.request) {
          // No response at all (network/server down)
          setApiError("Server not responding. Please try again later.");
        }
      } else {
        // Unknown error (coding bug, etc.)
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
      {/* Display API errors here */}
      {apiError && <p className="error-message api-error">{apiError}</p>}

      <div className="form-group">
        <label htmlFor="identifier">Username or Email</label>
        <input
          id="identifier"
          type="text"
          {...register("identifier", {
            required: "Username or email is required",
          })}
          placeholder="e.g., shadow_user"
          className={errors.identifier ? "input-error" : ""}
        />
        {errors.identifier && (
          <p className="error-message">{String(errors.identifier.message)}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="••••••••"
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <p className="error-message">{String(errors.password.message)}</p>
        )}
      </div>

      <button type="submit" className="submit-button">
        {isLoading ? <BeatLoader /> : "Sign In"}
      </button>
    </form>
  );
}
