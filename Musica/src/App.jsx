import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Library from "./Pages/Library";

function App() {
    // import.meta.env.VITE_BACKEND_URL

    return (
        <Router>
            <Routes>
                <Route element={<UserLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/library" element={<Library />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
