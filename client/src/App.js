import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css"
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {themeSettings} from "./theme";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./pages/navbar";
import "./index.css"
import Authenticate from "./pages/Authenticate";


function App() {
  const mode = useSelector((state) => state.mode )
  return (
    <div className={(mode=='light'?"bg-light text-dark":"bg-dark text-light")+" app"}>
        <BrowserRouter>
            <CssBaseline/>
            <NavBar/>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={<Authenticate children={<HomePage/>}></Authenticate>} />
                <Route path="/profile/:userId" element={<Authenticate children={<Profile/>}></Authenticate>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
