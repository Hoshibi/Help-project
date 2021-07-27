import React, {useState, useEffect} from 'react';
import { useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './newpost.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';
import Header from '../../components/header';
import Spinner from 'react-bootstrap/Spinner';

function NewPost({match}){

    const [mensagem, setMensagem]  = useState();
    const [especie, setEspecie] = useState();
    const [nomecient, setNomeCient] = useState();
    const [risco, setRisco] = useState();
    const [reino, setReino] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [descricao, setDescricao] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(0);
    const [imgAtual, setImgAtual] = useState();
    const [imgNova, setImgNova] = useState();

    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect( () => {
        if(match.params.idPost){
            firebase.firestore().collection('posts').doc(match.params.idPost).get().then( resultado => {
                setEspecie(resultado.data().especie);
                setNomeCient(resultado.data().nomecient);
                setRisco(resultado.data().risco);
                setReino(resultado.data().reino);
                setData(resultado.data().data);
                setHora(resultado.data().hora);
                setDescricao(resultado.data().descricao);
                setImgAtual(resultado.data().imagem);
            })
        }
    }, [carregando])

    function atualizar(){
        setCarregando(1)
        setMensagem(null);

        if(imgNova)
            storage.ref(`imagens/${imgNova.name}`).put(imgNova);
        db.collection('posts').doc(match.params.idPost).update({
            especie: especie,
            nomecient: nomecient,
            risco: risco,
            reino: reino,
            data: data,
            hora: hora,
            descricao: descricao,
            imagem: imgNova ? imgNova.name : imgAtual
        }).then( () => {
            setMensagem('ok');
            setCarregando(0);
        }).catch(erro => {
            setMensagem('erro');
            setCarregando(0);
        })
    }

    function postar(){
        setCarregando(1)

        storage.ref(`imagens/${imgNova.name}`).put(imgNova).then(() => {
            db.collection('posts').add({
                especie: especie,
                nomecient: nomecient,
                risco: risco,
                reino: reino,
                data: data,
                hora: hora,
                imagem: imgNova.name,
                descricao: descricao,
                publico: 0,
                criacao: new Date(),
                user: usuarioEmail,
                visualizacoes: 0,
            }).then(() => {
                setMensagem('ok');
                setCarregando(0);
            }).catch(() => {
                setMensagem('erro');
                setCarregando(0);
            })
        });
    }

    return(
        <>
        <Header />
        <Navbar />
        <div className='cadastrar col-11'>
            <div className="row">
                <h3 className="mx-auto font-weight-bold my-5">{match.params.idPost ? 'Atualizar publicação' : 'Adicionar nova publicação'}</h3>
            </div>

            <form>
                <div className="form-group my-3">
                    <label>Nome da Espécie:</label>
                    <input onChange={(e) => setEspecie(e.target.value)} type="text" className="form-control" value={especie}/>
                </div>
                <div className="form-group my-3">
                    <label>Nome Científico:</label>
                    <input onChange={(e) => setNomeCient(e.target.value)} type="text" className="form-control" value={nomecient}/> 
                </div>
                <div className="form-group row my-4">
                    <div className="col-6">
                        <label>Grau do risco de extinção :</label>
                        <select onChange={(e) => setRisco(e.target.value)} className="form-control" value={risco}>
                            <option disabled selected value>--Selecione uma categoria--</option>
                            <option>Extinta (EX)</option>
                            <option>Extinta na Natureza (EW)</option>
                            <option>Regionalmente Extinta (RE)</option>
                            <option>Criticamente em Perigo (CR)</option>
                            <option>Em Perigo (EN)</option>
                            <option>Vulnerável (VU)</option>
                            <option>Quase Ameaçada (NT)</option>
                            <option>Menos Preocupante (LC)</option>
                            <option>Dados Insuficientes (DD)</option>
                            <option>Não Aplicável (NA)</option>
                            <option>Não Avaliada (NE)</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <label>Reino:</label>
                        <select onChange={(e) => setReino(e.target.value)} className="form-control" value={reino}>
                            <option disabled selected value>--Selecione uma categoria--</option>
                            <option>Animalia</option>
                            <option>Fungi</option>
                            <option>Monera</option>
                            <option>Protista</option>
                            <option>Vegetal</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row my-4">
                    <div className="col-6">
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data}/>
                    </div>
                    <div className="col-6">
                        <label>Horário:</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora}/>
                    </div>
                </div>

                <div className="form-group my-4">
                    <label>Upload de Imagem:</label>
                    <input onChange={(e) => setImgNova(e.target.files[0])} type="file" className="form-control"></input>
                </div>

                <div className="form-group my-4">
                    <label>Descrição:</label>
                    <textarea onChange={(e) => setDescricao(e.target.value)} className="form-control" rows="5" value={descricao}></textarea>
                </div>

                <div className="text-dark text-center my-4">
                    {mensagem === 'ok' && <span>&#9745;  A publicação foi enviada com sucesso!</span>}
                    {mensagem === 'erro' && <span><strong>&#9888;  Atenção! </strong> Falha no envio.</span>}
                </div>

                { carregando ? <Spinner className="mt-5 mb-5" animation="border" variant="success" role="status"></Spinner>
                  : <button onClick={match.params.idPost ? atualizar : postar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{match.params.idPost ? 'Atualizar' : 'Adicionar'}</button>
                }

            </form>

        </div>
        </>
    )
}

export default NewPost;

