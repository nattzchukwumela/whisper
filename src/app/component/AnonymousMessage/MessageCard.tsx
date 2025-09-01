import { whispers } from "@/lib/sampleData";
import { AnonymousWhsiperCard } from "../AnonymousWhsper";

const AnonymousMessageComponent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="whispers-feed">
        {whispers.map((whisper) => (
          <AnonymousWhsiperCard key={whisper.id} whisper={whisper} />
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
