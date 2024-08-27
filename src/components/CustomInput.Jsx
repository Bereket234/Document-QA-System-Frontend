import React from "react"
import { Box, Button, Input } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"

const CustomInput=()=>{
    const [prompt, setPrompt]= useState('')

    const handleSubmit= (e)=>{
        e.preventDefault()
        axios.post("http://localhost:3000/api/v1/chat", {prompt: prompt, type: "text"})
        .then(res=>console.log(res))
        .catch(error=>console.log(error))     
    }
    return(
        <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        bg="white"
        p="4"
        borderTop="1px solid #ddd"
        zIndex="1"
        boxShadow="sm"
        display="flex"
      >
        <Input placeholder="Type your message..." flex="1" value= {prompt} onChange={(e)=> {setPrompt(e.target.value)}} />
        <Button colorScheme="blue" ml="2" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    )
}

export default CustomInput