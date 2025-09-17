"use client";
import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Heart,
  Frown,
  Users,
  Moon,
  Sun,
  List,
  Share2,
  Download,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Link,
} from "lucide-react";
import { categories } from "@/lib/interacts";
import {
  AnonymousMessageSenderProps,
  messagesTypes,
  platformsTypes,
} from "@/lib/type";
import "./handler.css";
import axios from "axios";
import { messages } from "@/lib/sampleData";
import { formatTimeAgo } from "@/util/timeUtil";
import MessagesLoadingSkeleton from "./skeleton";

const WhispersMessagesPage = ({
  user,
  uniqueLink,
}: AnonymousMessageSenderProps) => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Messages");
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);
  const [messagesData, setMessagesData] = useState<messagesTypes[]>(messages);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/messages/received/${uniqueLink}`);
        if (res.status === 200) {
          setMessagesData(res.data.messageData);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [uniqueLink]);

  const socialPlatforms = [
    { name: "Twitter", icon: Twitter, color: "#1da1f2" },
    { name: "Facebook", icon: Facebook, color: "#4267b2" },
    { name: "WhatsApp", icon: MessageCircle, color: "#25d366" },
    { name: "Copy Link", icon: Copy, color: "#6b7280" },
  ];

  const filteredMessages =
    selectedCategory === "All Messages"
      ? messagesData
      : messagesData.filter((msg) => msg.category === selectedCategory);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const getCategoryInfo = (categoryName: string) => {
    return categories.find((cat) => cat.name === categoryName) || categories[0];
  };

  const handleShare = (messageId: number, platform: platformsTypes) => {
    const message = messages.find((m) => m.id === messageId);
    const shareText = `"${message?.text}" - Anonymous message from Whispers`;
    const shareUrl = `${window.location.origin}/message/${messageId}`;

    switch (platform) {
      case "Twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "Facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "WhatsApp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        );
        break;
      case "Copy Link":
        navigator.clipboard.writeText(shareUrl);
        break;
    }
    setShareMenuOpen(null);
  };

  const handleDownloadImage = (messageId: number) => {
    // Placeholder for download functionality
    console.log(`Download image for message ${messageId}`);
    // You'll implement this with html2canvas or similar
  };

  if (!isLoading) return <MessagesLoadingSkeleton />;

  return (
    <div className={`messages-container ${isDark ? "dark" : "light"}`}>
      <div className="messages-layout">
        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="app-title">Anonymous</h1>
            <p className="app-subtitle">Share your thoughts freely</p>
          </div>

          <nav className="navigation">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`nav-item ${selectedCategory === category.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.name)}
                style={
                  { "--category-color": category.color } as React.CSSProperties
                }
              >
                <span className="nav-emoji">{category.emoji}</span>
                <span className="nav-text">
                  {category.name === "work_school"
                    ? "Work & School"
                    : category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h2 className="page-title">
              {selectedCategory === "All Messages"
                ? "All Messages"
                : getCategoryInfo(selectedCategory).emoji +
                  " " +
                  (selectedCategory === "work_school"
                    ? "Work & School"
                    : selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1))}
            </h2>
            <p className="message-count">{filteredMessages?.length} messages</p>
          </div>

          <div className="messages-grid">
            {filteredMessages &&
              filteredMessages?.map((message) => {
                const categoryInfo = getCategoryInfo(message.category);
                return (
                  <div key={message.id} className="message-wrapper">
                    <div
                      className="message-card"
                      style={
                        {
                          "--message-color": categoryInfo.color,
                        } as React.CSSProperties
                      }
                    >
                      <div className="message-header">
                        <div className="category-badge">
                          <span className="category-emoji">
                            {categoryInfo.emoji}
                          </span>
                          <span className="category-name">
                            {message.category === "work_school"
                              ? "Work & School"
                              : message.category.charAt(0).toUpperCase() +
                                message.category.slice(1)}
                          </span>
                        </div>
                        <div className="message-actions">
                          <div className="share-container">
                            <button
                              className="action-btn share-btn"
                              onClick={() =>
                                setShareMenuOpen(
                                  shareMenuOpen === message.id
                                    ? null
                                    : message.id,
                                )
                              }
                            >
                              <Share2 size={16} />
                            </button>
                            {shareMenuOpen === message.id && (
                              <div className="share-menu">
                                {socialPlatforms.map((platform) => {
                                  const IconComponent = platform.icon;
                                  return (
                                    <button
                                      key={platform.name}
                                      className="share-option"
                                      onClick={() =>
                                        handleShare(
                                          message.id,
                                          platform.name as platformsTypes,
                                        )
                                      }
                                      style={
                                        {
                                          "--platform-color": platform.color,
                                        } as React.CSSProperties
                                      }
                                    >
                                      <IconComponent size={16} />
                                      <span>{platform.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <button
                            className="action-btn download-btn"
                            onClick={() => handleDownloadImage(message.id)}
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="message-content">{message.text}</p>
                      <div className="message-footer">
                        <span className="createdAt">
                          {formatTimeAgo(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
};

export { WhispersMessagesPage };
