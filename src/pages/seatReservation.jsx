import React, {Component} from 'react'
import Numeral from 'numeral'
import PageNotFound from './../pages/pageNotFound'
import Axios from 'axios';
import {ApiURL} from '.././supports/ApiURL'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class SeatRes extends Component {
    state ={chosen : [] , booked : [] , price : 0, count : 0, clicked : false }

    componentDidMount(){
        Axios.get(ApiURL + '/movies/' + this.props.location.state.id)
        .then((res)=>{
            this.setState({booked : res.data.booked})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onSeatClick = (arr) => {
        var chosen = this.state.chosen
        chosen.push(arr)
        this.setState({chosen : chosen})
        this.setState({price : this.state.price + 35000})
        this.setState({count : this.state.count+1})
        console.log(this.state.chosen)
    }

    onCancelClick = (arr) => {
        var chosen = this.state.chosen
        var hasil = chosen.filter((val) =>{
            return val.join('') !== arr.join('')
        })
        this.setState({chosen : hasil})
        this.setState({price : this.state.price - 35000})
        this.setState({count : this.state.count-1})
    }



    renderSeat = () => {
        var {seats,booked} = this.props.location.state
        var arr = []
        for(var i = 0 ; i < seats/20 ; i++){
            arr.push([])
            for(var j = 0 ; j < seats/(seats/20) ; j++){
                arr[i].push(1)
            }
        }
        for(var i= 0 ; i < this.state.booked.length; i++){
            arr[this.state.booked[i][0]][this.state.booked[i][1]] = 2
        }
        for(var i= 0 ; i < this.state.chosen.length; i++){
            arr[this.state.chosen[i][0]][this.state.chosen[i][1]] = 3
        }
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        var jsx = arr.map((val,index) => {
            return(
                <tr>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return(
                                    <input type='button' style={{width:'40px', height:'40px', color: 'white', textAlign:'center'}} disabled value={i+1 + alpha[index]} className='mr-2 mt-2 bg-danger'  />
                                ) 
                            }
                            if(val1 === 3){
                                return(
                                    <input type='button' style={{width:'40px', height:'40px', color: 'white', textAlign:'center'}} value={i+1 + alpha[index]} className='mr-2 mt-2 bg-warning' onClick={() => this.onCancelClick([index,i])} />
                                ) 
                            }
                            return(
                                <input type='button' style={{width:'40px', height:'40px' , textAlign:'center' }} value={i+1 + alpha[index]} className='mr-2 mt-2 bg-dark' onClick={() => this.onSeatClick([index,i])}  />
                            )
                        })
                    }
                        
                </tr>
            )
        })
        return jsx

    }
    onBuyClick = () => {
        var cart = this.props.cart
        console.log(cart)

        if(this.state.chosen.length !== 0){
            var booked = this.props.location.state.booked
            var arr = [...booked,...this.state.chosen]
            Axios.patch(ApiURL + '/movies/' + this.props.location.state.id,{
                booked : arr
            })
            .then((res) =>{
                console.log(res.data)
               var obj = {
                    title : this.props.location.state.title,
                    qty : this.state.chosen,
                    total : this.state.price,
                    id : this.props.location.state.id
                }
                cart.push(obj)
                Axios.patch(ApiURL + '/users/' + this.props.id,{
                   cart : cart
                }).then((res) =>{
                    alert('masuk')

                    this.setState({booked : [...this.state.booked , ...this.state.chosen],
                                    chosen : [] , clicked : true
                    })
                    console.log(this.state.booked)
                })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
    }
    render() {
        if(this.state.clicked ===true){
            return(
                <Redirect to='/cart'/>
            )
        }

        if(this.props.location.state === undefined){
            return(
                <PageNotFound />
            )
        }
        return (
            <div className='container mt-5 mb-5'>
                <center>
                <h1>{this.props.location.state.title}</h1>
                </center>
                <div className=' row justify-content-center'>
                    <table>
                    {this.renderSeat()}
                    </table>
                    <div className='mt-5' style={{backgroundColor : 'white', width : '100%' , height:'30px', border:'0.5px solid grey' , textAlign:'center'}}>
                        SCREEN AREA 
                    </div>
                </div>
                {
                <div className='mt-5'style={{display:'flex', backgroundColor:'#111012', color:'white', fontWeight:'bolder', alignItems: 'center',justifyContent: 'center'}}>
                    <div className='mr-5'>
                    Ticket Price = Rp. {Numeral(this.state.price).format('0,0')}
                    </div>
                    <div className='mr-5'>
                    No. of Seats {this.state.count}
                    </div>
                </div>
                }
                <div className='mt-3'>
                    <input type="button" onClick={this.onBuyClick} className='btn btn-dark' value='Add To Cart' />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        cart : state.user.cart,
    }
}    

export default connect (mapStateToProps) (SeatRes) 