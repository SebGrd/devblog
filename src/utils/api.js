const API_URL = "https://dev.to/api";
const USERNAME = "sebgrd";
const USER_ID = "895426";

function handleError(resStatus) {
    const [type] = `${resStatus}` 
    if (type === '4') throw new Error("Resource not found");
    if (type === '5') throw new Error("Internal server error");
}

export async function getArticles() {
    const builtUrl = `${API_URL}/articles?username=${USERNAME}`;
    const res = await fetch(builtUrl);
    handleError(res.status);
    return await res.json();
}

export async function getArticle(articlePath) {
    const res = await fetch(`${API_URL}/articles/${USERNAME}/${articlePath}`);
    handleError(res.status);
    return await res.json();
}

export async function getProfile() {
    const res = await fetch(`${API_URL}/users/${USER_ID}`);
    handleError(res.status);
    return await res.json();
}
