import styles from './Loading.module.css';
import loading from '../../assets/loading.svg';

export default function Loading() {
    return (
        <div className={styles.loader}>
            <img className={styles.load} src={loading} alt="Loading" />
        </div>
    );
}
