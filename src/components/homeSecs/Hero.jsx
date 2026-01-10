import { ImPower } from "react-icons/im";
import heroImg from '../../assets/imges/HeroSec.jpg';
import { useEffect } from "react";
export default function Hero() {
    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);
    return (
        <div className={ `w-full h-screen bg-cover bg-center text-white bg-black mb-20`} style={{ backgroundImage: `url(${heroImg})` }}>
            <div className="w-full h-full bg-black/20 md:bg-black/80 md:hover:bg-black/50 ">
                <div className="w-full lg:w-[60%] flex flex-col gap-20 md:p-[100px] h-full justify-center items-center md:justify-start md:items-start">
                    <h1 
                    className="text-5xl md:text-7xl font-bold text-yellow p-4 md:p-0 wow animate__animated animate__backInLeft"
                    data-wow-delay="0.2s" 
                    data-wow-duration="1s"
                    >
                        It is Time for Start <ImPower className="inline" />
                    </h1>
                    <p 
                    className="w-full lg:w-[70%] text-md md:text-2xl font-bold italic p-4 md:p-0 wow animate__animated animate__fadeInLeft"
                    data-wow-delay="0.5s" 
                    data-wow-duration="1s"
                    >
                        “Where passion for sports meets cutting-edge technology — empowering athletes.
                    </p>
                </div>
            </div>
        </div>
    )
}
