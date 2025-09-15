// app/page.tsx
import Link from "next/link";
// import Header from "../component/HeaderComponent";
import "./style.css";

export default function HomePage() {
  return (
    <>
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Share Your Link, Get Anonymous Messages</span>
            </div>
            <h1 className="hero-title">
              Get Honest Feedback
              <br />
              <span className="gradient-text">Anonymously</span>
            </h1>
            <p className="hero-subtitle">
              Create your unique link and share it with friends. Receive
              anonymous messages with emotional categories to understand how
              others truly feel about you.
            </p>
            <div className="hero-buttons">
              <Link href="/auth" className="cta-button primary">
                Create My Link
              </Link>
              <Link href="#how-it-works" className="cta-button secondary">
                See How It Works
              </Link>
            </div>

            {/* Demo Link Preview */}
            <div className="link-preview">
              <div className="link-box">
                <span className="link-text">whispers.app/yourname</span>
                <button className="copy-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="section-container">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <div className="step-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="step-title">Get Your Link</h3>
                <p className="step-description">
                  Sign up and get your personalized anonymous message link in
                  seconds.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <div className="step-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16,6 12,2 8,6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </div>
                <h3 className="step-title">Share Everywhere</h3>
                <p className="step-description">
                  Share your link on social media, in your bio, or send it
                  directly to friends.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <div className="step-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="step-title">Receive Messages</h3>
                <p className="step-description">
                  Get anonymous messages with emotional categories from your
                  friends and followers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Message Categories Section */}
        <section className="categories-section">
          <div className="section-container">
            <h2 className="section-title">Message Categories</h2>
            <p className="section-subtitle">
              Every message comes with a category to help you understand the
              sender's feelings and intentions
            </p>
            <div className="categories-grid">
              <div className="category-card venting">
                <div className="category-emoji">💭</div>
                <h3 className="category-name">Venting</h3>
                <p className="category-description">
                  Share frustrations and let out bottled-up emotions safely
                </p>
              </div>

              <div className="category-card confessions">
                <div className="category-emoji">🤫</div>
                <h3 className="category-name">Confessions</h3>
                <p className="category-description">
                  Secret thoughts and admissions they've never shared
                </p>
              </div>

              <div className="category-card lonely">
                <div className="category-emoji">🌙</div>
                <h3 className="category-name">Lonely</h3>
                <p className="category-description">
                  Messages from those seeking connection and understanding
                </p>
              </div>

              <div className="category-card grateful">
                <div className="category-emoji">🙏</div>
                <h3 className="category-name">Grateful</h3>
                <p className="category-description">
                  Thankful and appreciative messages of acknowledgment
                </p>
              </div>

              <div className="category-card anxious">
                <div className="category-emoji">😰</div>
                <h3 className="category-name">Anxious</h3>
                <p className="category-description">
                  Worried thoughts and concerns they need to express
                </p>
              </div>

              <div className="category-card happy">
                <div className="category-emoji">✨</div>
                <h3 className="category-name">Happy</h3>
                <p className="category-description">
                  Positive, joyful, and uplifting messages of celebration
                </p>
              </div>

              <div className="category-card love">
                <div className="category-emoji">❤️</div>
                <h3 className="category-name">Love</h3>
                <p className="category-description">
                  Romantic feelings and deep affections shared anonymously
                </p>
              </div>

              <div className="category-card friendship">
                <div className="category-emoji">🤝</div>
                <h3 className="category-name">Friendship</h3>
                <p className="category-description">
                  Messages about platonic bonds and meaningful connections
                </p>
              </div>

              <div className="category-card work_school">
                <div className="category-emoji">📚</div>
                <h3 className="category-name">Work & School</h3>
                <p className="category-description">
                  Professional and academic thoughts they can't share openly
                </p>
              </div>

              <div className="category-card random">
                <div className="category-emoji">💡</div>
                <h3 className="category-name">Random</h3>
                <p className="category-description">
                  Spontaneous thoughts and unexpected observations
                </p>
              </div>

              <div className="category-card motivational">
                <div className="category-emoji">🚀</div>
                <h3 className="category-name">Motivational</h3>
                <p className="category-description">
                  Encouraging words and inspirational messages to lift you up
                </p>
              </div>

              <div className="category-card funny">
                <div className="category-emoji">😂</div>
                <h3 className="category-name">Funny</h3>
                <p className="category-description">
                  Humorous observations and lighthearted jokes to share
                </p>
              </div>

              <div className="category-card sad">
                <div className="category-emoji">😢</div>
                <h3 className="category-name">Sad</h3>
                <p className="category-description">
                  Melancholic thoughts and empathetic emotional support
                </p>
              </div>

              <div className="category-card angry">
                <div className="category-emoji">😡</div>
                <h3 className="category-name">Angry</h3>
                <p className="category-description">
                  Frustrated feelings and strong emotional reactions
                </p>
              </div>

              <div className="category-card health">
                <div className="category-emoji">🩺</div>
                <h3 className="category-name">Health</h3>
                <p className="category-description">
                  Physical and mental wellness concerns shared privately
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <h2 className="section-title">Why Choose Whispers?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
                    <path d="M7 13c.83.33 2.5 1 5 1s4.17-.67 5-1" />
                    <path d="M8 9h.01" />
                    <path d="M16 9h.01" />
                  </svg>
                </div>
                <h3 className="feature-title">100% Anonymous</h3>
                <p className="feature-description">
                  No tracking, no data collection. Complete anonymity for
                  message senders.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16,6 12,2 8,6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </div>
                <h3 className="feature-title">Easy Sharing</h3>
                <p className="feature-description">
                  Share your messages to Instagram, Twitter, or any platform
                  with one click.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6" />
                    <path d="M21 12h-6m-6 0H3" />
                  </svg>
                </div>
                <h3 className="feature-title">Emotional Context</h3>
                <p className="feature-description">
                  Understand the emotion behind each message with built-in
                  category tags.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="final-cta-section">
          <div className="section-container">
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to Discover What People Really Think?
              </h2>
              <p className="cta-description">
                Join thousands of users already receiving honest, anonymous
                feedback through Whispers.
              </p>
              <Link href="/auth" className="cta-button primary large">
                Create Your Link Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
