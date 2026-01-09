import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import registerImg from "../assets/imges/register.jpg";
import signInImg from "../assets/imges/sign.jpg";
import ImageSection from "../components/authSecs/ImageSection";
import SignInForm from "../components/authSecs/SignInForm";
import RegisterForm from "../components/authSecs/RegisterForm";


export default function AuthPages() {
  const [isSignIn, setIsSignIn] = useState(true);

  const signInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
          "Password must contain uppercase, lowercase, number and special character"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Sign In:", values);
      alert("Welcome back!");
      resetForm();
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
          "Password must contain uppercase, lowercase, number and special character"
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Register:", values);
      alert("Account created successfully!");
      resetForm();
    },
  });

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    signInFormik.resetForm();
    registerFormik.resetForm();
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center p-4">
      <div className="w-full max-w-6xl h-[600px] relative">
        {/* Sign In Section */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            isSignIn
              ? "translate-x-0 opacity-100 scale-100"
              : "-translate-x-full opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full shadow-2xl shadow-yellow-500/30 rounded-2xl ">
            <ImageSection
              imageUrl={signInImg}
              side="left"
            />
            <SignInForm formik={signInFormik} onToggle={toggleForm} />
          </div>
        </div>

        {/* Register Section */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            !isSignIn
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full shadow-2xl shadow-yellow-500/30 ">
            <RegisterForm formik={registerFormik} onToggle={toggleForm} />
            <ImageSection
              imageUrl={registerImg}
              side="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}