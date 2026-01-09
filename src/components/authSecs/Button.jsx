

export default function Button({ onClick, type = "button", variant = "primary", children, className = "" }) {
    const baseStyles = "w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105";
    const variants = {
        primary: "bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg hover:shadow-yellow-500/50",
        outline: "bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
    };

    return (
        <button
        onClick={onClick}
        type={type}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        >
        {children}
        </button>
    );
}
