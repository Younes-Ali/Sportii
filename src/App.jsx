import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/AuthPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path="about" element={<About/>} />
          <Route path="dashboard" element={<p>dash</p>} />
          <Route path="contact" element={<Contact/>} />
        </Route>
        <Route path="signin" element={<SignIn/>} />
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </BrowserRouter>
  )
}
