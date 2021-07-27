import React, {useState} from 'react';
import './header.css';
import imageLogo from '../../assets/icon_logo.png';
import {Link} from 'react-router-dom';


function Header() {
    return(
        <div className="">
            <header>
                <Link className="imagemLogo" to="/"><img src={imageLogo} alt='Logo da aplicação' /></Link>
                <p className="text-header">Faça parte dessa história.</p>
            </header>
        </div>
    );



}

export default Header;