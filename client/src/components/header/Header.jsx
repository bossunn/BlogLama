import React from "react";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        src="https://i.pinimg.com/originals/7c/3d/47/7c3d470da77b45eac3aab830c446b31e.jpg"
        alt=""
        className="headerImg"
      />
    </div>
  );
}
