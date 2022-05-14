import React, { useState } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({onSignOut}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className='pa4 tc'>
      <Dropdown
        isOpen={isDropDownOpen}
        toggle={() =>
          setIsDropDownOpen((currIsDropDownOpen) => !currIsDropDownOpen)
        }
        style={{cursor:"pointer"}}
      >
        <DropdownToggle data-toggle='dropdown' tag='span'>
          <img
            src='http://tachyons.io/img/logo.jpg'
            className='br-100 ba h3 w3 dib'
            alt='avatar'
          />
        </DropdownToggle>
        <DropdownMenu
          className='b--transparent shadow-5'
          style={{
            marginTop: "1.5rem",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem onClick={()=>onSignOut("signout")}>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
