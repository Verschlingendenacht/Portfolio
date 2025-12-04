import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CursorFollower from './components/CursorFollower';
import ClickEffect from './components/ClickEffect';
import ScrollReveal from './components/ScrollReveal';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';

function App() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LanguageProvider>
            <div className="app">
                <ScrollProgress />
                <ClickEffect />
                <CursorFollower />
                <ParticleBackground />
                <Navbar />
                <Hero />
                <ScrollReveal><About /></ScrollReveal>
                <ScrollReveal><Skills /></ScrollReveal>
                <ScrollReveal><Education /></ScrollReveal>
                <ScrollReveal><Projects /></ScrollReveal>
                <ScrollReveal><Contact /></ScrollReveal>
                <Footer />
                <LanguageToggle />
                <BackToTop />
            </div>
        </LanguageProvider>
    );
}

export default App;
