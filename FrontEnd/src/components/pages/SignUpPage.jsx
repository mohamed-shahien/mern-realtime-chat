import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

import AuthImagePattern from "../skeletons/AuthImagePattern";
import toast from 'react-hot-toast';
import FormUser from "../skeletons/FormUser";


const SignUpPage = () => {
  const [ showPassword, setShowPassword ] = useState();
  const [ formData, setFormData ] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSigninUp } = useAuthStore();
  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!emailRegex.test(formData.email)) return toast.error("email is invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.trim().length < 8) return toast.error("Minimum length is 8 characters");
    return true;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      signUp(formData);
    }
  }
  const props = {
    handleSubmit,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    statUser: isSigninUp,
    mode: "signup"
  };
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    <FormUser  {...props}/>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  );
};

export default SignUpPage;
