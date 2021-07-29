import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";

const Header = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink
            className="font-weight-bold text-dark"
            style={{ cursor: "pointer" }}
          >
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>Sign In</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && (
              <>
                <NavItem>
                  <Link href={isAuth().role === 1 ? "/admin" : "/user"}>
                    <NavLink style={{ cursor: "pointer" }}>{`${
                      isAuth().name
                    }'s Dashboard`}</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => router.replace(`/signin`))}
                  >
                    Sign Out
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
