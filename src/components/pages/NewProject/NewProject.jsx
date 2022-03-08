import styles from './NewProject.module.css';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../project/ProjectForm';

export default function NewProject() {
    const navigate = useNavigate();

    async function createProject(project) {
        project.cost = 0;
        project.services = [];
        try {
            const response = await fetch('http://localhost:5000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });
            await response.json();
            navigate('/projects', { state: { message: 'Project created with success!' } });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.newProject}>
            <div>
                <h1>
                    Build your <span>project</span>
                </h1>
                <h2>Build your project before adding services on it</h2>
            </div>
            <ProjectForm btnText={'Create project'} handleSubmit={createProject} />
        </div>
    );
}
