import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';

const Navbar = () => {
    const { content } = useLanguage();
    const { navbar } = content;
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];

            let current = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3) {
                        current = section;
                    }
                }
            }

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                current = 'contact';
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${targetId}`);
        }
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>{navbar.logo}</div>
            <ul style={styles.links}>
                <li>
                    <MagneticButton>
                        <a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, 'hero')}
                            style={{ ...styles.link, ...(activeSection === 'hero' ? styles.activeLink : {}) }}
                        >
                            {navbar.home}
                        </a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a
                            href="#about"
                            onClick={(e) => handleNavClick(e, 'about')}
                            style={{ ...styles.link, ...(activeSection === 'about' ? styles.activeLink : {}) }}
                        >
                            {navbar.about}
                        </a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a
                            href="#skills"
                            onClick={(e) => handleNavClick(e, 'skills')}
                            style={{ ...styles.link, ...(activeSection === 'skills' ? styles.activeLink : {}) }}
                        >
                            {navbar.skills}
                        </a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a
                            href="#education"
                            onClick={(e) => handleNavClick(e, 'education')}
                            style={{ ...styles.link, ...(activeSection === 'education' ? styles.activeLink : {}) }}
                        >
                            {navbar.education}
                        </a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a
                            href="#projects"
                            onClick={(e) => handleNavClick(e, 'projects')}
                            style={{ ...styles.link, ...(activeSection === 'projects' ? styles.activeLink : {}) }}
                        >
                            {navbar.projects}
                        </a>
                    </MagneticButton>
                </li>
                <li>
                    <MagneticButton>
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'contact')}
                            style={{ ...styles.link, ...(activeSection === 'contact' ? styles.activeLink : {}) }}
                        >
                            {navbar.contact}
                        </a>
                    </MagneticButton>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'rgba(51, 51, 51, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 10000,
        animation: 'slide-down 0.8s ease-out',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    links: {
        display: 'flex',
        listStyle: 'none',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
        position: 'relative',
        display: 'block', // Ensure block for magnetic effect
        padding: '0.5rem', // Add padding for hit area
    },
    activeLink: {
        color: '#646cff',
        textShadow: '0 0 10px rgba(100, 108, 255, 0.5)',
        fontWeight: 'bold',
    }
};

export default Navbar;
