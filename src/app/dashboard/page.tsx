import SocialMediaApp from "../component/homeDashboard/home";
import { HomeSideBar } from "../component/homesiderbar/HomeSideBar";
import Navbar from "../component/navbar/Navbar";
import "../globals.css";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <SocialMediaApp />
    </>
  );
};

export default UserDashboard;
