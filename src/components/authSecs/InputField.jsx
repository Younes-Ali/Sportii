import React from 'react'

export default function InputField({ name, type = "text", placeholder, formik }) {
    return (
        <div>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            {...formik.getFieldProps(name)}
            className="w-full bg-white border border-gray-900 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
        />
        {formik.touched[name] && formik.errors[name] ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
        ) : null}
        </div>
    )
}
