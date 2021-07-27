import React, {useState} from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

function Navbar() {

    const dispatch = useDispatch();
    return(
        <nav class="navbar sticky-top navbar-expand-lg">
        <Link className="navbar-brand mx-3 link-home" to="/"><i className="fas fa-home mx-1"></i>Home</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            useSelector(state => state.usuarioLogado) > 0 ?
                            <>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/posts"><i className="fas fa-clipboard-list mx-1"></i>Lista Vermelha</Link></li>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/posts/myposts"><i className="fas fa-folder-open mx-1"></i>Minhas Publicações</Link></li>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/newpost"><i className="far fa-plus-square mx-1"></i>Publicar Posts</Link></li>
                                <li className="nav-item mx-3"><Link className="nav-link" onClick={() => dispatch({type:'LOGOUT'})}><i class="fas fa-sign-out-alt mx-1"></i>Sair</Link></li>
                            </>
                            :
                            <>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/posts"><i className="fas fa-clipboard-list mx-1"></i>Lista Vermelha</Link></li>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/login"><i class="fas fa-sign-in-alt mx-1"></i>Login</Link></li>
                                <li className="nav-item mx-3"><Link className="nav-link" to="/cadastrar"><i class="fas fa-user-plus mx-1"></i>Cadastrar</Link></li>
                            </>
                        }
                    </ul>
            </div>
        </nav>
    );
}

export default Navbar;