import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

import AuthImagePattern from "../skeletons/AuthImagePattern";
import toast from 'react-hot-toast';
import FormUser from "../skeletons/FormUser";


const LogInPage = () => {
  const [showPassword, setShowPassword] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { LogIn, isLoggingIng } = useAuthStore();
  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) return toast.error("email is required");
    if (!emailRegex.test(formData.email)) return toast.error("email is invalid");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.trim().length < 8) return toast.error("Minimum length is 8 characters");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      LogIn(formData);
    }
  }

  const props = {
    handleSubmit,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    statUser: isLoggingIng,
     mode:"login"
  };
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <FormUser {...props} />
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  );
};

export default LogInPage;
