import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import LessonPage from "./pages/LessonPage";
import Pricing from "./pages/Pricing";
import ForTeams from "./pages/ForTeams";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Legal from "./pages/Legal";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
        <Route path="/pricing"   element={<Pricing />} />
        <Route path="/for-teams" element={<ForTeams />} />
        <Route path="/about"     element={<About />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/careers"   element={<Careers />} />
        <Route path="/privacy"   element={<Legal />} />
        <Route path="/terms"     element={<Legal />} />
        <Route path="/cookies"   element={<Legal />} />
        <Route path="/legal/:page" element={<Legal />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/courses"   element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><Course /></ProtectedRoute>} />
        <Route path="/lesson/:courseId/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
