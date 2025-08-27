// app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="landing-header">
      <div className="header-container">
        <Link href="/" className="logo">
          Whispers
        </Link>
        <nav className="main-nav">
          <Link href="/#features" className="nav-link">
            Features
          </Link>
          <Link href="/auth" className="nav-button">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
