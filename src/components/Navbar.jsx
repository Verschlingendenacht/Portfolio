import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { content } = useLanguage();
    const { navbar } = content;
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];

            // Find the section that is currently most visible on screen
            // or the one that has just passed the top of the viewport
            let current = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is within the top third of the viewport
                    // or if the bottom is still in view
                    if (rect.top <= window.innerHeight / 3) {
                        current = section;
                    }
                }
            }

            // Special case: if at the very bottom of page, highlight contact
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
            // Optional: update URL hash without jumping
            window.history.pushState(null, '', `#${targetId}`);
        }
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>{navbar.logo}</div>
            <ul style={styles.links}>
                <li>
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, 'hero')}
                        style={{ ...styles.link, ...(activeSection === 'hero' ? styles.activeLink : {}) }}
                    >
                        {navbar.home}
                    </a>
                </li>
                <li>
                    <a
                        href="#about"
                        onClick={(e) => handleNavClick(e, 'about')}
                        style={{ ...styles.link, ...(activeSection === 'about' ? styles.activeLink : {}) }}
                    >
                        {navbar.about}
                    </a>
                </li>
                <li>
                    <a
                        href="#skills"
                        onClick={(e) => handleNavClick(e, 'skills')}
                        style={{ ...styles.link, ...(activeSection === 'skills' ? styles.activeLink : {}) }}
                    >
                        {navbar.skills}
                    </a>
                </li>
                <li>
                    <a
                        href="#education"
                        onClick={(e) => handleNavClick(e, 'education')}
                        style={{ ...styles.link, ...(activeSection === 'education' ? styles.activeLink : {}) }}
                    >
                        {navbar.education}
                    </a>
                </li>
                <li>
                    <a
                        href="#projects"
                        onClick={(e) => handleNavClick(e, 'projects')}
                        style={{ ...styles.link, ...(activeSection === 'projects' ? styles.activeLink : {}) }}
                    >
                        {navbar.projects}
                    </a>
                </li>
                <li>
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, 'contact')}
                        style={{ ...styles.link, ...(activeSection === 'contact' ? styles.activeLink : {}) }}
                    >
                        {navbar.contact}
                    </a>
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
    },
    activeLink: {
        color: '#646cff',
        textShadow: '0 0 10px rgba(100, 108, 255, 0.5)',
        fontWeight: 'bold',
    }
};

export default Navbar;
