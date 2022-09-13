import React from "react";
import NavBar from "../../pages/NavBar";

type props = {
  children: React.ReactNode;
};

/**
 * @method NavWrapper
 * @description Function to create a nav bar wrapper for different components
 * @param children
 * @returns a react node
 */
const NavWrapper = ({ children }: props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default NavWrapper;
