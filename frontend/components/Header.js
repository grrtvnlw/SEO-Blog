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
import Router from "next/router";
import NProgress from "nprogress";

import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";

import ".././node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

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
            <>
              <NavItem>
                <Link href="/blogs">
                  <NavLink style={{ cursor: "pointer" }}>Blogs</NavLink>
                </Link>
              </NavItem>
            </>

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
