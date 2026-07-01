import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import authService from "./services/authService";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [])

  async function checkAuth() {
    if (!localStorage.getItem("token")) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const userData = await authService.getMe();
      setUser(userData.user);
    } catch (error) {
      localStorage.setItem("token", "");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  if(loading) {
    return <Loading />;
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />

      <Route element={<MainLayout user={user} />}>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user} /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute user={user}><CreatePost /></ProtectedRoute>} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/edit-post/:id" element={<ProtectedRoute user={user}><EditPost /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
