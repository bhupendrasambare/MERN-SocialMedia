import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css"
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import Users from "./pages/profile/Users";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./pages/navbar";
import "./index.css"
import Authenticate from "./pages/Authenticate";
import axios from "axios";


function App() {
  const token = useSelector((state) => state.token )
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  

  const mode = useSelector((state) => state.mode )
  return (
    <div className={(mode=='light'?"bg-light text-dark":"bg-dark text-light")+" app"}>
        <BrowserRouter>
            <CssBaseline/>
            <NavBar/>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={<Authenticate children={<HomePage/>}></Authenticate>} />
                <Route path="/profile/:id" element={<Authenticate children={<Profile/>}></Authenticate>} />
                <Route path="/user" element={<Authenticate children={<Users/>}></Authenticate>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
