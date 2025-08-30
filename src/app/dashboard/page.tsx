import { HomeSideBar } from "../component/homesiderbar/HomeSideBar";
import Navbar from "../component/navbar/Navbar";
import "../globals.css";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomeSideBar />
      </main>
    </>
  );
};

export default UserDashboard;
