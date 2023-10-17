import { Routes, Route } from "react-router-dom";
import  HomePage  from "../../pages/HomePage";
import BlogPage from "../../pages/BlogPage";

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog"  element={<BlogPage />}/>
        </Routes>
    )
}