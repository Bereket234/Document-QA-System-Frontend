import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Input, Button, VStack, Spinner, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";
import configs from "../configs";

const TextChat = () => {
  const api= configs.BACKEND_API

  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch(`${api}/api/v1/chat?type=text`)
      .then((res) => res.json())
      .then((res) => {
        setMessages(res.data.chatHistory)
      })
      .catch((error) => console.log(error));
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", content: prompt };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setPrompt('');
    setLoading(true);

    try {
      const response = await axios.post(`${api}/api/v1/chat`, {
        prompt,
        type: "text",
      });

      const assistantMessage = response.data.data.result;
      console.log(response.data)
      setMessages((prevMessages) => [...prevMessages, {role: "assistant", content: assistantMessage}]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            const isUser = message.role === "user" || message.role === "pdf";
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
                {message.role === "pdf" ? (
                  <Box>
                    <Text mb="2">{message.content}</Text>
                    <Button
                      as="a"
                      href={message.fileUrl}
                      download
                      leftIcon={<DownloadIcon />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Download File
                    </Button>
                  </Box>
                ) : (
                  <Text>{message.content}</Text>
                  
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
        justifyContent="center"
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
            isDisabled={loading || (!prompt)}
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

export default TextChat;
