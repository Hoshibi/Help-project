import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/icon_logoFooter.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return(
        <div className="conteudo-footer">
            <div className="footer-left">
                <img src={logo} alt="logo-footer"/>
                <br />
                <div className="texto-footer">
                    <span>Ajude a evitar extinções de espécies.<br />Mantenha e salve a rica flora e fauna existentes neste mundo.</span>
                </div>
            </div>
            <div className="footer-right">
                <br />
                <p>Siga nossas páginas:</p>
                <a href="https://www.facebook.com/" className="facebook social mx-2"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                <a href="https://www.instagram.com/" className="instagram social mx-2"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                <a href="https://twitter.com/" className="twitter social mx-2"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
            </div>
        </div>
    );
}

export default Footer;