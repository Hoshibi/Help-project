import React, {useState} from 'react';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';

import {Link, Redirect} from 'react-router-dom';
import Navbar from '../../components/navbar';

import { useSelector, useDispatch } from 'react-redux';


function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [mensagem, setMensagem]  = useState();

    const dispatch = useDispatch();

    function autenticar() {
        firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado => {
            setMensagem('ok')
            setTimeout(() => {dispatch({type: 'LOGIN', usuarioEmail: email})},2000)
            
        })
        .catch(erro => {
            setMensagem('erro')
        })
    }

    return(
        <>
        <Navbar />
        <div className="login-content d-flex">

            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/" /> : null
            }

            <form className="form-signin ">
                <h1 className="h3 mb-4 fw-bold text-light text-center">Login</h1>
                    
                
                <div class="form-floating mb-1">
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="Email"/>
                <label for="floatingInput">Email</label>
                </div>

                <div class="form-floating">    
                <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Senha</label>
                </div>

                <button className="btn w-100 btn-lg mt-3" onClick={autenticar} type="button">Entrar</button>
                <div className="text-white text-center my-5">
                    {mensagem === 'ok' && <span>&#9745;  Você conectou com sucesso!</span>}
                    {mensagem === 'erro' && <span><strong>&#9888;  Atenção! </strong> Email ou senha estão incorretas.</span>}
                </div>

                <div className="opcoes text-center">
                    <Link to='/cadastrar' className="mx-4">Cadastrar novo Usuário</Link>
                    <Link to="/lostpass" className="mx-4">Recuperar Senha</Link>
                </div>
            </form>
        </div>
       </> 
    ); 
}

export default Login;