import React from 'react'
import { connect } from 'react-redux'
import {TableBody, TableCell, TableHead, Paper } from '@material-ui/core/'

class historyTransaction extends React.Component{
    state ={
        data : this.props.transaction
    }

    render(){
        
        return(
            <div className='container mt-4'>
                <h1 className='mb-5' style={{display:'flex' ,color:'black',display: 'flex',alignItems: 'center',justifyContent: 'center'}}> Your Purchase History</h1>
                <div style={{display:'flex' ,color:'black',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <Paper>
                <TableHead>
                        <TableCell>No.</TableCell>                       
                        <TableCell>Movie Title</TableCell>
                        <TableCell>No. of Tickets</TableCell>
                        <TableCell>Total </TableCell>
                </TableHead>
                <TableBody>
                </TableBody>
                </Paper>
                </div>
            </div>
        )
        }
    }
const mapStateToProps = (state) => {
    return{
        transaction : state.user.transaction,
        id : state.user.id
    }
}

export default connect(mapStateToProps)(historyTransaction)