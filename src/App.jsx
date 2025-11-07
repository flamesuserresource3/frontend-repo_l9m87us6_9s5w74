import GalaxyHero from './components/GalaxyHero';
import ConstellationAbout from './components/ConstellationAbout';
import SolarEvents from './components/SolarEvents';
import NebulaGallery from './components/NebulaGallery';

export default function App() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <GalaxyHero />
      <ConstellationAbout />
      <SolarEvents />
      <NebulaGallery />
    </div>
  );
}
