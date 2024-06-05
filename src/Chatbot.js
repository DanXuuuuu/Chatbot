import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Chatbox assistant. How can I assist you?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [currentSender, setCurrentSender] = useState('user1'); // New state to track the current sender

    const sendMessage = () => {
        if (input.trim() !== '' || file) {
            let newMessages = [...messages];

            if (input.trim() !== '') {
                newMessages.push({ text: input.trim(), sender: currentSender });
            }
            if (file) {
                newMessages.push({ file: file, sender: currentSender });
            }

            setMessages(newMessages);

            // Automatically alternate the sender
            setCurrentSender(currentSender === 'user1' ? 'user2' : 'user1');
            setInput('');
            setFile(null);
        }
    };

    const generateBotResponse = (input) => {
        // Simple bot responses
        switch (input.toLowerCase()) {
            case 'hi':
                return "Hi! How can I assist you today?";
            case 'hello':
                return "Hello! How can I assist you today?";
            // Add more cases as needed
            default:
                return "I'm sorry, I didn't understand that. Can you please rephrase?";
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className="chatbox">
            <div className="chatbox-header">
                <h2>GENINS</h2>
            </div>
            <div className="chatbox-messages" id="chatbox-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text && <div>{message.text}</div>}
                        {message.file && (
                            <div>
                                <p>File uploaded:</p>
                                <p>{message.file.name}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="chatbox-input">
                <input
                    type="text"
                    id="message-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                />
                <input type="file" onChange={handleFileChange} />
                <button id="send-button" onClick={sendMessage}>Send</button>
            </div>
            
        </div>
    );
};

export default Chatbox;
