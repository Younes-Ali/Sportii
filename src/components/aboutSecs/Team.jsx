import { useEffect } from "react";
import img1 from "../../assets/imges/pepole/person1.jpg";
import img2 from "../../assets/imges/pepole/person2.jpg";
import img3 from "../../assets/imges/pepole/person3.jpg";
import img4 from "../../assets/imges/pepole/person4.jpg";

export default function Team() {
    const team = [
        { name: "Younes Ali", role: "Trainer", photo: img1 },
        { name: "Mostafa Ali", role: "Head Designer", photo: img2 },
        { name: "Yasser Maher", role: "Sustainability Manager", photo: img3 },
        { name: "Abo Treka", role: "Production Lead", photo: img4 },
    ];

    useEffect(() => {
        import("wowjs").then((module) => {
        const WOW = module.default || module.WOW;
        new WOW.WOW({ live: false }).init();
        });
    }, []);
    return (
        <section className="py-24 px-5 bg-black">
        <div className="max-w-6xl mx-auto">
            <h2
            className="text-4xl text-white md:text-5xl font-bold tracking-wider mb-16 text-center uppercase wow animate__animated animate__fadeInDown"
            data-wow-duration="1s"
            >
            Meet The Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
                <div
                key={index}
                className="text-center bg-yellow p-2 rounded-3xl wow animate__animated animate__zoomIn"
                data-wow-delay={`${index * 0.15}s`}
                data-wow-duration="0.8s"
                >
                <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden ">
                    <img className="w-full object-cover" src={member.photo} alt={member.name} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-900 uppercase text-sm tracking-wider">
                    {member.role}
                </p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
