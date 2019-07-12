import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess, OnLoginAdmin} from './../redux/actions'
import {Redirect} from 'react-router-dom'
import { Modal, ModalBody, ModalHeader} from 'reactstrap'
import { ApiURL } from '../supports/ApiURL';
//Ambil value dari input user
//validasi inputan
//kita get data user berdasarkan inputan
//apabila dapet data berarti berhasil login
//apabila data tidak ada, berarti username or password invalid
//apabila berhasil login, taruh data di global state, dan username di localStorage

class Login extends Component {
    state = {errormsg : '', modalOpen : false}
    onBtnLoginClick = () => {
        var name = this.refs.username.value
        var pass = this.refs.password.value
        if(name === '' || pass === ''){
            this.setState({
                modalOpen : true,
                errormsg : 'Form should be compeleted'
            })
        }else{
            Axios.get(ApiURL + '/users?username=' + name + '&password=' + pass)
            .then((res) =>{
               if(res.data.length === 0){
                this.setState({
                    modalOpen : true,
                    errormsg : 'Password or Username Invalid'
                })
               }else {
                 this.setState({
                    redirect : true,
                    
                })
               
                if(res.data[0].role === 'admin'){
                    this.props.OnLoginAdmin(res.data[0])
                    localStorage.setItem('terserah', name)
                    console.log(this.props.OnLoginAdmin(res.data[0]))
                }else{
                    this.props.OnRegisterSuccess(res.data[0])
                    localStorage.setItem('terserah', name)
                    console.log(this.props.OnRegisterSuccess(res.data[0]))
                }
            }
        })
            
            .catch((err) =>{
                console.log(err)
            })
        }
    }
    render(){
        if(this.props.username !== ""){
            return(
                <Redirect to='/' />
            )
        }
        return(
            <div className='container'>
                <Modal isOpen={this.state.modalOpen} size="lg" style={{maxWidth: '700px', width: '40%'}} toggle={()=> this.setState({modalOpen : false})}>
                        <ModalHeader>
                            Error 
                        </ModalHeader>
                        <ModalBody>
                            <h5>{this.state.errormsg}</h5>
                        </ModalBody>
            
                </Modal> 
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-4'>
                        <Paper className='p-5'>
                        <h1>LOGIN</h1>
                        <input ref='username' className='form-control mt-3' type='text' placeholder='username' />
                        <input ref='password' className='form-control mt-3' type='text' placeholder='password' />
                        <input onClick={this.onBtnLoginClick} type='button' className='btn btn-outline-primary mt-5' value='Login' />
                        </Paper>
                        <p className='mt-3' style={{fontStyle:'italic'}}>
                            Not registered yet?
                            <Link to = '/register' >
                            <span style={{color:'blue',fontWeight :"bolder" , textDecoration:'underline',cursor:'pointer'}}> 
                                Register Now 
                            </span>
                            </Link>
                        </p>
                        {/* <div class="alert alert-success alert-dismissible">
                            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                            Password or Username Invalid
                        </div> */}
                            
                    </div>
                </div>
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username,
       
    }
}

export default connect(mapStateToProps,{OnRegisterSuccess, OnLoginAdmin}) (Login)