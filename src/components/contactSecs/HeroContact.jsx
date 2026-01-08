import { useEffect } from 'react';
export default function HeroContact() {
  useEffect(() => {
    import("wowjs").then((module) => {
      const WOW = module.default || module.WOW;
      new WOW.WOW({ live: false }).init();
    });
  }, []);
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-5 bg-yellow">
        <h1 className="wow animate__animated animate__fadeInUp text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest mb-5 uppercase"
          data-wow-duration="1.2s"
          data-wow-delay="0.2s"
        >
          Contact Us
        </h1>
        <p className="wow animate__animated animate__fadeInUp animate__delay-1s text-base md:text-xl max-w-2xl text-gray-900">
          We'd love to hear from you. Get in touch with us today.
        </p>
      </section>
  )
}
