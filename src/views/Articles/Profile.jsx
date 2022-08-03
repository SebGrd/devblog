import { useState, useEffect } from "react"
import { getProfile } from "@/utils/api"
import styles from "./Profile.module.scss"
import Skeleton from "@/components/Skeleton"

export default function Profile() {
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const profile = await getProfile()
                setProfile(profile)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })();
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className="container">
                {loading && <Skeleton width="100%" height="204px">Loading...</Skeleton>}
                {!loading &&
                    <section className={styles.profile}>
                        <div className={styles.profileAvatar}>
                            <img className={styles.profileAvatarImg} src={profile.profile_image} alt={profile.name} />
                        </div>
                        <h1 className={styles.profileTitle}>{profile.name}</h1>
                        <p className={styles.profileBio}>{profile.summary}</p>
                        <div className={styles.profileInfos}>
                            <span className={styles.profileInfosItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="ad9vu654pynvx82ih3diyvsj101bk592"><title id="ad9vu654pynvx82ih3diyvsj101bk592">Location</title>
                                    <path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1112.728 0zM12 13a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                                <span>{profile.location}</span>
                            </span>
                            <a target="blank" href={profile.website_url} className={styles.profileInfosItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="aebaksjxw6lbj2ginbr6n1ezl6da6t5g"><title id="aebaksjxw6lbj2ginbr6n1ezl6da6t5g">Personal website</title><path d="M10.667 8v1.333H7.333v7.334h7.334v-3.334H16v4a.666.666 0 01-.667.667H6.667A.666.666 0 016 17.333V8.667A.667.667 0 016.667 8h4zM18 6v5.333h-1.333V8.275l-5.196 5.196-.942-.942 5.194-5.196h-3.056V6H18z"></path></svg>
                                <span>{profile.website_url}</span>
                            </a>
                            <a target="blank" href={`https://gihtub.com/${profile.github_username}`} className={styles.profileInfosItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a6hr4wgpgmyb9lt5g4hg9trwex1jabrt"><title id="a6hr4wgpgmyb9lt5g4hg9trwex1jabrt">github website</title>
                                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 012.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0022 12c0-5.525-4.475-10-10-10z"></path>
                                </svg>
                            </a>
                            {/* <a target="blank" href={`https://dev.to/${profile.username}`}>dev.to</a> */}
                        </div>
                    </section>
                }

            </div>
        </div>
    )
}