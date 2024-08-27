// RootLayout.js
import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {  
  return (
    <Box>
      <Navbar/>
      <Box pt="0px" px="10%"> 
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
