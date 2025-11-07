import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import AfterglowSection from './components/AfterglowSection';

export default function App() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <AfterglowSection />
    </div>
  );
}
