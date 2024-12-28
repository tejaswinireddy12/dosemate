import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false); // State to control chatbot visibility
  const [messages, setMessages] = useState([]); // Stores messages
  const [userMessage, setUserMessage] = useState(""); // Input field state

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Send message to the backend and handle response
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);

    try {
        const response = await axios.post("http://127.0.0.1:8000/chat", {
            message: userMessage,
        });

        console.log("Backend Response:", response.data); // Debugging log
        setMessages([
            ...newMessages,
            { sender: "bot", text: response.data.reply || "No reply from server" },
        ]);
    } catch (error) {
        console.error("Error from backend:", error); // Debugging log
        setMessages([
            ...newMessages,
            { sender: "bot", text: "Sorry, something went wrong!" },
        ]);
    }

    setUserMessage(""); // Clear the input field
};

  return (
    <div className="chatbot-container">
      {/* Button to toggle chatbot */}
      <div className="help-me-btn" onClick={toggleChatbot}>
        CareBot
      </div>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="chatbot">
          {/* Messages Display */}
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Field and Send Button */}
          <div className="input-container">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me about any medicine..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
    
  );

}

export default Chatbot;
