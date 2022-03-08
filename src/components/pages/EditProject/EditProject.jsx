import styles from './EditProject.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { parse, v4 as uuidv4 } from 'uuid';

import Loading from '../../layout/Loading';
import Container from '../../layout/Container';
import Message from '../../layout/Message';
import ProjectForm from '../../project/ProjectForm';
import ServiceForm from '../../service/ServiceForm';
import ServiceCard from '../../service/ServiceCard';

export default function EditProject() {
    let { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProject, setShowProject] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    useEffect(async () => {
        const response = await fetch(`http://localhost:5000/projects/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setProject(data);
        setServices(data.services);
    }, [id]);

    async function editPost(project) {
        setMessage('');

        if (project.budget < project.cost) {
            setMessage('The budget cannot be less than the cost of services');
            setType('error');
            return false;
        }
        try {
            const response = await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
            const data = await response.json();
            setProject(data);
            setShowProject(false);
            setMessage('Project updated with success!');
            setType('success');
        } catch (error) {
            console.error(error);
        }
    }

    async function createService(project) {
        setMessage('');
        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();
        const totalCost = parseFloat(project.cost) + parseFloat(lastService.cost);

        if (totalCost > parseFloat(project.budget)) {
            setMessage('The service cost cannot be more than budget limit');
            setType('error');
            project.services.pop();
            return false;
        }
        project.cost = totalCost;
        try {
            const response = await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
            const data = await response.json();
            setServices(data.services);
            setShowServices(false);
            setMessage('Service added with success!');
            setType('success');
        } catch (error) {
            console.error(error);
        }
    }

    async function removeService(id, cost) {
        const newProject = project;
        newProject.services = project.services.filter((service) => service.id !== id);
        newProject.cost = parseFloat(newProject.cost) - parseFloat(cost);

        try {
            const response = await fetch(`http://localhost:5000/projects/${newProject.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });
            await response.json();
            setProject(newProject);
            setServices(newProject.services);
            setMessage('Service has been deleted');
        } catch (error) {
            console.error(error);
        }
    }

    function toggleProject() {
        setShowProject(!showProject);
    }

    function toggleService() {
        setShowServices(!showServices);
    }

    return (
        <>
            {project.projectName ? (
                <div className={styles.project__details}>
                    <Container customClass="column">
                        {message && <Message type={type} message={message} />}
                        <div className={styles.details__container}>
                            <h1>{!showProject ? `Project: ${project.projectName}` : ''}</h1>
                            <button className={styles.button} onClick={toggleProject}>
                                {!showProject ? 'Edit' : <ImCross />}
                            </button>

                            {!showProject ? (
                                <div className={styles.project__info}>
                                    <p>
                                        <strong>Category:</strong> {project.category.name}
                                    </p>
                                    <p>
                                        <strong>Budget limit:</strong> ${project.budget}
                                    </p>
                                    <p>
                                        <strong>Total Spent:</strong> ${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={`${styles.project__info} ${styles.center}`}>
                                    <ProjectForm
                                        formTitle={true}
                                        handleSubmit={editPost}
                                        btnText="Edit"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.services__container}>
                            <h1>{!showServices ? `Add services` : ''}</h1>
                            <button className={styles.button} onClick={toggleService}>
                                {!showServices ? 'Add' : <ImCross />}
                            </button>
                            <div className={`${styles.project__info} ${styles.center}`}>
                                {showServices && (
                                    <ServiceForm
                                        textBtn="Add"
                                        handleSubmit={createService}
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.column}>
                            <h1>Services</h1>
                            <div className={styles.wrap}>
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            id={service.id}
                                            name={service.serviceName}
                                            cost={service.cost}
                                            description={service.description}
                                            handleRemove={removeService}
                                        />
                                    ))}
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}
