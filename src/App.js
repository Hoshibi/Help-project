import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor } from '../src/store'
import {PersistGate} from 'redux-persist/integration/react';
 
//Pages
import Login from './view/login';
import Cadastro from './view/cadastro';
import Home from './view/home';
import LostPass from './view/lostpass';
import NewPost from './view/newpost';
import Posts from './view/posts';
import PostDetails from './view/postdetails';

function App() {
  return (
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/cadastrar' component={Cadastro}/>
          <Route exact path='/lostpass' component={LostPass}/>
          <Route exact path='/newpost' component={NewPost}/>
          <Route exact path='/posts' component={Posts}/>
          <Route path='/posts/:parametro' component={Posts}/>
          <Route path='/postdetails/:idPost' component={PostDetails}/>
          <Route path='/postedit/:idPost' component={NewPost}/>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
