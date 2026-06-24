const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
    return localStorage.getItem("token");
}

async function getPosts() {
    const response = await fetch(`${API_URL}/posts`);
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
}

async function getPost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`);
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
}

async function createPost(postData) {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(postData),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
}

async function editPost(id, postData) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(postData),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
}

async function deletePost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result;
}

const postService = {
    getPosts,
    getPost,
    createPost,
    editPost,
    deletePost,
};

export default postService;