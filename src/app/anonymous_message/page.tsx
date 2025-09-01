import React from "react";
import "../app_style/app.css";

import { LeftSidebar } from "../component/Siderbar/LeftSideBar";
import { RightSidebar } from "../component/Siderbar/RightSideBar";
import { AnonymousMessageComponent } from "../component/AnonymousMessage/MessageCard";
import Navbar from "../component/navbar/Navbar";

/* CSS styles will be included below */

const Anonymous_Messages: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <LeftSidebar activeNav="anonymous_messages" />
        <AnonymousMessageComponent />
        <RightSidebar />
      </div>
    </>
  );
};

export default Anonymous_Messages;
