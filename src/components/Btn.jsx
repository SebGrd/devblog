import styles from './Btn.module.scss';

export default function Btn({ children }) {
    return (
        <button className={styles.btn}>
            {children}
        </button>
    )
}