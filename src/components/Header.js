import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

import { useHistory,Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ children, hasHiddenAuthButtons }) => {
  let history=useHistory();
  let [userName, setUserName] = useState("");

  useEffect(() => {
    // Update the username state when the component mounts since it does not gets displayed the username headder
    setUserName(localStorage.getItem("username"));
  }, []);


  const clear=()=>{
    localStorage.clear();
    window.location.reload();
  }

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
      {hasHiddenAuthButtons?(
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={(e)=>{history.push("/")}}
        >
          Back to explore
        </Button>
      ):(userName?(
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={userName} src="/public/avatar.png" />
          <p> {userName}</p>
          <Link className="link" to="/">
          <Button 
          className="explore-button" 
          onClick={clear}
          >LOGOUT
          </Button>
          </Link>
        </Stack>
        ):(
          <Stack direction="row" spacing={2}>
            <Link className="link" to="/login">
            <Button  variant="text"
              className="explore-button"
              onClick={(e)=>{history.push("/login")}}
              >LOGIN
            </Button>
            </Link>
            <Link className="link" to="/register">
            <Button variant="contained"
              color="success" 
              onClick={(e)=>{history.push("/register")}}
              >REGISTER
            </Button>
            </Link>
          </Stack>)
          )}
     </Box>
     
    );
};

export default Header;
