import React from 'react'
import {TableBody, TableCell, TableRow, TableHead, Paper , Link} from '@material-ui/core/'
import Numeral from 'numeral'
import { connect } from 'react-redux';
import Axios from 'axios';
import { ApiURL } from '.././supports/ApiURL';
import {Redirect} from 'react-router-dom'

class manageCart extends React.Component{
    state ={
        data : this.props.cart,
        transaction : this.props.transaction
    }
    OnBtnDeleteCart = (index) => {
        console.log(this.props.id)
        var confirm = window.confirm('Confirm Delete?')
        if(confirm === true){
            var data = this.state.data
            var newData = data.splice(index, 1)
            Axios.patch(ApiURL +'/users/' + this.props.id, {
                cart : newData
            })
        }
    }
    onClickCheckOut = () => {
        var transaction = this.props.transaction
    console.log(transaction)
        transaction.push(this.props.cart)
        Axios.patch(ApiURL + '/users/' + this.props.id,{
            transaction : transaction
        })
        .then((res) =>{
            alert('masuk')
            Axios.patch(ApiURL +'/users/' +this.props.id,{
                cart : []
            })
        })
    }
    renderCart = () => {
        if(this.state.data === undefined){
            return <h1 style={{color:'black'}}>Cart is Empty</h1>
        }
        var jsx = this.state.data.map((val, index) => {
            if(this.state.data.id === val.id){
                return(
                    <TableCell>{val.qty.length + this.state.qty.length}</TableCell>
                )
            }else{
                return(
                    <TableRow>
                            <TableCell>{index + 1 }</TableCell>
                            <TableCell>{val.title}</TableCell>
                            <TableCell>{val.qty.length}</TableCell>
                            <TableCell>Rp. {Numeral(val.total).format('0,0')}</TableCell>
                            <TableCell><input type='button'className='btn btn-danger mb-1 edit-btn' value='x' onClick={() => this.OnBtnDeleteCart(index)}/></TableCell>
                        </TableRow>
                )
            }
        })
        return jsx
    }

    render(){
        console.log(this.props.cart)
        return(
            <div className='container mt-5'>
                <h1 className='mb-5' style={{display:'flex' ,color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>Cart</h1>
                <div style={{display:'flex' ,color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Paper>
                <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Movie Title</TableCell>
                        <TableCell>No. of Tickets</TableCell>
                        <TableCell>Total </TableCell>
                        <TableCell>Delete Order</TableCell>
                </TableHead>
                <TableBody>
                    {this.renderCart()}
                </TableBody>
                </Paper>
                </div>
                <div className='mb-5'style={{display:'flex' ,color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <Link to='/'>
                        <input type='button' className='btn btn-outline-primary mt-5' value='Proceed to Checkout' onClick={this.onClickCheckOut}/>
                    </Link>
                
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        id : state.user.id,
        cart : state.user.cart,
        transaction : state.user.transaction
    }
}

export default connect(mapStateToProps)(manageCart)