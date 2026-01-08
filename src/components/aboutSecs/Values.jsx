import { useEffect } from "react";
export default function Values() {
    const values = [
    {
        title: "Performance",
        description:
        "We focus on delivering effective training experiences that drive real, measurable results.",
    },
    {
        title: "Consistency",
        description:
        "Sustainable progress comes from discipline, smart routines, and long-term commitment.",
    },
    {
        title: "Innovation",
        description:
        "We leverage modern technology to build smarter training tools and better fitness solutions.",
    },
    {
        title: "Integrity",
        description:
        "Transparency, honesty, and respect guide how we support our users and partners.",
    },
];


    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);

    return (
        <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2
            className="text-4xl text-yellow md:text-5xl font-bold tracking-wider mb-16 text-center uppercase wow animate__animated animate__fadeInDown"
            data-wow-duration="1s"
            >
            Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
                <div
                key={index}
                className="p-8 bg-black border border-gray-200 hover:border-gray-400 transition-colors duration-300 wow animate__animated animate__fadeInUp"
                data-wow-delay={`${index * 0.2}s`}
                data-wow-duration="0.8s"
                >
                <h3 className="text-2xl text-white font-semibold mb-4 uppercase tracking-wider">
                    {value.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                    {value.description}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
