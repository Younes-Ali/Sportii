

export default function ImageSection({ imageUrl, side }) {
    return (
        <div className={`hidden lg:block relative overflow-hidden ${
        side === "left" ? "rounded-l-2xl" : "rounded-r-2xl"
        } shadow-2xl ${side === "left" ? "" : "order-1 lg:order-2"}`}>
        <div
            className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-1000"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className={`absolute inset-0 bg-gradient-to-${
            side === "left" ? "r" : "l"
            } from-yellow-500/20 to-transparent`}></div>
        </div>
        </div>
    )
}
