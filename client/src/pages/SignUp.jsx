import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    setData(formData);
    setLoading(true); // Set loading to true before making the request
    setError(null);
    try {
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let resp = await res.json();
      navigate("/signin");
      console.log(resp);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          ref={name}
          className="border p-3 rounded-lg"
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
