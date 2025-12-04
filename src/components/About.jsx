import { useLanguage } from '../context/LanguageContext';
import FocusCard from './FocusCard';

const About = () => {
    const { content } = useLanguage();
    const { about } = content;
    return (
        <section id="about" style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>{about.title}</h2>
                <FocusCard style={styles.card}>
                    <p style={styles.text}>{about.description}</p>
                </FocusCard>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '2rem 2rem',
        color: '#fff',
        margin: '0 auto',
        maxWidth: '1200px',
    },
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Add shadow since it's outside the card now
    },
    card: {
        // Glassmorphism styles moved here
        backgroundColor: 'rgba(42, 42, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: '#ddd',
    }
};

export default About;
