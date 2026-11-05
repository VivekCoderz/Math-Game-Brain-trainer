import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, errorMessage, saveSession } from "../lib/api";
import { AuthLayout, Field, ErrorBox, SubmitButton } from "./AuthLayout";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", pass: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const createUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/user/signup", form);
      saveSession(data); // signed in straight away, no second login needed
      navigate("/home", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Join Bubble Brain" subtitle="Pop math bubbles, climb the leaderboard.">
      <form onSubmit={createUser} className="space-y-5">
        <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" autoComplete="name" required maxLength={40} />
        <Field label="Email address" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" required />
        <Field label="Password" type="password" value={form.pass} onChange={set("pass")} placeholder="At least 6 characters" autoComplete="new-password" required minLength={6} />
        <ErrorBox>{error}</ErrorBox>
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
      <p className="mt-8 text-center text-gray-500 text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
