import React, {useState} from 'react';
import './lostpass.css';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';

function LostPass() {

   const [email, setEmail] = useState();
   const [msg, setMsg] = useState();

   function RecuperarSenha(){
      firebase.auth().sendPasswordResetEmail(email).then(resultado => {
         setMsg('Um email para a recuperação de senha foi enviada em sua caixa de entrada.');
      }).catch(error => {
         setMsg('Atenção! Informar um email válido.');
      })
   }

 return(
   <>
   <Navbar />
   <form className="text-center form-login mx-auto mt-4">
      <h3 className="mb-5 font-weight-bold">Recuperar Senha</h3>
      <input onChange={e => setEmail(e.target.value)} className="form-control my-4" type="email" placeholder="Email" />

      <div className="msg my-5 mb-5">
         <span>{msg}</span>
      </div>

      <button onClick={RecuperarSenha} className="btn btn-lg btn-enviar" type="button">Recuperar Senha</button>

      
      <div className="opcoes-recuperar text-center my-4">
                    <Link to='/login' className="mx-3">Retornar Login</Link>
                    <Link to="/" className="mx-3">Retornar Home</Link>
      </div>
   </form>
   </>
 )
}

export default LostPass;