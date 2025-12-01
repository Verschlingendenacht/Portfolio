import { useState, useEffect } from 'react';

export const useGitHubProjects = (repos) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!repos || repos.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const projectPromises = repos.map(async (repo) => {
                    const response = await fetch(`https://api.github.com/repos/${repo}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${repo}`);
                    }
                    const data = await response.json();

                    try {
                        const langResponse = await fetch(`https://api.github.com/repos/${repo}/languages`);
                        if (langResponse.ok) {
                            const languages = await langResponse.json();
                            data.languages = Object.keys(languages);
                        } else {
                            data.languages = [];
                        }
                    } catch (langErr) {
                        console.warn(`Failed to fetch languages for ${repo}`, langErr);
                        data.languages = [];
                    }

                    return data;
                });

                const results = await Promise.all(projectPromises);
                setProjects(results);
            } catch (err) {
                console.error("Error fetching GitHub projects:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [JSON.stringify(repos)]); // Depend on the array content

    return { projects, loading, error };
};
