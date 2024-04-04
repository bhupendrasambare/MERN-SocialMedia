import React,{ useState } from 'react'
import {DarkMode,LightMode,ExitToApp,AccountCircleRounded} from "@mui/icons-material";
import { setMode,setLogout } from '../../state/index';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user )
    const mode = useSelector((state) => state.mode )

    // const fullName = `${user.firstname} ${user.lastname}`
    
    const [updateText,setUpdateText] = useState("")
    const chageMode = ()=>{
        setUpdateText(updateText+ "1")
        dispath(setMode())
    }

    const logout = ()=>{
        dispath(setLogout())
        navigate("/")
    }

    return (
        <Navbar expand="sm" className='shadow-lg' bg={mode} data-bs-theme={mode} >
            <Container fluid className='container'>
                <Navbar.Brand href="#" className={"fw-bold"}>Let's talk</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    {/* <Nav.Link href="#action2" className={(mode=="light"?"text-dark":"text-light")}> */}
                        {/* <Button title='Logout' variant="border-0 rounded-pill p-0">
                            <AccountCircleRounded />
                        </Button>
                    </Nav.Link>
                    <Nav.Link href="#action1" className={(mode=="light"?"text-dark":"text-light")+" d-flex flex-col items-middle"}>
                        <Button title='Logout' variant="border-0 rounded-pill p-0">
                            <MessageRounded />
                        </Button>
                    </Nav.Link> */}
                </Nav>
                <div className="d-flex justify-content-start">
                    <Button title='Mode' variant="rounded-pill border-0">
                        {mode == 'light'?<DarkMode className='text-dark' onClick={chageMode}/>:<LightMode className='text-warning' onClick={chageMode}/>}
                    </Button>
                    {user && 
                        <>
                            <Button title='Logout' variant="border-0 rounded-pill">
                                    <AccountCircleRounded />
                            </Button>
                            <Button onClick={logout} title='Logout' variant="border-0 rounded-pill">
                                <ExitToApp />
                            </Button>
                        </>
                    }
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar