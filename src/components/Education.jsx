import { useLanguage } from '../context/LanguageContext';
import TiltCard from './TiltCard';
import FocusCard from './FocusCard';

const Education = () => {
    const { content } = useLanguage();
    const { education } = content;

    return (
        <section id="education" style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>{education.title}</h2>
                <FocusCard style={styles.card}>
                    <div style={styles.grid}>
                        {education.items.map((item, index) => (
                            <TiltCard key={index} style={styles.cardItem}>
                                <h3 style={styles.degree}>{item.degree}</h3>
                                <h4 style={styles.institution}>{item.institution}</h4>
                                <span style={styles.period}>{item.period}</span>
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    cardItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'transform 0.2s ease',
    },
    degree: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
        color: '#fff',
    },
    institution: {
        fontSize: '1.2rem',
        color: '#aaa',
        marginBottom: '1rem',
        fontWeight: 'normal',
    },
    period: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        backgroundColor: 'rgba(100, 108, 255, 0.2)',
        color: '#646cff',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    }
};

export default Education;
