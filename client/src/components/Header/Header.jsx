import React from "react";
import { FaRegUser } from "react-icons/fa";
import "./Header.css";
export default function Header({name}) {
  return (
    <div className="header">
    <div className="user-info">
      <div className="circle">
        <FaRegUser
          size={"25px"}
          style={{
            color: "#23374d",
          }}
        />
      </div>
      <div className="information">
        <p className="name">{name?name:'we have not found any active member yet'}</p>
        <div className="active-cont">
          <div className={name?"small-circle green":"small-circle"}></div>
        <p className="isActive">{name?'Active':'DisActive'}</p>
        </div>
      </div>
    </div>
  </div>
  );
}
