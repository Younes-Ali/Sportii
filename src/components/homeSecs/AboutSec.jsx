import { useEffect } from "react";

export default function AboutSection() {
    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);

    return (
        <section className="py-24 px-5 bg-main">
        <div
            className="max-w-4xl mx-auto text-center wow animate__animated animate__fadeInUp font-bold"
            data-wow-duration="1s"
        >
            <h2 className="text-yellow text-4xl md:text-5xl lg:text-6xl tracking-wider mb-8 uppercase">
            About Our App
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-white italic">
            We are a modern sports and fitness platform dedicated to helping
            individuals unlock their full physical potential. Our app combines
            smart training programs, performance tracking, and motivational tools
            to support an active and healthy lifestyle. Designed with both
            beginners and athletes in mind, we focus on efficiency, consistency,
            and progress. Every feature is built to inspire movement, discipline,
            and long-term well-being through technology-driven fitness
            experiences.
            </p>
        </div>
        </section>
    );
}
