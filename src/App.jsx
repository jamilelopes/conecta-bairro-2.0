import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UnsavedChangesProvider } from "./contexts/UnsavedChangesContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <UnsavedChangesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:slug" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </UnsavedChangesProvider>
    </BrowserRouter>
  );
}

export default App;