import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '@/utils/api';
import { toReadableDate } from '@/utils/converters';
import styles from './Articles.module.scss'
import Skeleton from '@/components/Skeleton';
import useLoop from '@/hooks/useLoop';
import Profile from './Profile';

function TagList({ tagList }) {
    if (!tagList || tagList.length === 0) {
        return null;
    }
    return (
        <ul className={styles.articleTaglist}>
            {tagList.map(tag =>
                <li key={tag} className={styles.articleTaglistItem}>#{tag}</li>
            )}
        </ul>
    )
}

function Article({ article }) {
    return (
        <article className={styles.article}>
            <header>
                {/* <img src={article.cover_image} alt={article.title} width="" heigh=""/> */}
                <p className={styles.articleDate}>
                    <span>Posted on </span>
                    <time dateTime={article.published_timestamp}>{toReadableDate(article.published_timestamp)}</time>
                </p>
                <h1 className={styles.articleTitle}>
                    <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                </h1>
                <TagList tagList={article.tag_list} />
            </header>
            <p className={styles.articleContent}>{article.description}</p>
            <footer>
                <p className={styles.articleReadtime}>{article.reading_time_minutes} min read</p>
            </footer>
        </article>
    )
}

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const maxArticleNumber = 10;
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const articles = await getArticles();
                setArticles(articles);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <Profile />
            <div className="container">
                <h1>Latest articles</h1>
                {articles?.length < 1 ? <h2 style={{fontWeight: 400, fontStyle: 'italic'}}>I still haven't post any article 😞</h2>: null}
                {loading && useLoop(maxArticleNumber).map((x, i) => <Skeleton width="100%" height="218px" key={i} />)}
                {error && <p>{error.message}</p>}
                {articles && articles.slice(0, maxArticleNumber - 1).map(article => <Article article={article} key={article.id} />)}
            </div>
        </>
    )
}