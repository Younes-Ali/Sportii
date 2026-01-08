import FormConact from "../components/contactSecs/FormConact";
import HeroContact from "../components/contactSecs/HeroContact";


export default function Contact() {


  return (
    <div className="font-sans text-gray-900 bg-white">

      {/* Hero */}
      <HeroContact />

      {/* Content */}
      <FormConact />
    </div>
  );
}
