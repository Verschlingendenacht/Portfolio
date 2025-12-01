import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

const Projects = () => {
    const { content } = useLanguage();
    const { projects } = content;
    const { projects: repoData, loading, error } = useGitHubProjects(projects.items);
    const [searchTerm, setSearchTerm] = useState('');
    const scrollContainerRef = useRef(null);

    const filteredProjects = repoData.filter(repo => {
        const term = searchTerm.toLowerCase();
        const nameMatch = repo.name.toLowerCase().includes(term);
        const langMatch = repo.languages && repo.languages.some(lang => lang.toLowerCase().includes(term));
        const mainLangMatch = repo.language && repo.language.toLowerCase().includes(term);
        return nameMatch || langMatch || mainLangMatch;
    });

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 350; // Approx card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="projects" style={styles.section}>
            <div style={styles.container}>
                <h2 style={styles.heading}>{projects.title}</h2>

                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder={projects.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                {loading && <p style={styles.loading}>Loading projects...</p>}
                {error && <p style={styles.error}>Error loading projects: {error}</p>}

                {!loading && !error && filteredProjects.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>{searchTerm ? "No matching projects found." : projects.emptyState}</p>
                    </div>
                ) : (
                    <div style={styles.carouselWrapper}>
                        {filteredProjects.length > 3 && (
                            <button onClick={() => scroll('left')} style={{ ...styles.arrow, ...styles.arrowLeft }} aria-label="Scroll Left">
                                &#10094;
                            </button>
                        )}

                        <div style={styles.carousel} ref={scrollContainerRef}>
                            {filteredProjects.map((repo) => (
                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.cardLink}
                                >
                                    <div style={styles.card}>
                                        <h3 style={styles.projectTitle}>{repo.name}</h3>
                                        <p style={styles.projectDesc}>{repo.description}</p>

                                        <div style={styles.stats}>
                                            <span style={styles.statItem}>⭐ {repo.stargazers_count}</span>
                                            <span style={styles.statItem}>🍴 {repo.forks_count}</span>
                                            <span style={styles.statItem}>🐛 {repo.open_issues_count}</span>
                                        </div>

                                        <div style={styles.meta}>
                                            <span style={styles.language}>
                                                {repo.languages && repo.languages.length > 0
                                                    ? repo.languages.join(', ')
                                                    : repo.language}
                                            </span>
                                            <span style={styles.date}>{new Date(repo.updated_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {filteredProjects.length > 3 && (
                            <button onClick={() => scroll('right')} style={{ ...styles.arrow, ...styles.arrowRight }} aria-label="Scroll Right">
                                &#10095;
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '4rem 2rem',
        // Glassmorphism styles
        backgroundColor: 'rgba(42, 42, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        margin: '2rem auto',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '1200px',
    },
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
    },
    searchContainer: {
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
    },
    searchInput: {
        width: '100%',
        maxWidth: '500px',
        padding: '1rem 1.5rem',
        borderRadius: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        fontSize: '1rem',
        outline: 'none',
        backdropFilter: 'blur(5px)',
        transition: 'background-color 0.3s, box-shadow 0.3s',
    },
    loading: {
        color: '#aaa',
        fontSize: '1.2rem',
    },
    error: {
        color: '#ff6b6b',
        fontSize: '1.2rem',
    },
    emptyState: {
        padding: '3rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        fontSize: '1.2rem',
        color: '#aaa',
    },
    carouselWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    carousel: {
        display: 'flex',
        gap: '2rem',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        padding: '1rem 1rem 3rem 1rem', // Increased padding to prevent clipping
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
        width: '100%',
    },
    arrow: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        zIndex: 10,
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.3s',
    },
    arrowLeft: {
        left: '-20px',
    },
    arrowRight: {
        right: '-20px',
    },
    cardLink: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex', // Changed to flex to ensure height behavior
        flexDirection: 'column',
        minWidth: '300px',
        maxWidth: '300px',
        height: 'auto', // Allow it to grow
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'left',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)', // Safari support
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        transform: 'translateZ(0)', // Fix for border-radius clipping with backdrop-filter
    },
    projectTitle: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
        color: '#646cff',
    },
    projectDesc: {
        color: '#ccc',
        marginBottom: '1rem',
        lineHeight: '1.5',
        flexGrow: 1,
        fontSize: '0.95rem',
    },
    stats: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        color: '#aaa',
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: '#888',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '0.75rem',
        marginTop: 'auto',
    },
    language: {
        fontWeight: 'bold',
        color: '#fff',
        maxWidth: '60%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    date: {
        fontStyle: 'italic',
    }
};

export default Projects;
