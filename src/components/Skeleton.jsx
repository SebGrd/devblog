import styles from './Skeleton.module.scss';

export default function Skeleton({ height, width, borderRadius }) {
    return (
        <div className={styles.skeleton} style={{ height, width, borderRadius }}></div>
    )
}