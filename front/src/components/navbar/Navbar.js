import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link,useNavigate } from "react-router-dom"
import "./Navbar.scss"

function Navbar() {
    let navigate = useNavigate();
    
    const logout= ()=>{
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        navigate(0)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                            <Link className='link' to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                            {localStorage.getItem("currentUser") === null
                                ? <Link className='link' to="/auth" >Login/Register</Link>
                                : <>
                                    <IconButton onClick={logout} ><LockOpenIcon></LockOpenIcon> </IconButton>
                                    <Link className='link' to={`/users/${localStorage.getItem("currentUser")}`} >Profile</Link>
                                </>}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar