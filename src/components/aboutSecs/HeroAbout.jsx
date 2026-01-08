import { useEffect } from "react";
import aboutImg from "../../assets/imges/about/aboutImg.jpg";

export default function HeroAbout() {
    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);
    return (
        <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-5 bg-gray-50">
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${aboutImg})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10">
            <h1
            className="text-5xl md:text-7xl text-yellow lg:text-8xl font-bold tracking-widest mb-5 uppercase animate__animated animate__fadeInDown"
            data-wow-duration="1.2s"
            data-wow-delay="0.2s"
            >
            About Us
            </h1>
            <p
            className="text-base text-white md:text-xl lg:text-2xl font-bold italic max-w-2xl text-creamy wow animate__animated animate__fadeInUp"
            data-wow-duration="1.12s"
            data-wow-delay="0.4s"
            >
            Empowering active lifestyles with purpose and passion
            </p>
        </div>
        </section>
    );
}
