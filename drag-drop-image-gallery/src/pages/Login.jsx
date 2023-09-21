import React, { useState } from "react";
import logo from "../assets/logo.svg";
import user from "../assets/user.svg";
import lock from "../assets/lock.svg";
import spinner from "../assets/spinner1.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is now logged in.
      // Redirect to the app's main page or perform any other necessary actions.
      navigate("/gallery");
    } catch (error) {
      setError("Wrong email/password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg h-[100vh] w-full flex justify-center items-center">
      <form onSubmit={handleLogin} className="w-[300px]" action="">
        <div className="w-[120px] mx-auto">
          <img src={logo} alt="" />
        </div>
        <div className="border-[2px] rounded relative mt-4">
          <label htmlFor="email"></label>
          <span className="absolute top-3 left-3">
            <img src={user} alt="" />
          </span>
          <input
            className="bg-transparent outline-none border-none h-[45px] w-[300px] text-white indent-[48px] font-dmsans"
            placeholder="johndoe@example.com"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="border-[2px] rounded relative mt-4">
          <label htmlFor="password"></label>
          <span className="absolute top-3 left-3">
            <img src={lock} alt="" />
          </span>
          <input
            className="bg-transparent outline-none border-none h-[45px] w-[300px] text-white indent-[48px] font-dmsans"
            placeholder="********"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && (
          <p className="text-[14px] text-red-200 mt-1 font-dmsans">{error}</p>
        )}
        <button
          disabled={submitting}
          className="font-dmsans uppercase text-blue bg-white rounded h-[45px] w-[300px] font-[500] mt-4 flex justify-center items-center"
        >
          {submitting ? <img src={spinner} alt="" /> : "login"}
        </button>
      </form>
    </main>
  );
};

export default Login;
