import React from "react";
import {Container, Navbar} from "react-bootstrap";
import LogoImg from "../assets/images/logo512.png"

const Header = () => {
  return <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">
                  <img src={LogoImg} className="mx-3 d-inline-block" width="40" alt="img-logo"/>
                  LYA Electronic To-Do
              </Navbar.Brand>
            </Container>
          </Navbar>
      </header>
}
export default Header