import { emergingCommunities, popularWhispers } from "@/lib/sampleData";

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-section">
        <h3 className="section-title">Popular Whispers</h3>
        {popularWhispers.map((whisper) => (
          <div key={whisper.id} className="popular-whisper">
            <div
              className="user-avatar small"
              style={{ backgroundColor: whisper.userColor }}
            >
              {whisper.userInitials}
            </div>
            <div className="popular-content">
              <p className="popular-text">{whisper.content}</p>
              <span className="popular-time">{whisper.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Emerging Communities</h3>
        {emergingCommunities.map((community, index) => (
          <div key={index} className="community-item">
            <span className="community-hash">#</span>
            <span className="community-text">{community}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Anonymity Tips</h3>
        <p className="tips-text">
          Your identity is always protected. Share freely and without fear of
          judgment. Avoid sharing personal information.
        </p>
      </div>
    </div>
  );
};

export { RightSidebar };
