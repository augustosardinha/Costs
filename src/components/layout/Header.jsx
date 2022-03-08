import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Container from './Container';
import Logo from '../../assets/costs_logo.png';

export default function Header() {
    return (
        <header className={styles.header}>
            <Container>
                <Link to="/">
                    <img src={Logo} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projects</Link></li>
                    <li className={styles.item}><Link to="/about">About</Link></li>
                </ul>
            </Container>
        </header>
    );
}
