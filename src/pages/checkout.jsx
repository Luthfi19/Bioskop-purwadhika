import React from 'react'
import {TableBody, TableCell, TableHead, TableFooter, Paper} from '@material-ui/core/'
import Numeral from 'numeral'
import { connect } from 'react-redux';


class checkoutOrder extends React.Component{
    state={
        scr : ''
    }
    render(){
        var transaction = this.props.transaction
        console.log(transaction)
        var saldo = this.props.saldo
        console.log(saldo)
        return(
            <div className='container mt-5'>
                <div style={{display:'flex' ,color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Paper>
                <TableHead>
                        <TableCell>id</TableCell>
                        <TableCell>Movie Title</TableCell>
                        <TableCell>No. of Tickets</TableCell>
                        <TableCell>Total </TableCell>
                        <TableCell>Delete Order</TableCell>
                </TableHead>
                <TableBody>
                    <TableCell>{this.props.location.state.id}</TableCell>
                    <TableCell>{this.props.location.state.title}</TableCell>
                    <TableCell>{this.props.location.state.count}</TableCell>
                    <TableCell>{Numeral(this.props.location.state.price).format('0,0')}</TableCell>
                    <TableCell>
                            <input type='button' className='btn btn-danger mb-1 edit-btn' value='x'/>
                    </TableCell>
                </TableBody>
                <TableFooter align='right'>
                    <TableCell>{this.props.location.state.id}</TableCell>
                    <TableCell>{saldo}</TableCell>
                </TableFooter>
                </Paper>
                </div>
                <div className='container' style={{color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <input type="button" className='btn btn-outline-danger ml-5 mr-5 mt-5' value="Pay with Cash" onClick={() => this.setState({scr : 'Please Show Receipt to the Attendant '})}/>
                    <input type="button" className='btn btn-outline-danger ml-5 mr-5 mt-5' value="Pay with PRW Funds"/>
                </div>
                <div style={{color:'white',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                {
                        this.state.scr === '' ? 
                        null 
                        :
                        <div className='alert alert-success mt-3'>
                        {this.state.scr} 
                        <span onClick={() => this.setState({scr : ''})} style={{fontWeight:"bolder", cursor:"pointer", float:"right"} }><span>&nbsp;&nbsp;</span>x</span></div>
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        transaction : state.user.transaction,
        saldo : state.user.saldo
    }
}

export default connect(mapStateToProps)(checkoutOrder)