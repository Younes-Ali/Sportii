import { useEffect } from "react";

export default function Story() {
    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);

    return (
        <section className="py-24 px-5 bg-black">
        <div
            className="max-w-4xl mx-auto wow animate__animated animate__fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
        >
            <h2 className="text-4xl text-yellow md:text-5xl font-bold tracking-wider mb-8 text-center uppercase">
            Our Story
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white font-light">
            <p>
                Founded in 2015, our journey began with a simple vision: to redefine
                how people train and stay active. What started as a small idea has
                grown into a trusted sports platform used by athletes and fitness
                enthusiasts worldwide—while our core values of integrity,
                innovation, and excellence remain unchanged.
            </p>
            <p>
                Every feature we build reflects our dedication to quality and
                precision. From workout planning to performance tracking, we put
                care and expertise into creating tools that not only look great but
                deliver real results. Our experience is crafted for individuals who
                value progress, discipline, and uncompromising standards.
            </p>
            <p>
                We believe fitness should be sustainable, ethical, and accessible to
                everyone. That’s why we design our platform to promote healthy
                habits, long-term progress, and responsible training practices. Our
                mission is to positively impact both our users’ performance and
                their overall well-being.
            </p>
            </div>
        </div>
        </section>
    );
}
