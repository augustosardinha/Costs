import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function ProjectCard({ id, name, budget, category, handleRemove }) {

    function removeCard(e){
        e.preventDefault();
        handleRemove(id)
    }
    return (
        <section className={styles.project__card}>
            <h4>{name}</h4>
            <p>
                <strong>Budget:</strong> ${budget}
            </p>
            <p className={styles.project__card__category}>
                <span className={`${styles[category.slice(0, 3).toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project__card__action}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Edit
                </Link>
                <button onClick={removeCard}>
                    <BsFillTrashFill /> Delete
                </button>
            </div>
        </section>
    );
}
