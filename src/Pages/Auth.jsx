import React, { useState } from "react";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { googleLoginAPI, loginAPI, registerAPI } from "../services/allAPI";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function Auth({ register }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (username && email && password) {
      try {
        const result = await registerAPI(userDetails);
        // console.log(result);
        if (result.status == 200) {
          alert("Successfully registered");
          setUserDetails({ username: "", email: "", password: "" });
          navigate('/login');
        }
        else {
          alert("Something went wrong")
          setUserDetails({ username: "", email: "", password: "" });
        }
      }
      catch (err) {
        alert("Error")
        console.log(err);
      }
    }
  }

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (email && password) {
      const result = await loginAPI(userDetails)
      // console.log(result);
      if (result.status == 200) {
        alert("User logined")
        sessionStorage.setItem("token", result.data.token)
        sessionStorage.setItem("user", JSON.stringify(result.data.user))
        setUserDetails({ email: "", password: "" })
        if (result.data.role == "admin") {
          navigate('/admin/home')
        }
        else {
          navigate('/home')
        }
      }
      else if (result.status == 401 || result.status == 404) {
        alert(result.response.data)
        setUserDetails({ email: "", password: "" })
      }
      else {
        alert("Something went wrong");
        console.log(result);
      }
    }
    else {
      alert("Please fill the form");
    }
  }

  // google login
  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential)
    console.log(decode.email, decode.name, decode.picture);
    const result = await googleLoginAPI({ email: decode.email, password: 'googlepassword', username: decode.name, image : decode.picture })
    if (result.status == 200) {
      alert("User logined with google")
      sessionStorage.setItem("token", result.data.token);
      sessionStorage.setItem("user", JSON.stringify(result.data.user));
      setTimeout(() => {
        if (result.data.role == "admin") {
          navigate('/admin/home')
        }
        else {
          navigate('/home')
        }
      }, 2000)
    }
    else {
      alert("Something went wrong");
      console.log(result);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto bg-gray-900 text-white flex items-center justify-center rounded-full mb-4">
            <FaUserAlt />
          </div>

          <h2 className="text-2xl font-semibold">
            {register ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {register ? "Register to continue" : "Login to continue"}
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5">

          {/* Username (register only) */}
          {register && (
            <div className="relative">
              <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={userDetails.username}
                onChange={e =>
                  setUserDetails({
                    ...userDetails,
                    username: e.target.value,
                  })
                }
                className="w-full pl-10 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={e =>
                setUserDetails({
                  ...userDetails,
                  email: e.target.value,
                })
              }
              className="w-full pl-10 py-2 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userDetails.password}
              onChange={e =>
                setUserDetails({
                  ...userDetails,
                  password: e.target.value,
                })
              }
              className="w-full pl-10 pr-10 py-2 border rounded-lg"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={register ? handleRegister : handleLogin}
            className="w-full bg-gray-900 text-white py-2 rounded-lg"
          >
            {register ? "Register" : "Login"}
          </button>

          {/* GOOGLE OAUTH */}
          {register && <div className="flex items-center gap-2 justify-center">
            <GoogleLogin
              onSuccess={credentialResponse => {
                handleGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>}

          {/* SWITCH */}
          <p className="text-center text-sm">
            {register ? (
              <>
                Already have account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </>
            ) : (
              <>
                New user?{" "}
                <Link to="/" className="text-blue-600">
                  Register
                </Link>
              </>
            )}
          </p>

        </form>
      </div>
    </div>
  );
}

export default Auth;