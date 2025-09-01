import React from "react";
import "../../app_style/app.css";

import { LeftSidebar } from "../Siderbar/LeftSideBar";
import { MainContent } from "../maincontent/MainContent";
import { RightSidebar } from "../Siderbar/RightSideBar";
/* CSS styles will be included below */

const SocialMediaApp: React.FC = () => {
  return (
    <div className="app-container">
      <LeftSidebar activeNav={"home"} />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default SocialMediaApp;
