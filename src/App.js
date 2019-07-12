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
import History from './pages/historyTransaction'
import { Route , Switch} from 'react-router-dom'

import './App.css';
import Axios from 'axios';
import {ApiURL} from './supports/ApiURL'
import {OnRegisterSuccess , OnLoginAdmin} from './redux/actions'
import {connect} from 'react-redux'

class App extends React.Component {
  componentDidMount(){
    var username = localStorage.getItem('terserah')
    if(username !== null){
      Axios.get(ApiURL + '/users?username=' + username)
      .then((res) =>{
        if(res.data[0].role === 'user'){
          console.log(res.data)
          this.props.OnRegisterSuccess(res.data[0])
        }else{
          console.log(res.data)
          this.props.OnLoginAdmin(res.data[0])
        }
      })
    }
  }
  render(){
    if(this.props.user === '' && localStorage.getItem('terserah' !== null)){
      return (<p> Loading ... </p>)
    }
    if(this.props.isAdmin === true){
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
    )
  }else{
    return(
      <div>
      <Header/>
      <Switch>
      <Route exact path='/' component= {MovieList} />
      <Route path='/moviedetail' component= {MovieDetail} />
      <Route path='/register' component= {Register} />
      <Route path='/login' component= {Login} />
      <Route path='/seat-order' component= {SeatRes} />
      <Route path='/cart' component= {Cart} />
      <Route path='/checkout' component={Checkout}/>
      <Route path='/history' component={History}/>
      <Route path='*' component= {PageNotFound} />
      </Switch>
    </div>
    );
  }
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.user.username,
    isAdmin : state.user.isAdmin
  }
}

export default connect(mapStateToProps, {OnRegisterSuccess, OnLoginAdmin})(App);
