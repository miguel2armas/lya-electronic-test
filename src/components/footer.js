import React from "react";
import logoImg from "../assets/images/logo512.png"
import {Container} from "react-bootstrap";
const Footer = () => {
    let today = new Date();
    let year = today.getFullYear();
  return <footer className="border-top py-3 mt-auto">
              <Container>
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <p className="col-md-5 mb-0 text-muted">{year} LYA Electronic To-Do</p>
                      <a href="/"
                         className="col-md-2 d-flex align-items-center justify-content-center me-md-auto m-auto link-dark text-decoration-none">
                          <img src={logoImg} alt="logo" className="img-fluid" width="70"/>
                      </a>
                      <ul className="nav col-md-5 col-12 justify-content-md-end justify-content-center">
                          <li className="nav-item">
                              <a href="https://wa.me/573146869798" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">WhatsApp</a>
                          </li>
                          <li className="nav-item">
                              <a href="https://github.com/miguel2armas" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">GitHub</a>
                          </li>
                          <li className="nav-item">
                              <a href="https://miguel-armas.com/" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">miguel-armas.com</a>
                          </li>
                      </ul>
                  </div>
              </Container>
  </footer>
}
export default Footer