import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';
import FocusCard from './FocusCard';

const Skills = () => {
    const { content } = useLanguage();
    const { skills } = content;
    return (
        <section id="skills" style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>{skills.title}</h2>
                <FocusCard style={styles.card}>
                    <div style={styles.grid}>
                        {skills.items.map((skill, index) => (
                            <TiltCard key={index} style={styles.skillCard}>
                                {skill}
                            </TiltCard>
                        ))}
                    </div>
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
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    card: {
        // Glassmorphism styles moved here
        backgroundColor: 'rgba(36, 36, 36, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
    },
    skillCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter glass for cards
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1.1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(5px)',
    }
};

export default Skills;
