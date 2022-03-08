import styles from '../project/ProjectForm.module.css';
import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

export default function ServiceForm({ textBtn, handleSubmit, projectData }) {
    const [service, setService] = useState({});

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    function submit(e) {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <h1>Service</h1>
            <Input
                text="Service Name"
                name="serviceName"
                type="text"
                placeholder="Buy a AWS server"
                handleOnChange={handleChange}
            />
            <Input
                text="Service Cost"
                name="cost"
                type="number"
                placeholder="$400"
                handleOnChange={handleChange}
            />
            <Input
                text="Service Description"
                name="description"
                type="text"
                placeholder="AWS offers over 200 cloud services"
                handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn} />
        </form>
    );
}
