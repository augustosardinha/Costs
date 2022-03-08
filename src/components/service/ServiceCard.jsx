import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';

export default function ServiceCard({ id, name, cost, description, handleRemove }) {
    function remove(e) {
        e.preventDefault();
        handleRemove(id, cost);
    }
    return (
        <div className={styles.project__card}>
            <h4>{name}</h4>
            <p>
                <strong>Service cost: </strong> ${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project__card__action}>
                <button onClick={remove}>
                    <BsFillTrashFill/> Delete    
                </button>
            </div>
        </div>
    );
}
