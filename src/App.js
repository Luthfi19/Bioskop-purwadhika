import React from 'react';
import Header from './components/header'
import MovieList from './pages/movieList'
import ManageMovie from './pages/admin/manageMovie'
import MovieDetail from './pages/movieDetail'
import Register from './pages/register'
import Login from './pages/login'
import SeatRes from './pages/seatReservation'
import PageNotFound from './pages/pageNotFound'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import { Route , Switch} from 'react-router-dom'

import './App.css';
import Axios from 'axios';
import {ApiURL} from './supports/ApiURL'
import {OnRegisterSuccess} from './redux/actions'
import {connect} from 'react-redux'

class App extends React.Component {
  componentDidMount(){
    var username = localStorage.getItem('terserah')
    if(username !== null){
      Axios.get(ApiURL + '/users?username=' + username)
      .then((res) =>{
        console.log(res.data)
        this.props.OnRegisterSuccess(res.data[0])
      })
    }
  }
  render(){
    if(this.props.user === '' && localStorage.getItem('terserah' !== null)){
      return (<p> Loading ... </p>)
    }
    return (
    <div>
      <Header/>
      <Switch>
      <Route exact path='/' component= {MovieList} />
      <Route path='/manage' component= {ManageMovie} />
      <Route path='/moviedetail' component= {MovieDetail} />
      <Route path='/register' component= {Register} />
      <Route path='/login' component= {Login} />
      <Route path='/seat-order' component= {SeatRes} />
      <Route path='/cart' component= {Cart} />
      <Route path='/checkout' component={Checkout}/>
      <Route path='*' component= {PageNotFound} />
      </Switch>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.user.username
  }
}

export default connect(mapStateToProps, {OnRegisterSuccess})(App);
