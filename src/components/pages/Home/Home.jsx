import styles from './Home.module.css';
import Savings from '../../../assets/savings.svg';
import LinkButton from '../../layout/LinkButton';

export default function Home() {
    return (
        <section className={styles.home}>
            <img src={Savings} alt="You with money" />
            <div className={styles.home__text}>
                <h1>
                    Welcome to <br /> <span>Costs</span>
                </h1>
                <p>Start your projects without bureaucracy.</p>
                <div>
                    <LinkButton to="newproject" text="Make your Project" />
                </div>
            </div>
        </section>
    );
}
