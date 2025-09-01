import {
  Bell,
  Globe,
  Home,
  MessageCircle,
  MessageCircleQuestion,
  Save,
  User,
} from "lucide-react";
import Link from "next/link";

const HomeSideBar = () => {
  return (
    <div className="home-siderbar">
      <div className="home-links">
        <Link href="">
          <Home /> <span>Home</span>
        </Link>
        <Link href="">
          <MessageCircle /> <span>My Messages</span>
        </Link>
        <Link href="">
          <Save /> <span>Save Whispers</span>
        </Link>
        <Link href="">
          <User /> <span>My Profile</span>
        </Link>
        <Link href="">
          <Bell /> <span>Notification</span>
        </Link>
        <Link href="">
          <Globe /> <span>Explore</span>
        </Link>
        <Link href="">
          <MessageCircleQuestion /> <span>Anonymous Messages</span>
        </Link>
      </div>
    </div>
  );
};

export { HomeSideBar };
