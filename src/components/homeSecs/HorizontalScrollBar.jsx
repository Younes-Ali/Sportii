import img1 from '../../assets/imges/companies/apple.svg'
import img2 from '../../assets/imges/companies/figma.svg'
import img3 from '../../assets/imges/companies/microsoft.svg'
import img4 from '../../assets/imges/companies/netflix.svg'
import img5 from '../../assets/imges/companies/nike.svg'
import img6 from '../../assets/imges/companies/react.svg'

import img7 from '../../assets/imges/companies/adidas.svg'
import img8 from '../../assets/imges/companies/bmw.svg'
import img9 from '../../assets/imges/companies/paypal.svg'
import img10 from '../../assets/imges/companies/puma.svg'
import img11 from '../../assets/imges/companies/fila.svg'
import img12 from '../../assets/imges/companies/dolce-gabbana.svg'

//Data
const sponsers = [
    { id: 1, img: img1, text: 'Apple',},
    { id: 2, img: img2, text: 'Figma',},
    { id: 3, img: img3, text: 'Microsoft',},
    { id: 4, img: img4, text: 'Netflix',},
    { id: 5, img: img5, text: 'Nike',},
    { id: 6, img: img6, text: 'React.js',},
];
const partners = [
    { id: 1, img: img11, text: 'Fila',},
    { id: 2, img: img7, text: 'Adidas',},
    { id: 3, img: img8, text: 'BMW',},
    { id: 4, img: img9, text: 'Paypal',},
    { id: 5, img: img10, text: 'Puma',},
    { id: 6, img: img12, text: 'Dolce & Gabbana',},
];


export default function HorizontalScrollBar  ()  {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 roun">
        <div className="w-full space-y-8">
            <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">
                Our Sponseres
            </h1>
            </div>

            <div className="w-full overflow-hidden bg-yellow rounded-lg border border-gray-700 py-4">
            <style>
                {`
                @keyframes scroll-infinite {
                    0% {
                    transform: translateX(0);
                    }
                    100% {
                    transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll-infinite 45s linear infinite;
                    width: max-content;
                    will-change: transform;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>
            
            <div className="flex animate-scroll">
                {[...sponsers, ...sponsers, ...sponsers, ...sponsers, ...sponsers, ...sponsers].map((item, index) => (
                <div
                    key={`${item.id}-${index}`}
                    className={`
                    shrink-0 
                    bg-white
                    text-black 
                    px-8 
                    py-6 
                    mx-4 
                    rounded-lg 
                    font-semibold 
                    text-lg 
                    shadow-lg 
                    hover:scale-105 
                    transition-transform 
                    duration-300
                    `}
                >
                    <div className='w-full'>
                        <img src={item.img} alt={item.text} className="w-12 h-12 mb-2 mx-auto" />
                    </div>
                    <p>{item.text}</p>
                </div>
                ))}
            </div>
            </div>
            <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
                Our Partners
            </h1>
            </div>
            <div className="overflow-hidden bg-yellow rounded-lg border border-gray-700 py-4">
            <style>
                {`
                @keyframes scroll-reverse {
                    0% {
                    transform: translateX(-50%);
                    }
                    100% {
                    transform: translateX(0);
                    }
                }
                
                .animate-scroll-reverse {
                    animation: scroll-reverse 45s linear infinite;
                    width: max-content;
                    will-change: transform;
                }
                
                .animate-scroll-reverse:hover {
                    animation-play-state: paused;
                }
                `}
            </style>
            
            <div className="flex animate-scroll-reverse">
                {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners,].map((item, index) => (
                <div
                    key={`${item.id}-${index}`}
                    className={`
                    shrink-0 
                    bg-white
                    text-black 
                    px-8 
                    py-6 
                    mx-4 
                    rounded-lg 
                    font-semibold 
                    text-lg 
                    shadow-lg 
                    hover:scale-105 
                    transition-transform 
                    duration-300
                    `}
                >
                    <div className='w-full'>
                        <img src={item.img} alt={item.text} className="w-12 h-12 mb-2 mx-auto" />
                    </div>
                    <p>{item.text}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

