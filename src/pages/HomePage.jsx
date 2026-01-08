import AboutSection from '../components/homeSecs/AboutSec'
import ContactSection from '../components/homeSecs/ContactSection'
import Hero from '../components/homeSecs/Hero'
import  HomeSlider  from '../components/homeSecs/HomeSlider'
import HorizontalScrollBar from '../components/homeSecs/HorizontalScrollBar'

export default function HomePage() {
    return (
        <div className=''>
            <Hero/>
            <HomeSlider/>
            <HorizontalScrollBar/>
            <AboutSection/>
            <ContactSection/>
        </div>
    )
}
