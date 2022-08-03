import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { useResolvedPath, Navigate, Link, useLocation } from 'react-router-dom';


// This thing should link you to the parent page but it only work with the /articles/:slug route
function GoToParentRoute() {
    const { pathname } = useLocation();
    const [path, setPath] = useState(pathname);
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        if (pathname.split('/')[1] === 'articles' && pathname.split('/').length === 3) {
            setIsShown(true);
            setPath(pathname.split('/').slice(0, -1).join('/'));
        } else {
            setIsShown(false);
            setPath('/')
        }
    }, [pathname]);
    return (
        <>
            {isShown && 
                <Link to={path} className={styles.parentroute}>
                    <span>$ cd ..</span>
                    <span className={styles.parentrouteBlinker}></span>
                </Link>
            }
        </>
    )
}


export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>
                <Link to="/">DEV BLOG</Link>
            </h1>
            <div>
                <GoToParentRoute />
            </div>
            <nav className={styles.headerNavigation}>
                <a href="http://sebastien-gaudard.com">Back to main site</a>
            </nav>
        </header>
    )
}