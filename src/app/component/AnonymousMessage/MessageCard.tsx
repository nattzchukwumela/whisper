import { whispers } from "@/lib/sampleData";
import { WhisperCard } from "../WhisperCard";

const AnonymousMessageComponent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="compose-section">
        <div className="user-avatar compose-avatar">A</div>
        <input
          type="text"
          placeholder="What's on your mind? Make a Whisper..."
          className="compose-input"
        />
      </div>

      <div className="whispers-feed">
        {whispers.map((whisper) => (
          <WhisperCard key={whisper.id} whisper={whisper} />
        ))}
      </div>

      <div className="load-more">
        <button className="load-more-btn">⟳</button>
        <button className="refresh-btn">↻</button>
      </div>
    </div>
  );
};

export { AnonymousMessageComponent };
