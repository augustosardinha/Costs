import styles from './Select.module.css';

export default function Select({ name, text, options, handleCategory, value }) {
    return (
        <div className={styles.select}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleCategory} value={value ? value : ''}>
                <option>Select a category</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}