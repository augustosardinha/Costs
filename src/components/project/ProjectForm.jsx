import styles from './ProjectForm.module.css';

import { useEffect, useState } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

export default function ProjectForm({ handleSubmit, btnText, projectData, formTitle }) {
    const [project, setProject] = useState(projectData || {});
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    function submit(e) {
        e.preventDefault();
        handleSubmit(project);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <h1>{formTitle ? project.projectName : 'Project'}</h1>
            <Input
                type="text"
                text="Project Name"
                name="projectName"
                placeholder="Website, application, design,  etc..."
                handleOnChange={handleChange}
                value={project.projectName}
            />
            <Input
                type="number"
                text="Project Budget"
                name="budget"
                placeholder="40000"
                handleOnChange={handleChange}
                value={project.budget}
            />
            <Select
                name="category"
                text="Select a category"
                options={categories}
                handleCategory={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}
