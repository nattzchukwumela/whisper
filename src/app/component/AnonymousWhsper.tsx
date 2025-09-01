import { Whisper } from "@/lib/type";

const AnonymousWhsiperCard: React.FC<{ whisper: Whisper }> = ({ whisper }) => {
  return (
    <div className="whisper-card">
      <div className="whisper-header">
        <div
          className="user-avatar"
          style={{ backgroundColor: whisper.userColor }}
        >
          {whisper.userInitials}
        </div>
        <div className="whisper-content">
          <p className="whisper-text">{whisper.content}</p>
          <span className="whisper-time">{whisper.timeAgo}</span>
        </div>
      </div>

      <div className="whisper-actions">
        <div className="action-item">
          <span className="action-icon">🤍</span>
          <span className="action-count">{whisper.likes.toLocaleString()}</span>
        </div>
        <div className="action-item">
          <span className="action-icon">💬</span>
          <span className="action-count">{whisper.comments}</span>
        </div>
        <div className="action-item">
          <span className="action-icon">↗</span>
        </div>
      </div>
    </div>
  );
};

export { AnonymousWhsiperCard };
