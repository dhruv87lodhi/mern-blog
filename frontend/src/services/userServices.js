const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
    return localStorage.getItem("token");
}

async function getUserPosts() {
    const response = await fetch(`${API_URL}/users/posts`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    const result = await response.json();
    if(!response.ok) {
        throw new Error(result.message || "something went wrong");
    }
    return result;
}

const userServices = {
    getUserPosts,
}

export default userServices;