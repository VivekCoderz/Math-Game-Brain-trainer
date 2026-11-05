import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, errorMessage, saveSession } from "../lib/api";
import { AuthLayout, Field, ErrorBox, SubmitButton } from "./AuthLayout";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", pass: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/user/signin", form);
      saveSession(data);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to beat your best score.">
      <form onSubmit={signIn} className="space-y-5">
        <Field label="Email address" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" required />
        <Field label="Password" type="password" value={form.pass} onChange={set("pass")} placeholder="Your password" autoComplete="current-password" required />
        <ErrorBox>{error}</ErrorBox>
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>
      <p className="mt-8 text-center text-gray-500 text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
