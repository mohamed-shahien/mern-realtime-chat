import React from 'react'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
const FormUser = ({
        handleSubmit,
        showPassword,
        setShowPassword,
        formData,
        setFormData,
        statUser,
        mode // NEW: either "signup" or "login"
}) => {
        const isSignUp = mode === "signup";

        return (
                <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                        <div className="w-full max-w-md space-y-8">
                                <div className="text-center mb-8">
                                        <div className="flex items-center flex-col group gap-2">
                                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                        <MessageSquare className="size-6 text-primary" />
                                                </div>
                                                <h1 className="text-2xl font-bold mt-2">
                                                        {isSignUp ? "Create Account" : "Sign In"}
                                                </h1>
                                                <p className="text-base-content/60">
                                                        {isSignUp
                                                                ? "Enter your details to create account"
                                                                : "Enter your details to sign in"}
                                                </p>
                                        </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                        {isSignUp && (
                                                <div className="form-control">
                                                        <label className="label">
                                                                <span className="label-text font-medium">Full Name</span>
                                                        </label>
                                                        <div className="relative">
                                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-2">
                                                                        <User className="size-5 text-base-content/40" />
                                                                </div>
                                                                <input
                                                                        type="text"
                                                                        className="input input-bordered w-full pl-10"
                                                                        placeholder="John Doe"
                                                                        value={formData.fullName}
                                                                        onChange={(e) =>
                                                                                setFormData({ ...formData, fullName: e.target.value })
                                                                        }
                                                                />
                                                        </div>
                                                </div>
                                        )}

                                        {/* Email Field */}
                                        <div className="form-control">
                                                <label className="label">
                                                        <span className="label-text font-medium">Email</span>
                                                </label>
                                                <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-2">
                                                                <Mail className="size-5 text-base-content/40" />
                                                        </div>
                                                        <input
                                                                type="email"
                                                                className="input input-bordered w-full pl-10"
                                                                placeholder="you@example.com"
                                                                value={formData.email}
                                                                onChange={(e) =>
                                                                        setFormData({ ...formData, email: e.target.value })
                                                                }
                                                        />
                                                </div>
                                        </div>

                                        {/* Password Field */}
                                        <div className="form-control">
                                                <label className="label">
                                                        <span className="label-text font-medium">Password</span>
                                                </label>
                                                <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-2">
                                                                <Lock className="size-5 text-base-content/40" />
                                                        </div>
                                                        <input
                                                                type={showPassword ? "text" : "password"}
                                                                className="input input-bordered w-full pl-10"
                                                                placeholder="••••••••"
                                                                value={formData.password}
                                                                onChange={(e) =>
                                                                        setFormData({ ...formData, password: e.target.value })
                                                                }
                                                        />
                                                        <button
                                                                type="button"
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-1"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                                {showPassword ? (
                                                                        <EyeOff className="size-5 text-base-content/40" />
                                                                ) : (
                                                                        <Eye className="size-5 text-base-content/40" />
                                                                )}
                                                        </button>
                                                </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button className="btn w-full btn-primary" type="submit" disabled={statUser}>
                                                {statUser ? (
                                                        <>
                                                                <Loader2 className="size-5 animate-spin" />
                                                                Loading...
                                                        </>
                                                ) : isSignUp ? "Create Account" : "Sign In"}
                                        </button>
                                </form>

                                {/* Link to Switch Auth Page */}
                                <div className="text-center">
                                        <p className="text-base-content/60">
                                                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                                                <Link to={isSignUp ? "/login" : "/signup"} className="link link-primary">
                                                        {isSignUp ? "Sign in" : "Sign up"}
                                                </Link>
                                        </p>
                                </div>
                        </div>
                </div>
        );
};

export default FormUser;
