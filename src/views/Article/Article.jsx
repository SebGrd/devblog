import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '@/utils/api';
import hljs from 'highlight.js';
import './atom-one-dark.min.css'
import './hljs-mod.scss'
import styles from './Article.module.scss';
import { toReadableDate } from '@/utils/converters';


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


export default function Article() {
    const params = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initHlhs = () => {
        document.querySelectorAll("pre code").forEach(block => {
            block.classList.add('hljs')
            // We need to hide console warnings for hljs (see l:75)
            hljs.configure({
                ignoreUnescapedHTML: true,
            })
            hljs.safeMode();
            hljs.highlightBlock(block);
        });
    }

    // Getting and loading content
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const article = await getArticle(params.slug);
                setArticle(article);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [params.slug]);

    // Initializing hljs on content load or change
    useEffect(() => {
        initHlhs();
    }, [article])


    return (
        <main className='container'>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {article && <>
                {article.cover_image && <img src={article.cover_image} alt={article.title} width="600px" height="250px" className={styles.articleImage} />}
                <div style={{padding: '1rem', background: 'white'}}>
                    <p className={styles.articleDate}>
                        <span>Posted on </span>
                        <time dateTime={article.published_timestamp}>{toReadableDate(article.published_timestamp)}</time>
                    </p>
                    <h1>{article.title}</h1>
                    <TagList tagList={article.tags} />
                    {/* Since any content comes from my dev.to, i will trust it as it comes. */}
                    <section dangerouslySetInnerHTML={{ __html: article.body_html }} className={styles.articleContent}></section>
                </div>
            </>}
        </main>
    )
}