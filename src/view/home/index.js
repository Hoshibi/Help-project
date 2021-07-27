import React, {useState} from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import ControlledCarousel from '../../components/carousel';
import Footer from '../../components/footer';

function Home(){
    return(
        <>
        <Header />
        <Navbar />
        <ControlledCarousel />
        <div className="container">
            <div className="join">
                <h1 className="titulo">Cadastre-se e faça parte da nossa equipe</h1>
                <div className="row">
                    <div class="col-lg-2"></div>
                    <div className="col-lg-8">
                        <p>Ajude a Fauna e a Flora mandando relatórios para nossa equipe sobre novas espécies identificadas como em risco ou em extinção. Faça parte dessa mudança.</p>
                        <br></br>
                        <Link className="nav-link" to="/cadastrar">Cadastre-se</Link>
                    </div>
                    <div class="col-lg-2"></div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}


export default Home;
