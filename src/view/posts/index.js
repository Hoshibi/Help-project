import React, {useState, useEffect} from 'react';
import './posts.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import Cards from '../../components/cards';
import {useSelector} from 'react-redux';
import firebase from '../../config/firebase';


function Posts({match}){

    const [publicacoes, setPosts] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [mensagem, setMensagem]  = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    var listaPosts = [];

    useEffect( () => {

        if(match.params.parametro){
            firebase.firestore().collection('posts').where('user', '==', usuarioEmail).get().then(async (resultado) => {
                setMensagem('my')
                await resultado.docs.forEach( doc => {
                    if (doc.data().especie.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
    
                setPosts(listaPosts);
            })
            
        }else{
            firebase.firestore().collection('posts').get().then(async (resultado) => {
                setMensagem('all')
                await resultado.docs.forEach( doc => {
                    if (doc.data().especie.indexOf(pesquisa) >= 0) {
                        listaPosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
    
                setPosts(listaPosts);
            })
        }
    });

    return(
        <>
        <Header />
        <Navbar />

        <div className="posts-box row p-5">
        <div className="titulo-lista mx-auto p-4 text-center">
                    {mensagem === 'my' && <h2>Minhas publicações</h2>}
                    {mensagem === 'all' && <h2>Lista Vermelha</h2>}
                </div>
            <input type="text" onChange={ (e) => setPesquisa(e.target.value)} className="form-control text-center" placeholder="Pesquisar nome de Especie... "/>
        </div>

        <div className="row p-3">
            {
                publicacoes.map( item => <Cards key={item.id} id={item.id} especie={item.especie} nomecient={item.nomecient} risco={item.risco} descricao={item.descricao} visualizacoes={item.visualizacoes} imagem={item.imagem}/>)
            }
        </div>
        </>
    );
}

export default Posts;