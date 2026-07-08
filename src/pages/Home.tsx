import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { TechStack } from '../components/TechStack';
import { Certifications } from '../components/Certifications';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <TechStack />
      <Certifications />
      <Footer />
    </main>
  );
};
