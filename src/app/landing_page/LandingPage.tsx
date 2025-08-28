// app/page.tsx
import Link from "next/link";
import Header from "../component/HeaderComponent";
import "./style.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Speak Freely.
              <br />
              Message Anonymously.
            </h1>
            <p className="hero-subtitle">
              Welcome to Whispers, the safe space for conversations without a
              trace. Share your thoughts, secrets, and stories without revealing
              who you are.
            </p>
            <Link href="/auth" className="cta-button">
              Join the Conversation
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="features-container">
            <h2 className="section-title">Why Choose Whispers?</h2>
            <div className="features-grid">
              {/* Feature 1: True Anonymity */}
              <div className="feature-card">
                <div className="feature-icon">
                  {/* SVG for a mask or incognito icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M7 13c.83.33 2.5 1 5 1s4.17-.67 5-1" />
                    <path d="M8 9h.01" />
                    <path d="M16 9h.01" />
                  </svg>
                </div>
                <h3 className="feature-title">True Anonymity</h3>
                <p className="feature-description">
                  Your identity is never linked to your messages. We don't track
                  IP addresses or personal data, ensuring your privacy is
                  absolute.
                </p>
              </div>

              {/* Feature 2: Secure & Encrypted */}
              <div className="feature-card">
                <div className="feature-icon">
                  {/* SVG for a lock icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="feature-title">Secure & Encrypted</h3>
                <p className="feature-description">
                  All conversations are protected with end-to-end encryption.
                  Only you and the recipient can read what's sent.
                </p>
              </div>

              {/* Feature 3: Ephemeral Messages */}
              <div className="feature-card">
                <div className="feature-icon">
                  {/* SVG for an hourglass or timer icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22a10 10 0 1 0-10-10h10v10z" />
                    <path d="M22 12A10 10 0 0 0 12 2v10h10z" />
                  </svg>
                </div>
                <h3 className="feature-title">Ephemeral Messages</h3>
                <p className="feature-description">
                  Set messages to disappear after they're read. Your
                  conversations leave no digital footprint, just like a real
                  whisper.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/*<footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Whispers. All Rights Reserved.</p>
      </footer>*/}
    </>
  );
}
