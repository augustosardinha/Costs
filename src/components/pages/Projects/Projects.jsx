import styles from './Projects.module.css';

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from '../../layout/Container';
import Message from '../../layout/Message';
import Loading from '../../layout/Loading';
import LinkButton from '../../layout/LinkButton';
import ProjectCard from '../../project/ProjectCard';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [messages, setMessages] = useState('');

    const location = useLocation();
    let msg = '';
    if (location.state) {
        msg = location.state.message;
    }

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:5000/projects');
            const data = await response.json();
            setProjects(data);
            setRemoveLoading(true);
        } catch (error) {
            console.error(error);
        }
    }, []);

    async function remove(id) {
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await response.json();

            setProjects(projects.filter((project) => project.id != id));
            setMessages('Project successfully deleted.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.project}>
            <div className={styles.project__title}>
                <h1>My projects</h1>
                <LinkButton to="/newproject" text="New Project" />
            </div>
            {msg && <Message message={msg} type="success" />}
            {messages && <Message message={messages} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.projectName}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={remove}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && <p>No have project registred</p>}
            </Container>
        </div>
    );
}
