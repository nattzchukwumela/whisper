"use client";
import React, { useState } from "react";
import { anonymousMessages } from "@/lib/sampleData";
import { AnonymousMessageCard } from "./AnonymousMessage/MessageCard";
import "./AnonymousMessageApp.css";

const AnonymousMessageApp = () => {
  const [displayedMessages, setDisplayedMessages] = useState(
    anonymousMessages.slice(0, 5),
  );
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    const currentLength = displayedMessages.length;
    const nextMessages = anonymousMessages.slice(
      currentLength,
      currentLength + 3,
    );

    if (nextMessages.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedMessages([...displayedMessages, ...nextMessages]);

    if (currentLength + nextMessages.length >= anonymousMessages.length) {
      setHasMore(false);
    }
  };

  const refresh = () => {
    setDisplayedMessages(anonymousMessages.slice(0, 5));
    setHasMore(true);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--background-color, #0d1117)",
        minHeight: "100vh",
        color: "var(--text-primary, #c9d1d9)",
      }}
    >
      <div className="app-header">
        <h1 className="app-title">Anonymous Whispers</h1>
        <p className="app-subtitle">
          Share your thoughts freely and anonymously
        </p>
      </div>

      <div className="main-content">
        <div className="whispers-feed">
          {displayedMessages.map((message) => (
            <AnonymousMessageCard key={message.id} message={message} />
          ))}
        </div>

        <div className="load-more">
          {hasMore && (
            <button
              className="load-more-btn"
              onClick={loadMore}
              title="Load more messages"
            >
              ⟳
            </button>
          )}
          <button className="refresh-btn" onClick={refresh} title="Refresh">
            ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export { AnonymousMessageApp };
