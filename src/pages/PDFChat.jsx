import React, { useState, useRef, useEffect } from 'react';
import { Flex, VStack, Box, Input, Button, Spinner, Text, IconButton, CloseButton } from '@chakra-ui/react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';
import axios from 'axios';
import configs from '../configs';

const PDFChat = () => {
  const api= configs.BACKEND_API
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null); 
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch(`${api}/api/v1/chat?type=pdf`)
      .then((res) => res.json())
      .then((res) => {
        setMessages(res.data.chatHistory)
      })
      .catch((error) => console.log(error));
  }, [api]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt && !selectedFile) return;

    const userMessage = { role: "user", content: prompt };
    if (selectedFile){
      const fileMessage= {role: "file", content:selectedFile.name }
      setMessages((prevMessages) => [...prevMessages, fileMessage, userMessage]);
    }else{
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    }


    setPrompt('');
    setSelectedFile(null)
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('type', 'pdf');
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.post(`${api}/api/v1/chat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.data)

      const assistantMessage = response.data.data.result;
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: assistantMessage }]);
      setSelectedFile(null); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(e);
    }
  };

  return (
    <Flex direction="column" height="100vh">
      <VStack
        spacing={4}
        p={4}
        // pb="100px"
        flex="1"
        overflowY="auto"
        width="100%"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {messages && messages.map(
          (message, index) => {
            const isUser = message.role === "user" || message.role === "file";
            const bgColor = isUser ? "blue.50" : "green.50";
            const alignSelf = isUser ? "flex-start" : "flex-end";

            return (
              <Flex
                key={index}
                alignSelf={alignSelf}
                bg={bgColor}
                p="4"
                borderRadius="lg"
                mb="2"
                maxW="70%"
                boxShadow="md"
              >
                {message.role === "file" ? (
                  <Box>
                    <Button
                      download
                      colorScheme="blue"
                      variant="outline"
                    >
                      {message.content}
                    </Button>
                  </Box>
                ) : (
                  <Text>
                  {message.content}
                  </Text>
                )}
              </Flex>
            );
          }
        )}
        {loading && (
          <Flex alignSelf="flex-end">
            <Spinner size="lg" />
          </Flex>
        )}
        <Box ref={bottomRef} />
      </VStack>

      <Box
        position="relative"
        bottom="0"
        left="0"
        width="100%"
        bg="white"
        p="4"
        zIndex="1"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderTop="none"
      >
        

        <Box
          display="flex"
          alignItems="center"
          bg="white"
          borderRadius="full"
          boxShadow="sm"
          p="2"
          width={["90%", "60%"]}
          transition="width 0.3s ease"
        >
          {selectedFile && (
          <Box
            display="flex"
            alignItems="center"
            bg="gray.100"
            borderRadius="md"
            
            p="2"
            mb="2"
            width="20%"
            justifyContent="space-between"
          >
            <Text fontSize="sm">{selectedFile.name}</Text>
            <CloseButton size="sm" onClick={handleRemoveFile} />
          </Box>
        )}
          <IconButton
            icon={<AttachmentIcon />}
            onClick={handleIconClick}
            variant="ghost"
            colorScheme="blue"
            aria-label="Attach File"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Input
            placeholder="Type your message..."
            flex="1"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress} 
            border="none"
            _focus={{ boxShadow: "none" }}
          />
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={handleSubmit}
            isDisabled={loading || (!prompt && !selectedFile)}
            colorScheme="blue"
            aria-label="Send"
            borderRadius="full"
            color="white"
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            ml={2}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default PDFChat;
