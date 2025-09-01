import React from "react";
import "./home.css";

import { LeftSidebar } from "../Siderbar/LeftSideBar";
import { MainContent } from "../maincontent/MainContent";
import { RightSidebar } from "../Siderbar/RightSideBar";
/* CSS styles will be included below */

const SocialMediaApp: React.FC = () => {
  return (
    <div className="app-container">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default SocialMediaApp;
