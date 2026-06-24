const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

async function register(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

async function login(userData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

async function logout() {
  localStorage.removeItem("token");

  return {
    message: "Logged out successfully",
  };
}

async function getMe() {
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data;
}

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;