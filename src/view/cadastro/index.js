import React, {useState} from 'react';
import './cadastro.css'
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth'
import Spinner from 'react-bootstrap/Spinner'
import Navbar from '../../components/navbar';

function Cadastro(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setTipoMsg] = useState();
    const [mensagem, setMsg]  = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){
        setTipoMsg(null);
        setCarregando(1);

        if(!email || !senha) {
            setTipoMsg('erro');
            setMsg('Você não preencheu todos os campos');
        }
        firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado =>{
            setTipoMsg('ok');
            setCarregando(0);
        }).catch(erro =>{
            setTipoMsg('erro');
            setCarregando(0);
            switch(erro.message){
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres.');
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Essa conta já existe.');
                    break;
                case 'The email address is badly formatted.':
                    setMsg('O formato do e-mail é inválido');
                    break;
                default:
                    setMsg('Não foi possível realizar o Cadastro.');
                    break;
            }
        });
    }

    return(
        <>
        <Navbar />
        <div className="form-cadastro">
            <form className="form-login text-center mx-auto mt-4">
                <i class="fas fa-user-plus fa-2x mb-3"></i>
                <h1 className="h3 mb-5 text-black font-weight-bold">Cadastrar novo Usuário</h1>

                <input onChange = {(e) => setEmail(e.target.value)} type="email" className="form-control mb-2" placeholder="Email"/>
                <input onChange = {(e) => setSenha(e.target.value)} type="password" className="form-control" placeholder="Senha"/>

                { carregando ? <Spinner className="mt-5" animation="border" variant="success" role="status"></Spinner>
                  : <button onClick={cadastrar} type="button" className="btn btn-lg mt-3 mt-5 btn-cadastro">Cadastrar</button>
                }
                
                <div className="text-black text-center my-5">
                    {msgTipo === 'ok' && <span>&#9745;  Cadastro realizado com sucesso</span>}
                    {msgTipo === 'erro' && <span><strong>&#9888;  Atenção! </strong>{mensagem}</span>}
                </div>

                <div className="opcoes-recuperar text-center my-3">
                    <Link to='/login' className="mx-3">Retornar Login</Link>
                    <Link to="/" className="mx-3">Retornar Home</Link>
                </div>

            </form>
        </div>
        </>
    )
}

export default Cadastro;

