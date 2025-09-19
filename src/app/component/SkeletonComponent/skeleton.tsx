import React from "react";
import "./skeleton.css";
const SkeletonComponent = () => {
  return (
    <>
      <div className="container">
        {/*<!-- Venting Box Skeleton -->*/}
        <div className="message-box purple">
          <div className="header">
            <div className="tag purple">
              <div className="skeleton emoji"></div>
              <div
                className="skeleton"
                style={{ width: "60px", height: "14px" }}
              ></div>
            </div>
            <div className="actions">
              <div className="action-btn skeleton"></div>
              <div className="action-btn skeleton"></div>
            </div>
          </div>

          <div className="content">
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text medium"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text very-short"></div>
          </div>

          <div className="skeleton skeleton-timestamp"></div>
        </div>

        {/*<!-- Confessions Box Skeleton -->*/}
        <div className="message-box red">
          <div className="header">
            <div className="tag red">
              <div className="skeleton emoji"></div>
              <div
                className="skeleton"
                style={{ width: "80px", height: "14px" }}
              ></div>
            </div>
            <div className="actions">
              <div className="action-btn skeleton"></div>
              <div className="action-btn skeleton"></div>
            </div>
          </div>

          <div className="content">
            <div className="skeleton skeleton-text medium"></div>
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text medium"></div>
          </div>

          <div className="skeleton skeleton-timestamp"></div>
        </div>

        {/*<!-- Lonely Box Skeleton -->*/}
        <div className="message-box blue">
          <div className="header">
            <div className="tag blue">
              <div className="skeleton emoji"></div>
              <div
                className="skeleton"
                style={{ width: "50px", height: "14px" }}
              ></div>
            </div>
            <div className="actions">
              <div className="action-btn skeleton"></div>
              <div className="action-btn skeleton"></div>
            </div>
          </div>

          <div className="content">
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text medium"></div>
            <div className="skeleton skeleton-text short"></div>
          </div>

          <div className="skeleton skeleton-timestamp"></div>
        </div>

        {/*<!-- Love Box Skeleton -->*/}
        <div className="message-box pink">
          <div className="header">
            <div className="tag pink">
              <div className="skeleton emoji"></div>
              <div
                className="skeleton"
                style={{ width: "40px", height: "14px" }}
              ></div>
            </div>
            <div className="actions">
              <div className="action-btn skeleton"></div>
              <div className="action-btn skeleton"></div>
            </div>
          </div>

          <div className="content">
            <div className="skeleton skeleton-text medium"></div>
            <div className="skeleton skeleton-text long"></div>
            <div className="skeleton skeleton-text short"></div>
          </div>

          <div className="skeleton skeleton-timestamp"></div>
        </div>
      </div>
    </>
  );
};

export { SkeletonComponent };
