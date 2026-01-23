import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import LessonPlay from "./pages/LessonPlay";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* Course listing */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Single course (units + levels) */}
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />

        {/* Lesson play */}
        <Route
          path="/lesson/:courseId/:lessonId"
          element={
            <ProtectedRoute>
              <LessonPlay />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
