import React from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };
    setLoading(true);
    setError(null);
    try {
      let res = await fetch("/api/auth/signin", {
        // Correct endpoint for sign-in
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let resp = await res.json();
      console.log(resp, resp.success, resp.message);
      if (resp.success) {
        navigate("/");
      } else {
        setError(resp.message);
      }
      console.log(resp);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          ref={email}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          ref={password}
          className="border p-3 rounded-lg"
        />

        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
