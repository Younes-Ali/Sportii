import HeroAbout from "../components/aboutSecs/HeroAbout";
import Story from "../components/aboutSecs/Story";
import Team from "../components/aboutSecs/Team";
import Values from "../components/aboutSecs/Values";


export default function About() {

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Hero Section */}
      <HeroAbout />
      {/* Our Story Section */}
      <Story />

      {/* Our Values Section */}
      <Values />
      {/* Our Team Section */}
      <Team />
    </div>
  );
}