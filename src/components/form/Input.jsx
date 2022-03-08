import styles from './Input.module.css';

export default function Input({ text, name, type, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.item}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={`Ex: ${placeholder}`}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    );
}
