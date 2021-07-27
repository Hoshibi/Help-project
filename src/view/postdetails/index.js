import React, {useState, useEffect} from 'react';
import './postdetails.css';
import { useSelector} from 'react-redux';
import firebase from '../../config/firebase';
import {Link, Redirect, Route} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/navbar';
import Header from '../../components/header';

function PostDetails({match}){

    const [post, setPost] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const [carregando, setCarregando] = useState(1);
    const [excluir, setExcluir] = useState(0);
    const usuarioLogado = useSelector(state => state.usuarioEmail);

    useEffect( () => {
        firebase.firestore().collection('posts').doc(match.params.idPost).get().then( resultado => {
            setPost(resultado.data());
            firebase.firestore().collection('posts').doc(match.params.idPost).update('visualizacoes', resultado.data().visualizacoes + 1)
            firebase.storage().ref(`imagens/${resultado.data().imagem}`).getDownloadURL().then( url => {
                setUrlImg(url)
                setCarregando(0);
            });
        })
    }, []);

    function remover(){
        firebase.firestore().collection('posts').doc(match.params.idPost).delete().then( () => {
            setExcluir(1);
        })
    }

    return (
        <>
        <Header />
        <Navbar />

        { excluir ? <Redirect to="/posts/myposts"/> : null}

        <div className="container-fluid">
            <div className="row">
                <img src={urlImg} className="img-banner" alt="banner"/>
            </div>
            <div className="row mb-5 p-5 d-flex justify-content-around">
                <div className="col-md-9 col-sm-12 box-detalhes">
                    <div class="text-left mb-4 visualizacao">
                        <i className="fas fa-eye mx-1"></i><span>{post.visualizacoes + 1}</span>
                    </div>
                    <h3 className="titulo-detalhe mx-auto mb-2"><strong>{post.especie}</strong></h3>
                    <p className="test-justify"><strong>Nome Científico:</strong>{post.nomecient}</p>
                    <h5 className="mx-auto mt-4"><strong>Descrição</strong></h5>
                    <p className="test-justify ">{post.descricao}</p>
                </div>
        
                <div className="col-md-3 col-sm-12 ">
                    {/* Alterção => Adicionar o campo de vizualização do detalhe Grau do Risco de Extinção */}
                    <div className="p-3 box-info mt-4 mb-2">
                        <i className="fas fa-exclamation-circle fa-2x mb-2"></i>
                        <h6><strong>Grau do Risco de Extinção:</strong></h6>
                        <span className="mt-1 mb-2">{post.risco}</span>
                    </div>
                    {/* Fim da alteração */}
                    <div className="p-3 box-info mb-2">
                        <i className="fas fa-tags fa-2x mb-2"></i>
                        <h6><strong>Reino:</strong></h6>
                        <span className="mt-1 mb-2">{post.reino}</span>
                    </div>
                    <div className="p-3 box-info mb-2">
                        <i className="fas fa-calendar-alt fa-2x mb-2"></i>
                        <h6><strong>Data de publicação:</strong></h6>
                        <span className="mt-1 mb-2">{post.data}</span>
                    </div>
                    <div className="mt-2 mx-auto float-right">
                        {
                            usuarioLogado === post.user ?
                                <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-deletar">Remover Post</button>
                            :null
                        }
                    </div>
                </div>
            </div>  
            {
                usuarioLogado === post.user ?
                <Link to={`/postedit/${match.params.idPost}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                :null
            }
        </div> 
        </>
    )
}

export default PostDetails;