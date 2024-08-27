import { Box, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
  return (
    <Box
      position="fixed"
      top="20px" 
      left="50%"
      transform="translateX(-50%)"
      w="300px"
      h="60px"
      bg="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      boxShadow="lg"
      color='black'
    >
      <RouterLink to="/" >
        <Link
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
        >
          <Text  fontSize="md" fontWeight="bold" color={location.pathname === "/" ? "blue.500" : "black"}>
            PDF Chat
          </Text>
        </Link>
      </RouterLink>
      <RouterLink to="/text">
        <Link
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          <Text fontSize="md" fontWeight="bold" color={location.pathname === "/text" ? "blue.500" : "black"}>
            Ask Me?
          </Text>
        </Link>
      </RouterLink>
    </Box>
  );
};

export default Navbar;
