import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './cards.css';
import firebase from '../../config/firebase';

function Cards( {id, especie, nomecient, risco, descricao, visualizacoes, imagem} ){

    const [urlImagem, setUrlImagem] = useState();

    useEffect( () => {
        firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then( url => {
            setUrlImagem(url);
        })
    }, [urlImagem]);

    return(
        <div className="col-md-4 col-sm-12  mb-5">
            <img id="imgCard" src={urlImagem} className="card-img-top img-cartao"/>
            <div className="card-body">
                <h5>{especie}</h5>
                <p className="card-text text-justify"><strong>Nome Científico: </strong>{nomecient}</p>
                <p className="card-text text-justify"><strong>Classificação: </strong>{risco}</p>
                <p className="card-text text-justify"><strong>Descrição: </strong>{descricao}</p>
                <div className="row rodape-card d-flex- align-items-center">
                    <div className="col-6">
                        <Link to={`/postdetails/${id}`} className="btn btn-sm btn-detalhes my-3">+Detalhes</Link>
                    </div>
                    <div className="col-6">
                        <i className="fas fa-eye mx-1"></i><span>{visualizacoes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;