"use client";
import React, { useState, useRef, useEffect } from "react";
import { initialMessages } from "@/lib/sampleData";
import { AnonymousMessageCard } from "../component/AnonymousMessageCard/AnonymousMessageCard";
import { ComposeSection } from "../component/AnonymousMessageCard/CompositeSection";
import { Sidebar } from "../component/AnonymousMessageCard/SideBar";
import "./page.css";

const AnonymousMessagePlatform = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCompose, setShowCompose] = useState(false);

  const filteredMessages =
    activeFilter === "all"
      ? messages
      : messages.filter((msg) => msg.category === activeFilter);

  const handleSubmitMessage = (newMessage) => {
    const message = {
      id: Date.now(),
      text: newMessage.text,
      category: newMessage.category,
      timestamp: "just now",
      likes: 0,
      bookmarks: 0,
    };

    setMessages([message, ...messages]);
    setShowCompose(false);

    // Show success notification
    setTimeout(() => {
      alert("Your anonymous message has been shared! 🎉");
    }, 100);
  };

  return (
    <div className="app-container">
      <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="main-content">
        {showCompose && <ComposeSection onSubmit={handleSubmitMessage} />}

        <div className="messages-feed">
          {filteredMessages.map((message) => (
            <AnonymousMessageCard key={message.id} message={message} />
          ))}

          {filteredMessages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "var(--text-secondary)",
              }}
            >
              No messages in this category yet. Be the first to share!
            </div>
          )}
        </div>
      </div>

      <button
        className="compose-toggle"
        onClick={() => setShowCompose(!showCompose)}
        title={showCompose ? "Close compose" : "Write anonymous message"}
      >
        {showCompose ? "×" : "+"}
      </button>
    </div>
  );
};

export default AnonymousMessagePlatform;
