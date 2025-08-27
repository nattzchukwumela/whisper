// app/components/SignInForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [apiError, setApiError] = useState<string | null>(null);

  // Placeholder for your form submission logic
  const onSubmit = async (data: any) => {
    setApiError(null);
    console.log("Sign-in data:", data);
    // TODO: Replace with your actual API call
    // Example: try { await signIn(data); } catch (err) { setApiError('Invalid credentials.'); }
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
        Sign In
      </button>
    </form>
  );
}
