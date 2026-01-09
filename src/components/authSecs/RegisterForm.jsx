import React from 'react'
import InputField from './InputField';
import Button from './Button';

export default function RegisterForm({ formik, onToggle }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        };
    
        return (
        <div className="bg-black px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 flex flex-col justify-center rounded-2xl lg:rounded-r-none lg:rounded-l-2xl shadow-2xl shadow-yellow-500/30 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-yellow-500 animate-pulse">
            Register
            </h1>
            
            <div className="flex flex-col gap-4 sm:gap-5">
            <InputField
                name="username"
                type="text"
                placeholder="Your Username *"
                formik={formik}
            />
    
            <InputField
                name="email"
                type="email"
                placeholder="Your Email *"
                formik={formik}
            />
    
            <InputField
                name="password"
                type="password"
                placeholder="Your Password *"
                formik={formik}
            />
    
            <InputField
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password *"
                formik={formik}
            />
    
            <Button onClick={handleSubmit} variant="primary">
                Register
            </Button>
            </div>
    
            <div className="mt-6 sm:mt-8 space-y-3">
            <p className="text-white text-center sm:text-left">Already have an account?</p>
            <Button onClick={onToggle} variant="outline">
                Sign In
            </Button>
            </div>
        </div>
        );
}
