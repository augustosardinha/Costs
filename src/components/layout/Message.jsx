import styles from './Message.module.css';
import { useState, useEffect } from 'react';

export default function Message({ type, message }) {
    const [visible, setVisible] = useState(false);

    useEffect(()=> {
        if (!message) {
            setVisible(false);
            return;
        } 
        setVisible(true);
        
        const seconds = 3;
        return setTimeout(()=> setVisible(false), seconds * 1000);
    }, [message]);

    return <>{visible && <div className={`${styles.msg} ${styles[type]}`}>{message}</div>}</>;
}
