import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
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

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
