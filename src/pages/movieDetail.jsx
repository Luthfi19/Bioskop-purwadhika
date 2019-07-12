import React from 'react' 
import Axios from 'axios';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// Dari Movie List kirim Id ke Movie Detail
// Di Movie Detail kita get movie berdasarkan Id
// Dapet data, kemudian taruh di state
// Lalu state di render


class MovieDetail extends React.Component{
    state = { data : null , login : null }
    componentDidMount(){
        var id = this.props.location.search.split('=')[1]
        Axios.get('http://localhost:2000/movies/' + id)
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBuyTicketClick = () => {
        if(this.props.user.id === 0){
            this.setState({login : false})
        }else{
            this.setState({login : true})
        }
    }

    renderPlayingAt = (val) => {
        console.log(val)
        var arr = [val]
        return arr.join(',')
    } 
   
    render(){
        if(this.state.login === false){
            return(
                <Redirect to='/login' />
            )
        }
        if(this.state.login === true){
            return(
                <Redirect to={{pathname : '/seat-order' , state : this.state.data}} />
            )
        }
        if(this.state.data === null){
            return (<p> Loading ... </p>)
        }
        return(
            <div className='container mt-5 mb-6'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img height='430px' src={this.state.data.image} alt='movie' />
                    </div>
                    <div className='second-container col-md-8'>
                        <h1> {this.state.data.title} </h1>
                        <p> Genre : {this.state.data.genre} </p>
                        <h5> Producer : {this.state.data.sutradara} </h5>
                        <p> Duration : {this.state.data.duration} Minutes  </p>
                        <p> Playing at : {this.renderPlayingAt(this.state.data.playingAt)}</p>
                        <p style={{fontStyle:'italic'}}> Sinopsis : <br></br> {this.state.data.sinopsis}</p>
                        <input style={{color:'black'}} onClick={this.onBuyTicketClick} type='button' className='btn btn-outline-light' value='Buy Ticket' />
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}


export default connect(mapStateToProps)(MovieDetail)